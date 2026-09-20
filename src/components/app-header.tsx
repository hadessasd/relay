import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student-store";

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
