import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { Art, ART } from "@/components/art";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { searchUniversities, type University } from "@/data/universities";
import { listListings, type ShopListing } from "@/lib/campus";
import { useStudent } from "@/lib/student-store";

export const Route = createFileRoute("/")({ component: MarketHome });

function MarketHome() {
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState<ShopListing[]>([]);
  const unis = useMemo(() => searchUniversities(query), [query]);
  const name = useStudent((s) => s.currentName);

  useEffect(() => {
    listListings()
      .then(setListings)
      .catch(() => setListings([]));
  }, []);

  return (
    <div className="paper-wash min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-lift)]">
          <div className="relative min-h-80 sm:min-h-96 lg:min-h-[28rem]">
            <Art src={ART.hero} alt="Students studying in a sunlit UAE university atrium" className="absolute inset-0" />
            <div className="art-veil absolute inset-0" />
            <div className="relative flex min-h-80 flex-col justify-end p-6 sm:min-h-96 sm:p-10 lg:min-h-[28rem] lg:p-12">
              <p className="kicker text-primary-fg/75">UAE course studio</p>
              <h1 className="mt-3 max-w-xl font-serif text-4xl tracking-tight text-primary-fg sm:text-5xl lg:text-6xl">
                Find your campus. Teachers keep 98%.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-fg/85 sm:text-base">
                Search HCT or any UAE university. Students enter with a reusable access key. Teachers publish a course — it waits on hold for academy review. Live sales take 2%.
              </p>
              <label className="relative mt-8 block max-w-xl">
                <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search HCT, Khalifa, Sharjah…"
                  className="h-12 w-full rounded-xl border border-transparent bg-surface pr-4 pl-11 text-base text-fg outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-accent-fg/40"
                />
              </label>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild>
                  <Link to="/hct">{name ? `Continue, ${name.split(" ")[0]}` : "HCT student login"}</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link to="/sell">Sell a course</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="kicker text-accent">Campuses</p>
              <h2 className="mt-1 font-serif text-3xl tracking-tight text-primary">All UAE universities</h2>
            </div>
            <p className="text-xs text-muted">{unis.length} shown</p>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unis.map((uni) => (
              <li key={uni.id}>
                {uni.id === "hct" ? (
                  <Link
                    to="/hct"
                    className="block rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] hover:shadow-[var(--shadow-border-hover)]"
                  >
                    <UniCard uni={uni} />
                  </Link>
                ) : (
                  <Link
                    to="/uni/$uniId"
                    params={{ uniId: uni.id }}
                    className="block rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] hover:shadow-[var(--shadow-border-hover)]"
                  >
                    <UniCard uni={uni} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="kicker text-accent">Teacher shop</p>
              <h2 className="mt-1 font-serif text-3xl tracking-tight text-primary">Courses for sale</h2>
              <p className="mt-1 text-sm text-muted">Live listings only. New publishes stay on hold until review.</p>
            </div>
            <Button asChild variant="secondary">
              <Link to="/sell">Publish a course</Link>
            </Button>
          </div>
          <ul className="mt-5 grid gap-4 lg:grid-cols-3">
            {listings.map((item) => (
              <li key={item.id}>
                <Link
                  to="/shop/$listingId"
                  params={{ listingId: item.id }}
                  className="block overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]"
                >
                  <div className="h-36">
                    <Art src={item.id.includes("ai") ? ART.ai : ART.mgt} alt="" />
                  </div>
                  <div className="p-5">
                    <p className="kicker text-muted">{item.teacherName}</p>
                    <h3 className="mt-1 font-serif text-xl text-primary">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted">{item.summary}</p>
                    <p className="mt-4 text-sm font-medium text-fg tabular-nums">AED {item.priceAed}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function UniCard({ uni }: { uni: University }) {
  return (
    <>
      <p className="kicker text-muted">{uni.emirate}</p>
      <p className="mt-1 font-medium text-fg">{uni.short}</p>
      <p className="text-sm text-muted">{uni.name}</p>
      <p className="mt-3 text-xs font-medium text-primary">
        {uni.live ? "Open studio" : "Enter with a key"}
        <ArrowRight className="ml-1 inline size-3.5" />
      </p>
    </>
  );
}
