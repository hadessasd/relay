import { createFileRoute, Link } from "@tanstack/react-router";
import { getCourse } from "@/data/courses";

export const Route = createFileRoute("/course/$courseId/summary")({
  component: SummaryPage,
});

function SummaryPage() {
  const { courseId } = Route.useParams();
  const course = getCourse(courseId);
  if (!course) return null;
  const sheet = course.summarySheet;

  return (
    <article>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">Night before</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary">{sheet.title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{sheet.intro}</p>

      <div className="mt-8 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-primary text-primary-fg">
              <th className="px-4 py-2.5 font-medium">Idea</th>
              <th className="px-4 py-2.5 font-medium">Remember it like this</th>
            </tr>
          </thead>
          <tbody>
            {sheet.rows.map((row, i) => (
              <tr key={row.idea} className={i % 2 === 0 ? "bg-surface" : "bg-surface-2/60"}>
                <td className="px-4 py-2.5 align-top font-medium whitespace-nowrap text-fg">{row.idea}</td>
                <td className="px-4 py-2.5 align-top text-fg/90">{row.remember}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <aside className="mt-6 rounded-2xl border border-accent/20 bg-accent/8 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">A kind last word</p>
        <p className="mt-1.5 text-sm leading-relaxed text-fg">{sheet.closing}</p>
      </aside>

      <Link
        to="/course/$courseId"
        params={{ courseId: course.id }}
        className="mt-8 inline-flex min-h-11 items-center text-sm text-muted hover:text-fg"
      >
        Back to course
      </Link>
    </article>
  );
}
