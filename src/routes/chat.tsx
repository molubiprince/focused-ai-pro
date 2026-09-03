import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Info, Loader2, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Markdown } from "@/components/Markdown";
import { runAssistant } from "@/lib/ai.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Chat with a workplace AI assistant for quick answers, drafting help and second opinions.",
      },
      { property: "og:title", content: "AI Workplace Chatbot" },
      {
        property: "og:description",
        content: "A general-purpose work assistant for quick questions and drafting.",
      },
    ],
  }),
  component: ChatTool,
});

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi Jordan, I'm your workplace assistant. Ask me anything — draft help, quick questions, or a second opinion on something you're working on.",
};

const SUGGESTIONS = [
  "Rewrite this update so it's clearer for execs",
  "Give me an agenda for a 30-minute project kickoff",
  "How do I say no to a request politely?",
];

function ChatTool() {
  const call = useServerFn(runAssistant);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [pending]);

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || pending) return;
    const history = messages.filter((m) => m !== GREETING);
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setError(null);
    setPending(true);
    try {
      const res = await call({
        data: { tool: "chat", fields: { message }, history },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.text }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <AppShell title="AI Chatbot" subtitle="Your general-purpose workplace assistant">
      <div className="mx-auto flex h-[calc(100vh-13rem)] min-h-[26rem] w-full max-w-3xl flex-col rounded-2xl border border-border bg-card p-4 shadow-card lg:p-6">
        <div ref={logRef} className="flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                  m.role === "user"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {m.role === "user" ? "JL" : "AI"}
              </span>
              {m.role === "user" ? (
                <p className="max-w-[80%] rounded-xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-primary-foreground">
                  {m.content}
                </p>
              ) : (
                <Markdown
                  content={m.content}
                  className="max-w-[85%] rounded-xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground"
                />
              )}
            </div>
          ))}

          {pending && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                AI
              </span>
              <Loader2 className="size-4 animate-spin text-primary" /> Thinking…
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {messages.length === 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex items-end gap-2 border-t border-border pt-3"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Ask anything about your work…"
            className="max-h-32 min-h-11 w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary-soft"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            aria-label="Send message"
            className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary-hover disabled:opacity-50"
          >
            <SendHorizontal className="size-4" />
          </button>
        </form>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="size-3.5" /> AI-generated content may require human review.
        </p>
      </div>
    </AppShell>
  );
}
