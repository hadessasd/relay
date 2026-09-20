import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Art, ART } from "@/components/art";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staffLogin } from "@/lib/progress";
import { useStudent } from "@/lib/student-store";

export function StaffLogin() {
  const enterStaff = useStudent((s) => s.enterStaff);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await staffLogin({
        data: { username: username.trim(), password: password.trim() },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      enterStaff(res.token);
      void navigate({ to: "/staff" });
    } catch {
      setError("Could not reach the staff desk. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="paper-wash min-h-dvh">
      <div className="mx-auto grid min-h-dvh max-w-5xl lg:grid-cols-2">
        <div className="px-5 pt-14 pb-4 sm:px-8 lg:py-16">
          <div className="relative aspect-photo overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-lift)] lg:h-full lg:min-h-96 lg:aspect-auto">
            <Art src={ART.staff} alt="Quiet staff office with an attendance ledger" className="absolute inset-0" />
            <div className="art-veil absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="kicker text-primary-fg/75">Owner desk</p>
              <h1 className="mt-2 font-serif text-3xl tracking-tight text-primary-fg sm:text-4xl">
                Mint keys. Watch the shop.
              </h1>
            </div>
          </div>
        </div>
        <section className="flex flex-col justify-center px-5 py-8 sm:px-10">
          <div className="mx-auto w-full max-w-md">
            <p className="kicker text-accent">Desk</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight text-primary">Sign in to the desk.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Generate reusable campus keys, see every learner, and keep new teacher courses on hold.
            </p>
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
              <label htmlFor="staff-user" className="text-sm font-medium text-fg">
                Username
              </label>
              <Input
                id="staff-user"
                autoComplete="username"
                autoFocus
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}
              />
              <label htmlFor="staff-pass" className="mt-1 text-sm font-medium text-fg">
                Password
              </label>
              <Input
                id="staff-pass"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
              />
              {error ? <p className="text-sm text-bad">{error}</p> : null}
              <Button type="submit" size="lg" className="mt-1" disabled={pending}>
                {pending ? "Opening desk…" : "Open desk"}
                <ArrowRight className="size-4" />
              </Button>
            </form>
            <Link to="/" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-fg">
              <ArrowLeft className="size-4" />
              Back to the shop
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
