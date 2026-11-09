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
};

/* ---------------------------------------------------------------- Prints */

export const prints = {
  dark: {
    file: "CAM·01",
    label: "Portrait, dark print",
    src: "/photos/print-dark.webp",
    alt: "Andrei Sanchez in a black suit and tie, looking at the camera",
    width: 896,
    height: 1187,
  },
  light: {
    file: "CAM·02",
    label: "Portrait, light print",
    src: "/photos/print-light.webp",
    alt: "Andrei Sanchez in a white suit and black tie, looking at the camera",
    width: 773,
    height: 1024,
  },
};

/* ---------------------------------------------------------------- Photos */

export type Photo = {
  id: string;
  file: string;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Pictures in Beyond the Screen. Crops are set in scripts/make-plates.mjs.
export const photos: Record<
  "profile" | "set" | "gold" | "ginoo" | "patnubay" | "stage",
  Photo
> = {
  profile: {
    id: "cam-03",
    file: "CAM·03",
    label: "Studio profile",
    src: "/photos/plate-profile.webp",
    alt: "Andrei Sanchez in profile, looking up and to the left",
    width: 2800,
    height: 1400,
  },
  set: {
    id: "cam-04",
    file: "CAM·04",
    label: "On set, gold shoot",
    src: "/photos/plate-set.webp",
    alt: "Andrei Sanchez in white drapes and gold body paint on a set of satin and cotton clouds",
    width: 760,
    height: 1060,
  },
  gold: {
    id: "cam-05",
    file: "CAM·05",
    label: "Gold shoot",
    src: "/photos/plate-gold.webp",
    alt: "Andrei Sanchez wearing a beaded headpiece and neck rings, lifting a white drape around the head",
    width: 1080,
    height: 990,
  },
  ginoo: {
    id: "cam-06",
    file: "CAM·06",
    label: "Ginoo ng Ilang 2026",
    src: "/photos/plate-ilang-2026.webp",
    alt: "Andrei Sanchez on stage in a crown and sash, smiling and holding flowers and a large Ginoo ng Ilang 2026 check",
    width: 1080,
    height: 1080,
  },
  patnubay: {
    id: "cam-07",
    file: "CAM·07",
    label: "Patnubay ng Ilang 2025",
    src: "/photos/plate-ilang-2025.webp",
    alt: "Andrei Sanchez in an embroidered white suit, cape and crown, holding roses in front of a Ginoo ng Ilang 2025 backdrop",
    width: 900,
    height: 1085,
  },
  stage: {
    id: "cam-08",
    file: "CAM·08",
    label: "On stage",
    src: "/photos/plate-stage.webp",
    alt: "Andrei Sanchez walking a pageant stage in a beaded velvet blazer and white gloves",
    width: 620,
    height: 900,
  },
};

/* ------------------------------------------------------------------ Work */

export type Project = {
  id: string;
  title: string;
  blurb: string;
  why: string;
  role: string;
  choices: string[];
  stack: string[];
  /** Screenshot inside /public, with its pixel size. */
  image?: { src: string; alt: string; width: number; height: number };
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
    blurb: "My personal site, designed as an archive printed in black and white.",
    why: "My first version leaned on template content and didn't say who I am. I wanted a site that introduces me, what I do and what I'm learning.",
    role: "I directed, wrote and built the whole site: concept, layout, interactions and copy.",
    choices: [
      "The interface uses two values, pure black and pure white. The only greys on the page are inside the photographs.",
      "A serif speaks for the camera side and a wide sans for the code side, so my name is set half in each.",
      "Image details are reduced to 1-bit dither, the way early computers drew photographs, and jump to the real image on hover.",
      "All the text lives in one content file, so updating the site never means touching components.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: {
      src: "/photos/work-portfolio.webp",
      alt: "The opening screen of this portfolio, with the name Andrei Sanchez across a portrait",
      width: 1600,
      height: 1000,
    },
    source: "https://github.com/IsfridLearn/my-app",
  },
];

/* ----------------------------------------------------- Beyond the Screen */

export const titles: Array<{ name: string; year: string; lang?: string }> = [
  { name: "Ginoo ng Ilang", year: "2026", lang: "fil" },
  { name: "Patnubay ng Ilang", year: "2025", lang: "fil" },
  { name: "Mr MnD", year: "2025" },
];

export const brands: Array<{ name: string; note?: string }> = [
  { name: "Holy Cross of Davao College", note: "Brand ambassador" },
  { name: "Avi Glow" },
  { name: "Casino Ethyl Alcohol", note: "Promotion" },
];

/* ----------------------------------------------------------------- About */

export const about: {
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
} = {
  headline: ["Some of my time is on camera.", "Some of it is in code."],
  paragraphs: [
    "Being in front of a camera and building things are different kinds of work, and I want both on the same page.",
    "I study at Holy Cross of Davao College, the school I also represent as its brand ambassador. I'm still early in learning to build for the web, and this site is where I practice.",
  ],
  interview: [],
};

/* --------------------------------------------------------------- Contact */

export const contact: {
  email: string;
  links: Array<{ label: string; handle: string; href: string }>;
} = {
  email: "andreisanchez077@gmail.com",
  links: [
    { label: "GitHub", handle: "IsfridLearn", href: "https://github.com/IsfridLearn" },
    {
      label: "LinkedIn",
      handle: "Andrei Sanchez",
      href: "https://www.linkedin.com/in/andrei-sanchez-96207b398/",
    },
  ],
};

export const hasContact =
  contact.email.trim() !== "" || contact.links.some((l) => l.href.trim() !== "");
