import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase";
import { getPlanById } from "@/lib/cashfree";

const CF_APP_ID = process.env.CASHFREE_APP_ID;
const CF_SECRET = process.env.CASHFREE_SECRET_KEY;
const CF_ENV = (process.env.CASHFREE_ENV || "TEST").toUpperCase() as "TEST" | "PROD";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nuradi.co.in";

const CF_BASE_URL = CF_ENV === "PROD" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";

// URL-safe order_id (Cashfree requires alphanumeric + _ -)
const nano = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 16);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  if (!CF_APP_ID || !CF_SECRET) {
    return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const planId = String(body.planId || "");
    const name = String(body.name || "").trim() || email.split("@")[0];
    const phone = String(body.phone || "").trim() || "9999999999";

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const plan = getPlanById(planId);
    if (!plan || plan.id === "free") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Generate unique order ID
    const orderId = `nuradi_${nano()}`;

    // Customer ID for Cashfree (email-based)
    const customerId = email.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50);

    // Create order via Cashfree PG API
    const cfResponse = await fetch(`${CF_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "x-client-id": CF_APP_ID,
        "x-client-secret": CF_SECRET,
        "x-api-version": "2023-08-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: plan.price / 100, // Cashfree expects rupees, not paisa
        order_currency: "INR",
        customer_details: {
          customer_id: customerId,
          customer_email: email,
          customer_name: name,
          customer_phone: phone,
        },
        order_meta: {
          return_url: `${SITE_URL}/subscription/success?order_id=${orderId}`,
          notify_url: `${SITE_URL}/api/cashfree/webhook`,
        },
        order_note: `NuradiHealth ${plan.name} subscription`,
        order_tags: {
          plan_id: plan.id,
        },
      }),
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok || !cfData.payment_session_id) {
      console.error("Cashfree order creation failed:", cfData);
      return NextResponse.json(
        { error: cfData.message || "Failed to create payment order" },
        { status: 500 }
      );
    }

    // Insert pending subscription row
    const { error: dbError } = await supabaseAdmin.from("subscriptions").insert({
      email,
      plan_id: plan.id,
      status: "pending",
      cashfree_order_id: orderId,
      amount: plan.price,
      currency: "INR",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // Continue anyway — we can still verify via Cashfree API
    }

    return NextResponse.json({
      paymentSessionId: cfData.payment_session_id,
      orderId,
      env: CF_ENV,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
