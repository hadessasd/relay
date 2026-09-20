import { useMemo, useState } from "react";
import { Art, ART } from "@/components/art";
import { cn } from "@/lib/cn";

const stalls = [
  { id: "karak", label: "Karak stall", income: 1200, cost: 740, note: "Cups, tea, sugar, ice" },
  { id: "cafe", label: "Campus café", income: 18000, cost: 14200, note: "Rent, staff, stock" },
  { id: "salon", label: "Salon, slow month", income: 9000, cost: 9000, note: "Same money in and out" },
  { id: "phone", label: "Phone-case shop", income: 4000, cost: 5100, note: "Rent plus leftover stock" },
];

function money(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `AED ${Math.round(n).toLocaleString("en-AE")}`;
}

export function ProfitLab() {
  const [picked, setPicked] = useState(stalls[0].id);
  const [income, setIncome] = useState(String(stalls[0].income));
  const [cost, setCost] = useState(String(stalls[0].cost));

  const inc = Number(income);
  const out = Number(cost);
  const raw = inc - out;
  const result = Number.isFinite(raw) ? raw : 0;
  const kind = !Number.isFinite(inc) || !Number.isFinite(out) ? "wait" : result > 0 ? "profit" : result < 0 ? "loss" : "even";
  const max = Math.max(inc || 0, out || 0, 1);
  const incomePct = Math.min(100, ((inc || 0) / max) * 100);
  const costPct = Math.min(100, ((out || 0) / max) * 100);

  const story = useMemo(() => {
    if (kind === "wait") return "Type two numbers. Income is money in. Cost is money out.";
    if (kind === "profit") return `${money(inc)} − ${money(out)} = ${money(result)} left over. That leftover is profit.`;
    if (kind === "loss") return `${money(inc)} − ${money(out)} = ${money(result)}. Write this as a loss of ${money(Math.abs(result))} — not “negative profit”.`;
    return "Income and cost are the same. That is break-even: profit AED 0.";
  }, [kind, inc, out, result]);

  function load(id: string) {
    const stall = stalls.find((s) => s.id === id);
    if (!stall) return;
    setPicked(id);
    setIncome(String(stall.income));
    setCost(String(stall.cost));
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
      <div className="relative h-36 sm:h-44">
        <Art src={ART.profit} alt="Ledger, coins and a café till" />
        <div className="art-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="kicker text-primary-fg/75">Try the numbers</p>
          <h3 className="mt-1 font-serif text-2xl tracking-tight text-primary-fg">Profit = Income − Cost</h3>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-sm text-muted">Tap a stall, or type your own AED amounts. The formula does not change.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stalls.map((stall) => (
            <button
              key={stall.id}
              type="button"
              onClick={() => load(stall.id)}
              className={cn(
                "min-h-11 rounded-full px-4 text-sm font-medium transition-colors",
                picked === stall.id ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg hover:bg-border",
              )}
            >
              {stall.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <NumberField
            id="profit-income"
            label="Income (money in)"
            value={income}
            onChange={(v) => {
              setIncome(v);
              setPicked("");
            }}
          />
          <NumberField
            id="profit-cost"
            label="Cost (money out)"
            value={cost}
            onChange={(v) => {
              setCost(v);
              setPicked("");
            }}
          />
        </div>

        <div className="mt-5 space-y-3">
          <Bar label="Income" pct={incomePct} tone="ok" value={money(inc)} />
          <Bar label="Cost" pct={costPct} tone="warn" value={money(out)} />
        </div>

        <aside
          className={cn(
            "mt-5 rounded-2xl px-4 py-4",
            kind === "profit" && "bg-ok-soft text-ok",
            kind === "loss" && "bg-bad-soft text-bad",
            kind === "even" && "bg-warn-soft text-warn",
            kind === "wait" && "bg-surface-2 text-muted",
          )}
        >
          <p className="kicker opacity-80">
            {kind === "profit" ? "Profit" : kind === "loss" ? "Loss" : kind === "even" ? "Break-even" : "Formula"}
          </p>
          <p className="mt-1 font-serif text-3xl tabular-nums tracking-tight">
            {kind === "loss" ? money(Math.abs(result)) : money(result)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-fg">{story}</p>
          <p className="mt-3 font-serif text-sm text-fg italic">
            {stalls.find((s) => s.id === picked)?.note ?? "Your own example."}
          </p>
        </aside>
      </div>
    </section>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium text-fg">{label}</span>
      <input
        id={id}
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
        className="mt-1.5 h-12 w-full rounded-xl border border-border bg-bg px-4 text-base text-fg tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
      />
    </label>
  );
}

function Bar({
  label,
  pct,
  tone,
  value,
}: {
  label: string;
  pct: number;
  tone: "ok" | "warn";
  value: string;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn("h-full rounded-full", tone === "ok" ? "bg-ok" : "bg-warn")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
