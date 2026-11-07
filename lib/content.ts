// Everything the portfolio says lives here. Edit this file, not the components.
// Real details are marked as such; anything marked TODO still needs your own.

export const profile = {
  first: "Andrei",
  last: "Sanchez",
  location: "Davao City",
  tagline: "BSIT student, developer, brand ambassador and model.",
  greeting:
    "Hi, I'm Andrei. I'm a 2nd-year BSIT student, the brand ambassador of Holy Cross of Davao College, and a model who works with other brands too. I'm building my future, one line of code at a time.",
};

/* ------------------------------------------------------------------ Work */

export type Project = {
  id: string;
  title: string;
  blurb: string;
  stack: string[];
  hue: "violet" | "magenta" | "blue";
  /** "scene" shows the live pixel scene; "empty" shows a no-signal test card. */
  preview: "scene" | "empty";
  href?: string;
  source?: string;
};

// TODO: replace the two empty slots with your real projects.
// Give each a title, blurb, stack, href (live link) and optionally source (code link),
// and set preview to "scene" (or leave "empty" until you have a screenshot).
export const projects: Project[] = [
  {
    id: "portfolio",
    title: "This portfolio",
    blurb:
      "My personal site, designed as a retro pixel-art world with an RPG-style interface.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    hue: "violet",
    preview: "scene",
    href: "https://andrei-sanchez.vercel.app/",
  },
  {
    id: "slot-2",
    title: "Slot 2",
    blurb: "This slot is open for my next project.",
    stack: [],
    hue: "magenta",
    preview: "empty",
  },
  {
    id: "slot-3",
    title: "Slot 3",
    blurb: "This slot is open for my next project.",
    stack: [],
    hue: "blue",
    preview: "empty",
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

// The four code skills come from the stack this site is built with.
// TODO: add the rest of your skills (up to 8 slots are shown).
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

export type Quest = {
  title: string;
  where: string;
  status: "active" | "cleared";
  text: string;
};

// TODO: add dates, events and details for each entry as you like.
export const quests: Quest[] = [
  {
    title: "BSIT, 2nd year",
    where: "Information Technology student",
    status: "active",
    text: "Learning to build software, one line of code at a time.",
  },
  {
    title: "Brand Ambassador",
    where: "Holy Cross of Davao College",
    status: "active",
    text: "Represents the college as its brand ambassador.",
  },
  {
    title: "Model",
    where: "Works with other brands",
    status: "active",
    text: "Models for brands beyond the college.",
  },
  {
    title: "Pageant King",
    where: "Add the pageant and year",
    status: "cleared",
    text: "Add the title you won and the events you joined.",
  },
];

/* ----------------------------------------------------------------- About */

export const stats: Array<[string, string]> = [
  ["Name", "Andrei Sanchez"],
  ["Class", "BSIT student"],
  ["Year", "2nd year"],
  ["Home", "Davao City"],
  ["Represents", "Holy Cross of Davao College"],
  ["Title", "Pageant King"],
  ["Side quest", "Modeling for brands"],
];

/* --------------------------------------------------------------- Contact */

// TODO: replace these with your real email and profiles.
export const contact = {
  email: "you@example.com",
  links: [
    {
      label: "Instagram",
      handle: "@yourhandle",
      href: "https://instagram.com/yourhandle",
    },
    {
      label: "GitHub",
      handle: "github.com/yourhandle",
      href: "https://github.com/yourhandle",
    },
  ],
};
