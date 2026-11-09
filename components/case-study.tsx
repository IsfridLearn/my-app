import Image from "next/image";
import Link from "next/link";
import { Nav } from "./nav";
import { Sprite } from "./pixel";
import { SpreadHead } from "./spread-head";
import { ARROW } from "./sprites";
import { dabashareCase as c, profile } from "@/lib/content";
import type { CaseShot } from "@/lib/content";

function Shot({ shot, className, sizes }: { shot: CaseShot; className: string; sizes: string }) {
  return (
    <figure className={`cs-shot ${className}`}>
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} />
      <figcaption className="file">{shot.caption}</figcaption>
    </figure>
  );
}

export function CaseStudy() {
  return (
    <div className="site">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav active="work" base="/" />

      <main id="main" className="cs">
        <SpreadHead id="cs-title" title={c.title} script={c.script} />

        <section className="grid cs-intro" aria-label="Project introduction">
          <Shot shot={c.shots.courses} className="cs-lead" sizes="(max-width: 1023px) 100vw, 68vw" />
          <div className="cs-intro-text">
            <Link className="file go cs-back" href="/#work">
              Selected Work
            </Link>
            <dl className="cs-facts">
              {c.intro.map((item, i) => (
                <div key={item.label}>
                  <dt>
                    <span>[{i + 1}]</span> {item.label}
                  </dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
            <p className="cs-status">
              <b>{c.status.label}</b> {c.status.text}
            </p>
          </div>
        </section>

        <section className="grid cs-overview" aria-labelledby="cs-overview-title">
          <h2 id="cs-overview-title" className="cs-h cs-overview-h">
            Overview
          </h2>
          <div className="cs-objectives">
            <h3 className="cs-sub">Objectives</h3>
            <ul className="cs-list">
              {c.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <div className="cs-role">
            <h3 className="cs-sub">My role</h3>
            <p>{c.role}</p>
            <h3 className="cs-sub">Technologies</h3>
            <ul className="cs-tech">
              {c.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>{c.techNote}</p>
          </div>
        </section>

        <section className="cs-process" aria-labelledby="cs-process-title">
          <h2 id="cs-process-title" className="cs-h cs-pad">
            Design and process
          </h2>

          <ol className="cs-flow" aria-label="User flow">
            {c.flow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <div className="grid cs-explain">
            <div className="cs-explain-a">
              <h3 className="cs-sub">User flow</h3>
              <p>{c.flowText}</p>
            </div>
            <div className="cs-explain-b">
              <h3 className="cs-sub">Interface structure</h3>
              <p>{c.structure}</p>
            </div>
          </div>

          <div className="grid cs-gallery">
            <Shot shot={c.shots.login} className="cs-g1" sizes="(max-width: 1023px) 100vw, 58vw" />
            <div className="cs-g-note">
              <h3 className="cs-sub">Design decisions</h3>
              <ul className="cs-list">
                {c.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <Shot shot={c.shots.match} className="cs-g2" sizes="(max-width: 1023px) 100vw, 40vw" />
            <Shot shot={c.shots.messages} className="cs-g3" sizes="(max-width: 1023px) 100vw, 58vw" />
            <Shot shot={c.shots.post} className="cs-g4" sizes="(max-width: 1023px) 100vw, 34vw" />
            <Shot shot={c.shots.webinars} className="cs-g5" sizes="(max-width: 1023px) 100vw, 46vw" />
          </div>
        </section>

        <section className="cs-features" aria-labelledby="cs-features-title">
          <h2 id="cs-features-title" className="cs-h cs-pad">
            Key features
          </h2>
          <div className="grid">
            <div className="cs-works">
              <h3 className="cs-big">{c.features.works.title}</h3>
              <p className="cs-big-note">{c.features.works.note}</p>
              <ul className="cs-ledger">
                {c.features.works.items.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="cs-sim">
              <h3 className="cs-big">{c.features.simulated.title}</h3>
              <p className="cs-big-note">{c.features.simulated.note}</p>
              <ul className="cs-ledger">
                {c.features.simulated.items.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid cs-tech-sec" aria-labelledby="cs-build-title">
          <h2 id="cs-build-title" className="cs-h cs-tech-h">
            Technical implementation
          </h2>
          <dl className="cs-spec">
            {c.implementation.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
          <figure className="cs-code">
            <figcaption className="file">{c.code.caption}</figcaption>
            <pre tabIndex={0}>
              <code>{c.code.source}</code>
            </pre>
          </figure>
          <Shot shot={c.shots.phone} className="cs-phone" sizes="(max-width: 1023px) 60vw, 22vw" />
        </section>

        <section className="grid cs-learn" aria-labelledby="cs-learn-title">
          <h2 id="cs-learn-title" className="cs-h cs-learn-h">
            Challenges and learnings
          </h2>
          <ol className="cs-notes">
            {c.learnings.map((l, i) => (
              <li key={l.title}>
                <p className="stack-num">[{i + 1}]</p>
                <h3>{l.title}</h3>
                <p>{l.challenge}</p>
                <p className="cs-learned">{l.learned}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid cs-next" aria-labelledby="cs-next-title">
          <h2 id="cs-next-title" className="cs-h cs-next-h">
            What comes next
          </h2>
          <ul className="cs-ledger cs-next-list">
            {c.future.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <section className="cs-links" aria-label="Project links">
          <a className="cs-repo" href={c.repository} target="_blank" rel="noreferrer">
            View the code
            <Sprite rows={ARROW} unit="6px" />
          </a>
          <p className="file">{c.linkNote}</p>
        </section>
      </main>

      <footer className="foot">
        <div className="cs-foot">
          <Link className="file go" href="/#work">
            Back to Selected Work <Sprite rows={ARROW} unit="2px" />
          </Link>
          <p className="file">
            © 2026 {profile.first} {profile.last}, {profile.location}
          </p>
        </div>
      </footer>
    </div>
  );
}
