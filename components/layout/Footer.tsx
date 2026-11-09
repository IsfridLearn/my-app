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
        <p className="file">Index</p>
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
      <Copyright />
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
