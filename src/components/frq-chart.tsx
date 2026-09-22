import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { FrqChart } from "@/data/types";
import { cn } from "@/lib/cn";

const FILLS = [
  "var(--color-primary)",
  "var(--color-accent)",
  "var(--color-warn)",
  "var(--color-ok)",
  "var(--color-muted)",
];

export function FrqChartView({ chart }: { chart: FrqChart }) {
  return (
    <figure className="mt-4 overflow-hidden rounded-2xl bg-surface-2 shadow-[var(--shadow-border)]">
      <figcaption className="border-b border-border px-4 py-3 sm:px-5">
        <p className="kicker text-accent">Read this chart</p>
        <p className="mt-1 font-serif text-lg text-primary">{chart.title}</p>
      </figcaption>
      <div className="px-3 py-4 sm:px-5">
        {chart.kind === "pie" ? <PieBlock chart={chart} /> : null}
        {chart.kind === "bar" || chart.kind === "histogram" ? <BarBlock chart={chart} /> : null}
        {chart.kind === "table" ? <TableBlock chart={chart} /> : null}
      </div>
    </figure>
  );
}

function PieBlock({ chart }: { chart: Extract<FrqChart, { kind: "pie" }> }) {
  const total = chart.slices.reduce((s, x) => s + x.value, 0) || 1;
  const data = chart.slices.map((s, i) => ({
    name: s.label,
    value: s.value,
    fill: FILLS[i % FILLS.length],
  }));
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-center">
      <div className="mx-auto size-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={32}
              outerRadius={78}
              stroke="var(--color-surface-2)"
              strokeWidth={3}
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex flex-col gap-2">
        {chart.slices.map((s, i) => {
          const pct = Math.round((s.value / total) * 1000) / 10;
          return (
            <li key={s.label} className="flex min-w-0 items-center justify-between gap-3 rounded-xl bg-surface px-3 py-2.5">
              <span className="flex min-w-0 items-center gap-2.5 text-sm">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: FILLS[i % FILLS.length] }} />
                <span className="min-w-0 leading-snug">{s.label}</span>
              </span>
              <span className="math shrink-0 text-lg text-primary">
                {s.value}
                {total === 100 ? "%" : ""}
                {total !== 100 ? <span className="ml-1.5 text-xs text-muted">{pct}%</span> : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function niceTicks(max: number) {
  const raw = Math.max(max * 1.2, max + 1);
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / pow;
  const step = n <= 1.2 ? pow / 5 : n <= 2 ? pow / 2 : n <= 5 ? pow : pow * 2;
  const top = Math.ceil(raw / step) * step;
  const ticks: number[] = [];
  for (let t = 0; t <= top + 1e-9; t += step) ticks.push(Math.round(t * 1000) / 1000);
  return ticks;
}

function BarBlock({ chart }: { chart: Extract<FrqChart, { kind: "bar" | "histogram" }> }) {
  const max = Math.max(...chart.bars.map((b) => b.value), 1);
  const ticks = niceTicks(max);
  const plotMax = ticks[ticks.length - 1] || max;
  const tight = chart.kind === "histogram";

  return (
    <div>
      <ul className="flex flex-col gap-3 sm:hidden">
        {chart.bars.map((b, i) => {
          const pct = Math.max(8, Math.round((b.value / plotMax) * 100));
          return (
            <li key={b.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="min-w-0 text-sm font-medium leading-snug text-fg">{b.label}</span>
                <span className="math shrink-0 text-lg text-primary">{b.value}</span>
              </div>
              <div className="h-3.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: tight ? "var(--color-primary)" : FILLS[i % FILLS.length],
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="hidden sm:block">
        <div className="flex">
          <div className="relative h-52 w-9 shrink-0">
            {ticks.map((t) => (
              <span
                key={t}
                className="math absolute right-1.5 text-xs text-muted"
                style={{ bottom: `${(t / plotMax) * 100}%`, transform: "translateY(50%)" }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="relative h-52 min-w-0 flex-1 border-b border-l border-border">
            {ticks
              .filter((t) => t > 0)
              .map((t) => (
                <div
                  key={t}
                  className="absolute inset-x-0 border-t border-border/70"
                  style={{ bottom: `${(t / plotMax) * 100}%` }}
                />
              ))}
            <div className={cn("absolute inset-0 flex", tight ? "gap-px px-0" : "gap-3 px-3")}>
              {chart.bars.map((b, i) => {
                const pct = (b.value / plotMax) * 100;
                return (
                  <div key={b.label} className="relative min-w-0 flex-1">
                    <div
                      className={cn("absolute inset-x-0 bottom-0", tight ? "rounded-t-sm" : "rounded-t-lg")}
                      style={{
                        height: `${pct}%`,
                        background: tight ? "var(--color-primary)" : FILLS[i % FILLS.length],
                      }}
                    />
                    <span
                      className="math absolute inset-x-0 text-center text-sm text-primary"
                      style={{ bottom: `calc(${pct}% + 6px)` }}
                    >
                      {b.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-9 shrink-0" />
          <div className={cn("flex min-w-0 flex-1", tight ? "gap-px" : "gap-3 px-3")}>
            {chart.bars.map((b) => (
              <p
                key={b.label}
                className="math min-w-0 flex-1 pt-2 text-center text-xs leading-snug whitespace-nowrap text-muted"
              >
                {b.label}
              </p>
            ))}
          </div>
        </div>
      </div>
      {chart.unit ? <p className="mt-3 text-xs text-muted">Values in {chart.unit}</p> : null}
    </div>
  );
}

function TableBlock({ chart }: { chart: Extract<FrqChart, { kind: "table" }> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[18rem] text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            {chart.headers.map((h) => (
              <th key={h} className="px-2 py-2 font-medium text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((row, ri) => (
            <tr
              key={row.join("-")}
              className={cn("border-b border-border/70", chart.emphasis?.includes(ri) && "bg-ok-soft")}
            >
              {row.map((cell, ci) => (
                <td key={`${ri}-${ci}`} className={cn("px-2 py-2", ci > 0 && "math")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {chart.footer ? (
          <tfoot>
            <tr className="font-medium text-primary">
              {chart.footer.map((cell, i) => (
                <td key={`f-${i}`} className={cn("px-2 py-2", i > 0 && "math")}>
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
