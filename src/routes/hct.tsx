import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Art, ART, courseArt } from "@/components/art";
import { CampusLogin } from "@/components/campus-login";
import { courses } from "@/data/courses";
import { getUniversity } from "@/data/universities";
import { overallPct, summarizeCourse } from "@/lib/progress-stats";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/hct")({ component: HctCampus });

function HctCampus() {
  const uni = getUniversity("hct")!;
  const name = useStudent((s) => s.currentName);
  const campus = useStudent((s) => s.campus);
  const isStaff = useStudent((s) => s.isStaff);
  const students = useStudent((s) => s.students);
  const hydrated = useStudent((s) => s.hydrated);
  const unlocked = Boolean(isStaff || (name && campus?.uniId === "hct"));

  if (!hydrated) return <div className="paper-wash min-h-dvh" />;
  if (!unlocked) return <CampusLogin uni={uni} />;

  const results = name ? (students[name]?.results ?? []) : [];
  const first = (name ?? "student").split(/\s+/)[0];
  const overall = overallPct(results);

  return (
    <div className="paper-wash min-h-dvh">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-lift)]">
          <div className="relative min-h-52 sm:h-64">
            <Art src={ART.campus} alt="" className="absolute inset-0" />
            <div className="art-veil absolute inset-0" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
              <p className="kicker text-primary-fg/75">HCT · Week 5 exam · CLO 1 & CLO 2</p>
              <h1 className="mt-1 font-serif text-4xl tracking-tight text-primary-fg sm:text-5xl">
                Hello, {first}.
              </h1>
              <p className="mt-2 max-w-lg text-sm text-primary-fg/80">
                Read the explanation, then practise. Four full example tests wait at the end of Applied Mathematics — Management and AI keep their timed modules.
              </p>
              <p className="mt-4 text-xs text-primary-fg/70 tabular-nums">{overall}% of the studio complete</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {courses.map((course) => {
            const progress = summarizeCourse(course.id, results);
            const art = courseArt(course.id);
            return (
              <Link
                key={course.id}
                to="/course/$courseId"
                params={{ courseId: course.id }}
                className="group overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]"
              >
                <div className="relative h-40">
                  <Art src={art} alt="" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="kicker text-muted">{course.code}</p>
                  <h2 className="mt-1 font-serif text-2xl tracking-tight text-primary">{course.title}</h2>
                  <p className="mt-1 text-sm text-muted">{course.subtitle}</p>
                  <div className="mt-6">
                    <div className="mb-1.5 flex justify-between text-xs text-muted">
                      <span>
                        {progress.done}/{progress.total} practised
                      </span>
                      <span className="tabular-nums">{progress.pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${progress.pct}%` }} />
                    </div>
                  </div>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open course
                    <ArrowRight className="size-4" />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
