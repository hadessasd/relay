import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { Course } from "@/data/types";
import { cn } from "@/lib/cn";
import type { QuizResult } from "@/lib/student-store";

export function CourseNav({
  course,
  results,
  active,
}: {
  course: Course;
  results: QuizResult[];
  active?: string;
}) {
  const done = new Set(results.map((r) => r.topicId));
  const items = [
    ...course.topics.map((t) => ({
      to: "/course/$courseId/lesson/$topicId" as const,
      params: { courseId: course.id, topicId: t.id },
      label: t.title,
      kicker: t.number,
      key: t.id,
    })),
    ...course.examModules.map((m) => ({
      to: "/course/$courseId/module/$moduleId" as const,
      params: { courseId: course.id, moduleId: m.id },
      label: m.title,
      kicker: m.number,
      key: m.id,
    })),
    {
      to: "/course/$courseId/exam" as const,
      params: { courseId: course.id },
      label:
        course.id === "foundations-ai"
          ? "Full FRQ paper"
          : course.id === "bus-1023"
            ? "Mixed paper"
            : "Full mixed paper",
      kicker: "EX",
      key: "exam",
    },
    {
      to: "/course/$courseId/summary" as const,
      params: { courseId: course.id },
      label: "Memory sheet",
      kicker: "Σ",
      key: "summary",
    },
  ];

  return (
    <nav className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-x-hidden">
      {items.map((item) => {
        const isActive = active === item.key;
        const isDone = done.has(item.key);
        return (
          <Link
            key={item.key}
            to={item.to}
            params={item.params}
            className={cn(
              "flex min-h-11 min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
              "max-lg:min-w-max",
              "lg:w-full lg:rounded-lg",
              isActive
                ? "bg-primary text-primary-fg"
                : "bg-surface text-fg shadow-[var(--shadow-border)] hover:bg-surface-2 lg:bg-transparent lg:shadow-none",
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-md font-serif text-[11px]",
                isActive ? "bg-primary-fg/15" : "bg-surface-2 text-muted",
                isActive && "lg:bg-primary-fg/15",
              )}
            >
              {isDone && !isActive ? <Check className="size-3.5 text-ok" /> : item.kicker}
            </span>
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
