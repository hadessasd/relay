import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, Lightbulb, List, Rows3, X } from "lucide-react";
import { Art, ART } from "@/components/art";
import { ScoreRing } from "@/components/score-ring";
import { Button } from "@/components/ui/button";
import { FrqChartView } from "@/components/frq-chart";
import { CasioGuide, MathWorking } from "@/components/casio";
import type { Mcq, WorkPart, WritingQ } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatNumericKey, gradeQuestion, isNumericQuestion } from "@/lib/grade-numeric";
import { useStudent, type QuizResult } from "@/lib/student-store";

const letters = ["A", "B", "C", "D", "E", "F"];

const starters = [
  "In one line, this means…",
  "A class example is…",
  "For the exam I would write…",
];

type Props = {
  courseId: string;
  topicId: string;
  mcqs: Mcq[];
  writing: WritingQ[];
  existing?: QuizResult;
  timedMinutes?: number;
  examMode?: boolean;
  heading?: string;
};

type Item =
  | { kind: "mcq"; id: string; q: Mcq; index: number }
  | { kind: "writing"; id: string; q: WritingQ; index: number };

function formatClock(total: number) {
  const m = Math.floor(Math.max(0, total) / 60);
  const s = Math.max(0, total) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function QuizPanel({
  courseId,
  topicId,
  mcqs,
  writing,
  existing,
  timedMinutes,
  examMode,
  heading,
}: Props) {
  const saveResult = useStudent((s) => s.saveResult);
  const items = useMemo<Item[]>(
    () => [
      ...mcqs.map((q, index) => ({ kind: "mcq" as const, id: q.id, q, index })),
      ...writing.map((q, index) => ({ kind: "writing" as const, id: q.id, q, index })),
    ],
    [mcqs, writing],
  );

  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [numericAnswers, setNumericAnswers] = useState<Record<string, string>>({});
  const [writingAnswers, setWritingAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"focus" | "list">("focus");
  const [hintId, setHintId] = useState<string | null>(null);
  const [left, setLeft] = useState(() => (timedMinutes ?? 0) * 60);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const startMcq: Record<string, number> = {};
    const startNumeric: Record<string, string> = {};
    const startWrite: Record<string, string> = {};
    if (existing) {
      for (const q of mcqs) {
        const v = existing.answers[q.id];
        if (isNumericQuestion(q)) {
          if (v !== undefined && v !== null) startNumeric[q.id] = String(v);
        } else if (typeof v === "number") {
          startMcq[q.id] = v;
        }
      }
      for (const q of writing) {
        const v = existing.answers[q.id];
        if (typeof v === "string") startWrite[q.id] = v;
      }
    }
    setMcqAnswers(startMcq);
    setNumericAnswers(startNumeric);
    setWritingAnswers(startWrite);
    setSubmitted(Boolean(existing));
    setError(null);
    setStep(0);
    setMode("focus");
    setHintId(null);
    setLeft((timedMinutes ?? 0) * 60);
    setTimedOut(false);
  }, [courseId, topicId, existing?.submittedAt, timedMinutes]);

  const score = useMemo(() => {
    let n = 0;
    for (const q of mcqs) {
      const ans = isNumericQuestion(q) ? numericAnswers[q.id] : mcqAnswers[q.id];
      if (gradeQuestion(q, ans)) n += 1;
    }
    return n;
  }, [mcqAnswers, numericAnswers, mcqs]);

  const answered = items.filter((item) => {
    if (item.kind === "mcq") {
      return isNumericQuestion(item.q)
        ? Boolean((numericAnswers[item.id] ?? "").trim())
        : mcqAnswers[item.id] !== undefined;
    }
    return Boolean((writingAnswers[item.id] ?? "").trim());
  }).length;

  const finishRef = useRef<(force: boolean) => void>(() => undefined);

  function finish(force: boolean) {
    if (!force) {
      const missingMcq = mcqs.some((q) =>
        isNumericQuestion(q) ? !(numericAnswers[q.id] ?? "").trim() : mcqAnswers[q.id] === undefined,
      );
      const missingWrite = writing.some((q) => !(writingAnswers[q.id] ?? "").trim());
      if (missingMcq || missingWrite) {
        setError("Answer every question before you submit.");
        const first = items.find((item) =>
          item.kind === "mcq"
            ? isNumericQuestion(item.q)
              ? !(numericAnswers[item.id] ?? "").trim()
              : mcqAnswers[item.id] === undefined
            : !(writingAnswers[item.id] ?? "").trim(),
        );
        if (first) {
          setStep(Math.max(0, items.findIndex((i) => i.id === first.id)));
          setMode("focus");
        }
        return;
      }
    }
    setError(null);
    const answers: Record<string, number | string> = { ...mcqAnswers };
    for (const [k, v] of Object.entries(numericAnswers)) answers[k] = v;
    for (const [k, v] of Object.entries(writingAnswers)) answers[k] = v;
    let n = 0;
    for (const q of mcqs) {
      const ans = isNumericQuestion(q) ? numericAnswers[q.id] : mcqAnswers[q.id];
      if (gradeQuestion(q, ans)) n += 1;
    }
    saveResult({
      courseId,
      topicId,
      mcqScore: n,
      mcqTotal: mcqs.length,
      writingCount: writing.length,
      answers,
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    window.setTimeout(() => {
      document.getElementById("writing-compare")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  finishRef.current = finish;

  useEffect(() => {
    if (!timedMinutes || submitted) return;
    const id = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timedMinutes, submitted]);

  useEffect(() => {
    if (!timedMinutes || submitted || left > 0) return;
    setTimedOut(true);
    finishRef.current(true);
  }, [left, timedMinutes, submitted]);

  function submit() {
    finish(false);
  }

  function retry() {
    setSubmitted(false);
    setError(null);
    setStep(0);
    setMode("focus");
    setTimedOut(false);
    setLeft((timedMinutes ?? 0) * 60);
  }

  const current = items[step] ?? items[0];
  const urgent = Boolean(timedMinutes && !submitted && left <= 60);

  return (
    <section className="mt-12 border-t border-border pt-10">
      <div className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
        <div className="relative h-36 sm:h-44">
          <Art src={examMode ? ART.exam : ART.quiz} alt={examMode ? "Timed exam booklet" : "Exam booklet and pencil"} />
          <div className="art-veil absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="kicker text-primary-fg/80">{examMode ? "Timed paper" : "Check yourself"}</p>
            <h2 className="mt-1 font-serif text-3xl tracking-tight text-primary-fg">
              {heading ?? (examMode ? "Exam module" : "Practice after this topic")}
            </h2>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="max-w-2xl text-sm text-muted">
            {examMode
              ? mcqs.length
                ? "The clock starts now. Typed numbers are auto-graded. After you submit — or when time ends — every working and model answer opens."
                : "The clock starts now. Writing only — no MCQ. After you submit — or when time ends — every model answer opens so you can compare."
              : mcqs.length
                ? "Numbers you type are marked on the spot after submit. After you submit, letters, workings, and writing examples open automatically."
                : "Writing only — no MCQ. After you submit, every model answer opens so you can compare."}
          </p>
          {timedMinutes && !submitted ? (
            <p
              className={cn(
                "mt-3 inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium tabular-nums",
                urgent ? "bg-bad-soft text-bad" : "bg-surface-2 text-fg",
              )}
              aria-live="polite"
            >
              <Clock className="size-4" />
              {formatClock(left)} left
            </p>
          ) : null}
          {!submitted ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <ModeChip active={mode === "focus"} onClick={() => setMode("focus")} icon={<Rows3 className="size-3.5" />} label="Focus" />
              <ModeChip active={mode === "list"} onClick={() => setMode("list")} icon={<List className="size-3.5" />} label="All questions" />
              <p className="ml-auto text-xs text-muted tabular-nums">
                {answered}/{items.length} answered
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {submitted ? (
        <Results
          score={score}
          mcqs={mcqs}
          writing={writing}
          mcqAnswers={mcqAnswers}
          numericAnswers={numericAnswers}
          writingAnswers={writingAnswers}
          onRetry={retry}
          timedOut={timedOut}
          namePrefix={`${courseId}:${topicId}`}
        />
      ) : (
        <>
          {mode === "focus" && current ? (
            <FocusCard
              current={current}
              step={step}
              total={items.length}
              items={items}
              mcqAnswers={mcqAnswers}
              numericAnswers={numericAnswers}
              writingAnswers={writingAnswers}
              hintId={hintId}
              hideHints={Boolean(examMode)}
              onHint={(id) => setHintId((h) => (h === id ? null : id))}
              onPick={(id, oi) => setMcqAnswers((s) => ({ ...s, [id]: oi }))}
              onNumeric={(id, value) => setNumericAnswers((s) => ({ ...s, [id]: value }))}
              onWrite={(id, value) => setWritingAnswers((s) => ({ ...s, [id]: value }))}
              onJump={setStep}
              namePrefix={`${courseId}:${topicId}`}
            />
          ) : (
            <div className="mt-6 flex flex-col gap-6">
              {items.map((item) =>
                item.kind === "mcq" ? (
                  <McqCard
                    key={item.id}
                    q={item.q}
                    index={item.index}
                    picked={mcqAnswers[item.id]}
                    numericValue={numericAnswers[item.id] ?? ""}
                    submitted={false}
                    showHint={hintId === item.id}
                    hideHints={Boolean(examMode)}
                    namePrefix={`${courseId}:${topicId}`}
                    onPick={(oi) => setMcqAnswers((s) => ({ ...s, [item.id]: oi }))}
                    onNumeric={(value) => setNumericAnswers((s) => ({ ...s, [item.id]: value }))}
                    onHint={() => setHintId((h) => (h === item.id ? null : item.id))}
                  />
                ) : (
                  <WritingCard
                    key={item.id}
                    q={item.q}
                    index={item.index}
                    value={writingAnswers[item.id] ?? ""}
                    submitted={false}
                    showHint={hintId === item.id}
                    hideHints={Boolean(examMode)}
                    onHint={() => setHintId((h) => (h === item.id ? null : item.id))}
                    onChange={(value) => setWritingAnswers((s) => ({ ...s, [item.id]: value }))}
                  />
                ),
              )}
            </div>
          )}

          {error ? <p className="mt-4 text-sm text-bad">{error}</p> : null}

          <div className="sticky bottom-3 z-20 mt-6 flex flex-wrap items-center gap-2 rounded-2xl bg-surface/95 p-3 shadow-[var(--shadow-lift)] backdrop-blur-sm">
            {mode === "focus" ? (
              <Button
                variant="secondary"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
            ) : null}
            {timedMinutes ? (
              <p className={cn("text-sm tabular-nums", urgent ? "text-bad" : "text-muted")}>
                {formatClock(left)}
              </p>
            ) : (
              <p className="hidden text-sm text-muted sm:inline">
                {answered === items.length ? "Ready to submit." : `${items.length - answered} left`}
              </p>
            )}
            <div className="ml-auto flex gap-2">
              {mode === "focus" && step < items.length - 1 ? (
                <Button onClick={() => setStep((s) => Math.min(items.length - 1, s + 1))}>
                  Next
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button size="lg" onClick={submit}>
                  Submit answers
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function ModeChip({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors",
        active ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted hover:text-fg",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function FocusCard({
  current,
  step,
  total,
  items,
  mcqAnswers,
  numericAnswers,
  writingAnswers,
  hintId,
  hideHints,
  onHint,
  onPick,
  onNumeric,
  onWrite,
  onJump,
  namePrefix,
}: {
  current: Item;
  step: number;
  total: number;
  items: Item[];
  mcqAnswers: Record<string, number>;
  numericAnswers: Record<string, string>;
  writingAnswers: Record<string, string>;
  hintId: string | null;
  hideHints: boolean;
  onHint: (id: string) => void;
  onPick: (id: string, oi: number) => void;
  onNumeric: (id: string, value: string) => void;
  onWrite: (id: string, value: string) => void;
  onJump: (index: number) => void;
  namePrefix: string;
}) {
  return (
    <div className="mt-6 min-w-0">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="kicker text-accent">
          {current.kind === "mcq"
            ? isNumericQuestion(current.q)
              ? `Q ${current.index + 1}`
              : `MCQ ${current.index + 1}`
            : `FRQ ${current.index + 1}`}
          <span className="text-muted"> · {step + 1}/{total}</span>
        </p>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {items.map((item, i) => {
          const done =
            item.kind === "mcq"
              ? isNumericQuestion(item.q)
                ? Boolean((numericAnswers[item.id] ?? "").trim())
                : mcqAnswers[item.id] !== undefined
              : Boolean((writingAnswers[item.id] ?? "").trim());
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onJump(i)}
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium tabular-nums transition-colors",
                i === step && "bg-primary text-primary-fg",
                i !== step && done && "bg-ok-soft text-ok",
                i !== step && !done && "bg-surface-2 text-muted",
              )}
              aria-label={`Question ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      {current.kind === "mcq" ? (
        <McqCard
          q={current.q}
          index={current.index}
          picked={mcqAnswers[current.id]}
          numericValue={numericAnswers[current.id] ?? ""}
          submitted={false}
          showHint={hintId === current.id}
          hideHints={hideHints}
          namePrefix={namePrefix}
          onPick={(oi) => onPick(current.id, oi)}
          onNumeric={(value) => onNumeric(current.id, value)}
          onHint={() => onHint(current.id)}
        />
      ) : (
        <WritingCard
          q={current.q}
          index={current.index}
          value={writingAnswers[current.id] ?? ""}
          submitted={false}
          showHint={hintId === current.id}
          hideHints={hideHints}
          onHint={() => onHint(current.id)}
          onChange={(value) => onWrite(current.id, value)}
        />
      )}
    </div>
  );
}

function HintBlock({ hint, hintAr }: { hint?: string; hintAr?: string }) {
  const showArabic = useStudent((s) => s.showArabic);
  const ar = showArabic ? hintAr : undefined;
  if (!hint && !ar) return null;
  return (
    <div className="mt-3 rounded-xl bg-warn-soft px-4 py-3 text-sm leading-relaxed text-wrap text-warn">
      {hint ? <p>{hint}</p> : null}
      {ar ? (
        <p className={hint ? "ar mt-2" : "ar"} dir="rtl" lang="ar">
          {ar}
        </p>
      ) : null}
    </div>
  );
}

function McqCard({
  q,
  index,
  picked,
  numericValue,
  submitted,
  showHint,
  hideHints,
  onPick,
  onNumeric,
  onHint,
  namePrefix,
}: {
  q: Mcq;
  index: number;
  picked?: number;
  numericValue?: string;
  submitted: boolean;
  showHint?: boolean;
  hideHints?: boolean;
  onPick?: (oi: number) => void;
  onNumeric?: (value: string) => void;
  onHint?: () => void;
  namePrefix?: string;
}) {
  const headingId = `${q.id}-prompt`;
  const radioName = `${namePrefix ?? "q"}:${q.id}`;
  const numeric = isNumericQuestion(q);
  const numericOk = numeric && submitted ? gradeQuestion(q, numericValue) : false;
  const canHint = !submitted && !hideHints && Boolean(q.hint || q.hintAr);

  return (
    <div className="min-w-0 rounded-3xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
      <p className="kicker text-muted">
        {numeric ? "Calculate" : "MCQ"} {index + 1}
        {q.tag ? <span className="text-accent"> · {q.tag}</span> : null}
        {q.unit ? <span className="text-muted"> · {q.unit}</span> : null}
      </p>
      <p id={headingId} className="mt-1.5 text-base font-medium leading-snug text-wrap text-fg sm:text-lg">
        {q.question}
      </p>

      {canHint ? (
        <button
          type="button"
          onClick={onHint}
          className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-surface-2 px-3 text-xs font-medium text-muted hover:text-fg"
        >
          <Lightbulb className="size-3.5" />
          {showHint ? "Hide nudge" : "Need a nudge"}
        </button>
      ) : null}
      {showHint && canHint ? <HintBlock hint={q.hint} hintAr={q.hintAr} /> : null}

      {numeric ? (
        <div className="mt-4">
          <label className="text-xs font-medium tracking-wide text-muted uppercase" htmlFor={`${q.id}-num`}>
            Your number{q.unit ? ` · ${q.unit}` : ""}
          </label>
          <input
            id={`${q.id}-num`}
            inputMode="decimal"
            autoComplete="off"
            disabled={submitted}
            value={numericValue ?? ""}
            onChange={(e) => onNumeric?.(e.target.value)}
            placeholder="Type the number only"
            className={cn(
              "mt-2 h-14 w-full rounded-2xl border bg-bg px-4 font-serif text-2xl tabular-nums text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:opacity-90",
              submitted && numericOk && "border-ok bg-ok-soft",
              submitted && !numericOk && "border-bad bg-bad-soft",
              !submitted && "border-border",
            )}
          />
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2" role="radiogroup" aria-labelledby={headingId}>
          {q.options.map((opt, oi) => {
            const isPicked = picked === oi;
            const isCorrect = q.correctIndex === oi;
            const show = submitted;
            return (
              <label
                key={`${q.id}-${oi}`}
                className={cn(
                  "flex min-h-11 w-full min-w-0 cursor-pointer items-start gap-3 rounded-2xl border px-3 py-2.5 transition-[background-color,border-color] duration-150 sm:px-4",
                  !show && (isPicked ? "border-primary bg-primary/8" : "border-border hover:bg-surface-2"),
                  show && isCorrect && "border-ok bg-ok-soft",
                  show && isPicked && !isCorrect && "border-bad bg-bad-soft",
                  show && !isPicked && !isCorrect && "border-border opacity-70",
                )}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name={radioName}
                  checked={isPicked}
                  disabled={submitted}
                  onChange={() => onPick?.(oi)}
                />
                <span
                  className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold tabular-nums",
                    isPicked && !show ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted",
                    show && isCorrect && "bg-ok text-ok-soft",
                    show && isPicked && !isCorrect && "bg-bad text-bad-soft",
                  )}
                >
                  {letters[oi]}
                </span>
                <span className="min-w-0 flex-1 pt-1 text-sm leading-snug break-words text-wrap sm:leading-relaxed">
                  {opt}
                </span>
                {show && isCorrect ? <Check className="mt-1.5 size-4 shrink-0 text-ok" /> : null}
                {show && isPicked && !isCorrect ? <X className="mt-1.5 size-4 shrink-0 text-bad" /> : null}
              </label>
            );
          })}
        </div>
      )}

      {submitted ? (
        <div className="mt-4 flex min-w-0 flex-col gap-3">
          {numeric ? (
            <p
              className={cn(
                "min-w-0 rounded-xl px-3 py-3 text-sm leading-relaxed break-words text-wrap sm:px-4 sm:text-base",
                numericOk ? "bg-ok-soft text-fg" : "bg-bad-soft text-fg",
              )}
            >
              <span className={numericOk ? "font-medium text-ok" : "font-medium text-bad"}>
                {numericOk ? "Correct." : "Not quite — here is the full working."}
              </span>{" "}
              Key: {formatNumericKey(q.numericAnswer ?? 0, q.unit)}.
            </p>
          ) : (
            <p
              className={cn(
                "min-w-0 rounded-xl px-3 py-3 text-sm leading-relaxed break-words text-wrap sm:px-4 sm:text-base",
                picked === q.correctIndex ? "bg-ok-soft text-fg" : "bg-bad-soft text-fg",
              )}
            >
              <span className={picked === q.correctIndex ? "font-medium text-ok" : "font-medium text-bad"}>
                {picked === q.correctIndex ? "Correct." : "Not quite — here is the full working."}
              </span>{" "}
              Answer {letters[q.correctIndex]}.
            </p>
          )}
          <AnswerWorking q={q} />
        </div>
      ) : null}
    </div>
  );
}

function autoWorking(explanation: string, explanationAr?: string): WorkPart[] {
  const chunks = explanation
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const lines: WorkPart["lines"] = [];
  for (const chunk of chunks) {
    const clean = chunk.replace(/\.$/, "").trim();
    if (!clean) continue;
    if (clean.includes("=")) {
      const bits = clean.split(/\s*=\s*/).map((s) => s.trim()).filter(Boolean);
      bits.slice(1).forEach((rhs, i) => {
        lines.push({ lhs: i === 0 ? bits[0] : undefined, rhs });
      });
    } else {
      lines.push({ rhs: clean, op: "" });
    }
  }
  if (lines.length === 0) {
    lines.push({ rhs: explanation, op: "" });
  }
  return [
    {
      label: "Working",
      ask: "Full working",
      lines,
      answerAr: explanationAr,
    },
  ];
}

function AnswerWorking({ q }: { q: Mcq }) {
  const parts = q.working?.length ? q.working : autoWorking(q.explanation, q.explanationAr);
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface-2/60 px-3 py-4 sm:px-4">
      <p className="kicker text-accent">Full working</p>
      <MathWorking parts={parts} />
      {q.casio ? (
        <div className="mt-4">
          <CasioGuide demo={q.casio} />
        </div>
      ) : null}
    </div>
  );
}

function splitExamParts(text: string) {
  const re = /\(([a-e])\)\s+/gi;
  const matches = [...text.matchAll(re)];
  if (matches.length < 2) return { stem: text.trim(), parts: [] as { letter: string; text: string }[] };
  const first = matches[0].index ?? 0;
  const stem = text.slice(0, first).trim();
  const parts = matches.map((m, i) => {
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? text.length) : text.length;
    return { letter: m[1].toLowerCase(), text: text.slice(start, end).trim() };
  });
  return { stem, parts };
}

function WritingCard({
  q,
  index,
  value,
  submitted,
  showHint,
  hideHints,
  onHint,
  onChange,
}: {
  q: WritingQ;
  index: number;
  value: string;
  submitted: boolean;
  showHint: boolean;
  hideHints?: boolean;
  onHint: () => void;
  onChange: (value: string) => void;
}) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const { stem, parts } = splitExamParts(q.prompt);
  return (
    <div className="min-w-0 rounded-3xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
      <p className="kicker text-muted">FRQ {index + 1}</p>
      <p className="mt-1.5 font-serif text-lg leading-snug text-wrap text-fg sm:text-xl">{stem || q.prompt}</p>
      {q.chart ? <FrqChartView chart={q.chart} /> : null}
      {parts.length > 0 ? (
        <ol className="mt-4 flex flex-col overflow-hidden rounded-2xl bg-surface-2">
          {parts.map((part) => (
            <li key={part.letter} className="flex items-start gap-3 border-t border-border px-3 py-3 first:border-t-0 sm:px-4">
              <span className="math mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm text-primary-fg">
                {part.letter}
              </span>
              <p className="min-w-0 pt-0.5 text-sm leading-relaxed text-fg sm:text-base">{part.text}</p>
            </li>
          ))}
        </ol>
      ) : null}
      {!submitted && !hideHints ? (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onHint}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-surface-2 px-3 text-xs font-medium text-muted hover:text-fg"
            >
              <Lightbulb className="size-3.5" />
              {showHint ? "Hide nudge" : "Need a nudge"}
            </button>
            {starters.map((line) => (
              <button
                key={line}
                type="button"
                onClick={() => onChange(value ? `${value.trim()} ${line} ` : `${line} `)}
                className="inline-flex min-h-10 max-w-full items-center rounded-full border border-border px-3 text-xs leading-snug text-muted hover:text-fg"
              >
                {line}
              </button>
            ))}
          </div>
          {showHint ? (
            <HintBlock
              hint={
                q.hint ??
                "Write 3–5 short sentences. Name the idea, give one class example, then say why it matters in the exam."
              }
              hintAr={q.hintAr}
            />
          ) : null}
        </>
      ) : null}
      <textarea
        className="mt-4 min-h-36 w-full min-w-0 rounded-2xl border border-border bg-bg px-3 py-3 text-sm leading-relaxed break-words text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:opacity-90 sm:px-4"
        placeholder="Write in short, clear sentences…"
        value={value}
        disabled={submitted}
        onChange={(e) => onChange(e.target.value)}
      />
      {!submitted ? <p className="mt-2 text-xs text-muted tabular-nums">{words} words</p> : null}
      {submitted ? (
        <div className="mt-4 flex flex-col gap-3">
          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            <div className="min-w-0 rounded-2xl bg-surface-2 p-4">
              <p className="kicker text-muted">Your answer</p>
              <p className="mt-2 text-sm leading-relaxed break-words text-wrap text-fg sm:text-base">
                {value.trim() || "You left this blank."}
              </p>
              <p className="mt-2 text-xs text-muted tabular-nums">{words} words</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-ok/20 bg-ok-soft p-4">
              <p className="kicker text-ok">Model example</p>
              <p className="mt-2 text-sm leading-relaxed break-words text-wrap text-fg sm:text-base">{q.modelAnswer}</p>
              <p className="mt-3 text-xs text-muted">Compare the ideas — you do not need the same English.</p>
            </div>
          </div>
          <div className="min-w-0 rounded-2xl bg-warn-soft px-4 py-3">
            <p className="kicker text-warn">What a marker looks for</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {writingMarks(q).map((line) => (
                <li key={line} className="flex min-w-0 gap-2 text-sm leading-relaxed break-words text-fg">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-warn" />
                  <span className="min-w-0 flex-1">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function writingMarks(q: WritingQ): string[] {
  if (q.marks?.length) return q.marks;
  return [
    "Name the idea in one clear sentence",
    "Give a campus, café, or AED example",
    "Say why this would earn the mark",
  ];
}

function Results({
  score,
  mcqs,
  writing,
  mcqAnswers,
  numericAnswers,
  writingAnswers,
  onRetry,
  timedOut,
  namePrefix,
}: {
  score: number;
  mcqs: Mcq[];
  writing: WritingQ[];
  mcqAnswers: Record<string, number>;
  numericAnswers: Record<string, string>;
  writingAnswers: Record<string, string>;
  onRetry: () => void;
  timedOut?: boolean;
  namePrefix: string;
}) {
  const writeN = writing.filter((q) => (writingAnswers[q.id] ?? "").trim()).length;
  const hasMcq = mcqs.length > 0;
  const numericN = mcqs.filter(isNumericQuestion).length;
  const scoreLabel = numericN === mcqs.length && mcqs.length > 0 ? "Auto" : "MCQ";
  const tone = hasMcq
    ? score === mcqs.length
      ? "Clean paper."
      : score >= mcqs.length * 0.7
        ? "Strong work."
        : "Worth another pass."
    : "Compare your FRQs below.";
  return (
    <div className="mt-8 min-w-0">
      <div className="flex flex-col items-center gap-5 rounded-3xl bg-surface px-5 py-8 text-center shadow-[var(--shadow-border)] sm:flex-row sm:text-left">
        <ScoreRing
          score={hasMcq ? score : writeN}
          total={hasMcq ? mcqs.length : writing.length}
          label={hasMcq ? scoreLabel : "FRQ"}
        />
        <div className="min-w-0">
          <p className="kicker text-accent">{timedOut ? "Time ended" : "Submitted"}</p>
          <h3 className="mt-1 font-serif text-3xl text-primary">{tone}</h3>
          <p className="mt-2 text-sm text-muted">
            {hasMcq
              ? `${scoreLabel} ${score}/${mcqs.length} auto-marked. Working and writing examples are open below.`
              : `${writeN}/${writing.length} writing answers. Model examples are open below so you can compare at once.`}
            {timedOut ? " The clock submitted what you had." : ""}
          </p>
          <Button variant="secondary" className="mt-4" onClick={onRetry}>
            Try again
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {mcqs.map((q, i) => (
          <McqCard
            key={q.id}
            q={q}
            index={i}
            picked={mcqAnswers[q.id]}
            numericValue={numericAnswers[q.id] ?? ""}
            submitted
            namePrefix={namePrefix}
          />
        ))}
      </div>

      {writing.length > 0 ? (
        <div id="writing-compare" className="mt-10 scroll-mt-24">
          <div className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
            <div className="relative h-36 sm:h-44">
              <Art src={ART.compare} alt="Two notebooks side by side for comparing writing" />
              <div className="art-veil absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="kicker text-primary-fg/80">Writing review</p>
                <h3 className="mt-1 font-serif text-2xl tracking-tight text-primary-fg sm:text-3xl">
                  Your answer next to a model example
                </h3>
              </div>
            </div>
            <p className="px-5 py-4 text-sm leading-relaxed text-muted">
              Markers care about the idea, one example, and a reason — not copying this English word for word.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {writing.map((q, i) => (
              <WritingCard
                key={q.id}
                q={q}
                index={i}
                value={writingAnswers[q.id] ?? ""}
                submitted
                showHint={false}
                onHint={() => undefined}
                onChange={() => undefined}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
