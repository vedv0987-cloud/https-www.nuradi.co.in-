import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are a helpful health assistant on NuradiHealth, an Indian health education website.
You provide general health information in simple language.
You NEVER diagnose conditions or prescribe medicines.
You always recommend consulting a doctor for serious symptoms.
You can suggest which type of specialist to visit.
You know Indian foods, medicines, and health practices.
Keep responses under 150 words. Be warm and caring.
End with a relevant tip or suggestion.
Always add disclaimer: "This is general information, not medical advice."`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
