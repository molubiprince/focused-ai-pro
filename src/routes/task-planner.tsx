import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Field, Select, Textarea, ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Prioritise and time-block your task list with AI, scheduled around the hours you actually have.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content: "Prioritised, time-blocked plans built from your task list.",
      },
    ],
  }),
  component: PlannerTool,
});

function PlannerTool() {
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState("Today");
  const [hours, setHours] = useState("6");

  return (
    <AppShell title="AI Task Planner" subtitle="Prioritisation and scheduling for your day">
      <ToolWorkspace
        tool="planner"
        heading="Your workload"
        submitLabel="Plan my tasks"
        outputLabel="Prioritized plan"
        emptyText="Your prioritized, scheduled task list will show up here."
        loadingText="Prioritising and scheduling…"
        buildFields={() =>
          tasks.trim().length < 5
            ? "List at least one task so the assistant has something to plan."
            : { tasks, horizon, hours }
        }
      >
        <Field label="What's on your list?" hint="One task per line, with any deadlines you know.">
          <Textarea
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder="Finish Q4 roadmap deck (due Thursday)&#10;Review 3 pull requests&#10;Call supplier about invoice"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Plan for">
            <Select value={horizon} onChange={(e) => setHorizon(e.target.value)}>
              <option>Today</option>
              <option>This week</option>
            </Select>
          </Field>
          <Field label="Available hours">
            <Select value={hours} onChange={(e) => setHours(e.target.value)}>
              {["2", "4", "6", "8"].map((h) => (
                <option key={h} value={h}>
                  {h} hours
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </ToolWorkspace>
    </AppShell>
  );
}
