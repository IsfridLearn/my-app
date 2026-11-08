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
  /** Used by the filter when there is more than one category. */
  category: string;
  blurb: string;
  problem: string;
  contribution: string;
  decisions: string[];
  stack: string[];
  /** "scene" shows the pixel sunset as the preview. */
  preview?: "scene";
  /** Live link. */
  href?: string;
  /** Code link. */
  source?: string;
};

// Add a project here and it appears on the page. The filter shows up by itself
// once projects use two or more categories. Only write what is true.
export const projects: Project[] = [
  {
    id: "portfolio",
    title: "This portfolio",
    category: "Web",
    blurb: "My personal site, built around a retro pixel-art identity.",
    problem:
      "The first version leaned on template content and did not say who I actually am. It needed to introduce me, my roles and my work clearly.",
    contribution:
      "Direction, content and development of the whole site: layout, pixel art, interactions and the copy.",
    decisions: [
      "All pixel art is drawn in code from text grids and rendered as SVG, so there are no image files and it stays sharp at any size.",
      "Pixel type is kept to headings. Paragraphs use a clean sans-serif so the text stays easy to read.",
      "Motion is slow and stepped, and it switches off for visitors who prefer reduced motion.",
      "Every piece of text lives in one content file, so updating the site never means touching components.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    preview: "scene",
  },
];

/* ---------------------------------------------------------- Capabilities */

export const capabilities: Array<{ title: string; text: string }> = [
  {
    title: "Web interfaces",
    text: "Built with Next.js, React, TypeScript and Tailwind CSS.",
  },
  {
    title: "Brand ambassadorship",
    text: "The face of Holy Cross of Davao College.",
  },
  {
    title: "Modeling",
    text: "Works with brands beyond the college.",
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

// Optional. Leave empty and they are hidden. Write only what is true.
// interests: ["..."], goals: "..."
export const about: { interests: string[]; goals: string; photo: string } = {
  interests: [],
  goals: "",
  photo: "", // e.g. "/andrei.jpg" after adding the file to /public
};

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
