// pages/api/verify-payment.ts
// Verifies Razorpay payment signature to prevent fraud
//
// Required: npm install razorpay crypto

import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    const isVerified = expectedSignature === razorpay_signature;

    if (isVerified) {
      // ─────────────────────────────────────
      // IMPORTANT: Save to your database here
      // ─────────────────────────────────────
      // Example with Prisma:
      //   await prisma.subscription.create({
      //     data: {
      //       userId: session.user.id,
      //       paymentId: razorpay_payment_id,
      //       orderId: razorpay_order_id,
      //       status: 'active',
      //       plan: 'pro_monthly',
      //       expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      //     },
      //   });
      //
      // Example with MongoDB:
      //   await db.collection('subscriptions').insertOne({ ... });

      console.log('Payment verified:', razorpay_payment_id);

      return res.status(200).json({
        verified: true,
        paymentId: razorpay_payment_id,
      });
    } else {
      console.error('Payment verification failed — signature mismatch');
      return res.status(400).json({ verified: false, error: 'Invalid signature' });
    }
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ verified: false, error: 'Verification failed' });
  }
}
