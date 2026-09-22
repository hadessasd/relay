import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ContentBlocks } from "@/components/content-blocks";
import { QuizPanel } from "@/components/quiz-panel";
import { getTopic } from "@/data/courses";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/course/$courseId/lesson/$topicId")({
  component: LessonPage,
});

function LessonPage() {
  const { courseId, topicId } = Route.useParams();
  const found = getTopic(courseId, topicId);
  const name = useStudent((s) => s.currentName);
  const students = useStudent((s) => s.students);
  const existing = name
    ? students[name]?.results.find((r) => r.courseId === courseId && r.topicId === topicId)
    : undefined;

  if (!found) {
    return <p className="text-muted">This topic is not in the guide.</p>;
  }

  const { course, topic, prev, next } = found;

  return (
    <article>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
        {topic.week} · {topic.clo} · {topic.kicker}
      </p>
      <h1 className="mt-2 font-serif text-3xl tracking-tight text-primary sm:text-4xl lg:text-5xl">
        <span className="mr-2 text-subtle">{topic.number} </span>
        {topic.title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{topic.summary}</p>

      <div className="mt-8">
        <ContentBlocks blocks={topic.blocks} />
      </div>

      <QuizPanel
        key={`${course.id}:${topic.id}`}
        courseId={course.id}
        topicId={topic.id}
        mcqs={topic.mcqs}
        writing={topic.writing}
        existing={existing}
      />

      <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        {prev ? (
          <Link
            to="/course/$courseId/lesson/$topicId"
            params={{ courseId: course.id, topicId: prev.id }}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/course/$courseId/lesson/$topicId"
            params={{ courseId: course.id, topicId: next.id }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
          >
            {next.title}
            <ArrowRight className="size-4" />
          </Link>
        ) : course.examModules[0] ? (
          <Link
            to="/course/$courseId/module/$moduleId"
            params={{ courseId: course.id, moduleId: course.examModules[0].id }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
          >
            Timed exam modules
            <ArrowRight className="size-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
