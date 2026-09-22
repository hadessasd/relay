import { useEffect, type ReactNode } from "react";
import { Watermark } from "@/components/watermark";
import { useStudent } from "@/lib/student-store";

export function Gate({ children }: { children: ReactNode }) {
  const hydrate = useStudent((s) => s.hydrate);
  const showArabic = useStudent((s) => s.showArabic);
  const hydrated = useStudent((s) => s.hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    document.documentElement.dataset.arabic = showArabic ? "on" : "off";
  }, [showArabic, hydrated]);

  return (
    <>
      <Watermark />
      {children}
    </>
  );
}
