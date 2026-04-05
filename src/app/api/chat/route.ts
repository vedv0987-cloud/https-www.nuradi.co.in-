import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const HEALTH_DATABASE_CONTEXT = `
You have access to NuradiHealth's comprehensive health database:
- 120 diseases with prevention tips and expert videos
- 25+ Indian branded medicines with side effects, generics, prices
- 30 home remedies (gharelu nuskhe) with scientific backing
- 60+ Indian food nutrition data with portions
- Lab report reference ranges (CBC, LFT, KFT, Lipid, Thyroid, Diabetes, Vitamins)
- 15 first-aid emergency procedures with do's and don'ts
- Full Indian IAP vaccination schedule
- 42-week pregnancy tracker with development info
- 15 body systems + symptom-to-specialist mappings

When relevant, mention specific NuradiHealth pages:
- /tools/bmi, /tools/biological-age, /tools/sleep-score, /tools/gut-health
- /health-az (disease library), /symptom-checker, /first-aid
- /home-remedies, /infographics, /pregnancy, /vaccination
- /blog, /exercises, /myths, /challenges
`;

const SYSTEM_PROMPT = `You are HealthBot, an AI health assistant on NuradiHealth — India's #1 free health platform.

YOUR ROLE:
- Warm, caring, knowledgeable health educator (like a trusted family doctor)
- Provide evidence-based health information in simple language
- Use web search to find the LATEST medical information before answering
- Cite your sources so users can verify claims
- Culturally aware of Indian health practices, foods, medicines
- Include Hindi terms in parentheses where helpful: "turmeric (haldi)"

${HEALTH_DATABASE_CONTEXT}

STRICT RULES:
1. NEVER diagnose — say "this could be" or "common causes include"
2. NEVER prescribe — say "commonly used medicines include" or "your doctor may consider"
3. ALWAYS recommend seeing a doctor for serious symptoms
4. ALWAYS search the web for latest info on medical topics when relevant
5. For emergencies, immediately say: "Please call 108 (ambulance) or go to the nearest hospital"
6. End every response with a "💡 Quick tip:" — one actionable takeaway

RESPONSE FORMAT:
- Start with a direct answer (2-3 sentences)
- Use bullet points for multiple items
- Include "⚠️ See a doctor if:" section when relevant
- End with "💡 Quick tip:" — one actionable takeaway
- Keep responses under 300 words unless detailed answer is needed

PERSONALITY:
- Warm, patient, non-judgmental
- Simple language, no medical jargon (or explain it)
- Encouraging and positive`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: object) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };

        try {
          const apiMessages = messages.map((m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          }));

          const response = await anthropic.messages.stream({
            model: "claude-sonnet-4-6",
            max_tokens: 1500,
            system: SYSTEM_PROMPT,
            messages: apiMessages,
            tools: [
              {
                type: "web_search_20250305",
                name: "web_search",
                max_uses: 3,
              } as unknown as Anthropic.Tool,
            ],
          });

          const sources: { title: string; url: string; domain: string }[] = [];
          let isSearching = false;

          for await (const event of response) {
            if (event.type === "content_block_start") {
              const block = event.content_block;
              if ((block as unknown as { type: string }).type === "server_tool_use" || (block as unknown as { type: string }).type === "web_search_tool_use") {
                const input = (block as unknown as { input?: { query?: string } }).input;
                isSearching = true;
                send({ type: "searching", query: input?.query || "latest health info" });
              }
            }

            if (event.type === "content_block_delta") {
              const delta = event.delta;
              if ((delta as { type: string }).type === "text_delta") {
                const textDelta = delta as { type: string; text: string };
                send({ type: "text", content: textDelta.text });
              }
            }

            if (event.type === "content_block_stop") {
              if (isSearching) {
                send({ type: "search_complete" });
                isSearching = false;
              }
            }

            // Collect sources from web_search_tool_result blocks
            const rawEvent = event as unknown as { content_block?: { type: string; content?: Array<{ type: string; url?: string; title?: string }> } };
            if (rawEvent.content_block?.type === "web_search_tool_result" && rawEvent.content_block.content) {
              for (const result of rawEvent.content_block.content) {
                if (result.type === "web_search_result" && result.url) {
                  try {
                    const domain = new URL(result.url).hostname.replace("www.", "");
                    sources.push({
                      title: result.title || domain,
                      url: result.url,
                      domain,
                    });
                  } catch {}
                }
              }
            }
          }

          // Send sources at the end
          if (sources.length > 0) {
            send({ type: "sources", sources: sources.slice(0, 5) });
          }
          send({ type: "done" });
          controller.close();
        } catch (err) {
          console.error("Chat stream error:", err);
          send({ type: "error", message: "Something went wrong. Please try again." });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
