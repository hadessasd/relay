import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Art, ART } from "@/components/art";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { createListing } from "@/lib/campus";

export const Route = createFileRoute("/sell")({ component: SellPage });

const STEPS = [
  { id: 0, label: "You" },
  { id: 1, label: "Course" },
  { id: 2, label: "Details" },
  { id: 3, label: "Review" },
] as const;

const LANGUAGES = ["English", "Arabic", "English & Arabic"] as const;
const DURATIONS = ["Single sitting", "1 week", "4 weeks", "Full semester"] as const;
const FORMATS = ["Notes & drills", "Lecture notes", "Practice pack", "Exam crash"] as const;

const selectClass =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary/35";
const areaClass =
  "min-h-28 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/35";

function SellPage() {
  const [step, setStep] = useState(0);
  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("MGT 1003");
  const [audience, setAudience] = useState("");
  const [language, setLanguage] = useState<string>(LANGUAGES[0]);
  const [duration, setDuration] = useState<string>(DURATIONS[2]);
  const [format, setFormat] = useState<string>(FORMATS[0]);
  const [summary, setSummary] = useState("");
  const [outline, setOutline] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [priceAed, setPriceAed] = useState("49");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [held, setHeld] = useState<{ title: string } | null>(null);
  const price = Number(priceAed);
  const commission = Number.isFinite(price) ? Math.max(1, Math.round(price * 0.02)) : 0;

  function validateStep(current: number) {
    if (current === 0) {
      if (teacherName.trim().length < 2) return "Write your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Use a real email.";
      if (contact.trim().length < 6) return "Add a WhatsApp or phone number.";
    }
    if (current === 1) {
      if (title.trim().length < 4) return "Give the course a fuller title.";
      if (subject.trim().length < 2) return "Add a subject.";
      if (audience.trim().length < 4) return "Who is this for?";
      if (!Number.isFinite(price) || price < 5 || price > 5000) return "Price must be between AED 5 and 5000.";
    }
    if (current === 2) {
      if (summary.trim().length < 20) return "Write a short description of at least a couple of sentences.";
      if (outline.trim().length < 20) return "List what students get — topics, papers, examples.";
      if (outcomes.trim().length < 12) return "Add what a student should be able to do after.";
    }
    return null;
  }

  function goNext() {
    const issue = validateStep(step);
    if (issue) {
      setError(issue);
      return;
    }
    setError(null);
    setStep((s) => Math.min(3, s + 1));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 3) {
      goNext();
      return;
    }
    const issue = validateStep(2) ?? validateStep(1) ?? validateStep(0);
    if (issue) {
      setError(issue);
      return;
    }
    setPending(true);
    setError(null);
    try {
      const res = await createListing({
        data: {
          teacherName,
          email,
          contact,
          title,
          subject,
          audience,
          language,
          duration,
          format,
          summary,
          outline,
          outcomes,
          priceAed: Number(priceAed),
        },
      });
      if (res.ok) setHeld({ title });
    } catch {
      setError("Could not send that course. Check every step and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="paper-wash min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 pb-20 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
          <div className="relative h-40">
            <Art src={ART.market} alt="" />
            <div className="art-veil absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="kicker text-primary-fg/75">Teachers · 2% platform fee</p>
              <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary-fg">Publish a course</h1>
            </div>
          </div>
        </div>

        {held ? (
          <aside className="mt-8 rounded-3xl bg-warn-soft px-6 py-8 text-warn shadow-[var(--shadow-border)]">
            <Clock className="size-7" />
            <p className="kicker mt-4">On hold</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight text-primary">Waiting for academy review.</h2>
            <p className="mt-3 text-sm leading-relaxed text-fg">
              “{held.title}” is with the owner desk. Review is paused, so it stays on hold and will not appear in the
              shop.
            </p>
            <Link to="/" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-primary">
              Back to the shop
            </Link>
          </aside>
        ) : (
          <>
            <ol className="mt-6 grid grid-cols-4 gap-2">
              {STEPS.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    "rounded-xl px-2 py-2 text-center text-xs font-medium",
                    step === item.id
                      ? "bg-primary text-primary-fg"
                      : step > item.id
                        ? "bg-ok-soft text-ok"
                        : "bg-surface-2 text-muted",
                  )}
                >
                  {item.label}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Fill the brief in four steps. After you publish, the listing sits on hold — students will not see it until
              academy review is turned on.
            </p>
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
              {step === 0 ? (
                <>
                  <Field label="Your name" htmlFor="teacher">
                    <Input id="teacher" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} required />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </Field>
                  <Field label="WhatsApp or phone" htmlFor="contact">
                    <Input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
                  </Field>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <Field label="Course title" htmlFor="title">
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </Field>
                  <Field label="Subject" htmlFor="subject">
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="MGT 1003, Foundations of AI…"
                      required
                    />
                  </Field>
                  <Field label="Who is it for" htmlFor="audience">
                    <Input
                      id="audience"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="HCT Week 5 exam, CLO 1 & 2"
                      required
                    />
                  </Field>
                  <Field label="Language" htmlFor="language">
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={selectClass}
                    >
                      {LANGUAGES.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="How long" htmlFor="duration">
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className={selectClass}
                    >
                      {DURATIONS.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Format" htmlFor="format">
                    <select
                      id="format"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className={selectClass}
                    >
                      {FORMATS.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Price in AED" htmlFor="price">
                    <Input id="price" inputMode="numeric" value={priceAed} onChange={(e) => setPriceAed(e.target.value)} />
                  </Field>
                  <p className="text-sm text-muted">
                    Platform 2% = AED {commission}. You receive AED {Number.isFinite(price) ? price - commission : 0} after
                    a live sale.
                  </p>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <Field label="Short description" htmlFor="summary">
                    <textarea
                      id="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className={areaClass}
                      required
                    />
                  </Field>
                  <Field label="What students get" htmlFor="outline">
                    <textarea
                      id="outline"
                      value={outline}
                      onChange={(e) => setOutline(e.target.value)}
                      className={areaClass}
                      placeholder="Topics, practice papers, worked examples…"
                      required
                    />
                  </Field>
                  <Field label="After this course, a student can" htmlFor="outcomes">
                    <textarea
                      id="outcomes"
                      value={outcomes}
                      onChange={(e) => setOutcomes(e.target.value)}
                      className={areaClass}
                      placeholder="Revise POLC with café examples, sit a short quiz…"
                      required
                    />
                  </Field>
                </>
              ) : null}

              {step === 3 ? (
                <div className="rounded-2xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]">
                  <p className="kicker text-warn">Review is paused</p>
                  <h2 className="mt-2 font-serif text-2xl text-primary">{title || "Untitled course"}</h2>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <ReviewItem label="Teacher" value={teacherName} />
                    <ReviewItem label="Email" value={email} />
                    <ReviewItem label="Contact" value={contact} />
                    <ReviewItem label="Subject" value={subject} />
                    <ReviewItem label="Audience" value={audience} />
                    <ReviewItem label="Language" value={language} />
                    <ReviewItem label="Length" value={duration} />
                    <ReviewItem label="Format" value={format} />
                    <ReviewItem label="Price" value={`AED ${priceAed}`} />
                  </dl>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg">{outline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg">{outcomes}</p>
                  <p className="mt-5 rounded-xl bg-warn-soft px-3 py-3 text-sm text-warn">
                    Publishing sends this to the owner desk. It stays on hold and will not go live in the shop.
                  </p>
                </div>
              ) : null}

              {error ? <p className="text-sm text-bad">{error}</p> : null}

              <div className="mt-2 flex flex-wrap gap-2">
                {step > 0 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setError(null);
                      setStep((s) => Math.max(0, s - 1));
                    }}
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                ) : null}
                {step < 3 ? (
                  <Button key="next" type="button" onClick={goNext}>
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button key="publish" type="submit" disabled={pending}>
                    {pending ? "Sending…" : "Publish for review"}
                  </Button>
                )}
              </div>
            </form>
          </>
        )}
        <Link to="/" className="mt-8 inline-flex min-h-11 items-center text-sm text-muted">
          Back to the shop
        </Link>
      </main>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <>
      <label className="text-sm font-medium text-fg" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 font-medium text-fg">{value || "—"}</dd>
    </div>
  );
}
