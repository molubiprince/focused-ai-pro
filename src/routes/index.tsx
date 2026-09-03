import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { AppShell, NAV_TOOLS } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant | Automate daily work" },
      {
        name: "description",
        content:
          "Draft emails, summarise meetings, plan tasks and research topics with AI-powered tools built for busy professionals.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Five AI tools for emails, meeting notes, task planning, research and chat.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell title="Dashboard" subtitle="A quick look at what you can automate today">
      <section className="animate-rise overflow-hidden rounded-2xl bg-sidebar p-7 lg:p-9">
        <h2 className="max-w-xl text-2xl leading-snug font-semibold text-sidebar-accent-foreground lg:text-3xl">
          Less admin. More of the work that actually matters.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-sidebar-foreground/80">
          Draft emails, summarise meetings, plan your day and research topics in seconds — all in
          one professional AI workspace.
        </p>
        <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-5">
          {[
            ["5", "AI tools included"],
            ["<30s", "average output time"],
            ["1", "place for daily tasks"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-display text-xl font-semibold text-sidebar-accent-foreground">
                {value}
              </dt>
              <dd className="text-xs text-sidebar-foreground/70">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <h2 className="mt-8 mb-3 text-sm font-semibold text-muted-foreground">Your tools</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {NAV_TOOLS.map(({ to, label, desc, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex animate-rise flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lift"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Icon className="size-5" />
            </span>
            <h3 className="text-base font-semibold">{label}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
              Open tool
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        AI-generated content may require human review.
      </p>
    </AppShell>
  );
}
