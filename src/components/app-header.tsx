import { Link } from "@tanstack/react-router";
import { Languages, LogOut, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useStudent } from "@/lib/student-store";

export function ArabicToggle() {
  const showArabic = useStudent((s) => s.showArabic);
  const setShowArabic = useStudent((s) => s.setShowArabic);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={showArabic}
      aria-label="Show Arabic in every course"
      title={showArabic ? "Hide Arabic in every course" : "Show Arabic in every course"}
      onClick={() => setShowArabic(!showArabic)}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-xs font-medium",
        showArabic ? "bg-accent/15 text-accent" : "bg-surface-2 text-muted",
      )}
    >
      <Languages className="size-3.5" />
      <span className="hidden sm:inline">Arabic</span>
      <span
        className={cn(
          "relative inline-flex h-5 w-8 shrink-0 items-center rounded-full transition-colors",
          showArabic ? "bg-accent" : "bg-border",
        )}
      >
        <span
          className={cn(
            "size-4 rounded-full bg-surface shadow-sm transition-transform",
            showArabic ? "translate-x-3.5" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function AppHeader({
  compact,
  kicker,
}: {
  compact?: boolean;
  kicker?: string;
}) {
  const name = useStudent((s) => s.currentName);
  const isStaff = useStudent((s) => s.isStaff);
  const logout = useStudent((s) => s.logout);

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-4 pt-14 pb-4 sm:px-8">
      <Link to={isStaff ? "/staff" : name ? "/hct" : "/"} className="min-w-0">
        <p className="whitespace-nowrap font-serif text-xl tracking-tight text-primary sm:text-2xl">Kstudy.academy</p>
        {!compact ? (
          <p className="truncate text-xs text-muted">
            {kicker ?? (isStaff ? "Owner desk" : "HCT studio · CLO 1 & CLO 2")}
          </p>
        ) : null}
      </Link>
      <div className="flex items-center gap-2">
        <ArabicToggle />
        <Link
          to="/zip"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted hover:text-fg"
          title="Download source zip"
        >
          <Download className="size-3.5" />
          <span className="hidden sm:inline">Zip</span>
        </Link>
        {isStaff ? (
          <span className="hidden text-sm text-muted sm:inline">Owner</span>
        ) : name ? (
          <span className="hidden max-w-36 truncate text-sm text-muted sm:inline">{name}</span>
        ) : null}
        {name || isStaff ? (
          <Button variant="ghost" size="sm" onClick={() => logout()} className="text-muted">
            <LogOut className="size-4" />
            {isStaff ? "Sign out" : "Switch"}
          </Button>
        ) : null}
      </div>
    </header>
  );
}