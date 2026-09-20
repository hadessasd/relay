import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { QuizPanel } from "@/components/quiz-panel";
import { getExamModule } from "@/data/courses";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/course/$courseId/module/$moduleId")({
  component: ExamModulePage,
});

function ExamModulePage() {
  const { courseId, moduleId } = Route.useParams();
  const found = getExamModule(courseId, moduleId);
  const name = useStudent((s) => s.currentName);
  const students = useStudent((s) => s.students);
  const existing = name
    ? students[name]?.results.find((r) => r.courseId === courseId && r.topicId === moduleId)
    : undefined;

  if (!found) {
    return <p className="text-muted">That exam module is not in this course.</p>;
  }

  const { course, mod, prev, next } = found;

  return (
    <article>
      <p className="kicker text-accent">
        {course.examLabel} · {mod.minutes} minutes
      </p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary">{mod.title}</h1>
      <p className="mt-3 flex items-start gap-2 max-w-2xl text-muted">
        <Clock className="mt-0.5 size-4 shrink-0" />
        {mod.intro}
      </p>

      <QuizPanel
        courseId={course.id}
        topicId={mod.id}
        mcqs={mod.mcqs}
        writing={mod.writing}
        existing={existing}
        timedMinutes={mod.minutes}
        examMode
        heading={mod.title}
      />

      <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        {prev ? (
          <Link
            to="/course/$courseId/module/$moduleId"
            params={{ courseId: course.id, moduleId: prev.id }}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            {prev.title}
          </Link>
        ) : (
          <Link
            to="/course/$courseId"
            params={{ courseId: course.id }}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            Course home
          </Link>
        )}
        {next ? (
          <Link
            to="/course/$courseId/module/$moduleId"
            params={{ courseId: course.id, moduleId: next.id }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
          >
            {next.title}
            <ArrowRight className="size-4" />
          </Link>
        ) : (
          <Link
            to="/course/$courseId/summary"
            params={{ courseId: course.id }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
          >
            Memory sheet
            <ArrowRight className="size-4" />
          </Link>
        )}
      </nav>
    </article>
  );
}
