import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hey")({
  component: () => <Navigate to="/hct" />,
});
