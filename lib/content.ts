// Everything the portfolio says lives here. Edit this file, not the components.
// Only facts you have told me are used. Anything not filled in yet is left
// empty, and the matching part of the page simply does not appear.

export const profile = {
  first: "Andrei",
  last: "Sanchez",
  location: "Davao City",
  roles: ["BSIT student", "Brand ambassador", "Model", "Pageant titleholder"],
  greeting:
    "I'm a second-year IT student in Davao City, still early in learning to build for the web. This site is where the camera side of my life and the code side meet.",
  /**
   * Portrait for the top of the page, e.g. "/hero.jpg" (a file inside /public).
   * Leave empty to show the pixel sunset instead.
   */
  photo: "",
};

/* ------------------------------------------------------------------ Work */

export type Project = {
  id: string;
  title: string;
  category: string;
  blurb: string;
  why: string;
  role: string;
  choices: string[];
  stack: string[];
  /** Live link. */
  href?: string;
  /** Code link. */
  source?: string;
};

// Add a project here and it appears on the page. Only write what is true.
export const projects: Project[] = [
  {
    id: "portfolio",
    title: "This portfolio",
    category: "Web",
    blurb: "My personal site, built around a small retro signature.",
    why: "My first version leaned on template content and didn't say who I am. I wanted a site that introduces me, what I do and what I'm learning.",
    role: "I directed, wrote and built the whole site: layout, pixel art, interactions and copy.",
    choices: [
      "The pixel art is drawn in code from text grids and rendered as SVG, so there are no image files and it stays sharp at any size.",
      "Pixel lettering is limited to the monogram. Headings use a serif and paragraphs a plain sans, so reading never costs anything.",
      "There is almost no motion, and none at all for visitors who prefer reduced motion.",
      "All the text lives in one content file, so updating the site never means touching components.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
];

/* ---------------------------------------------------------------- Skills */

// The camera side lives under Experience, so this is only the code side.
export const skills = {
  intro: "What I'm using and learning right now, starting with this site.",
  items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
};

/* ------------------------------------------------------------ Experience */

export type Role = {
  title: string;
  where?: string;
  text?: string;
  /** Shows "Now" in the last column. */
  now?: boolean;
};

export const experience: Role[] = [
  {
    title: "BSIT student",
    where: "Information Technology, 2nd year",
    text: "Learning web development. Building this site is part of that.",
    now: true,
  },
  {
    title: "Brand ambassador",
    where: "Holy Cross of Davao College",
    text: "I represent the college as its brand ambassador.",
    now: true,
  },
  {
    title: "Model",
    where: "Collaborations with other brands",
    text: "I model for brands beyond the college.",
    now: true,
  },
  // TODO: add the title, the pageant, the year and the organizer, e.g.
  //   where: "Name of the pageant, year",
  {
    title: "Pageant titleholder",
  },
];

/* ----------------------------------------------------------------- About */

export const about: {
  headline: [string, string];
  paragraphs: string[];
  interests: string[];
  goals: string;
  /** e.g. "/andrei.jpg" after adding the file to /public. Leave empty to hide. */
  photo: string;
} = {
  headline: ["Some of my time is on camera.", "Some of it is in code."],
  paragraphs: [
    "I'm a second-year BSIT student in Davao City. I'm still early in learning to build for the web, and this site is where I practice.",
    "Outside the classroom I'm the brand ambassador of Holy Cross of Davao College, I model for other brands, and I hold a pageant title. Being in front of a camera and building things are different kinds of work, and I want both on the same page.",
  ],
  // Optional. Leave empty and they are hidden. Write only what is true.
  interests: [],
  goals: "",
  photo: "",
};

/* --------------------------------------------------------------- Contact */

// TODO: add your real email and profiles. While both are empty, the Contact
// section and its menu link are hidden.
// email: "you@yourdomain.com"
// links: [{ label: "Instagram", handle: "@yourname", href: "https://instagram.com/yourname" }]
export const contact: {
  email: string;
  links: Array<{ label: string; handle: string; href: string }>;
} = {
  email: "",
  links: [],
};

export const hasContact =
  contact.email.trim() !== "" || contact.links.some((l) => l.href.trim() !== "");
