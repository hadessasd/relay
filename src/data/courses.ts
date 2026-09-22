import { bus1023 } from "./bus-1023";
import { aiExamModules, mgtExamModules } from "./exam-modules";
import { foundationsAi } from "./foundations-ai";
import { mgt1003 } from "./mgt1003";
import type { Course } from "./types";

export const courses: Course[] = [
  { ...mgt1003, examModules: mgtExamModules },
  { ...foundationsAi, examModules: aiExamModules },
  bus1023,
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getTopic(courseId: string, topicId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  const topic = course.topics.find((t) => t.id === topicId);
  if (!topic) return undefined;
  const index = course.topics.findIndex((t) => t.id === topicId);
  return {
    course,
    topic,
    index,
    prev: course.topics[index - 1],
    next: course.topics[index + 1],
  };
}

export function getExamModule(courseId: string, moduleId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  const mod = course.examModules.find((m) => m.id === moduleId);
  if (!mod) return undefined;
  const index = course.examModules.findIndex((m) => m.id === moduleId);
  return { course, mod, index, prev: course.examModules[index - 1], next: course.examModules[index + 1] };
}
