// Everything the portfolio says lives here. Edit this file, not the components.
// Only facts you have told me are used. Anything not filled in yet is left
// empty, and the matching part of the page simply does not appear.

export const profile = {
  first: "Andrei",
  last: "Sanchez",
  location: "Davao City",
  title: "Aspiring Developer & Creative Technologist",
  greeting:
    "I'm a second-year BSIT student in Davao City, learning to build for the web one project at a time. My main project so far is DabaShare, a skill-exchange site for Davao students.",
  primaryTech: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
  alsoNote: "Also a model, brand ambassador and pageant titleholder",
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
  "profile" | "set" | "gold" | "ginoo" | "patnubay" | "stage" | "headshot" | "eyes",
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
  headshot: {
    id: "cam-09",
    file: "CAM·09",
    label: "Headshot",
    src: "/photos/plate-headshot.webp",
    alt: "Andrei Sanchez in a black t-shirt, turned slightly and looking at the camera",
    width: 800,
    height: 1200,
  },
  eyes: {
    id: "cam-10",
    file: "CAM·10",
    label: "Headshot, eyes",
    src: "/photos/plate-eyes.webp",
    alt: "A close crop across Andrei Sanchez's eyes",
    width: 1800,
    height: 600,
  },
};

/* ------------------------------------------------------------------ Work */

export type Shot = { src: string; alt: string; width: number; height: number };

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
};

// Add a project here and it appears on the page. Only write what is true.
export const projects: Project[] = [
  {
    id: "dabashare",
    title: "DabaShare",
    blurb:
      "A skill-exchange site where students across Davao City universities can find tutors, trade skills and join study sessions.",
    why: "Students who need help with a subject and students who can teach it have no shared place to find each other. I built this as my final project for a Human-Computer Interaction class.",
    role: "A solo school project. I built the screens, the styling and the JavaScript.",
    status:
      "A front-end prototype. Sign-in is simulated, and the courses, matches and messages are sample data. There is no backend yet.",
    choices: [
      "I split the JavaScript into ES modules by feature: auth, courses, profile, messages and webinars, with one entry file wiring up navigation and events.",
      "Shared values such as the active user and selected filters live in a single state module, so the features don't pass them around.",
      "Course cards, match cards, webinars and conversations are rendered from data arrays instead of being written by hand in the HTML.",
      "Navigation swaps views inside one page, and courses can be narrowed by search and by free or paid.",
    ],
    stack: ["HTML", "CSS", "JavaScript (ES modules)"],
    image: {
      src: "/photos/work-daba-courses.webp",
      alt: "DabaShare's course page, with a search bar, price filters and a grid of student-run courses",
      width: 1600,
      height: 1000,
    },
    more: [
      {
        src: "/photos/work-daba-match.webp",
        alt: "DabaShare's profile page, listing what a student can teach and wants to learn beside suggested matches",
        width: 1600,
        height: 1000,
      },
      {
        src: "/photos/work-daba-webinars.webp",
        alt: "DabaShare's webinars page, with cards for upcoming study groups and sessions",
        width: 1600,
        height: 1000,
      },
    ],
    source: "https://github.com/IsfridLearn/DabaShare-FinalProject",
  },
  {
    id: "portfolio",
    title: "This portfolio",
    blurb: "My personal site, designed as an archive of one person in two prints.",
    why: "My first version leaned on template content and didn't say who I am. I wanted a site that introduces me, what I do and what I'm learning.",
    role: "I set the creative direction, chose the photos and supplied the facts. Claude wrote much of the code with me, and I reviewed each change in the browser.",
    choices: [
      "Ink and ivory carry the page, and oxide red marks only active links.",
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

/* ----------------------------------------------------------------- Stack */

export const stack: Array<{ category: string; note?: string; items: string[] }> = [
  { category: "Languages", items: ["HTML", "CSS", "JavaScript", "C++", "Java"] },
  {
    category: "Frontend development",
    items: ["React", "Next.js", "Tailwind CSS", "Responsive web design"],
  },
  {
    category: "Environment and tools",
    note: "Where I write code and keep track of it.",
    items: ["Visual Studio Code", "Git", "GitHub"],
  },
  {
    category: "AI-assisted development",
    note: "Assistants in my workflow for explanations, debugging and drafting code. They are tools, and this site was built with their help.",
    items: ["ChatGPT", "Claude"],
  },
];

/* ------------------------------------------------------------ Experience */

export const experience: { note: string; roles: Array<{ title: string; text: string }> } = {
  note: "Practiced through school and personal projects.",
  roles: [
    {
      title: "Web Developer",
      text: "I build sites with HTML, CSS and JavaScript. This portfolio runs on Next.js and deploys through Vercel.",
    },
    {
      title: "Frontend Developer",
      text: "I work on interfaces in React, Next.js and Tailwind CSS. DabaShare's screens, filtering and navigation are written in plain JavaScript.",
    },
    {
      title: "UI/UX Designer",
      text: "DabaShare began as my final project for a Human-Computer Interaction class, including its screens and user flows.",
    },
  ],
};

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
