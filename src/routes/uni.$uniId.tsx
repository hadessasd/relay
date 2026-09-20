import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { CampusLogin } from "@/components/campus-login";
import { getUniversity } from "@/data/universities";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/uni/$uniId")({
  component: UniCampus,
});

function UniCampus() {
  const { uniId } = Route.useParams();
  const uni = getUniversity(uniId);
  const name = useStudent((s) => s.currentName);
  const campus = useStudent((s) => s.campus);
  const isStaff = useStudent((s) => s.isStaff);
  const hydrated = useStudent((s) => s.hydrated);

  if (!uni) {
    return (
      <div className="paper-wash min-h-dvh">
        <AppHeader />
        <p className="px-8 py-16 text-muted">That campus is not on the UAE list.</p>
      </div>
    );
  }

  if (!hydrated) return <div className="paper-wash min-h-dvh" />;
  if (!(isStaff || (name && campus?.uniId === uni.id))) {
    return <CampusLogin uni={uni} />;
  }

  return (
    <div className="paper-wash min-h-dvh">
      <AppHeader kicker={uni.short} />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-8">
        <p className="kicker text-accent">{uni.short}</p>
        <h1 className="mt-2 font-serif text-4xl text-primary">{uni.name}</h1>
        <p className="mt-3 text-muted">
          Your access key works. Studio courses for this campus have not been published yet. HCT is live today.
        </p>
        <Link to="/hct" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-primary">
          Open the HCT studio
        </Link>
      </main>
    </div>
  );
}
