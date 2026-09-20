import type { CalloutKind, ContentBlock } from "@/data/types";
import { Art } from "@/components/art";
import { OrgDiagram } from "@/components/org-diagram";
import { ProfitLab } from "@/components/profit-lab";
import { cn } from "@/lib/cn";
import { RichText } from "./rich-text";

const calloutTone: Record<CalloutKind, string> = {
  exam: "bg-primary/8 border-primary/20",
  formula: "bg-warn-soft border-[#e2d2b0]",
  trap: "bg-bad-soft border-[#e4c8c3]",
  story: "bg-ok-soft border-[#c9dece]",
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
      return (
        <ol className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary font-serif text-sm text-primary-fg tabular-nums">
                {i + 1}
              </span>
              <span className="pt-0.5 text-sm leading-relaxed sm:text-base">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className={cn("rounded-2xl border px-4 py-4 sm:px-5", calloutTone[block.kind])}>
          <p className="mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            {block.title || calloutLabel[block.kind]}
          </p>
          <p className="text-sm leading-relaxed text-fg sm:text-base">
            <RichText text={block.text} />
          </p>
        </aside>
      );
    case "table":
      return <ResponsiveTable caption={block.caption} headers={block.headers} rows={block.rows} />;
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
    case "lab":
      return block.kind === "profit" ? <ProfitLab /> : null;
    case "diagram":
      return <OrgDiagram kind={block.kind} caption={block.caption} />;
    default:
      return null;
  }
}

function ResponsiveTable({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
      {caption ? (
        <p className="border-b border-border px-4 py-2.5 text-xs font-medium tracking-wide text-muted uppercase">
          {caption}
        </p>
      ) : null}
      <ul className="divide-y divide-border sm:hidden">
        {rows.map((row, ri) => (
          <li key={ri} className="px-4 py-3">
            {row.map((cell, ci) => (
              <div
                key={`${ri}-${ci}`}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-1 first:pt-0 last:pb-0"
              >
                <span className="pt-0.5 text-[11px] font-semibold tracking-wide text-muted uppercase">
                  {headers[ci] ?? `Col ${ci + 1}`}
                </span>
                <span className={cn("text-sm leading-relaxed", ci === 0 && "font-medium text-fg")}>{cell}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead>
            <tr className="bg-primary text-primary-fg">
              {headers.map((h) => (
                <th key={h} className="px-3 py-2.5 font-medium whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-surface" : "bg-surface-2/60"}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn("px-3 py-2.5 align-top leading-snug", ci === 0 && "font-medium text-fg")}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
