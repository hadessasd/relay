import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { Art, ART } from "@/components/art";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buyListing, getListing, type ShopListing } from "@/lib/campus";

export const Route = createFileRoute("/shop/$listingId")({ component: ShopPage });

function ShopPage() {
  const { listingId } = Route.useParams();
  const [listing, setListing] = useState<ShopListing | null | undefined>(undefined);
  const [buyer, setBuyer] = useState("");
  const [done, setDone] = useState<{ amount: number; commission: number; teacherKeeps: number } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    getListing({ data: { listingId } })
      .then((row) => setListing(row))
      .catch(() => setListing(null));
  }, [listingId]);

  async function onBuy(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await buyListing({ data: { listingId, buyerName: buyer } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setDone({ amount: res.amount, commission: res.commission, teacherKeeps: res.teacherKeeps });
    } catch {
      setError("Payment did not go through. Try again.");
    } finally {
      setPending(false);
    }
  }

  const held = listing?.status === "on_hold";

  return (
    <div className="paper-wash min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 pb-20 sm:px-8">
        {listing === undefined ? <p className="text-sm text-muted">Opening listing…</p> : null}
        {listing === null ? <p className="text-muted">That course is not listed.</p> : null}
        {listing ? (
          <>
            <div className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
              <div className="h-44">
                <Art src={listing.id.includes("ai") ? ART.ai : ART.profit} alt="" />
              </div>
              <div className="p-5">
                <p className="kicker text-muted">{listing.teacherName}</p>
                <h1 className="mt-1 font-serif text-3xl text-primary">{listing.title}</h1>
                <p className="mt-2 text-sm leading-relaxed text-muted">{listing.summary}</p>
                {listing.subject ? <p className="mt-3 text-sm text-fg">{listing.subject}</p> : null}
                {listing.format || listing.duration || listing.language ? (
                  <p className="mt-2 text-xs text-muted">
                    {[listing.format, listing.duration, listing.language].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
                {listing.outcomes ? (
                  <p className="mt-3 text-sm leading-relaxed text-fg">{listing.outcomes}</p>
                ) : null}
                <p className="mt-4 font-medium tabular-nums">AED {listing.priceAed}</p>
                <p className="mt-1 text-xs text-muted">
                  2% platform fee (AED {Math.max(1, Math.round(listing.priceAed * 0.02))}) · teacher keeps the rest
                </p>
              </div>
            </div>
            {held ? (
              <aside className="mt-6 rounded-2xl bg-warn-soft p-5 text-warn">
                <Clock className="size-5" />
                <p className="mt-2 font-medium">On hold — waiting for academy review.</p>
                <p className="mt-1 text-sm text-fg">This course is not for sale yet.</p>
              </aside>
            ) : done ? (
              <aside className="mt-6 rounded-2xl bg-ok-soft p-5 text-ok">
                <p className="font-medium">Paid. Access is on this desk.</p>
                <p className="mt-2 text-sm text-fg">
                  AED {done.amount} · platform AED {done.commission} · teacher AED {done.teacherKeeps}
                </p>
              </aside>
            ) : (
              <form onSubmit={onBuy} className="mt-6 flex flex-col gap-3">
                <label htmlFor="buyer" className="text-sm font-medium">
                  Your name
                </label>
                <Input id="buyer" value={buyer} onChange={(e) => setBuyer(e.target.value)} />
                {error ? <p className="text-sm text-bad">{error}</p> : null}
                <Button type="submit" size="lg" disabled={pending}>
                  {pending ? "Taking payment…" : `Pay AED ${listing.priceAed}`}
                </Button>
              </form>
            )}
          </>
        ) : null}
        <Link to="/" className="mt-8 inline-flex min-h-11 items-center text-sm text-muted">
          Back to the shop
        </Link>
      </main>
    </div>
  );
}
