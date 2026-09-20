import { useState, type FormEvent, type ReactNode } from "react";
import { Link, Navigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Art, ART } from "@/components/art";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUniversity, type University } from "@/data/universities";
import { verifyAccessKey } from "@/lib/campus";
import { useStudent } from "@/lib/student-store";

export function CampusGate({ uniId, children }: { uniId: string; children: ReactNode }) {
  const hydrated = useStudent((s) => s.hydrated);
  const name = useStudent((s) => s.currentName);
  const campus = useStudent((s) => s.campus);
  const isStaff = useStudent((s) => s.isStaff);
  const uni = getUniversity(uniId);

  if (!hydrated) return <div className="paper-wash min-h-dvh" />;
  if (isStaff || (name && campus?.uniId === uniId)) return <>{children}</>;
  if (uni) return <CampusLogin uni={uni} />;
  return <Navigate to="/" />;
}

export function CampusLogin({ uni }: { uni: University }) {
  const login = useStudent((s) => s.login);
  const students = useStudent((s) => s.students);
  const roster = Object.keys(students);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [unlocked, setUnlocked] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const greeting = name.trim().split(/\s+/)[0];

  async function onKey(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await verifyAccessKey({ data: { uniId: uni.id, code } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setUnlocked(res.code);
    } catch {
      setError("Could not check that key. Try again.");
    } finally {
      setPending(false);
    }
  }

  function onName(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || !unlocked) {
      setError("Write your name to enter.");
      return;
    }
    login(trimmed, { uniId: uni.id, accessKey: unlocked });
  }

  return (
    <div className="paper-wash min-h-dvh">
      <div className="mx-auto grid min-h-dvh max-w-5xl lg:grid-cols-2">
        <div className="px-5 pt-14 pb-4 sm:px-8 lg:py-16">
          <div className="relative aspect-photo overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-lift)] lg:h-full lg:min-h-96 lg:aspect-auto">
            <Art src={ART.campus} alt="" className="absolute inset-0" />
            <div className="art-veil absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="kicker text-primary-fg/75">{uni.short} · campus studio</p>
              <h1 className="mt-2 font-serif text-3xl tracking-tight text-primary-fg sm:text-4xl">
                {uni.name}
              </h1>
              <p className="mt-2 text-sm text-primary-fg/80">{uni.city}</p>
            </div>
          </div>
        </div>

        <section className="flex flex-col justify-center px-5 py-8 sm:px-10">
          <div className="mx-auto w-full max-w-md">
            {!unlocked ? (
              <>
                <p className="kicker text-accent">Access key</p>
                <h2 className="mt-2 font-serif text-4xl tracking-tight text-primary">Enter with a key.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Your teacher or the owner desk mints a key for {uni.short}. The same key can be used by the whole class, more than once.
                </p>
                <form onSubmit={onKey} className="mt-8 flex flex-col gap-3">
                  <label htmlFor="access-key" className="text-sm font-medium text-fg">
                    Access key
                  </label>
                  <Input
                    id="access-key"
                    autoCapitalize="characters"
                    autoComplete="off"
                    autoFocus
                    placeholder={`${uni.prefix}-······`}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setError(null);
                    }}
                  />
                  {error ? <p className="text-sm text-bad">{error}</p> : null}
                  <Button type="submit" size="lg" disabled={pending}>
                    {pending ? "Checking…" : "Continue"}
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              </>
            ) : (
              <>
                <p className="kicker text-accent">Your desk</p>
                <h2 className="mt-2 font-serif text-4xl tracking-tight text-primary">
                  {greeting ? (
                    <>
                      Hello, <span className="italic">{greeting}.</span>
                    </>
                  ) : (
                    "Write your name."
                  )}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  It stays on this device so your practice comes back.
                </p>
                <form onSubmit={onName} className="mt-8 flex flex-col gap-3">
                  <label htmlFor="student-name" className="text-sm font-medium text-fg">
                    Your name
                  </label>
                  <Input
                    id="student-name"
                    autoComplete="name"
                    autoFocus
                    placeholder="e.g. Khalifa"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                  />
                  {error ? <p className="text-sm text-bad">{error}</p> : null}
                  <Button type="submit" size="lg">
                    Enter the studio
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
                {roster.length > 0 ? (
                  <div className="mt-8">
                    <p className="kicker text-muted">Saved desks</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {roster.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => login(n, { uniId: uni.id, accessKey: unlocked })}
                          className="min-h-11 rounded-full border border-border bg-surface px-4 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
                        >
                          Continue as {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
            <Link to="/" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-fg">
              <ArrowLeft className="size-4" />
              All campuses
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
