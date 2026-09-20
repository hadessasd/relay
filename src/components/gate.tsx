import { useEffect, type ReactNode } from "react";
import { Watermark } from "@/components/watermark";
import { useStudent } from "@/lib/student-store";

export function Gate({ children }: { children: ReactNode }) {
  const hydrate = useStudent((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <Watermark />
      {children}
    </>
  );
}
