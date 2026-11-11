import { CaseStudyPager } from "@/components/case-study/CaseStudyPager";
import { Build } from "@/components/dabashare/Build";
import { Introduction } from "@/components/dabashare/Introduction";
import { Process } from "@/components/dabashare/Process";
import { Reflection } from "@/components/dabashare/Reflection";
import { CaseStudyFooter } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dabashareCase } from "@/data/dabashare";

export function Dabashare() {
  return (
    <PageShell activeSection="work" navBase="/" mainClassName="cs" footer={<CaseStudyFooter />}>
      <SectionHeading id="cs-title" title={dabashareCase.title} script={dabashareCase.script} />
      <Introduction />
      <Process />
      <Build />
      <Reflection />
      <CaseStudyPager id="dabashare" />
    </PageShell>
  );
}
