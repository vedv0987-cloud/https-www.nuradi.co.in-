import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, EMAIL_FROM, dailyEmail, DailyContent } from "@/lib/resend";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;
const CRON_SECRET = process.env.CRON_SECRET!;

const HEALTH_TOPICS = [
  "heart health", "sleep quality", "gut health", "stress management",
  "diabetes prevention", "immunity boosting", "hydration", "posture",
  "mental wellness", "daily movement", "nutrition basics", "blood pressure",
  "healthy cooking", "breathing exercises", "eye health", "back pain prevention",
];

async function generateDailyTip(): Promise<{ title: string; body: string }> {
  const topic = HEALTH_TOPICS[Math.floor(Math.random() * HEALTH_TOPICS.length)];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: `You are a health writer for NuradiHealth, an Indian health platform. Write a daily health tip that's friendly, evidence-based, and practical. Keep it concise (2-3 short paragraphs, ~150 words total). Use simple language. Don't use markdown. Respond in this exact JSON format only (no other text):
{"title": "Short engaging title (6-8 words max)", "body": "HTML body with <p> tags separating paragraphs"}`,
      messages: [{ role: "user", content: `Write today's health tip about: ${topic}. Make it actionable and specific. Include at least one concrete thing the reader can do today.` }],
    }),
  });

  if (!response.ok) throw new Error(`Claude API failed: ${response.status}`);
  const data = await response.json();
  const text = data.content?.[0]?.text || "";

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Could not parse Claude response as JSON");
  const parsed = JSON.parse(jsonMatch[0]);
  return { title: parsed.title, body: parsed.body };
}

function pickFeaturedVideo() {
  const featured = videos.filter((v) => v.featured);
  const pool = featured.length > 0 ? featured : videos;
  const video = pool[Math.floor(Math.random() * pool.length)];
  const channel = channels.find((c) => c.id === video.channelId);
  return {
    title: video.title,
    thumbnail: video.thumbnail,
    channel: channel?.name,
    url: `https://www.nuradi.co.in/video/${video.id}`,
  };
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(req: NextRequest) {
  // Auth check — Vercel Cron adds this header automatically, or we use Bearer
  const authHeader = req.headers.get("authorization");
  const expectedAuth = `Bearer ${CRON_SECRET}`;

  if (authHeader !== expectedAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch active subscribers
    const { data: subscribers, error } = await supabaseAdmin
      .from("subscribers")
      .select("email, token")
      .eq("status", "active");

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ ok: true, sent: 0, message: "No active subscribers" });
    }

    // Generate content once (shared across all recipients)
    const tip = await generateDailyTip();
    const video = pickFeaturedVideo();

    const baseContent: DailyContent = {
      tipTitle: tip.title,
      tipBody: tip.body,
      videoTitle: video.title,
      videoThumbnail: video.thumbnail,
      videoChannel: video.channel,
      videoUrl: video.url,
    };

    // Send in batches of 10 with 200ms delay
    let sent = 0;
    let failed = 0;
    const batchSize = 10;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map(async (sub) => {
          try {
            const { subject, html } = dailyEmail(baseContent, sub.token);
            const { error: sendError } = await resend.emails.send({
              from: EMAIL_FROM,
              to: sub.email,
              subject,
              html,
            });
            if (sendError) {
              console.error(`Failed to send to ${sub.email}:`, sendError);
              return false;
            }
            return true;
          } catch (err) {
            console.error(`Exception sending to ${sub.email}:`, err);
            return false;
          }
        })
      );
      sent += results.filter((r) => r).length;
      failed += results.filter((r) => !r).length;
      if (i + batchSize < subscribers.length) await sleep(200);
    }

    return NextResponse.json({
      ok: true,
      total: subscribers.length,
      sent,
      failed,
      tipTitle: tip.title,
    });
  } catch (error) {
    console.error("Send-daily error:", error);
    return NextResponse.json({ error: "Failed to send daily emails" }, { status: 500 });
  }
}
