import Link from "next/link";
import { CaseFigure } from "@/components/dabashare/CaseFigure";
import { FactList } from "@/components/ui/FactList";
import { TextList } from "@/components/ui/TextList";
import { dabashareCase } from "@/data/dabashare";

/** The opening screenshot and summary, followed by the project overview. */
export function Introduction() {
  const { intro, objectives, role, shots, status, tech, techNote } = dabashareCase;

  return (
    <>
      <section className="grid cs-intro" aria-label="Project introduction">
        <CaseFigure shot={shots.courses} className="cs-lead" sizes="(max-width: 1023px) 100vw, 68vw" />
        <div className="cs-intro-text">
          <Link className="file go cs-back" href="/#work">
            Selected Work
          </Link>
          <FactList facts={intro} />
          <p className="cs-status">
            <b>{status.label}</b> {status.text}
          </p>
        </div>
      </section>

      <section className="grid cs-overview" aria-labelledby="cs-overview-title">
        <h2 id="cs-overview-title" className="cs-h poster cs-overview-h">
          Overview
        </h2>
        <div className="cs-objectives">
          <h3 className="cs-sub">Objectives</h3>
          <TextList items={objectives} className="cs-list" />
        </div>
        <div className="cs-role">
          <h3 className="cs-sub">My role</h3>
          <p>{role}</p>
          <h3 className="cs-sub">Technologies</h3>
          <TextList items={tech} className="cs-tech slash-list poster" />
          <p>{techNote}</p>
        </div>
      </section>
    </>
  );
}
