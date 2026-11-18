import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyFooter } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Sprite";

export const metadata: Metadata = {
  title: "Page not found | Andrei Sanchez",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageShell navBase="/" mainClassName="missing" footer={<CaseStudyFooter />}>
      <SectionHeading as="h1" id="missing-title" title="Not found" script="missing print" />
      <div className="missing-body">
        <p className="file">Error 404</p>
        <p>There is no page at this address. It may have moved, or the link has a typo.</p>
        <div className="missing-links file">
          <Link className="go" href="/">
            Front page <Arrow />
          </Link>
          <Link className="go" href="/work">
            All projects <Arrow />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
