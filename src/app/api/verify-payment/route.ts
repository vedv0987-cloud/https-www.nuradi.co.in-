import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ verified: false, error: "Razorpay not configured" }, { status: 500 });
  }

  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    const isVerified = expectedSignature === razorpay_signature;

    if (isVerified) {
      // TODO: Save subscription to Supabase here
      // const { error } = await supabaseAdmin.from("subscriptions").insert({
      //   payment_id: razorpay_payment_id,
      //   order_id: razorpay_order_id,
      //   status: "active",
      //   plan: "pro_monthly",
      //   expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      // });

      console.log("Payment verified:", razorpay_payment_id);

      return NextResponse.json({
        verified: true,
        paymentId: razorpay_payment_id,
      });
    } else {
      console.error("Payment verification failed — signature mismatch");
      return NextResponse.json(
        { verified: false, error: "Invalid signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { verified: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
