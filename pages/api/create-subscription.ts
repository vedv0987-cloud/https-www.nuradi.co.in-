// pages/api/create-subscription.ts  (Pages Router)
// OR
// app/api/create-subscription/route.ts  (App Router)
//
// Creates a Razorpay order for subscription payment
//
// Required: npm install razorpay

import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { planId, amount, email } = req.body;

    if (!planId || !amount) {
      return res.status(400).json({ error: 'Missing planId or amount' });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,              // Amount in paisa
      currency: 'INR',
      receipt: `healthedutv_${planId}_${Date.now()}`,
      notes: {
        planId,
        email: email || '',
        source: 'healthedutv-web',
      },
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error: any) {
    console.error('Razorpay order creation failed:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}


// ──────────────────────────────────────────────
// APP ROUTER VERSION (if using /app directory)
// ──────────────────────────────────────────────
// Save as: app/api/create-subscription/route.ts
//
// import { NextRequest, NextResponse } from 'next/server';
// import Razorpay from 'razorpay';
//
// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });
//
// export async function POST(req: NextRequest) {
//   const { planId, amount, email } = await req.json();
//
//   const order = await razorpay.orders.create({
//     amount,
//     currency: 'INR',
//     receipt: `healthedutv_${planId}_${Date.now()}`,
//     notes: { planId, email, source: 'healthedutv-web' },
//   });
//
//   return NextResponse.json({
//     orderId: order.id,
//     amount: order.amount,
//     currency: order.currency,
//   });
// }
