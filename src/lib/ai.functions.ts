import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  tool: z.enum(["email", "notes", "planner", "research", "chat"]),
  fields: z.record(z.string()).default({}),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .default([]),
});

type Input = z.infer<typeof inputSchema>;

const BASE_STYLE = `You are an AI Workplace Productivity Assistant for busy professionals.
Write in clear, professional business English. Be concise and specific.
Format output in simple markdown: short headings (###), bullet lists, and bold labels.
Never invent facts, names, dates or figures that were not provided; if something is
missing, mark it as [confirm]. Do not add meta commentary about being an AI.`;

function buildPrompt(input: Input): { system: string; user: string } {
  const f = input.fields;
  switch (input.tool) {
    case "email":
      return {
        system: `${BASE_STYLE}
ROLE: Expert business communication writer.
TASK: Draft one email.
STRUCTURE:
### Subject
one compelling subject line
### Email
greeting, 1-3 tight paragraphs, clear ask or next step, professional sign-off
### Why this works
2 short bullets on tone/audience choices
CONSTRAINTS: Match the requested tone and audience register exactly. Max 200 words in the email body.`,
        user: `Purpose of the email: ${f.brief ?? ""}
Audience: ${f.audience ?? "Colleague"}
Tone: ${f.tone ?? "Professional and warm"}
Key points that must appear: ${f.points?.trim() || "(none supplied)"}`,
      };
    case "notes":
      return {
        system: `${BASE_STYLE}
ROLE: Executive meeting analyst.
TASK: Summarize raw meeting notes or a transcript.
STRUCTURE exactly these sections:
### Summary (2-3 sentences)
### Key points (bullets)
### Decisions made (bullets)
### Action items (bullet per item: **Owner** — task — due date or [confirm])
### Deadlines & risks (bullets; omit section if none)
CONSTRAINTS: Only use information present in the notes.`,
        user: `Raw notes / transcript:\n${f.notes ?? ""}`,
      };
    case "planner":
      return {
        system: `${BASE_STYLE}
ROLE: Productivity coach applying impact/effort and urgency reasoning.
TASK: Prioritize and schedule the user's tasks.
STRUCTURE:
### Priority order
numbered list: task — **P1/P2/P3** — est. time — one-line reason
### Suggested schedule
time-blocked list that fits the available hours (deep work first)
### Deprioritize or delegate
bullets
### Focus tip
one sentence
CONSTRAINTS: Total scheduled time must not exceed available hours.`,
        user: `Tasks:\n${f.tasks ?? ""}
Planning horizon: ${f.horizon ?? "Today"}
Available working hours: ${f.hours ?? "6"}`,
      };
    case "research":
      return {
        system: `${BASE_STYLE}
ROLE: Research analyst producing a decision-ready brief.
STRUCTURE:
### Overview
### Key insights (4-6 bullets, each with the "so what")
### Considerations & trade-offs
### Recommended next steps (numbered)
### Where to verify
bullets naming types of authoritative sources (no fabricated URLs or statistics)
CONSTRAINTS: Depth "Quick overview" = under 250 words; "Detailed brief" = 400-600 words.`,
        user: `Research topic or question: ${f.topic ?? ""}
Depth: ${f.depth ?? "Quick overview"}`,
      };
    case "chat":
      return {
        system: `${BASE_STYLE}
ROLE: Helpful workplace assistant in a chat conversation.
Answer directly first, then add brief structure (bullets or steps) when useful.
Keep replies under 200 words unless the user asks for more. Ask one clarifying
question only when the request is genuinely ambiguous.`,
        user: f.message ?? "",
      };
  }
}

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) {
      throw new Error("AI is not configured. Missing LOVABLE_API_KEY.");
    }

    const { system, user } = buildPrompt(data);
    const messages = [
      { role: "system", content: system },
      ...data.history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: user },
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({ model: "google/gemini-3.7-flash", messages }),
    });

    if (!res.ok) {
      const body = await res.text();
      let message = body;
      try {
        message = JSON.parse(body)?.error?.message ?? JSON.parse(body)?.message ?? body;
      } catch {
        /* keep raw body */
      }
      if (res.status === 429) {
        throw new Error("Rate limit reached. Please wait a moment and try again.");
      }
      if (res.status === 402) {
        throw new Error(message || "AI credits exhausted. Please top up to continue.");
      }
      throw new Error(message || `AI request failed (${res.status}).`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("The assistant returned an empty response. Try again.");
    return { text };
  });
