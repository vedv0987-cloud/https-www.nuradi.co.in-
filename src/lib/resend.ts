import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nuradi.co.in";
const FROM_EMAIL = "NuradiHealth <onboarding@resend.dev>";

export const EMAIL_FROM = FROM_EMAIL;

/** Wrap content in our base HTML email template (black header, white body) */
function baseEmail(title: string, bodyHtml: string, unsubscribeUrl?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f5f5;padding:40px 16px;">
<tr><td align="center">
  <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.04);">
    <tr><td style="background:#1a1a1a;padding:24px 32px;text-align:center;">
      <div style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.02em;">NuradiHealth</div>
    </td></tr>
    <tr><td style="padding:40px 32px;color:#1a1a1a;font-size:15px;line-height:1.6;">
      ${bodyHtml}
    </td></tr>
    <tr><td style="padding:24px 32px;background:#fafafa;border-top:1px solid #eee;text-align:center;color:#888;font-size:12px;line-height:1.5;">
      <p style="margin:0 0 8px 0;">© ${new Date().getFullYear()} NuradiHealth · India's #1 Free Health Platform</p>
      <p style="margin:0;">
        <a href="${SITE_URL}" style="color:#666;text-decoration:underline;">Visit site</a>
        ${unsubscribeUrl ? ` · <a href="${unsubscribeUrl}" style="color:#666;text-decoration:underline;">Unsubscribe</a>` : ""}
      </p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

export function confirmationEmail(token: string): { subject: string; html: string } {
  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${token}`;
  const html = baseEmail(
    "Confirm your NuradiHealth subscription",
    `
    <h1 style="margin:0 0 16px 0;font-size:26px;font-weight:800;letter-spacing:-0.02em;">Confirm your subscription</h1>
    <p style="margin:0 0 24px 0;color:#555;">Thanks for signing up! Click the button below to confirm your email and start receiving daily health tips, curated videos, and actionable advice.</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${confirmUrl}" style="display:inline-block;background:#1a1a1a;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:999px;font-weight:700;font-size:15px;">Confirm Email</a>
    </div>
    <p style="margin:0;color:#888;font-size:13px;">If the button doesn't work, copy and paste this URL into your browser:<br><span style="color:#555;word-break:break-all;">${confirmUrl}</span></p>
    <p style="margin:24px 0 0 0;color:#aaa;font-size:12px;">If you didn't sign up, you can safely ignore this email.</p>
    `
  );
  return { subject: "Confirm your NuradiHealth subscription", html };
}

export interface DailyContent {
  tipTitle: string;
  tipBody: string;
  videoTitle?: string;
  videoChannel?: string;
  videoThumbnail?: string;
  videoUrl?: string;
}

export function dailyEmail(content: DailyContent, token: string): { subject: string; html: string } {
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${token}`;
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" });

  const videoBlock = content.videoTitle && content.videoUrl
    ? `
    <div style="margin:32px 0 0 0;padding:20px;background:#fafafa;border-radius:12px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#888;margin-bottom:12px;">Watch This</div>
      <a href="${content.videoUrl}" style="text-decoration:none;color:#1a1a1a;">
        ${content.videoThumbnail ? `<img src="${content.videoThumbnail}" alt="" style="width:100%;border-radius:8px;margin-bottom:12px;" />` : ""}
        <div style="font-size:16px;font-weight:700;line-height:1.3;margin-bottom:6px;">${content.videoTitle}</div>
        ${content.videoChannel ? `<div style="font-size:13px;color:#888;">${content.videoChannel}</div>` : ""}
      </a>
    </div>`
    : "";

  const html = baseEmail(
    content.tipTitle,
    `
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#888;margin-bottom:12px;">${today} · Today's Health Tip</div>
    <h1 style="margin:0 0 16px 0;font-size:28px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">${content.tipTitle}</h1>
    <div style="color:#444;font-size:15px;line-height:1.7;">${content.tipBody}</div>
    ${videoBlock}
    <div style="margin:32px 0 0 0;padding-top:24px;border-top:1px solid #eee;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#888;margin-bottom:12px;">Explore More</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding:4px 0;"><a href="${SITE_URL}/tools/bmi" style="color:#1a1a1a;text-decoration:none;font-size:14px;font-weight:600;">→ BMI Calculator</a></td>
        </tr>
        <tr>
          <td style="padding:4px 0;"><a href="${SITE_URL}/symptom-checker" style="color:#1a1a1a;text-decoration:none;font-size:14px;font-weight:600;">→ Symptom Checker</a></td>
        </tr>
        <tr>
          <td style="padding:4px 0;"><a href="${SITE_URL}/infographics" style="color:#1a1a1a;text-decoration:none;font-size:14px;font-weight:600;">→ Disease Infographics</a></td>
        </tr>
      </table>
    </div>
    `,
    unsubscribeUrl
  );
  return { subject: `${content.tipTitle} · NuradiHealth`, html };
}
