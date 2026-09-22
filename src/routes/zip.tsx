import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/zip")({ component: ZipPage });

const ZIP_HREF = "/kstudy-academy.zip";
const ZIP_NAME = "kstudy-academy.zip";

function ZipPage() {
  useEffect(() => {
    window.location.replace(ZIP_HREF);
  }, []);

  return (
    <div className="paper-wash min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 pb-20 sm:px-8">
        <p className="kicker text-accent">Source</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary">Download the zip.</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          If the file does not start, use the button. Unzip, then put{" "}
          <code className="text-fg">package.json</code> and <code className="text-fg">server.js</code> at
          the GitHub repo root.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button asChild size="lg">
            <a href={ZIP_HREF} download={ZIP_NAME}>
              <Download className="size-4" />
              Download {ZIP_NAME}
            </a>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Back to the shop
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
