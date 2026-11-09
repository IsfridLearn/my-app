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
  id: string;
  title: string;
  blurb: string;
  why: string;
  role: string;
  choices: string[];
  stack: string[];
  /** Where the project stands today, stated plainly. */
  status?: string;
  /** Main screenshot inside /public, with its pixel size. */
  image?: Shot;
  /** Further screenshots. */
  more?: Shot[];
  /** Live link. */
  href?: string;
  /** Code link. */
  source?: string;
  /** Link to a longer write-up on this site. */
  caseStudy?: string;
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
