import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, EMAIL_FROM, confirmationEmail } from "@/lib/resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // Check for existing subscriber
    const { data: existing } = await supabaseAdmin
      .from("subscribers")
      .select("id, email, status, token")
      .eq("email", email)
      .maybeSingle();

    let token: string;
    let shouldSendEmail = true;

    if (existing) {
      if (existing.status === "active") {
        // Already subscribed — silent success
        return NextResponse.json({ ok: true, message: "You're already subscribed!" });
      }
      // Reactivate pending or unsubscribed
      token = existing.token || crypto.randomUUID();
      const { error: updateError } = await supabaseAdmin
        .from("subscribers")
        .update({
          status: "pending",
          token,
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null,
        })
        .eq("id", existing.id);
      if (updateError) {
        console.error("Supabase update error:", updateError);
        return NextResponse.json({ error: "Could not process subscription" }, { status: 500 });
      }
    } else {
      // New subscriber
      token = crypto.randomUUID();
      const { error: insertError } = await supabaseAdmin
        .from("subscribers")
        .insert({ email, status: "pending", token });
      if (insertError) {
        console.error("Supabase insert error:", insertError);
        return NextResponse.json({ error: "Could not save subscription" }, { status: 500 });
      }
    }

    // Send confirmation email
    if (shouldSendEmail) {
      const { subject, html } = confirmationEmail(token);
      const { error: emailError } = await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject,
        html,
      });
      if (emailError) {
        console.error("Resend error:", emailError);
        // Don't fail the request — user is in DB, they can request resend later
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Check your inbox to confirm your subscription!",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
