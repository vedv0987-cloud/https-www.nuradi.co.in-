import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nuradi.co.in";

function htmlPage(title: string, heading: string, message: string, buttonText: string, buttonHref: string): string {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
<div style="max-width:480px;width:90%;background:#fff;border-radius:16px;padding:48px 32px;text-align:center;box-shadow:0 2px 20px rgba(0,0,0,0.04);">
<div style="font-size:56px;margin-bottom:16px;">${heading.includes("Confirmed") ? "✓" : heading.includes("sorry") ? "✕" : "·"}</div>
<h1 style="margin:0 0 12px 0;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#1a1a1a;">${heading}</h1>
<p style="margin:0 0 32px 0;color:#666;font-size:15px;line-height:1.6;">${message}</p>
<a href="${buttonHref}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-weight:700;font-size:15px;">${buttonText}</a>
</div>
</body></html>`;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new Response(
      htmlPage("Invalid Link", "Invalid link", "This confirmation link is missing a token. Please use the link from your email.", "Go to NuradiHealth", SITE_URL),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const { data: subscriber, error } = await supabaseAdmin
    .from("subscribers")
    .select("id, email, status")
    .eq("token", token)
    .maybeSingle();

  if (error || !subscriber) {
    return new Response(
      htmlPage("Link Expired", "We're sorry", "This confirmation link is invalid or has expired. Please subscribe again from our homepage.", "Subscribe again", SITE_URL),
      { status: 404, headers: { "Content-Type": "text/html" } }
    );
  }

  if (subscriber.status === "active") {
    return new Response(
      htmlPage("Already Confirmed", "Already confirmed", "Your subscription is already active. You'll receive daily health tips starting tomorrow morning!", "Go to NuradiHealth", SITE_URL),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  await supabaseAdmin
    .from("subscribers")
    .update({ status: "active", confirmed_at: new Date().toISOString() })
    .eq("id", subscriber.id);

  return new Response(
    htmlPage(
      "Subscription Confirmed",
      "Confirmed!",
      "Welcome to NuradiHealth. You'll receive your first daily health tip tomorrow morning.",
      "Go to NuradiHealth",
      SITE_URL
    ),
    { headers: { "Content-Type": "text/html" } }
  );
}
