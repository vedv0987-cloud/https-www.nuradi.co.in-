import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nuradi.co.in";

function htmlPage(heading: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${heading}</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
<div style="max-width:480px;width:90%;background:#fff;border-radius:16px;padding:48px 32px;text-align:center;box-shadow:0 2px 20px rgba(0,0,0,0.04);">
<div style="font-size:56px;margin-bottom:16px;">·</div>
<h1 style="margin:0 0 12px 0;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#1a1a1a;">${heading}</h1>
<p style="margin:0 0 32px 0;color:#666;font-size:15px;line-height:1.6;">${message}</p>
<a href="${SITE_URL}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-weight:700;font-size:15px;">Go to NuradiHealth</a>
</div>
</body></html>`;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new Response(
      htmlPage("Invalid Link", "This unsubscribe link is missing a token."),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const { data: subscriber, error } = await supabaseAdmin
    .from("subscribers")
    .select("id, status")
    .eq("token", token)
    .maybeSingle();

  if (error || !subscriber) {
    return new Response(
      htmlPage("Link Expired", "This unsubscribe link is invalid or has expired."),
      { status: 404, headers: { "Content-Type": "text/html" } }
    );
  }

  if (subscriber.status === "unsubscribed") {
    return new Response(
      htmlPage("Already Unsubscribed", "You've already been removed from our mailing list."),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  await supabaseAdmin
    .from("subscribers")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("id", subscriber.id);

  return new Response(
    htmlPage(
      "Unsubscribed",
      "You've been removed from our mailing list. We're sorry to see you go — you can resubscribe anytime from our homepage."
    ),
    { headers: { "Content-Type": "text/html" } }
  );
}
