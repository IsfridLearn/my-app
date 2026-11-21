import Link from "next/link";
import { Arrow } from "@/components/ui/Sprite";
import { archiveIndex } from "@/data/navigation";
import { profile } from "@/data/profile";

function Copyright() {
  return (
    <p className="file">
      © 2026 {profile.first} {profile.last}, {profile.location}
    </p>
  );
}

/** The homepage footer, with an index of every project and picture. */
export function ArchiveFooter() {
  return (
    <footer className="foot">
      <nav aria-label="Archive index" className="index">
        <p className="file">The archive</p>
        <ul>
          {archiveIndex.map((entry) => (
            <li key={entry.file}>
              <a href={entry.href}>
                <span>{entry.file}</span>
                {entry.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="foot-end">
        <Copyright />
        <a className="to-top file" href="#home">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}

export function CaseStudyFooter() {
  return (
    <footer className="foot">
      <div className="cs-foot">
        <Link className="file go" href="/#work">
          Back to Selected Work <Arrow />
        </Link>
        <Copyright />
      </div>
    </footer>
  );
}
