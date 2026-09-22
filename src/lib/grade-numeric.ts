import type { Mcq } from "@/data/types";

export function isNumericQuestion(q: Mcq): boolean {
  return q.numericAnswer !== undefined;
}

/** Strip AED, $, %, commas and spaces so "AED 1,710.00" grades as 1710. */
export function parseStudentNumber(raw: string): number | null {
  let s = raw.trim();
  if (!s) return null;
  s = s.replace(/AED/gi, "");
  s = s.replace(/USD/gi, "");
  s = s.replace(/[%$]/g, "");
  s = s.replace(/,/g, "");
  s = s.replace(/\s+/g, "");
  if (!s || s === "-" || s === "." || s === "-.") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function gradeNumeric(raw: string | number | undefined, expected: number, tolerance = 0.01): boolean {
  const n = typeof raw === "number" ? raw : parseStudentNumber(String(raw ?? ""));
  if (n === null) return false;
  return Math.abs(n - expected) <= tolerance;
}

export function gradeQuestion(q: Mcq, answer: number | string | undefined): boolean {
  if (isNumericQuestion(q) && q.numericAnswer !== undefined) {
    return gradeNumeric(answer, q.numericAnswer, q.tolerance ?? 0.01);
  }
  return answer === q.correctIndex;
}

export function formatNumericKey(n: number, unit?: string): string {
  const abs = Math.abs(n);
  const text =
    abs >= 100 && Number.isInteger(n)
      ? n.toLocaleString("en-US")
      : Number.isInteger(n)
        ? String(n)
        : String(Number(n.toFixed(4))).replace(/\.?0+$/, "");
  return unit ? `${text} ${unit}` : text;
}
