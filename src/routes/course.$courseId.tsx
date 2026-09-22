import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppHeader } from "@/components/app-header";
import { CampusGate } from "@/components/campus-login";
import { CourseNav } from "@/components/course-nav";
import { getCourse } from "@/data/courses";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/course/$courseId")({
  component: CourseLayout,
});

function CourseLayout() {
  const { courseId } = Route.useParams();
  const course = getCourse(courseId);
  const name = useStudent((s) => s.currentName);
  const students = useStudent((s) => s.students);
  const results = name ? (students[name]?.results ?? []).filter((r) => r.courseId === courseId) : [];
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  if (!course) {
    return (
      <div className="paper-wash min-h-dvh">
        <AppHeader />
        <p className="px-8 py-16 text-muted">That course is not on the academy list.</p>
      </div>
    );
  }

  let active = "";
  if (pathname.endsWith("/exam")) active = "exam";
  else if (pathname.endsWith("/summary")) active = "summary";
  else {
    const moduleMatch = pathname.match(/\/module\/([^/]+)/);
    const lessonMatch = pathname.match(/\/lesson\/([^/]+)/);
    if (moduleMatch?.[1]) active = decodeURIComponent(moduleMatch[1]);
    else if (lessonMatch?.[1]) active = decodeURIComponent(lessonMatch[1]);
  }

  return (
    <CampusGate uniId="hct">
      <div className="paper-wash min-h-dvh">
        <AppHeader compact />
        <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-20 sm:px-8 lg:grid-cols-[13.75rem_minmax(0,1fr)]">
          <aside className="min-w-0 max-lg:overflow-x-auto lg:sticky lg:top-20 lg:self-start">
            <p className="mb-2 hidden text-[11px] font-semibold tracking-[0.16em] text-muted uppercase lg:block">
              {course.code}
            </p>
            <CourseNav course={course} results={results} active={active} />
          </aside>
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </CampusGate>
  );
}
