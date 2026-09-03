import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Field, Textarea, ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn raw meeting notes or transcripts into key points, decisions, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content: "Key points, decisions, owners and deadlines from any meeting transcript.",
      },
    ],
  }),
  component: NotesTool,
});

function NotesTool() {
  const [notes, setNotes] = useState("");

  return (
    <AppShell
      title="Meeting Notes Summarizer"
      subtitle="Key points, decisions, actions and deadlines"
    >
      <ToolWorkspace
        tool="notes"
        heading="Meeting input"
        submitLabel="Summarize notes"
        outputLabel="Summary"
        emptyText="Key points, decisions, action items and deadlines will show up here."
        loadingText="Summarizing your meeting…"
        buildFields={() =>
          notes.trim().length < 20
            ? "Paste in some notes first so there's something to summarize."
            : { notes }
        }
      >
        <Field
          label="Paste your raw notes or transcript"
          hint="Messy bullet points and transcripts both work."
        >
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Sam: we agreed to push the pilot to Q4…"
            className="min-h-64 w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm leading-relaxed outline-none transition focus:border-primary focus:ring-3 focus:ring-primary-soft"
          />
        </Field>
      </ToolWorkspace>
    </AppShell>
  );
}
