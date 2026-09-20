import { courses } from "@/data/courses";
import type { QuizResult } from "@/lib/student-store";

export type CourseProgress = {
  courseId: string;
  title: string;
  code: string;
  done: number;
  total: number;
  pct: number;
  examDone: boolean;
  mcqScore: number;
  mcqTotal: number;
};

export function summarizeCourse(courseId: string, results: QuizResult[]): CourseProgress {
  const course = courses.find((c) => c.id === courseId);
  const title = course?.shortName ?? courseId;
  const code = course?.code ?? courseId;
  const topicIds = new Set(course?.topics.map((t) => t.id) ?? []);
  const moduleIds = new Set(course?.examModules.map((m) => m.id) ?? []);
  const mine = results.filter((r) => r.courseId === courseId);
  const topicDone = mine.filter((r) => topicIds.has(r.topicId)).length;
  const examDone = mine.filter((r) => moduleIds.has(r.topicId) || r.topicId === "exam").length;
  const total = (course?.topics.length ?? 0) + (course?.examModules.length ?? 0);
  const done = topicDone + Math.min(examDone, course?.examModules.length ?? 0);
  const mcqScore = mine.reduce((sum, r) => sum + r.mcqScore, 0);
  const mcqTotal = mine.reduce((sum, r) => sum + r.mcqTotal, 0);
  return {
    courseId,
    title,
    code,
    done,
    total: total || 1,
    pct: total ? Math.round((done / total) * 100) : 0,
    examDone: examDone > 0,
    mcqScore,
    mcqTotal,
  };
}

export function overallPct(results: QuizResult[]) {
  const parts = courses.map((c) => summarizeCourse(c.id, results));
  const done = parts.reduce((sum, p) => sum + p.done, 0);
  const total = parts.reduce((sum, p) => sum + p.total, 0);
  return total ? Math.round((done / total) * 100) : 0;
}
