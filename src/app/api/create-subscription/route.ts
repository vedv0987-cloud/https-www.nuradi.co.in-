import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay not configured" },
      { status: 500 }
    );
  }

  try {
    const { planId, amount, email } = await req.json();

    if (!planId || !amount) {
      return NextResponse.json({ error: "Missing planId or amount" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amount, // Amount in paisa
      currency: "INR",
      receipt: `nuradi_${planId}_${Date.now()}`,
      notes: {
        planId,
        email: email || "",
        source: "nuradihealth-web",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
