import Link from "next/link";
import { Arrow } from "@/components/ui/Sprite";
import { profile } from "@/data/profile";

function Copyright() {
  return (
    <p className="file">
      © 2026 {profile.first} {profile.last}, {profile.location}
    </p>
  );
}

/** The homepage footer: only a way back to the top, centered. */
export function ArchiveFooter() {
  return (
    <footer className="foot foot-home">
      <a className="to-top file" href="#home">
        Back to top <span aria-hidden="true">↑</span>
      </a>
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
