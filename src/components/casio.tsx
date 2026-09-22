"use client";

import { useEffect, useState } from "react";
import type { CasioDemo, CasioStep, WorkPart } from "@/data/types";
import { cn } from "@/lib/cn";
import { useStudent } from "@/lib/student-store";
import { Calculator, Pause, Play } from "lucide-react";

function splitPart(label: string, ask?: string) {
  const m = label.match(/^\(([a-e])\)\s*(.*)$/i);
  if (m) return { letter: m[1].toLowerCase(), ask: ask ?? m[2] };
  return { letter: "", ask: ask ?? label };
}

export function MathWorking({
  parts,
  embed,
}: {
  parts: WorkPart[];
  embed?: boolean;
}) {
  const showArabic = useStudent((s) => s.showArabic);
  return (
    <div className={cn(embed ? "mt-4" : "mt-3")}>
      {parts.map((part, pi) => {
        const { letter, ask } = splitPart(part.label, part.ask);
        const showHead = !embed && (Boolean(letter) || Boolean(ask));
        return (
          <div key={`${part.label}-${pi}`} className={cn(pi > 0 && "mt-4")}>
            {showHead ? (
              <div className="mb-3 flex items-start gap-3">
                {letter ? (
                  <span className="math mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm text-primary-fg">
                    {letter}
                  </span>
                ) : null}
                <div className="min-w-0">
                  <p className="font-serif text-base leading-snug text-fg sm:text-lg">{ask}</p>
                  {showArabic && part.askAr ? (
                    <p className="ar mt-1 text-xs leading-relaxed text-muted" dir="rtl" lang="ar">
                      {part.askAr}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="rounded-2xl bg-surface-2/80 px-3 py-1 sm:px-4">
              {part.lines.map((line, li) => {
                const op = line.op === undefined ? "=" : line.op;
                return (
                  <div key={`${pi}-${li}`} className={cn("py-2.5", li > 0 && "border-t border-border/80")}>
                    <div className="flex items-baseline gap-2 sm:gap-3">
                      <span className="math w-20 shrink-0 text-right text-base text-muted sm:w-28 sm:text-xl">
                        {line.lhs ?? ""}
                      </span>
                      <span className="math w-4 shrink-0 text-center text-base text-muted sm:w-5 sm:text-xl">
                        {op}
                      </span>
                      <span className="math min-w-0 flex-1 text-xl leading-snug text-fg sm:text-2xl">
                        {line.rhs}
                      </span>
                    </div>
                    {line.note ? (
                      <p className="mt-1 pl-24 text-xs leading-snug text-muted sm:pl-36">{line.note}</p>
                    ) : null}
                    {showArabic && line.ar ? (
                      <p className="ar mt-1 text-xs leading-snug text-muted" dir="rtl" lang="ar">
                        {line.ar}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {part.answer ? (
              <p className="math mt-3 rounded-xl bg-ok-soft px-3 py-2 text-lg text-ok sm:text-xl">{part.answer}</p>
            ) : null}
            {showArabic && part.answerAr ? (
              <p className="ar mt-1.5 text-xs leading-relaxed text-muted" dir="rtl" lang="ar">
                {part.answerAr}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

const PAD: string[][] = [
  ["SHIFT", "MODE", "x²", "AC"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "−"],
  ["0", ".", "√", "="],
];

function stepsOf(demo: CasioDemo): CasioStep[] {
  if (demo.steps?.length) return demo.steps;
  return demo.keys.map((key, i) => ({
    key,
    display: i === demo.keys.length - 1 ? (demo.result ?? demo.screen) : undefined,
  }));
}

function lcdAnswer(steps: CasioStep[], cursor: number, demo: CasioDemo) {
  for (let i = cursor; i >= 0; i--) {
    if (steps[i]?.display) return steps[i].display as string;
  }
  return demo.result ?? demo.screen ?? "0";
}

export function LessonVideo({
  src,
  youtube,
  title,
  caption,
  poster,
}: {
  src?: string;
  youtube?: string;
  title: string;
  caption?: string;
  poster?: string;
}) {
  if (!src && !youtube) return null;
  return (
    <figure className="overflow-hidden rounded-3xl bg-primary text-primary-fg shadow-[var(--shadow-lift)]">
      <p className="flex items-center gap-2 px-4 pt-4 text-xs font-semibold tracking-[0.16em] text-primary-fg/70 uppercase">
        <Calculator className="size-3.5" />
        Lecture video · {title}
      </p>
      <div className="mt-3 aspect-video w-full bg-ink">
        {src ? (
          <video
            className="size-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${youtube}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
      {caption ? (
        <figcaption className="px-4 py-3 text-sm leading-relaxed text-primary-fg/80">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function CasioGuide({ demo }: { demo: CasioDemo }) {
  const showArabic = useStudent((s) => s.showArabic);
  const steps = stepsOf(demo);
  const last = Math.max(0, steps.length - 1);
  const [cursor, setCursor] = useState(last);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setCursor(last);
    setPlaying(false);
  }, [demo.title, last]);

  useEffect(() => {
    if (!playing) return;
    if (cursor >= last) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setCursor((c) => Math.min(c + 1, last)), 1100);
    return () => window.clearTimeout(t);
  }, [playing, cursor, last]);

  const answer = lcdAnswer(steps, cursor, demo);

  function play() {
    setCursor(0);
    setPlaying(true);
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
          <Calculator className="size-3.5" />
          Casio · {demo.title}
        </p>
        <button
          type="button"
          onClick={() => (playing ? setPlaying(false) : play())}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-3.5 text-sm text-primary-fg"
        >
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {playing ? "Pause" : "Watch the screen"}
        </button>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)] lg:items-start">
        <div className="mx-auto w-full max-w-xs rounded-[1.75rem] bg-casio p-3 text-casio-fg">
          <div className="mb-3 flex items-baseline justify-between px-1">
            <p className="font-serif text-lg tracking-wide">CASIO</p>
            <p className="text-xs tracking-[0.16em] text-casio-fg/60 uppercase">fx-82ES PLUS</p>
          </div>
          <div className="rounded-lg bg-casio-lcd px-3 py-3 text-fg">
            <p className="min-h-5 text-right text-xs tracking-[0.18em] text-muted uppercase">
              {demo.screen ?? "STAT  1-VAR"}
            </p>
            <p className="math mt-1 text-right text-4xl leading-none text-fg">{answer}</p>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {PAD.flat().map((key) => (
              <span
                key={key}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-casio-key text-sm font-medium text-casio-key-fg tabular-nums"
              >
                {key}
              </span>
            ))}
          </div>
        </div>

        <ol className="flex flex-col gap-1.5">
          <li className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            How to get this on the screen
          </li>
          {steps.map((step, i) => {
            const active = i === cursor;
            return (
              <li key={`${i}-${step.key}`}>
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setCursor(i);
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left",
                    active ? "bg-surface-2" : "bg-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "math mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg text-sm",
                      active ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-snug text-fg">{step.key}</span>
                    {step.say ? (
                      <span className="mt-0.5 block text-sm leading-snug text-muted">{step.say}</span>
                    ) : null}
                    {showArabic && step.sayAr ? (
                      <span className="ar mt-1 block text-xs leading-snug text-muted" dir="rtl" lang="ar">
                        {step.sayAr}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {demo.video || demo.youtube ? (
        <div className="mt-5 overflow-hidden rounded-2xl bg-ink">
          <p className="px-3 pt-3 text-xs font-semibold tracking-[0.16em] text-primary-fg/55 uppercase">
            {demo.videoTitle || "How STAT works"}
          </p>
          <div className="mt-2 aspect-video w-full">
            {demo.video ? (
              <video
                className="size-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={demo.poster}
              >
                <source src={demo.video} type="video/mp4" />
              </video>
            ) : (
              <iframe
                className="size-full"
                src={`https://www.youtube-nocookie.com/embed/${demo.youtube}?rel=0`}
                title={demo.videoTitle || demo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>
      ) : null}

      {demo.note ? <p className="mt-4 text-sm leading-relaxed text-muted">{demo.note}</p> : null}
      {showArabic && demo.noteAr ? (
        <p className="ar mt-2 text-sm leading-relaxed text-muted" dir="rtl" lang="ar">
          {demo.noteAr}
        </p>
      ) : null}
    </div>
  );
}
