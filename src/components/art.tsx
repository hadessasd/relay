import { cn } from "@/lib/cn";

export const ART = {
  hall: "/illustrations/hall.jpg",
  mgt: "/illustrations/mgt.jpg",
  ai: "/illustrations/ai.jpg",
  math: "/illustrations/math.jpg",
  quiz: "/illustrations/quiz.jpg",
  staff: "/illustrations/staff.jpg",
  crest: "/illustrations/crest.jpg",
  market: "/illustrations/market.jpg",
  profit: "/illustrations/profit.jpg",
  exam: "/illustrations/exam.jpg",
  campus: "/illustrations/campus.jpg",
  hero: "/illustrations/hero.jpg",
  polc: "/illustrations/polc.jpg",
  org: "/illustrations/org.jpg",
  control: "/illustrations/control.jpg",
  intern: "/illustrations/intern.jpg",
  compare: "/illustrations/compare.jpg",
  structure: "/illustrations/structure.jpg",
  functions: "/illustrations/functions.jpg",
  rooms: "/illustrations/rooms.jpg",
  peak: "/illustrations/peak.jpg",
} as const;

export function courseArt(courseId: string): string {
  if (courseId === "mgt-1003") return ART.mgt;
  if (courseId === "foundations-ai") return ART.ai;
  if (courseId === "bus-1023") return ART.math;
  return ART.hall;
}

export function Art({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      draggable={false}
    />
  );
}
