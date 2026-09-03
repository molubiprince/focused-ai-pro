import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  CalendarCheck,
  LayoutDashboard,
  Mail,
  Menu,
  NotebookPen,
  Search,
  Sparkle,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export const NAV_TOOLS = [
  {
    to: "/email",
    label: "Email Generator",
    icon: Mail,
    desc: "Turn a few notes into a polished email, matched to tone and audience.",
  },
  {
    to: "/meeting-notes",
    label: "Meeting Notes",
    icon: NotebookPen,
    desc: "Paste raw notes or a transcript and get key points, decisions and deadlines.",
  },
  {
    to: "/task-planner",
    label: "Task Planner",
    icon: CalendarCheck,
    desc: "List what's on your plate and get it prioritised and time-blocked.",
  },
  {
    to: "/research",
    label: "Research Assistant",
    icon: Search,
    desc: "Ask a question and get a structured brief with insights and next steps.",
  },
  {
    to: "/chat",
    label: "AI Chatbot",
    icon: Bot,
    desc: "A general assistant on hand for quick questions and drafting help.",
  },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navLink = (to: string, label: string, Icon: typeof Mail) => {
    const active = pathname === to;
    return (
      <Link
        key={to}
        to={to}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-sidebar-border"
            : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        }`}
      >
        <Icon className="size-4 shrink-0" />
        <span className="truncate">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      {open && (
        <button
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col overflow-y-auto bg-sidebar p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2.5 px-2 pt-1 pb-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
            <Sparkle className="size-4.5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-sidebar-accent-foreground">
              Workplace AI
            </p>
            <p className="text-xs text-sidebar-foreground/70">Productivity Assistant</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="ml-auto text-sidebar-foreground lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navLink("/", "Dashboard", LayoutDashboard)}
          <p className="mt-5 mb-1 px-3 text-[11px] font-semibold tracking-wide text-sidebar-foreground/50 uppercase">
            Tools
          </p>
          {NAV_TOOLS.map((t) => navLink(t.to, t.label, t.icon))}
        </nav>

        <div className="mt-auto space-y-3 pt-6">
          <div className="flex items-center gap-2.5 rounded-xl bg-sidebar-accent/60 p-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              JL
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-sidebar-accent-foreground">Jordan Lee</p>
              <p className="text-xs text-sidebar-foreground/70">Product Manager</p>
            </div>
          </div>
          <p className="rounded-xl bg-sidebar-accent/40 p-3 text-xs leading-relaxed text-sidebar-foreground/80">
            <span className="font-semibold text-sidebar-accent-foreground">Note:</span>{" "}
            AI-generated content may require human review before use.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card px-5 py-4 lg:px-8">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          >
            <Menu className="size-4.5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold">{title}</h1>
            <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <span className="ml-auto hidden items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-semibold text-success sm:flex">
            <span className="size-1.5 rounded-full bg-success" />
            AI connected
          </span>
        </header>

        <main className="mx-auto w-full max-w-[1400px] flex-1 px-5 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
