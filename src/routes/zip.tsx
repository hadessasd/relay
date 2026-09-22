import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/zip")({ component: ZipPage });

const SOURCE_HREF = "/kstudy-academy.zip";
const SOURCE_NAME = "kstudy-academy.zip";
const LECTURE_HREF = "/bus-1023-lectures.zip";
const LECTURE_NAME = "BUS-1023-lecture-slides.zip";

function ZipPage() {
  return (
    <div className="paper-wash min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 pb-20 sm:px-8">
        <p className="kicker text-accent">Downloads</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary">Take the files with you.</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The lecture zip is the nine HCT CLO files (PowerPoint and PDF). The source zip is the whole academy —
          unzip it, then put <code className="text-fg">package.json</code> and{" "}
          <code className="text-fg">server.js</code> at the GitHub repo root.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button asChild size="lg">
            <a href={LECTURE_HREF} download={LECTURE_NAME}>
              <Download className="size-4" />
              Lecture slides zip
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={SOURCE_HREF} download={SOURCE_NAME}>
              <Download className="size-4" />
              Source · {SOURCE_NAME}
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
