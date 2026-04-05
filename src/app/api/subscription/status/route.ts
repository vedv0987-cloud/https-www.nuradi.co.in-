import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.toLowerCase().trim();

  if (!email) {
    return NextResponse.json({ isPro: false, reason: "no_email" });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select("plan_id, status, expires_at, activated_at")
      .eq("email", email)
      .eq("status", "active")
      .order("activated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Subscription status query error:", error);
      return NextResponse.json({ isPro: false, reason: "db_error" });
    }

    if (!data) {
      return NextResponse.json({ isPro: false, reason: "no_subscription" });
    }

    // Check expiry
    const now = new Date();
    const expiresAt = data.expires_at ? new Date(data.expires_at) : null;
    if (expiresAt && expiresAt < now) {
      return NextResponse.json({
        isPro: false,
        reason: "expired",
        expiredAt: data.expires_at,
      });
    }

    const plan = data.plan_id === "pro_yearly" ? "yearly" : "monthly";
    return NextResponse.json({
      isPro: true,
      plan,
      planId: data.plan_id,
      expiresAt: data.expires_at,
      activatedAt: data.activated_at,
    });
  } catch (err) {
    console.error("Status endpoint error:", err);
    return NextResponse.json({ isPro: false, reason: "server_error" });
  }
}
