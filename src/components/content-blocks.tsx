import type { CalloutKind, ContentBlock, FrqChart } from "@/data/types";
import { Art } from "@/components/art";
import { CasioGuide, LessonVideo, MathWorking } from "@/components/casio";
import { DatingCalendarView } from "@/components/dating-calendar";
import { OrgDiagram } from "@/components/org-diagram";
import { ProfitLab } from "@/components/profit-lab";
import { FrqChartView } from "@/components/frq-chart";
import { cn } from "@/lib/cn";
import { useStudent } from "@/lib/student-store";
import { RichText } from "./rich-text";

const calloutTone: Record<CalloutKind, string> = {
  exam: "bg-primary/8 border-primary/20",
  formula: "bg-warn-soft border-border",
  trap: "bg-bad-soft border-border",
  story: "bg-ok-soft border-border",
  remember: "bg-accent/10 border-accent/20",
};

const calloutLabel: Record<CalloutKind, string> = {
  exam: "Exam",
  formula: "Write this",
  trap: "Exam trap",
  story: "Story",
  remember: "Remember",
};

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function ArabicHint({ text }: { text: string }) {
  const showArabic = useStudent((s) => s.showArabic);
  if (!showArabic || !text) return null;
  return (
    <aside className="rounded-xl bg-accent/10 px-4 py-3" dir="rtl" lang="ar">
      <p className="kicker mb-1.5 text-accent">بالعربي</p>
      <p className="ar text-sm leading-relaxed text-fg sm:text-[0.95rem]">{text}</p>
    </aside>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="font-serif text-xl leading-snug text-fg sm:text-2xl">
          <RichText text={block.text} />
        </p>
      );
    case "p":
      return (
        <p className="text-base leading-relaxed text-fg/90">
          <RichText text={block.text} />
        </p>
      );
    case "h":
      return (
        <h3 className="font-serif text-xl font-medium tracking-tight text-primary sm:text-2xl">{block.text}</h3>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-2 pl-0">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-lg bg-surface px-4 py-3 text-sm leading-relaxed shadow-[var(--shadow-border)] sm:text-base"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "steps":
      return <StepList items={block.items} ar={block.ar} />;
    case "callout":
      return (
        <aside className={cn("rounded-2xl border px-4 py-4 sm:px-5", calloutTone[block.kind])}>
          <p className="mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            {block.title || calloutLabel[block.kind]}
          </p>
          <p className="text-sm leading-relaxed text-fg sm:text-base">
            <RichText text={block.text} />
          </p>
          {block.ar ? <div className="mt-3"><ArabicHint text={block.ar} /></div> : null}
        </aside>
      );
    case "ar":
      return <ArabicHint text={block.text} />;
    case "casio":
      return <CasioGuide demo={block} />;
    case "calendar": {
      const { type: _kind, ...demo } = block;
      return <DatingCalendarView {...demo} />;
    }
    case "work":
      return (
        <WorkedQuestion question={block.question} parts={block.parts} ar={block.ar} chart={block.chart} />
      );
    case "table":
      return (
        <ResponsiveTable
          caption={block.caption}
          headers={block.headers}
          rows={block.rows}
          footer={block.footer}
          emphasis={block.emphasis}
        />
      );
    case "cards":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {block.items.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
            >
              {card.kicker ? (
                <p className="mb-1 text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                  {card.kicker}
                </p>
              ) : null}
              <h4 className="font-serif text-lg text-primary">{card.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-fg/85">{card.body}</p>
              {card.ar ? <div className="mt-3"><ArabicHint text={card.ar} /></div> : null}
            </article>
          ))}
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-accent pl-4 font-serif text-lg text-fg italic">
          {block.text}
          {block.cite ? <cite className="mt-1 block text-sm text-muted not-italic">— {block.cite}</cite> : null}
        </blockquote>
      );
    case "figure":
      return (
        <figure className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
          <div className="h-48 sm:h-72 lg:h-80">
            <Art src={block.src} alt={block.alt} />
          </div>
          {block.caption ? (
            <figcaption className="px-4 py-3 text-sm leading-relaxed text-muted">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "video":
      return (
        <LessonVideo
          src={block.src}
          youtube={block.youtube}
          title={block.title}
          caption={block.caption}
          poster={block.poster}
        />
      );
    case "lab":
      return block.kind === "profit" ? <ProfitLab /> : null;
    case "diagram":
      return <OrgDiagram kind={block.kind} caption={block.caption} />;
    default:
      return null;
  }
}

function StepList({ items, ar }: { items: string[]; ar?: string[] }) {
  const showArabic = useStudent((s) => s.showArabic);
  return (
    <ol className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li
          key={`${i}-${item.slice(0, 24)}`}
          className="flex items-start gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-[var(--shadow-border)]"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-serif text-sm text-primary-fg tabular-nums">
            {i + 1}
          </span>
          <span className="min-w-0 flex-1 pt-0.5">
            <span className="block text-sm leading-relaxed sm:text-base">
              <RichText text={item} />
            </span>
            {showArabic && ar?.[i] ? (
              <span className="ar mt-2 block text-sm leading-relaxed text-muted" dir="rtl" lang="ar">
                {ar[i]}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

function splitPart(label: string, ask?: string) {
  const m = label.match(/^\(([a-e])\)\s*(.*)$/i);
  if (m) return { letter: m[1].toLowerCase(), ask: ask ?? m[2] };
  return { letter: "", ask: ask ?? label };
}

function WorkedQuestion({
  question,
  parts,
  ar,
  chart,
}: {
  question: string;
  chart?: FrqChart;
  parts: {
    label: string;
    ask?: string;
    askAr?: string;
    lines: { lhs?: string; op?: string; rhs: string; note?: string; ar?: string }[];
    answer?: string;
    answerAr?: string;
  }[];
  ar?: string;
}) {
  const showArabic = useStudent((s) => s.showArabic);
  return (
    <article className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
      <div className="px-5 py-5 sm:px-7">
        <p className="kicker text-accent">Worked question</p>
        <p className="mt-2 font-serif text-xl leading-snug text-primary sm:text-2xl">
          <RichText text={question} />
        </p>
        {chart ? <FrqChartView chart={chart} /> : null}
      </div>

      <div className="flex flex-col">
        {parts.map((part, pi) => {
          const { letter, ask } = splitPart(part.label, part.ask);
          return (
            <section key={part.label} className="border-t border-border px-5 py-5 sm:px-7">
              <div className="flex items-start gap-3.5">
                {letter ? (
                  <span className="math mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-base text-primary-fg">
                    {letter}
                  </span>
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg leading-snug text-fg sm:text-xl">{ask}</p>
                  {showArabic && part.askAr ? (
                    <p className="ar mt-1 text-xs leading-relaxed text-muted" dir="rtl" lang="ar">
                      {part.askAr}
                    </p>
                  ) : null}

                  <MathWorking parts={[part]} embed />
                </div>
              </div>
            </section>
          );
        })}
      </div>
      {ar ? (
        <div className="border-t border-border px-5 py-4 sm:px-7">
          <ArabicHint text={ar} />
        </div>
      ) : null}
    </article>
  );
}

function looksNumeric(value: string) {
  const v = value.replace(/,/g, "").trim();
  if (!v || v === "—" || v === "–" || v === "-") return true;
  const stripped = v
    .replace(/^AED\s*/i, "")
    .replace(/^\$/, "")
    .replace(/\s*AED$/i, "")
    .replace(/%$/, "")
    .replace(/°[Ff]?$/, "");
  return /^-?\d+(\.\d+)?$/.test(stripped);
}

function columnNumeric(rows: string[][], footer: string[] | undefined, ci: number) {
  const cells = [...rows.map((r) => r[ci] ?? ""), ...(footer ? [footer[ci] ?? ""] : "")];
  const meaningful = cells.filter((c) => c && c !== "—" && c !== "–");
  if (meaningful.length === 0) return false;
  return meaningful.every(looksNumeric);
}

function ResponsiveTable({
  caption,
  headers,
  rows,
  footer,
  emphasis,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
  footer?: string[];
  emphasis?: number[];
}) {
  const numericCols = headers.map((_, ci) => columnNumeric(rows, footer, ci));
  const hot = new Set(emphasis ?? []);

  return (
    <div className="overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
      {caption ? (
        <p className="border-b border-border px-4 py-3 text-sm font-medium text-fg">{caption}</p>
      ) : null}

      <ul className="divide-y divide-border sm:hidden">
        {rows.map((row, ri) => (
          <li key={ri} className={cn("px-4 py-3", hot.has(ri) && "bg-ok-soft")}>
            {hot.has(ri) ? <p className="kicker mb-2 text-ok">This row</p> : null}
            <div className="flex flex-col gap-2">
              {row.map((cell, ci) => (
                <div key={`${ri}-${ci}`} className="flex items-baseline justify-between gap-4">
                  <span className="shrink-0 text-xs font-medium text-muted">{headers[ci] ?? `Col ${ci + 1}`}</span>
                  <span
                    className={cn(
                      "min-w-0 text-right text-sm leading-snug text-fg",
                      ci === 0 && "font-medium",
                      numericCols[ci] && "tabular-nums",
                    )}
                  >
                    {cell}
                  </span>
                </div>
              ))}
            </div>
          </li>
        ))}
        {footer ? (
          <li className="bg-primary/6 px-4 py-3">
            <div className="flex flex-col gap-2">
              {footer.map((cell, ci) => (
                <div key={`f-${ci}`} className="flex items-baseline justify-between gap-4">
                  <span className="shrink-0 text-xs font-medium text-muted">{headers[ci]}</span>
                  <span className={cn("text-sm font-semibold text-primary", numericCols[ci] && "tabular-nums")}>
                    {cell}
                  </span>
                </div>
              ))}
            </div>
          </li>
        ) : null}
      </ul>

      <div className="hidden sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-primary text-primary-fg">
              {headers.map((h, ci) => (
                <th
                  key={h}
                  className={cn(
                    "px-4 py-3 font-medium",
                    numericCols[ci] ? "text-right tabular-nums" : "text-left",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  hot.has(ri) ? "bg-ok-soft" : ri % 2 === 0 ? "bg-surface" : "bg-surface-2/70",
                )}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "px-4 py-2.5 align-middle leading-snug",
                      ci === 0 && "font-medium text-fg",
                      numericCols[ci] ? "text-right tabular-nums" : "text-left",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {footer ? (
            <tfoot>
              <tr className="border-t border-border bg-primary/8">
                {footer.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "px-4 py-3 font-semibold text-primary",
                      numericCols[ci] ? "text-right tabular-nums" : "text-left",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    </div>
  );
}
