"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { CanvasText } from "@/components/ui/canvas-text";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

type Project = {
  name: string;
  description: string;
  tools: string;
  image: string;
  view: string;
  demo: string;
  code: string;
};

type StackGroup = {
  label: string;
  items: string;
};

type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image: string;
  href: string;
  placeholder?: boolean;
};

const certificates: Certificate[] = [];

const stack: StackGroup[] = [
  { label: "Languages", items: "JavaScript, Java, C++, HTML/CSS" },
  { label: "Frameworks", items: "Next.js, React" },
  { label: "Tools", items: "VS Code, Git, Android Studio, CapCut" },
];

const developmentCertificates: Certificate[] = [
  {
    title: "Development placeholder 1",
    issuer: "Placeholder · Development only",
    year: "2026",
    image: "/certificates/development-placeholder-1.svg",
    href: "",
    placeholder: true,
  },
  {
    title: "Development placeholder 2",
    issuer: "Placeholder · Development only",
    year: "2026",
    image: "/certificates/development-placeholder-2.svg",
    href: "",
    placeholder: true,
  },
  {
    title: "Development placeholder 3",
    issuer: "Placeholder · Development only",
    year: "2026",
    image: "/certificates/development-placeholder-3.svg",
    href: "",
    placeholder: true,
  },
];

const projects: Project[] = [
  {
    name: "School project name",
    description: "One sentence about what it does.",
    tools: "Java, Android Studio",
    image: "/projects/school-project-preview.svg",
    view: "",
    demo: "",
    code: "",
  },
  {
    name: "This portfolio",
    description: "My personal site, built from scratch.",
    tools: "Next.js, Tailwind",
    image: "/projects/portfolio-preview.svg",
    view: "/",
    demo: "",
    code: "",
  },
];

const PHOTO_CREDIT = "";

const nightCanvasTextColors = [
  "rgba(0, 180, 255, 1)",
  "rgba(0, 180, 255, 0.9)",
  "rgba(0, 180, 255, 0.8)",
  "rgba(0, 180, 255, 0.7)",
  "rgba(0, 180, 255, 0.6)",
  "rgba(0, 180, 255, 0.5)",
  "rgba(0, 180, 255, 0.4)",
  "rgba(0, 180, 255, 0.3)",
  "rgba(0, 180, 255, 0.2)",
  "rgba(0, 180, 255, 0.1)",
];

export default function Home() {
  const [isNight, setIsNight] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const closeLightboxRef = useRef<HTMLButtonElement>(null);
  const canvasTextColors = nightCanvasTextColors;
  const backgroundClassName = "bg-[#0056a3]";
  const visibleCertificates =
    certificates.length > 0
      ? certificates
      : process.env.NODE_ENV === "development"
        ? developmentCertificates
        : [];

  useEffect(() => {
    if (!selectedCertificate) return;

    closeLightboxRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCertificate(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCertificate]);

  return (
    <main className={`portfolio-page ${isNight ? "theme-night" : "theme-light"}`}>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setIsNight((current) => !current)}
        aria-label={isNight ? "Switch to white mode" : "Switch to night mode"}
        aria-pressed={!isNight}
        title={isNight ? "Switch to white mode" : "Switch to night mode"}
      >
        {isNight ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </button>

      <section className="hero-section" aria-label="Introduction">
        <div className="content-container hero-content">
          <h1 className="name">
            <span className="first-name">Andrei</span>
            <CanvasText
              text="SANCHEZ"
              className="canvas-highlight name-last"
              backgroundClassName={backgroundClassName}
              colors={canvasTextColors}
              lineGap={4}
              lineWidth={1.5}
              curveIntensity={60}
              animationDuration={20}
            />
          </h1>
          <div className="hero-bottom-left">
            <section className="intro" aria-label="About me">
              <h2 className="tagline">
                Building software and a brand to go with it.
              </h2>
              <p className="bio">
                2nd year BSIT student at Holy Cross of Davao College. Also a
                Brand Ambassador and model.
              </p>
            </section>
            <nav className="contact-links" aria-label="Contact and profiles">
              <a href="https://github.com/IsfridLearn" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/andrei-sanchez-96207b398/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:andreisanchez077@gmail.com">
                Email
              </a>
              <a href="/resume.pdf">
                Resume
              </a>
            </nav>
          </div>
          <div className="portrait-position">
            <figure className="portrait-figure">
              <div className="portrait-image-wrap">
                <Image
                  className="portrait-image"
                  src={
                    isNight
                      ? "/1232922c-09c4-4cf1-af32-222a31053126.png"
                      : "/blacksuit.png"
                  }
                  alt={
                    isNight
                      ? "Portrait of Andrei Sanchez in a white suit"
                      : "Portrait of Andrei Sanchez in a black suit"
                  }
                  fill
                  sizes="(max-width: 760px) 46vw, min(64.2vh, 56vw)"
                  priority
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section
        className="projects-section"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="section-divider" aria-hidden="true" />
        <div className="content-container skills-content">
          <h2 className="skills-title" id="projects-title">
            Projects
          </h2>
          {projects.map((project) => (
            <article className="project-row" key={project.name}>
              <div className="project-copy">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="project-preview">
                <Image
                  className="project-thumbnail"
                  src={project.image}
                  alt={`${project.name} preview`}
                  width={320}
                  height={200}
                />
                <div className="project-details">
                  <p className="project-tools">{project.tools}</p>
                  {project.view && (
                    <a
                      className="project-view"
                      href={project.view}
                      target={
                        project.view.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        project.view.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                    >
                      View <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.code && (
                    <a
                      className="project-view"
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="skills-section"
        id="skills"
        aria-labelledby="skills-title"
      >
        <div className="section-divider" aria-hidden="true" />
        <div className="content-container skills-content">
          <h2 className="skills-title" id="skills-title">
            Stack
          </h2>
          {stack.map((group) => (
            <div className="skills-group" key={group.label}>
              <h3 className="skills-label">{group.label}</h3>
              <p className="skills-items">{group.items}</p>
            </div>
          ))}
        </div>
      </section>

      {visibleCertificates.length > 0 && (
        <section
          className="certificates-section"
          id="certificates"
          aria-labelledby="certificates-title"
        >
          <div className="section-divider" aria-hidden="true" />
          <div className="content-container skills-content">
            <h2 className="skills-title" id="certificates-title">
              Certificates
            </h2>
            <InfiniteMovingCards
              items={visibleCertificates}
              direction="left"
              speed="slow"
              pauseOnHover
              className="certificates-scroller"
              renderItem={(certificate, index, isDuplicate) => (
                <figure
                  className={`certificate-card${certificate.placeholder ? " is-placeholder" : ""}`}
                  key={`${certificate.title}-${index}`}
                >
                  <button
                    className="certificate-open"
                    type="button"
                    onClick={() => setSelectedCertificate(certificate)}
                    tabIndex={isDuplicate ? -1 : 0}
                    aria-label={`Open certificate: ${certificate.title}`}
                  >
                    <span className="certificate-image-wrap">
                      <Image
                        src={certificate.image}
                        alt=""
                        fill
                        sizes="240px"
                      />
                    </span>
                    <span className="certificate-caption">
                      <span className="certificate-title">
                        {certificate.title}
                      </span>
                      <span className="certificate-meta">
                        {certificate.issuer} · {certificate.year}
                      </span>
                    </span>
                  </button>
                  {certificate.href && (
                    <a
                      className="certificate-verification"
                      href={certificate.href}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={isDuplicate ? -1 : 0}
                    >
                      Verify ↗
                    </a>
                  )}
                </figure>
              )}
            />
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="content-container">
          <p>Davao City, 2026</p>
          <p>Last updated October 2026</p>
          {PHOTO_CREDIT && <p>Photo: {PHOTO_CREDIT}</p>}
        </div>
      </footer>

      {selectedCertificate && (
        <div
          className="certificate-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-lightbox-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCertificate(null);
            }
          }}
        >
          <button
            ref={closeLightboxRef}
            className="certificate-lightbox-close"
            type="button"
            onClick={() => setSelectedCertificate(null)}
            aria-label="Close certificate"
          >
            ×
          </button>
          <figure className="certificate-lightbox-figure">
            <div className="certificate-lightbox-image">
              <Image
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                fill
                sizes="(max-width: 760px) 92vw, 1000px"
              />
            </div>
            <figcaption id="certificate-lightbox-title">
              {selectedCertificate.title}
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
