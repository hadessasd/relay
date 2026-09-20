import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/admin-dashboard";
import { StaffLogin } from "@/components/staff-login";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/staff")({
  component: StaffPage,
});

function StaffPage() {
  const hydrated = useStudent((s) => s.hydrated);
  const isStaff = useStudent((s) => s.isStaff);
  if (!hydrated) return <div className="paper-wash min-h-dvh" />;
  if (!isStaff) return <StaffLogin />;
  return <AdminDashboard />;
}
