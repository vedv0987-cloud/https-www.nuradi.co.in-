import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getPlanById } from "@/lib/cashfree";

const CF_APP_ID = process.env.CASHFREE_APP_ID;
const CF_SECRET = process.env.CASHFREE_SECRET_KEY;
const CF_ENV = (process.env.CASHFREE_ENV || "TEST").toUpperCase();
const CF_BASE_URL = CF_ENV === "PROD" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";

export async function POST(req: NextRequest) {
  if (!CF_APP_ID || !CF_SECRET) {
    return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
  }

  try {
    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: "orderId required" }, { status: 400 });
    }

    // Fetch order status from Cashfree
    const cfResponse = await fetch(`${CF_BASE_URL}/orders/${orderId}`, {
      headers: {
        "x-client-id": CF_APP_ID,
        "x-client-secret": CF_SECRET,
        "x-api-version": "2023-08-01",
      },
    });

    const order = await cfResponse.json();

    if (!cfResponse.ok) {
      return NextResponse.json({ error: "Order not found", details: order }, { status: 404 });
    }

    // Look up subscription row
    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("cashfree_order_id", orderId)
      .maybeSingle();

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    const plan = getPlanById(subscription.plan_id);
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (order.order_status !== "PAID") {
      return NextResponse.json({
        success: false,
        status: order.order_status,
        message: `Payment is ${order.order_status}. Please complete the payment.`,
      });
    }

    // Fetch payment details to get payment_id
    let paymentId: string | null = null;
    try {
      const paymentsRes = await fetch(`${CF_BASE_URL}/orders/${orderId}/payments`, {
        headers: {
          "x-client-id": CF_APP_ID,
          "x-client-secret": CF_SECRET,
          "x-api-version": "2023-08-01",
        },
      });
      const payments = await paymentsRes.json();
      if (Array.isArray(payments) && payments.length > 0) {
        const successfulPayment = payments.find((p: { payment_status?: string }) => p.payment_status === "SUCCESS");
        if (successfulPayment) {
          paymentId = successfulPayment.cf_payment_id?.toString() || null;
        }
      }
    } catch {}

    // Calculate expiry
    const now = new Date();
    const expiresAt = new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

    // Update subscription to active (idempotent — if already active, this is safe)
    await supabaseAdmin
      .from("subscriptions")
      .update({
        status: "active",
        activated_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        cashfree_payment_id: paymentId,
      })
      .eq("cashfree_order_id", orderId);

    return NextResponse.json({
      success: true,
      plan: plan.id,
      planName: plan.name,
      email: subscription.email,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
