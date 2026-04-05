// Coupon code management
// Hardcoded whitelist — add new coupons here

export interface Coupon {
  code: string;
  discount: number;              // 0-1 (e.g. 0.25 = 25% off)
  description: string;
  active: boolean;
}

export const COUPONS: Record<string, Coupon> = {
  NURADIHEALTH25: {
    code: "NuradiHealth25",
    discount: 0.25,
    description: "25% off launch offer",
    active: true,
  },
};

export interface CouponValidation {
  valid: boolean;
  discount: number;              // fraction (0-1)
  description?: string;
  code?: string;
  error?: string;
}

export function validateCoupon(rawCode: string): CouponValidation {
  const normalized = rawCode.toUpperCase().trim();
  if (!normalized) return { valid: false, discount: 0, error: "No code entered" };

  const coupon = COUPONS[normalized];
  if (!coupon) return { valid: false, discount: 0, error: "Invalid coupon code" };
  if (!coupon.active) return { valid: false, discount: 0, error: "This coupon is no longer active" };

  return {
    valid: true,
    discount: coupon.discount,
    description: coupon.description,
    code: coupon.code,
  };
}

/** Apply coupon discount to a paisa amount (returns new amount in paisa) */
export function applyCoupon(amountPaisa: number, rawCode: string): number {
  const v = validateCoupon(rawCode);
  if (!v.valid) return amountPaisa;
  return Math.round(amountPaisa * (1 - v.discount));
}

/** Format paisa as ₹ string */
export function formatPaisa(paisa: number): string {
  const rupees = paisa / 100;
  return `₹${rupees.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
