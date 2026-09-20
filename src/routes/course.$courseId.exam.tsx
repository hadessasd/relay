import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { QuizPanel } from "@/components/quiz-panel";
import { getCourse } from "@/data/courses";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/course/$courseId/exam")({
  component: ExamPage,
});

function ExamPage() {
  const { courseId } = Route.useParams();
  const course = getCourse(courseId);
  const name = useStudent((s) => s.currentName);
  const students = useStudent((s) => s.students);
  const existing = name
    ? students[name]?.results.find((r) => r.courseId === courseId && r.topicId === "exam")
    : undefined;

  if (!course) return null;

  return (
    <article>
      <p className="kicker text-accent">{course.examLabel}</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary">Final test</h1>
      <p className="mt-3 max-w-2xl text-muted">{course.finalExam.intro}</p>

      <QuizPanel
        courseId={course.id}
        topicId="exam"
        mcqs={course.finalExam.mcqs}
        writing={course.finalExam.writing}
        existing={existing}
      />

      <div className="mt-10 border-t border-border pt-6">
        <Link
          to="/course/$courseId/summary"
          params={{ courseId: course.id }}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
        >
          Open the memory sheet
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
