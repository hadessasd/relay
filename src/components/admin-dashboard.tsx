import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Copy, KeyRound, Pause, Search, Users } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Art, ART } from "@/components/art";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";
import { universities } from "@/data/universities";
import { cn } from "@/lib/cn";
import {
  createAccessKey,
  listAccessKeys,
  listHeldListings,
  type AccessKeyRow,
  type ShopListing,
} from "@/lib/campus";
import { listRoster, type RosterStudent } from "@/lib/progress";
import { summarizeCourse } from "@/lib/progress-stats";
import { useStudent } from "@/lib/student-store";

export function AdminDashboard() {
  const token = useStudent((s) => s.staffToken);
  const logout = useStudent((s) => s.logout);
  const [students, setStudents] = useState<RosterStudent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [openName, setOpenName] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    listRoster({ data: { token } })
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) {
          setError(res.error);
          if (res.error.includes("expired")) logout();
          return;
        }
        setStudents(res.students);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load the roster.");
      });
    return () => {
      cancelled = true;
    };
  }, [token, logout]);

  const filtered = useMemo(() => {
    const list = students ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((s) => s.name.toLowerCase().includes(q));
  }, [students, query]);

  const totals = useMemo(() => {
    const list = students ?? [];
    const withWork = list.filter((s) => s.results.length > 0).length;
    const avg =
      list.length === 0
        ? 0
        : Math.round(
            list.reduce((sum, s) => {
              const parts = courses.map((c) => summarizeCourse(c.id, s.results));
              const done = parts.reduce((n, p) => n + p.done, 0);
              const total = parts.reduce((n, p) => n + p.total, 0);
              return sum + (total ? (done / total) * 100 : 0);
            }, 0) / list.length,
          );
    return { count: list.length, withWork, avg };
  }, [students]);

  return (
    <div className="paper-wash min-h-dvh">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-lift)]">
          <div className="grid md:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="p-6 sm:p-8">
              <p className="kicker text-accent-fg/70">Owner desk</p>
              <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary-fg sm:text-5xl">
                Keys, holds, learners
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-fg/75">
                Mint a reusable campus key, see courses waiting on hold, and follow every student.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3">
                <Stat label="Learners" value={totals.count} />
                <Stat label="Practising" value={totals.withWork} />
                <Stat label="Avg done" value={`${totals.avg}%`} />
              </dl>
            </div>
            <div className="relative hidden min-h-44 md:block">
              <Art src={ART.staff} alt="" className="absolute inset-0" />
            </div>
          </div>
        </div>

        {token ? <KeysPanel token={token} /> : null}
        {token ? <HoldQueue token={token} /> : null}

        <label className="relative mt-10 block">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a name"
            aria-label="Search a name"
            className="h-12 w-full rounded-xl border border-border bg-surface pr-4 pl-11 text-base text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-primary/35"
          />
        </label>

        {error ? <p className="mt-6 text-sm text-bad">{error}</p> : null}

        {students === null && !error ? (
          <p className="mt-8 text-sm text-muted">Opening the roster…</p>
        ) : null}

        {students && filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-surface px-6 py-12 text-center shadow-[var(--shadow-border)]">
            <Users className="mx-auto size-8 text-muted" />
            <p className="mt-3 font-serif text-2xl text-primary">No learners yet</p>
            <p className="mt-2 text-sm text-muted">
              When a student writes their name and practises, they appear here.
            </p>
          </div>
        ) : null}

        <ul className="mt-6 flex flex-col gap-3">
          {filtered.map((student) => (
            <StudentCard
              key={student.name}
              student={student}
              open={openName === student.name}
              onToggle={() => setOpenName((n) => (n === student.name ? null : student.name))}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

function KeysPanel({ token }: { token: string }) {
  const [uniId, setUniId] = useState("hct");
  const [keys, setKeys] = useState<AccessKeyRow[]>([]);
  const [minted, setMinted] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    listAccessKeys({ data: { token } })
      .then((res) => {
        if (res.ok) setKeys(res.keys);
        else setError(res.error);
      })
      .catch(() => setError("Could not load keys."));
  }, [token]);

  async function mint() {
    setPending(true);
    setError(null);
    try {
      const res = await createAccessKey({ data: { token, uniId } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setMinted(res.code);
      setCopied(false);
      const list = await listAccessKeys({ data: { token } });
      if (list.ok) setKeys(list.keys);
    } catch {
      setError("Could not mint a key.");
    } finally {
      setPending(false);
    }
  }

  async function copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setError("Copy failed — select the key by hand.");
    }
  }

  return (
    <section className="mt-8 rounded-3xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="kicker text-accent">Access keys</p>
      <h2 className="mt-1 font-serif text-2xl text-primary">Reusable for one campus</h2>
      <p className="mt-2 text-sm text-muted">
        One key can be used by the whole class, more than once. Pick a university, then mint.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1 text-sm font-medium">
          Campus
          <select
            value={uniId}
            onChange={(e) => setUniId(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-xl border border-border bg-bg px-3 text-base text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
          >
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.short} — {u.name}
              </option>
            ))}
          </select>
        </label>
        <Button className="sm:mt-7" onClick={() => void mint()} disabled={pending}>
          <KeyRound className="size-4" />
          {pending ? "Minting…" : "Mint key"}
        </Button>
      </div>
      {error ? <p className="mt-3 text-sm text-bad">{error}</p> : null}
      {minted ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-ok-soft px-4 py-3 text-ok">
          <p className="font-serif text-xl tracking-wide tabular-nums">{minted}</p>
          <Button variant="secondary" size="sm" onClick={() => void copy(minted)}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      ) : null}
      {keys.length > 0 ? (
        <ul className="mt-5 divide-y divide-border">
          {keys.map((key) => (
            <li key={key.code} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div>
                <p className="font-medium tabular-nums">{key.code}</p>
                <p className="text-xs text-muted">
                  {universities.find((u) => u.id === key.uniId)?.short ?? key.uniId} · used {key.useCount} times
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => void copy(key.code)}>
                <Copy className="size-4" />
                Copy
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">No keys yet. Mint one for HCT to open the studio.</p>
      )}
    </section>
  );
}

function HoldQueue({ token }: { token: string }) {
  const [rows, setRows] = useState<ShopListing[] | null>(null);

  useEffect(() => {
    listHeldListings({ data: { token } })
      .then((res) => {
        if (res.ok) setRows(res.listings);
        else setRows([]);
      })
      .catch(() => setRows([]));
  }, [token]);

  return (
    <section className="mt-6 rounded-3xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="kicker text-warn">Course review</p>
      <h2 className="mt-1 font-serif text-2xl text-primary">On hold</h2>
      <p className="mt-2 text-sm text-muted">
        Teacher publishes stay here. Approval is paused for now — nothing goes live from this desk.
      </p>
      {rows === null ? <p className="mt-4 text-sm text-muted">Checking the queue…</p> : null}
      {rows && rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted">No courses waiting.</p>
      ) : null}
      <ul className="mt-4 flex flex-col gap-3">
        {(rows ?? []).map((item) => (
          <li key={item.id} className="rounded-2xl border border-border px-4 py-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium text-fg">{item.title}</p>
                <p className="text-sm text-muted">
                  {item.teacherName}
                  {item.subject ? ` · ${item.subject}` : ""} · AED {item.priceAed}
                </p>
              </div>
              <span className="inline-flex min-h-8 items-center gap-1 rounded-full bg-warn-soft px-3 text-xs font-medium text-warn">
                <Pause className="size-3.5" />
                On hold
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{item.summary}</p>
            {item.format || item.duration || item.language ? (
              <p className="mt-2 text-xs text-muted">
                {[item.format, item.duration, item.language].filter(Boolean).join(" · ")}
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button size="sm" disabled>
                Approve
              </Button>
              <span className="text-xs text-muted">Review paused — stays on hold</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-primary-fg/10 px-3 py-3">
      <dt className="kicker text-primary-fg/60">{label}</dt>
      <dd className="mt-1 font-serif text-2xl text-primary-fg tabular-nums">{value}</dd>
    </div>
  );
}

function StudentCard({
  student,
  open,
  onToggle,
}: {
  student: RosterStudent;
  open: boolean;
  onToggle: () => void;
}) {
  const parts = courses.map((c) => summarizeCourse(c.id, student.results));
  const last = formatWhen(student.lastSeen);

  return (
    <li className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-h-14 items-start gap-3 px-4 py-4 text-left sm:px-5"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-serif text-lg text-primary">
          {initials(student.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-medium text-fg">{student.name}</span>
            <span className="text-xs text-muted">{last}</span>
          </span>
          <span className="mt-3 grid gap-3 sm:grid-cols-2">
            {parts.map((part) => (
              <span key={part.courseId} className="block">
                <span className="flex justify-between text-xs text-muted">
                  <span>{part.code}</span>
                  <span className="tabular-nums">
                    {part.done}/{part.total} · {part.pct}%
                  </span>
                </span>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${part.pct}%` }} />
                </span>
              </span>
            ))}
          </span>
        </span>
        <ChevronDown
          className={cn("mt-2 size-4 shrink-0 text-muted transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div className="border-t border-border px-4 py-4 sm:px-5">
          {student.results.length === 0 ? (
            <p className="text-sm text-muted">Signed in, no practice submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-80 text-left text-sm">
                <thead>
                  <tr className="text-muted">
                    <th className="pb-2 font-medium">Topic</th>
                    <th className="pb-2 font-medium">MCQ</th>
                    <th className="pb-2 font-medium">Writing</th>
                    <th className="pb-2 font-medium">When</th>
                  </tr>
                </thead>
                <tbody>
                  {student.results.map((r) => (
                    <tr key={`${r.courseId}-${r.topicId}`} className="border-t border-border">
                      <td className="py-2 pr-3 font-medium text-fg">{topicLabel(r.courseId, r.topicId)}</td>
                      <td className="py-2 pr-3 tabular-nums">
                        {r.mcqScore}/{r.mcqTotal}
                      </td>
                      <td className="py-2 pr-3 tabular-nums">{r.writingCount}</td>
                      <td className="py-2 text-muted">{formatWhen(r.submittedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </li>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

function formatWhen(value: string) {
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return "—";
  const delta = Date.now() - time;
  const mins = Math.round(delta / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 14) return `${days}d ago`;
  return new Date(time).toLocaleDateString();
}

function topicLabel(courseId: string, topicId: string) {
  const course = courses.find((c) => c.id === courseId);
  if (topicId === "exam") return `${course?.code ?? courseId} · Final test`;
  const mod = course?.examModules.find((m) => m.id === topicId);
  if (mod) return `${course?.code ?? ""} · ${mod.title}`;
  const topic = course?.topics.find((t) => t.id === topicId);
  return topic ? `${course?.code ?? ""} · ${topic.title}` : topicId;
}
