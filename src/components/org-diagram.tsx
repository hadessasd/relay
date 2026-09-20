import { type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Building2,
  GitFork,
  Layers,
  LayoutGrid,
  LayoutList,
  RefreshCw,
  Rows3,
  Share2,
  Table2,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { DiagramKind } from "@/data/types";
import { cn } from "@/lib/cn";

const copy: Record<
  DiagramKind,
  { kicker: string; title: string; shape: string; remember: string; exam: string }
> = {
  hierarchy: {
    kicker: "Pyramid of bosses",
    title: "Hierarchical",
    shape: "PYRAMID",
    remember: "Many layers. Clear control. Slow to move.",
    exam: "If you see a pyramid of bosses, write: hierarchical.",
  },
  functional: {
    kicker: "Cut by job",
    title: "Functional",
    shape: "FOUR ROOMS",
    remember: "Finance · HR · Marketing · Operations. Deep skill. Risk: silos.",
    exam: "If you see four rooms under one owner, write: functional.",
  },
  divisional: {
    kicker: "Cut by place / product",
    title: "Divisional",
    shape: "THREE SHOPS",
    remember: "Each branch is almost its own company. Risk: duplicate teams.",
    exam: "If you see Sharjah / Dubai / Riyadh each with a kitchen, write: divisional.",
  },
  matrix: {
    kicker: "Two arrows",
    title: "Matrix",
    shape: "GRID",
    remember: "Function AND project. One person, two bosses.",
    exam: "If Maya sits on two projects, write: matrix.",
  },
  flat: {
    kicker: "Almost no ladder",
    title: "Flat",
    shape: "PANCAKE",
    remember: "Fast talk. Tired founder. Fuzzy roles.",
    exam: "If you see two founders then one row of jobs, write: flat.",
  },
  network: {
    kicker: "Hub + partners",
    title: "Network",
    shape: "HUB",
    remember: "Small centre. Many partner firms. Hard to control the rim.",
    exam: "If partners sit around a small café, write: network.",
  },
  team: {
    kicker: "Work lives in teams",
    title: "Team / project",
    shape: "PROJECTS",
    remember: "Each project has its own mix of jobs. Unstable when the project ends.",
    exam: "If CEO then Project 1 / 2 / 3, write: team-based / project.",
  },
  levels: {
    kicker: "Who decides",
    title: "Three levels",
    shape: "BANDS",
    remember: "Top = years. Middle = months. Low = today.",
    exam: "New country = Top. Department plan = Middle. Roster = Low.",
  },
  polc: {
    kicker: "Not a one-way street",
    title: "POLC cycle",
    shape: "LOOP",
    remember: "Plan → Organize → Lead → Control → plan again.",
    exam: "Write P O L C in order, then add: it is a cycle.",
  },
  lifecycle: {
    kicker: "Mood of the firm",
    title: "Life cycle",
    shape: "FOUR AGES",
    remember: "Start → Grow → Mature → Decline (or reinvent).",
    exam: "Startup = survive. Growth = scale. Maturity = keep. Decline = cut or reinvent.",
  },
  compare: {
    kicker: "Seven silhouettes",
    title: "Draw these from memory",
    shape: "CHEAT STRIP",
    remember: "Pyramid, rooms, shops, grid, pancake, hub, projects.",
    exam: "Match the shape to the name. One picture, one word.",
  },
};

const icons: Record<DiagramKind, LucideIcon> = {
  hierarchy: GitFork,
  functional: LayoutGrid,
  divisional: Building2,
  matrix: Table2,
  flat: Rows3,
  network: Share2,
  team: UsersRound,
  levels: Layers,
  polc: RefreshCw,
  lifecycle: TrendingUp,
  compare: LayoutList,
};

export function OrgDiagram({ kind, caption }: { kind: DiagramKind; caption?: string }) {
  const meta = copy[kind];
  const Icon = icons[kind];
  return (
    <figure className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="kicker text-accent">{meta.kicker}</p>
            <h4 className="mt-1 font-serif text-xl text-primary sm:text-2xl">{meta.title}</h4>
          </div>
        </div>
        <p className="rounded-full bg-warn-soft px-3 py-1 text-xs font-semibold tracking-wide text-warn">
          Shape · {meta.shape}
        </p>
      </div>
      <p className="border-b border-border px-4 py-2 text-sm text-muted sm:px-5">{meta.remember}</p>
      <div className="overflow-x-auto px-3 py-5 sm:px-6 sm:py-6">{draw(kind)}</div>
      <p className="border-t border-border bg-ok-soft px-4 py-3 text-sm leading-relaxed text-ok sm:px-5">
        {meta.exam}
      </p>
      {caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function draw(kind: DiagramKind) {
  switch (kind) {
    case "hierarchy":
      return <HierarchyChart />;
    case "functional":
      return <FunctionalChart />;
    case "divisional":
      return <DivisionalChart />;
    case "matrix":
      return <MatrixChart />;
    case "flat":
      return <FlatChart />;
    case "network":
      return <NetworkChart />;
    case "team":
      return <TeamChart />;
    case "levels":
      return <LevelsChart />;
    case "polc":
      return <PolcChart />;
    case "lifecycle":
      return <LifecycleChart />;
    case "compare":
      return <CompareStrip />;
    default:
      return null;
  }
}

function Node({
  label,
  sub,
  tone = "ink",
  wide,
}: {
  label: string;
  sub?: string;
  tone?: "ink" | "primary" | "accent" | "ok" | "warn";
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl px-2.5 py-2 text-center shadow-[var(--shadow-border)]",
        wide ? "min-w-32 sm:min-w-40" : "min-w-20 sm:min-w-24",
        tone === "primary" && "bg-primary text-primary-fg",
        tone === "accent" && "bg-accent text-accent-fg",
        tone === "ok" && "bg-ok-soft text-ok",
        tone === "warn" && "bg-warn-soft text-warn",
        tone === "ink" && "bg-surface-2 text-fg",
      )}
    >
      <p className="text-xs font-semibold leading-tight break-words text-wrap sm:text-sm">{label}</p>
      {sub ? <p className="mt-0.5 text-xs leading-tight break-words opacity-80">{sub}</p> : null}
    </div>
  );
}

function Stem() {
  return <div className="h-3 w-px bg-primary/30 sm:h-4" />;
}

function Fork({ children }: { children: ReactNode }) {
  const items = Array.isArray(children) ? children : [children];
  const n = items.length;
  return (
    <div className="flex w-full min-w-0">
      {items.map((child, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex h-3 w-full sm:h-4">
            <div className={cn("h-px w-1/2 self-end", i === 0 ? "bg-transparent" : "bg-primary/30")} />
            <div className={cn("h-px w-1/2 self-end", i === n - 1 ? "bg-transparent" : "bg-primary/30")} />
          </div>
          <Stem />
          {child}
        </div>
      ))}
    </div>
  );
}

function Tree({ top, children }: { top: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full min-w-72 max-w-xl flex-col items-center">
      {top}
      <Stem />
      <Fork>{children}</Fork>
    </div>
  );
}

function HierarchyChart() {
  return (
    <div className="mx-auto flex w-full min-w-80 max-w-lg flex-col items-center gap-4">
      <div className="flex w-full flex-col items-center">
        <Node label="Owner / CEO" sub="Years · vision" tone="primary" wide />
        <Stem />
        <Fork>
          <div className="flex min-w-36 flex-col items-center">
            <Node label="Ops director" sub="Kitchen + floor" tone="accent" />
            <Stem />
            <div className="flex gap-2">
              <Node label="Shift lead" sub="Today" />
              <Node label="Head cook" sub="Today" />
            </div>
          </div>
          <div className="flex min-w-36 flex-col items-center">
            <Node label="Finance lead" sub="Money" tone="accent" />
            <Stem />
            <div className="flex gap-2">
              <Node label="Cashier" sub="Till" />
              <Node label="Buyer" sub="Stock" />
            </div>
          </div>
        </Fork>
      </div>
      <ol className="grid w-full grid-cols-3 gap-2 text-center text-xs">
        <li className="rounded-xl bg-primary px-2 py-2 text-primary-fg">
          <p className="font-serif text-sm">Top</p>
          <p className="opacity-80">Years</p>
        </li>
        <li className="rounded-xl bg-accent px-2 py-2 text-accent-fg">
          <p className="font-serif text-sm">Middle</p>
          <p className="opacity-80">Months</p>
        </li>
        <li className="rounded-xl bg-surface-2 px-2 py-2 text-fg">
          <p className="font-serif text-sm">Low</p>
          <p className="opacity-80">Today</p>
        </li>
      </ol>
    </div>
  );
}

function FunctionalChart() {
  const rooms = [
    { name: "Finance", sub: "Money", hint: "Till" },
    { name: "HR", sub: "People", hint: "Lockers" },
    { name: "Marketing", sub: "Guests", hint: "Page" },
    { name: "Operations", sub: "Kitchen", hint: "Make" },
  ];
  return (
    <div className="mx-auto flex w-full min-w-80 max-w-xl flex-col items-center">
      <Node label="Café owner" sub="One boss · four rooms" tone="primary" wide />
      <Stem />
      <div className="h-px w-full max-w-md bg-primary/30" />
      <div className="grid w-full max-w-md grid-cols-2 gap-2 sm:grid-cols-4">
        {rooms.map((room) => (
          <div key={room.name} className="flex flex-col items-center">
            <Stem />
            <div className="w-full rounded-2xl bg-surface-2 px-2 py-3 text-center shadow-[var(--shadow-border)]">
              <p className="text-xs font-semibold sm:text-sm">{room.name}</p>
              <p className="text-xs text-muted">{room.sub}</p>
              <p className="mt-2 rounded-md bg-accent/15 px-1 py-1 text-xs text-accent">{room.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DivisionalChart() {
  return (
    <Tree top={<Node label="Owner" sub="Three mini-cafés" tone="primary" wide />}>
      <MiniCompany place="Sharjah" />
      <MiniCompany place="Dubai" />
      <MiniCompany place="Riyadh" />
    </Tree>
  );
}

function MiniCompany({ place }: { place: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Node label={place} sub="Its own P&L" tone="accent" />
      <div className="grid grid-cols-2 gap-1">
        <Node label="Fin" />
        <Node label="Ops" />
      </div>
    </div>
  );
}

function MatrixChart() {
  const rows = [
    { fn: "Marketing", a: "Maya", b: "Maya" },
    { fn: "Operations", a: "Yusuf", b: "Aisha" },
    { fn: "Finance", a: "Noor", b: "Noor" },
  ];
  return (
    <div className="mx-auto w-full min-w-80 max-w-lg">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="rounded-full bg-primary px-3 py-1 text-primary-fg">Function ↓</span>
        <span className="text-muted">plus</span>
        <span className="rounded-full bg-accent px-3 py-1 text-accent-fg">Project →</span>
        <span className="text-muted">= two bosses</span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-center text-xs sm:text-sm">
          <thead>
            <tr className="bg-primary text-primary-fg">
              <th className="px-2 py-2.5 font-medium">Function ↓</th>
              <th className="px-2 py-2.5 font-medium">Project · National Day</th>
              <th className="px-2 py-2.5 font-medium">Project · Exam week</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.fn} className={i % 2 ? "bg-surface-2/70" : "bg-surface"}>
                <th className="px-2 py-2.5 text-left font-medium text-fg">{row.fn}</th>
                <td className="px-2 py-2.5">
                  <span className="inline-flex min-h-8 min-w-16 items-center justify-center rounded-lg bg-ok-soft px-2 text-ok">
                    {row.a}
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  <span
                    className={cn(
                      "inline-flex min-h-8 min-w-16 items-center justify-center rounded-lg px-2",
                      row.a === row.b ? "bg-warn-soft text-warn" : "bg-ok-soft text-ok",
                    )}
                  >
                    {row.b}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-xs text-warn">Amber names have two bosses. That is the power and the headache.</p>
    </div>
  );
}

function FlatChart() {
  return (
    <div className="mx-auto flex w-full min-w-72 max-w-xl flex-col items-center">
      <div className="flex gap-2">
        <Node label="Co-founder" sub="Kitchen" tone="primary" />
        <Node label="Co-founder" sub="Guests" tone="primary" />
      </div>
      <Stem />
      <div className="h-px w-11/12 bg-primary/30" />
      <div className="flex w-full">
        {["Barista", "Cook", "Till", "Instagram", "Clean"].map((role) => (
          <div key={role} className="flex flex-1 flex-col items-center">
            <Stem />
            <Node label={role} />
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkChart() {
  return (
    <div className="relative mx-auto w-full min-w-72 max-w-md">
      <div className="pointer-events-none absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-primary/30" />
      <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-primary/30" />
      <div className="relative grid grid-cols-3 grid-rows-3 items-center justify-items-center gap-2">
        <div />
        <Node label="Roaster" sub="Partner" />
        <div />
        <Node label="Delivery app" sub="Partner" />
        <Node label="The café" sub="Small centre" tone="primary" wide />
        <Node label="Accountant" sub="Partner" />
        <div />
        <Node label="Cleaners" sub="Partner" />
        <div />
      </div>
    </div>
  );
}

function TeamChart() {
  return (
    <Tree top={<Node label="Owner" sub="Projects, not departments" tone="primary" wide />}>
      <ProjectCol name="Launch week" jobs={["Mkt", "Ops", "Writer"]} />
      <ProjectCol name="Ramadan" jobs={["Mkt", "Ops", "Writer"]} />
      <ProjectCol name="Delivery" jobs={["Mkt", "Ops", "Writer"]} />
    </Tree>
  );
}

function ProjectCol({ name, jobs }: { name: string; jobs: string[] }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Node label={name} tone="accent" />
      {jobs.map((job) => (
        <Node key={job} label={job} />
      ))}
    </div>
  );
}

function LevelsChart() {
  const rows = [
    { kicker: "TOP", who: "CEO · Board · MD", does: "New country. Vision. Years.", tone: "primary" as const },
    { kicker: "MIDDLE", who: "Department managers", does: "Turn the vision into a plan. Months.", tone: "accent" as const },
    { kicker: "LOW", who: "Supervisors · first-line", does: "Roster, coaching, today’s queue.", tone: "ink" as const },
  ];
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
      {rows.map((row, i) => (
        <div
          key={row.kicker}
          className={cn(
            "flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[var(--shadow-border)]",
            row.tone === "primary" && "bg-primary text-primary-fg",
            row.tone === "accent" && "bg-accent text-accent-fg",
            row.tone === "ink" && "bg-surface-2 text-fg",
            i === 1 && "mx-3",
            i === 2 && "mx-6",
          )}
        >
          <p className="w-16 shrink-0 font-serif text-lg">{row.kicker}</p>
          <div className="min-w-0">
            <p className="text-sm font-medium">{row.who}</p>
            <p className="text-xs opacity-80">{row.does}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PolcChart() {
  const cell = (letter: string, name: string, line: string) => (
    <div className="flex h-full min-h-28 flex-col items-center justify-center rounded-2xl bg-surface-2 px-3 py-4 text-center shadow-[var(--shadow-border)]">
      <span className="flex size-10 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-fg">
        {letter}
      </span>
      <p className="mt-2 font-medium text-fg">{name}</p>
      <p className="mt-0.5 text-xs text-muted">{line}</p>
    </div>
  );
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr] items-center gap-2">
        {cell("P", "Plan", "Write the map")}
        <ArrowRight className="size-5 text-accent" aria-hidden />
        {cell("O", "Organize", "Who + tools")}
        <ArrowUp className="size-5 justify-self-center text-accent" aria-hidden />
        <p className="rounded-full bg-accent px-3 py-1 text-center text-xs font-semibold tracking-wide text-accent-fg uppercase">
          cycle
        </p>
        <ArrowDown className="size-5 justify-self-center text-accent" aria-hidden />
        {cell("C", "Control", "Check the GPS")}
        <ArrowLeft className="size-5 text-accent" aria-hidden />
        {cell("L", "Lead", "Talk + motivate")}
      </div>
      <p className="mt-4 text-center text-sm text-muted">Clockwise: Plan → Organize → Lead → Control → plan again.</p>
    </div>
  );
}

function LifecycleChart() {
  const stages = [
    { name: "Startup", shout: "Make it · sell it · cash", tone: "ok" as const },
    { name: "Growth", shout: "Hire · scale · fund", tone: "accent" as const },
    { name: "Maturity", shout: "Keep quality + profit", tone: "primary" as const },
    { name: "Decline", shout: "Cut, rethink, or reinvent", tone: "warn" as const },
  ];
  return (
    <ol className="mx-auto grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
      {stages.map((stage, i) => (
        <li key={stage.name} className="flex flex-col">
          <div
            className={cn(
              "flex min-h-28 flex-col justify-between rounded-2xl px-3 py-3 shadow-[var(--shadow-border)]",
              stage.tone === "ok" && "bg-ok-soft text-ok",
              stage.tone === "accent" && "bg-accent text-accent-fg",
              stage.tone === "primary" && "bg-primary text-primary-fg",
              stage.tone === "warn" && "bg-warn-soft text-warn",
            )}
          >
            <p className="font-serif text-xs tabular-nums opacity-70">0{i + 1}</p>
            <div>
              <p className="font-serif text-lg">{stage.name}</p>
              <p className="mt-1 text-xs leading-snug opacity-90">{stage.shout}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function CompareStrip() {
  const items: { kind: Exclude<DiagramKind, "compare" | "levels" | "polc" | "lifecycle">; shape: string; word: string }[] = [
    { kind: "hierarchy", shape: "Pyramid", word: "Hierarchical" },
    { kind: "functional", shape: "Four rooms", word: "Functional" },
    { kind: "divisional", shape: "Three shops", word: "Divisional" },
    { kind: "matrix", shape: "Grid", word: "Matrix" },
    { kind: "flat", shape: "Pancake", word: "Flat" },
    { kind: "network", shape: "Hub", word: "Network" },
    { kind: "team", shape: "Projects", word: "Team / project" },
  ];
  return (
    <div className="mx-auto w-full max-w-3xl">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.kind}
            className="flex flex-col items-center gap-2 rounded-2xl bg-surface-2 px-3 py-4 text-center shadow-[var(--shadow-border)]"
          >
            <MiniShape kind={item.kind} />
            <p className="text-xs font-semibold tracking-wide text-accent uppercase">{item.shape}</p>
            <p className="font-serif text-base text-primary">{item.word}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center font-serif text-base text-primary sm:text-lg">
        Pyramid, rooms, shops, grid, pancake, hub, projects.
      </p>
    </div>
  );
}

function MiniShape({ kind }: { kind: "hierarchy" | "functional" | "divisional" | "matrix" | "flat" | "network" | "team" }) {
  if (kind === "hierarchy") {
    return (
      <div className="flex h-14 flex-col items-center justify-end gap-1">
        <span className="block h-1.5 w-6 rounded-sm bg-primary" />
        <span className="block h-1.5 w-10 rounded-sm bg-accent" />
        <span className="block h-1.5 w-14 rounded-sm bg-fg/30" />
      </div>
    );
  }
  if (kind === "functional") {
    return (
      <div className="flex h-14 flex-col items-center justify-end gap-1">
        <span className="block h-1.5 w-10 rounded-sm bg-primary" />
        <div className="flex gap-1">
          <span className="block h-6 w-3 rounded-sm bg-surface" />
          <span className="block h-6 w-3 rounded-sm bg-surface" />
          <span className="block h-6 w-3 rounded-sm bg-surface" />
          <span className="block h-6 w-3 rounded-sm bg-surface" />
        </div>
      </div>
    );
  }
  if (kind === "divisional") {
    return (
      <div className="flex h-14 flex-col items-center justify-end gap-1">
        <span className="block h-1.5 w-10 rounded-sm bg-primary" />
        <div className="flex gap-1">
          <span className="block h-7 w-5 rounded-sm bg-accent" />
          <span className="block h-7 w-5 rounded-sm bg-accent" />
          <span className="block h-7 w-5 rounded-sm bg-accent" />
        </div>
      </div>
    );
  }
  if (kind === "matrix") {
    return (
      <div className="grid h-14 w-14 grid-cols-3 grid-rows-3 gap-0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className={cn("rounded-sm", i === 4 ? "bg-warn" : "bg-primary/40")} />
        ))}
      </div>
    );
  }
  if (kind === "flat") {
    return (
      <div className="flex h-14 flex-col items-center justify-end gap-1">
        <div className="flex gap-1">
          <span className="block size-2 rounded-full bg-primary" />
          <span className="block size-2 rounded-full bg-primary" />
        </div>
        <span className="block h-2 w-16 rounded-sm bg-fg/30" />
      </div>
    );
  }
  if (kind === "network") {
    return (
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute h-px w-12 bg-primary/30" />
        <span className="absolute h-12 w-px bg-primary/30" />
        <span className="relative block size-4 rounded-full bg-primary" />
      </div>
    );
  }
  return (
    <div className="flex h-14 items-end gap-1">
      <span className="block h-8 w-3 rounded-sm bg-accent" />
      <span className="block h-10 w-3 rounded-sm bg-accent" />
      <span className="block h-6 w-3 rounded-sm bg-accent" />
    </div>
  );
}
