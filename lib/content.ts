// Everything the portfolio says lives here. Edit this file, not the components.
// Only facts from the original site are used. Anything not filled in yet is left
// empty and is simply hidden on the page.

export const profile = {
  first: "Andrei",
  last: "Sanchez",
  location: "Davao City",
  tagline: "BSIT student, developer, brand ambassador and model.",
  roles: ["BSIT student", "Developer", "Brand ambassador", "Model"],
  greeting:
    "Hi, I'm Andrei. I'm a 2nd-year BSIT student, the brand ambassador of Holy Cross of Davao College, and a model who works with other brands too. I'm building my future, one line of code at a time.",
};

/* ------------------------------------------------------------------ Work */

export type Project = {
  id: string;
  title: string;
  blurb: string;
  stack: string[];
  /** "scene" shows the pixel sunset as the preview. */
  preview?: "scene";
  /** Live link. */
  href?: string;
  /** Code link. */
  source?: string;
};

// Add a project here and it appears on the page. Give it a title, blurb, stack,
// and optionally href (live link) and source (code link).
export const projects: Project[] = [
  {
    id: "portfolio",
    title: "This portfolio",
    blurb: "My personal site, built around a retro pixel-art identity.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    preview: "scene",
  },
];

/* ---------------------------------------------------------------- Skills */

export type Skill = {
  id: string;
  name: string;
  kind: "code" | "stage";
  /** Two letters drawn in the pixel font. */
  mono: string;
  note: string;
};

export const skills: Skill[] = [
  {
    id: "next",
    name: "Next.js",
    kind: "code",
    mono: "NX",
    note: "The framework this portfolio is built with.",
  },
  {
    id: "react",
    name: "React",
    kind: "code",
    mono: "RE",
    note: "The UI library behind every screen on this site.",
  },
  {
    id: "ts",
    name: "TypeScript",
    kind: "code",
    mono: "TS",
    note: "Used to type this portfolio's code.",
  },
  {
    id: "tw",
    name: "Tailwind CSS",
    kind: "code",
    mono: "TW",
    note: "Part of this site's styling setup.",
  },
  {
    id: "model",
    name: "Modeling",
    kind: "stage",
    mono: "MD",
    note: "I work as a model with other brands.",
  },
  {
    id: "ambassador",
    name: "Brand ambassador",
    kind: "stage",
    mono: "BA",
    note: "Brand ambassador of Holy Cross of Davao College.",
  },
];

/* ------------------------------------------------------------ Experience */

export type Role = {
  title: string;
  where: string;
  text: string;
  current: boolean;
};

export const experience: Role[] = [
  {
    title: "BSIT, 2nd year",
    where: "Information Technology student",
    text: "Learning to build software, one line of code at a time.",
    current: true,
  },
  {
    title: "Brand Ambassador",
    where: "Holy Cross of Davao College",
    text: "Represents the college as its brand ambassador.",
    current: true,
  },
  {
    title: "Model",
    where: "Works with other brands",
    text: "Models for brands beyond the college.",
    current: true,
  },
];

/* ----------------------------------------------------------------- About */

export const facts: Array<[string, string]> = [
  ["Name", "Andrei Sanchez"],
  ["Program", "BSIT"],
  ["Year level", "2nd year"],
  ["Based in", "Davao City"],
  ["Brand ambassador for", "Holy Cross of Davao College"],
  ["Also", "Modeling for brands"],
];

/* --------------------------------------------------------------- Contact */

// TODO: add your real email and profiles. Empty values are hidden on the page.
// email: "you@yourdomain.com"
// links: [{ label: "Instagram", handle: "@yourname", href: "https://instagram.com/yourname" }]
export const contact: {
  email: string;
  links: Array<{ label: string; handle: string; href: string }>;
} = {
  email: "",
  links: [],
};
