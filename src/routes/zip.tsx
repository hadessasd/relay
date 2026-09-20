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
    const id = window.setTimeout(() => {
      const a = document.createElement("a");
      a.href = ZIP_HREF;
      a.download = ZIP_NAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="paper-wash min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 pb-20 sm:px-8">
        <p className="kicker text-accent">Source</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary">Download the zip.</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Unzip, then put <code className="text-fg">package.json</code> and{" "}
          <code className="text-fg">server.js</code> at the GitHub repo root — same folder, no wrapping
          directory, not the zip file itself. That is what Render runs as{" "}
          <code className="text-fg">node server.js</code>.
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
        <ol className="mt-8 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>Unzip. You should see <code className="text-fg">server.js</code> immediately, not inside another folder.</li>
          <li>Push that folder to GitHub.</li>
          <li>
            Render build <code className="text-fg">bash render-build.sh</code>, start{" "}
            <code className="text-fg">node server.js</code>, Node <code className="text-fg">22</code>. Clear cache and deploy.
          </li>
        </ol>
      </main>
    </div>
  );
}
