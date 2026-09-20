import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student-store";

export function SiteHeader() {
  const name = useStudent((s) => s.currentName);
  const campus = useStudent((s) => s.campus);

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-4 pt-14 pb-4 sm:px-8">
      <Link to="/" className="min-w-0">
        <p className="whitespace-nowrap font-serif text-xl tracking-tight text-primary sm:text-2xl">Kstudy.academy</p>
        <p className="truncate text-xs text-muted">Courses for UAE campuses · 2% platform fee</p>
      </Link>
      <nav className="flex items-center gap-2">
        <Link
          to="/sell"
          className="hidden min-h-11 items-center rounded-lg px-3 text-sm font-medium text-fg sm:inline-flex"
        >
          Sell a course
        </Link>
        {name && campus?.uniId === "hct" ? (
          <Button asChild variant="secondary" size="sm">
            <Link to="/hct">Studio</Link>
          </Button>
        ) : (
          <Button asChild variant="secondary" size="sm">
            <Link to="/hct">Student login</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
