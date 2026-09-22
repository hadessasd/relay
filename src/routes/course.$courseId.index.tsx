import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Download } from "lucide-react";
import { Art, courseArt } from "@/components/art";
import { getCourse } from "@/data/courses";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/course/$courseId/")({
  component: CourseHome,
});

function CourseHome() {
  const { courseId } = Route.useParams();
  const course = getCourse(courseId);
  const name = useStudent((s) => s.currentName);
  const students = useStudent((s) => s.students);
  const results = name ? (students[name]?.results ?? []).filter((r) => r.courseId === courseId) : [];
  const done = new Set(results.map((r) => r.topicId));

  if (!course) return null;

  const firstOpen = course.topics.find((t) => !done.has(t.id)) ?? course.topics[0];
  const art = courseArt(course.id);
  const firstModule = course.examModules[0];

  return (
    <article>
      <div className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
        <div className="relative h-40 sm:h-48">
          <Art src={art} alt="" />
          <div className="art-veil absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="kicker text-primary-fg/80">{course.weeks}</p>
            <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary-fg sm:text-4xl">{course.title}</h1>
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="text-muted">{course.subtitle}</p>
          <p className="mt-1 text-sm font-medium text-fg">{course.examLabel}</p>
          <ul className="mt-3 flex flex-col gap-1 text-sm text-fg/85">
            {course.clos.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          {firstOpen ? (
            <Link
              to="/course/$courseId/lesson/$topicId"
              params={{ courseId: course.id, topicId: firstOpen.id }}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-fg"
            >
              {done.size ? "Continue" : "Start"} · {firstOpen.title}
              <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>

      {course.pack ? (
        <a
          href={course.pack.href}
          download={course.pack.filename}
          className="mt-6 flex items-start gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-[var(--shadow-border)]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent">
            <Download className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block font-medium text-fg">{course.pack.title}</span>
            <span className="mt-0.5 block text-sm text-muted">{course.pack.note}</span>
          </span>
        </a>
      ) : null}

      <ol className="mt-8 flex flex-col gap-2">
        {course.topics.map((topic) => {
          const result = results.find((r) => r.topicId === topic.id);
          return (
            <li key={topic.id}>
              <Link
                to="/course/$courseId/lesson/$topicId"
                params={{ courseId: course.id, topicId: topic.id }}
                className="flex items-start gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-[var(--shadow-border)]"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-serif text-sm text-primary">
                  {done.has(topic.id) ? <Check className="size-4 text-ok" /> : topic.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-fg">{topic.title}</span>
                    <span className="kicker text-accent">{topic.clo}</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{topic.summary}</span>
                  {result ? (
                    <span className="mt-1 block text-xs tabular-nums text-ok">
                      {result.mcqTotal > 0
                        ? `Last score ${result.mcqScore}/${result.mcqTotal} MCQ`
                        : `Writing submitted · ${result.writingCount} FRQ`}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-10">
        <p className="kicker text-accent">Timed exam modules</p>
        <h2 className="mt-1 font-serif text-2xl text-primary">Check at the end. The clock is running.</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {course.examModules.map((mod) => {
            const result = results.find((r) => r.topicId === mod.id);
            return (
              <li key={mod.id}>
                <Link
                  to="/course/$courseId/module/$moduleId"
                  params={{ courseId: course.id, moduleId: mod.id }}
                  className="flex h-full flex-col rounded-2xl bg-primary px-4 py-4 text-primary-fg"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-serif text-lg">{mod.number}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-primary-fg/75">
                      <Clock className="size-3.5" />
                      {mod.minutes} min
                    </span>
                  </span>
                  <span className="mt-2 font-medium">{mod.title}</span>
                  <span className="mt-1 text-sm text-primary-fg/75">
                    {mod.mcqs.length
                      ? `${mod.mcqs.length} auto-grade · ${mod.writing.length} writing${mod.calculator ? " · calculator" : ""}`
                      : `${mod.writing.length} FRQ · writing only`}
                  </span>
                  {result ? (
                    <span className="mt-3 text-xs tabular-nums text-primary-fg/80">
                      {result.mcqTotal > 0
                        ? `Last ${result.mcqScore}/${result.mcqTotal}`
                        : `Last ${result.writingCount} FRQ`}
                    </span>
                  ) : (
                    <span className="mt-3 text-xs text-primary-fg/70">Answers after submit</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {firstModule ? (
          <Link
            to="/course/$courseId/module/$moduleId"
            params={{ courseId: course.id, moduleId: firstModule.id }}
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
          >
            Start {firstModule.number}
            <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>

      <ul className="mt-8 flex flex-col gap-2">
        <li>
          <Link
            to="/course/$courseId/exam"
            params={{ courseId: course.id }}
            className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-[var(--shadow-border)]"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent/12 font-serif text-sm text-accent">
              EX
            </span>
            <span>
              <span className="block font-medium text-fg">
                {course.id === "foundations-ai"
                  ? "Full FRQ paper"
                  : course.id === "bus-1023"
                    ? "Mixed CLO 1 & CLO 2 paper"
                    : "Full mixed paper"}
              </span>
              <span className="block text-sm text-muted">
                {course.id === "foundations-ai"
                  ? "Writing only · model answers after submit"
                  : "Untimed extra practice · answers after submit"}
              </span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/course/$courseId/summary"
            params={{ courseId: course.id }}
            className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-[var(--shadow-border)]"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent/12 font-serif text-sm text-accent">
              Σ
            </span>
            <span>
              <span className="block font-medium text-fg">{course.summarySheet.title}</span>
              <span className="block text-sm text-muted">Night-before recap</span>
            </span>
          </Link>
        </li>
      </ul>
    </article>
  );
}
