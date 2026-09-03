import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Field, Select, Textarea, ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate professional emails matched to your audience and tone from a few short notes.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "AI-drafted business emails tuned to audience and tone.",
      },
    ],
  }),
  component: EmailTool,
});

const AUDIENCES = [
  "Client",
  "Manager",
  "Colleague",
  "Executive / leadership",
  "Team (group)",
  "Vendor / partner",
];
const TONES = [
  "Professional and warm",
  "Formal",
  "Friendly and casual",
  "Direct and concise",
  "Persuasive",
  "Apologetic",
];

function EmailTool() {
  const [brief, setBrief] = useState("");
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [points, setPoints] = useState("");

  return (
    <AppShell title="Smart Email Generator" subtitle="Tone and audience aware email drafting">
      <ToolWorkspace
        tool="email"
        heading="Email brief"
        submitLabel="Generate email"
        outputLabel="Generated email"
        emptyText="Fill in the brief and your drafted email will appear here."
        loadingText="Drafting your email…"
        buildFields={() =>
          brief.trim().length < 5
            ? "Add a short description so the assistant knows what to write about."
            : { brief, audience, tone, points }
        }
      >
        <Field
          label="What's the email about?"
          hint="A sentence or two is enough — include the outcome you want."
        >
          <Textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Follow up with the client about the delayed launch and propose a new date…"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Audience">
            <Select value={audience} onChange={(e) => setAudience(e.target.value)}>
              {AUDIENCES.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </Select>
          </Field>
          <Field label="Tone">
            <Select value={tone} onChange={(e) => setTone(e.target.value)}>
              {TONES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Key points to include (optional)">
          <Textarea
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="New launch date: 14 October&#10;Offer a 10% goodwill discount"
          />
        </Field>
      </ToolWorkspace>
    </AppShell>
  );
}
