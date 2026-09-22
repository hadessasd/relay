import { cn } from "@/lib/cn";

export function ScoreRing({
  score,
  total,
  className,
  label = "MCQ",
}: {
  score: number;
  total: number;
  className?: string;
  label?: string;
}) {
  const pct = total > 0 ? score / total : 0;
  const r = 38;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  return (
    <div className={cn("relative size-28", className)}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          className="stroke-surface-2"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          className="stroke-accent"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-serif text-2xl leading-none text-primary tabular-nums">
          {score}
          <span className="text-lg text-muted">/{total}</span>
        </p>
        <p className="kicker mt-1 text-muted">{label}</p>
      </div>
    </div>
  );
}
