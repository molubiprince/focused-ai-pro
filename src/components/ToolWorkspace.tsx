import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, Check, Copy, Info, Loader2, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Markdown } from "@/components/Markdown";
import { runAssistant } from "@/lib/ai.functions";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary-soft";

export function Textarea(props: React.ComponentProps<"textarea">) {
  return <textarea {...props} className={`${inputClass} min-h-28 resize-y leading-relaxed`} />;
}

export function Select(props: React.ComponentProps<"select">) {
  return <select {...props} className={`${inputClass} appearance-none pr-8`} />;
}

export function Disclaimer() {
  return (
    <p className="mt-4 flex items-start gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
      <Info className="mt-0.5 size-3.5 shrink-0" />
      AI-generated content may require human review.
    </p>
  );
}

export function useAssistant(tool: "email" | "notes" | "planner" | "research" | "chat") {
  const call = useServerFn(runAssistant);
  return useMutation({
    mutationFn: (fields: Record<string, string>) => call({ data: { tool, fields, history: [] } }),
  });
}

type Tool = "email" | "notes" | "planner" | "research";

export function ToolWorkspace({
  tool,
  heading,
  submitLabel,
  outputLabel,
  emptyText,
  loadingText,
  buildFields,
  children,
}: {
  tool: Tool;
  heading: string;
  submitLabel: string;
  outputLabel: string;
  emptyText: string;
  loadingText: string;
  buildFields: () => Record<string, string> | string;
  children: ReactNode;
}) {
  const mutation = useAssistant(tool);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const output = mutation.data?.text;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = buildFields();
    if (typeof result === "string") {
      setValidationError(result);
      return;
    }
    setValidationError(null);
    mutation.mutate(result);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid animate-rise items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form
        onSubmit={submit}
        className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-card lg:p-6"
      >
        <h2 className="mb-4 text-base font-semibold">{heading}</h2>
        <div className="space-y-4">{children}</div>

        {validationError && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="size-3.5" /> {validationError}
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:opacity-60"
        >
          {mutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {mutation.isPending ? "Working…" : submitLabel}
        </button>
      </form>

      <section className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-24 lg:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">{outputLabel}</h2>
          {output && (
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        <div className="min-h-56 rounded-xl border border-dashed border-border bg-muted/40 p-4">
          {mutation.isPending ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-sm text-muted-foreground">
              <Loader2 className="size-6 animate-spin text-primary" />
              {loadingText}
            </div>
          ) : mutation.isError ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center text-sm text-destructive">
              <AlertCircle className="size-5" />
              {(mutation.error as Error).message}
            </div>
          ) : output ? (
            <Markdown content={output} className="text-sm text-foreground" />
          ) : (
            <div className="flex flex-col items-center gap-2 py-16 text-center text-sm text-muted-foreground">
              <Sparkles className="size-5 opacity-60" />
              <span className="max-w-56">{emptyText}</span>
            </div>
          )}
        </div>
        <Disclaimer />
      </section>
    </div>
  );
}
