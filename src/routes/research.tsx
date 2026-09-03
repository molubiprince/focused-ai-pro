import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Field, Select, Textarea, ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Ask a work question and get a structured research brief with insights, trade-offs and next steps.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Decision-ready research briefs for any work topic.",
      },
    ],
  }),
  component: ResearchTool,
});

function ResearchTool() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("Quick overview");

  return (
    <AppShell title="AI Research Assistant" subtitle="Structured insights and summaries">
      <ToolWorkspace
        tool="research"
        heading="Research request"
        submitLabel="Research this"
        outputLabel="Research brief"
        emptyText="An overview, key insights and next steps will appear here."
        loadingText="Building your research brief…"
        buildFields={() =>
          topic.trim().length < 5 ? "Add a question or topic to research." : { topic, depth }
        }
      >
        <Field
          label="What do you want to research?"
          hint="Add context like industry, region or timeframe for sharper insights."
        >
          <Textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="How are mid-size B2B SaaS teams pricing AI features in 2026?"
          />
        </Field>
        <Field label="Depth">
          <Select value={depth} onChange={(e) => setDepth(e.target.value)}>
            <option>Quick overview</option>
            <option>Detailed brief</option>
          </Select>
        </Field>
      </ToolWorkspace>
    </AppShell>
  );
}
