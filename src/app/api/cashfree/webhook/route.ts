import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { getPlanById } from "@/lib/cashfree";

const CF_SECRET = process.env.CASHFREE_SECRET_KEY;

/** Verify Cashfree webhook HMAC-SHA256 signature */
function verifySignature(rawBody: string, timestamp: string, receivedSig: string): boolean {
  if (!CF_SECRET) return false;
  const signedPayload = timestamp + rawBody;
  const expectedSig = crypto
    .createHmac("sha256", CF_SECRET)
    .update(signedPayload)
    .digest("base64");
  return expectedSig === receivedSig;
}

export async function POST(req: NextRequest) {
  if (!CF_SECRET) {
    console.error("CASHFREE_SECRET_KEY not configured");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const rawBody = await req.text();
  const timestamp = req.headers.get("x-webhook-timestamp") || "";
  const signature = req.headers.get("x-webhook-signature") || "";

  if (!timestamp || !signature) {
    console.error("Missing webhook headers");
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!verifySignature(rawBody, timestamp, signature)) {
    console.error("Webhook signature verification failed");
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let payload: {
    type?: string;
    data?: {
      order?: { order_id?: string; order_status?: string };
      payment?: { cf_payment_id?: number; payment_status?: string };
    };
  };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = payload.type;
  const orderId = payload.data?.order?.order_id;

  if (!orderId) {
    return NextResponse.json({ ok: true, note: "No order_id in payload" });
  }

  try {
    // Look up subscription
    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("cashfree_order_id", orderId)
      .maybeSingle();

    if (!subscription) {
      console.warn("Webhook: subscription not found for order", orderId);
      return NextResponse.json({ ok: true, note: "Subscription not found" });
    }

    const plan = getPlanById(subscription.plan_id);
    const now = new Date();

    if (eventType === "PAYMENT_SUCCESS_WEBHOOK") {
      if (subscription.status === "active") {
        // Idempotent — already processed
        return NextResponse.json({ ok: true, note: "Already active" });
      }

      const expiresAt = plan
        ? new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000)
        : null;

      await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "active",
          activated_at: now.toISOString(),
          expires_at: expiresAt?.toISOString() || null,
          cashfree_payment_id: payload.data?.payment?.cf_payment_id?.toString() || null,
          raw_payload: payload,
        })
        .eq("cashfree_order_id", orderId);

      console.log("Subscription activated:", orderId, subscription.email);
    } else if (eventType === "PAYMENT_FAILED_WEBHOOK" || eventType === "PAYMENT_USER_DROPPED_WEBHOOK") {
      await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "failed",
          raw_payload: payload,
        })
        .eq("cashfree_order_id", orderId);

      console.log("Payment failed/dropped:", orderId);
    } else if (eventType === "REFUND_SUCCESS_WEBHOOK") {
      await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "expired",
          expires_at: now.toISOString(),
          raw_payload: payload,
        })
        .eq("cashfree_order_id", orderId);

      console.log("Refund processed, subscription expired:", orderId);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    // Still return 200 to prevent Cashfree retry storm on our server errors
    return NextResponse.json({ ok: true, error: "Handler error" });
  }
}
