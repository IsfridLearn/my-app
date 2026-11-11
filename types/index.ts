/* -------------------------------------------------------------- Images */

export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** A portrait with its archive label. */
export type Print = Shot & {
  file: string;
  label: string;
};

/** A labelled picture that the footer index can link to. */
export type Photo = Print & {
  id: string;
};

export type CaseShot = Shot & {
  caption: string;
};

export type FrameImages = {
  frame: number;
  dither: Shot;
  photo: Shot;
};

/* ------------------------------------------------------------- Content */

export type Profile = {
  first: string;
  last: string;
  location: string;
};

export type HeroContent = {
  role: [string, string];
  lede: string[];
  tags: string[];
  label: string;
  script: [string, string];
  body: string;
  notes: Array<{ title: string; text: string; link: string; href: string }>;
};

export type AboutContent = {
  headline: [string, string];
  paragraphs: string[];
  /**
   * Your own answers, in your own words. Only entries listed here appear.
   * Questions to start from:
   *   Which came first, the code or the camera?
   *   What is the first thing you built that actually worked?
   *   What does a shoot teach you that a classroom doesn't?
   *   What did winning your title take?
   *   What do you do when you are doing neither?
   *   What do you want to be making in five years?
   */
  interview: Array<{ question: string; answer: string }>;
};

export type Project = {
  /** Also the case-study address: /work/{id}. Each id needs a page in app/work/{id}. */
  id: string;
  title: string;
  /** What kind of project it is, such as "School project · Web app". */
  category: string;
  /** A few words on where it stands, shown as a tag on the card. */
  label: string;
  blurb: string;
  why: string;
  /** Leave out when it hasn't been written yet; the case study shows a placeholder. */
  role?: string;
  choices: string[];
  stack: string[];
  /** Where the project stands today, stated plainly. */
  status?: string;
  /** The picture on the project's card: a screenshot, or a logo shown on black. */
  cover: Shot & { kind: "screenshot" | "logo"; caption?: string };
  /** Live link. */
  href?: string;
  /** Code link. Leave out for private repositories. */
  source?: string;
};

/** A case-study screenshot, or a marked gap where one still needs to be added. */
export type CaseShotSlot = CaseShot | { todo: string };

/**
 * A case study built from data. Optional parts that are left out show as a marked
 * placeholder on the page, so nothing has to be invented to fill a gap.
 */
export type CaseStudyContent = {
  /** The project's id in data/projects.ts. */
  id: string;
  lead: CaseShotSlot;
  intro: Array<{ label: string; text?: string; todo?: string }>;
  status: string;
  goals?: string[];
  timeline?: string;
  tech: string[];
  techNote?: string;
  direction: string[];
  shots: CaseShotSlot[];
  features: string[];
  implementation: Array<{ label: string; text: string }>;
  challenges?: Array<{ title: string; challenge: string; solution: string }>;
  learnings?: string[];
  future?: string[];
  linkNote?: string;
};

export type SkillGroup = {
  category: string;
  note?: string;
  items: string[];
};

export type ExperienceContent = {
  note: string;
  roles: Array<{ title: string; text: string }>;
};

export type PageantTitle = {
  name: string;
  year: string;
  lang?: string;
};

export type Brand = {
  name: string;
  note?: string;
};

export type ContactDetails = {
  lead: string;
  email: string;
  links: Array<{ label: string; handle: string; href: string }>;
};

/* ---------------------------------------------------------- Navigation */

export type NavSection = {
  id: string;
  label: string;
};

export type SectionHeadingText = {
  title: string;
  /** The script word set across the poster title: "the projects", and so on. */
  script: string;
};

export type ArchiveEntry = {
  file: string;
  label: string;
  href: string;
};
