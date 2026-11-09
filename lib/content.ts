// Everything the portfolio says lives here. Edit this file, not the components.
// Only facts you have told me are used. Anything not filled in yet is left
// empty, and the matching part of the page simply does not appear.

export const profile = {
  first: "Andrei",
  last: "Sanchez",
  location: "Davao City",
};

/* ------------------------------------------------------------ Front page */

export const hero: {
  role: [string, string];
  lede: string[];
  tags: string[];
  label: string;
  script: [string, string];
  body: string;
  notes: Array<{ title: string; text: string; link: string; href: string }>;
} = {
  role: ["Aspiring Developer", "& Creative Technologist"],
  lede: [
    "Second-year BSIT student at Holy Cross of Davao College, learning to build for the web one project at a time.",
    "My main project so far is DabaShare, a skill-exchange site for students across Davao City universities.",
  ],
  tags: ["HTML, CSS, JavaScript", "React, Next.js", "Tailwind CSS", "C++, Java"],
  label: "Portfolio /2026",
  script: ["the", "developer"],
  body: "Some of my time is on camera. Some of it is in code. DabaShare is a solo school project, written in plain HTML, CSS and JavaScript modules. This portfolio runs on Next.js and React, and its look comes from the camera side of my life.",
  notes: [
    {
      title: "Building",
      text: "DabaShare and this portfolio, with screenshots, decisions and code.",
      link: "See the work",
      href: "#work",
    },
    {
      title: "Stack",
      text: "Languages, frontend, tools and AI assistants, kept in separate lists.",
      link: "See the stack",
      href: "#stack",
    },
    {
      title: "Elsewhere",
      text: "Model, brand ambassador and pageant titleholder.",
      link: "Beyond the Screen",
      href: "#beyond",
    },
  ],
};

/* ------------------------------------------------------ Section headlines */

// The script word set across each section's poster title: "the projects", and so on.
export const spreads = {
  work: "projects",
  stack: "tools",
  experience: "roles",
  beyond: "camera",
  contact: "address",
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
    src: "/photos/hero-profile.webp",
    alt: "Andrei Sanchez in profile, looking up and to the left",
    width: 2400,
    height: 1200,
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
    src: "/photos/hero-headshot.webp",
    alt: "Andrei Sanchez in a black t-shirt, turned slightly and looking at the camera",
    width: 800,
    height: 1200,
  },
  eyes: {
    id: "cam-10",
    file: "CAM·10",
    label: "Headshot, eyes",
    src: "/photos/hero-eyes.webp",
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
  /** Link to a longer write-up on this site. */
  caseStudy?: string;
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
    caseStudy: "/work/dabashare",
  },
  {
    id: "portfolio",
    title: "This portfolio",
    blurb: "My personal site, designed as an archive of one person in two prints.",
    why: "My first version leaned on template content and didn't say who I am. I wanted a site that introduces me, what I do and what I'm learning.",
    role: "I set the creative direction, chose the photos and supplied the facts. Claude wrote much of the code with me, and I reviewed each change in the browser.",
    choices: [
      "The page is black, white and one red, with a poster headline for every section.",
      "Condensed poster type, script and a typewriter face do different jobs: names, personality and reading.",
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

/* --------------------------------------------------- DabaShare case study */

export type CaseShot = Shot & { caption: string };

const dabaShot = (name: string, alt: string, caption: string): CaseShot => ({
  src: `/photos/work-daba-${name}.webp`,
  alt,
  caption,
  width: 1600,
  height: 1000,
});

// Every statement here was checked against the DabaShare source code.
export const dabashareCase = {
  title: "DabaShare",
  script: "case study",
  intro: [
    {
      label: "What it does",
      text: "A skill-exchange site where students can browse peer-run courses, list what they can teach and want to learn, message each other and join study sessions.",
    },
    {
      label: "The problem",
      text: "Students who need help with a subject and students who can teach it have no shared place to find each other.",
    },
    {
      label: "Who it's for",
      text: "Students at universities across Davao City, including UM, AdDU and UP Mindanao.",
    },
  ],
  status: {
    label: "Status:",
    text: "front-end prototype. It runs on sample data with simulated sign-in and no backend, and nothing is saved after a refresh.",
  },
  objectives: [
    "Let students exchange skills and find tutors from other schools.",
    "Offer student-run courses, both free and paid.",
    "Show each student who can teach what they want to learn.",
    "Give students one place for courses, messages and study sessions.",
  ],
  role: "A solo school project, built as my final project for a Human-Computer Interaction class. I built the screens, the styling and the JavaScript.",
  tech: ["HTML", "CSS", "JavaScript (ES modules)"],
  techNote: "It has no framework, build step or backend. It runs as static files from any web server.",
  flow: ["Sign in", "Courses", "Profile & Match", "Messages", "Webinars"],
  flowText:
    "Signing in opens Courses, and the navigation bar moves between the four main screens. The Chat button on a match jumps straight to that person's conversation.",
  structure:
    "One HTML file holds six screens: sign-in, sign-up, courses, profile, webinars and messages, plus two dialogs for posting a course and scheduling a webinar. A single active class decides which screen is showing.",
  decisions: [
    "Sign-in sits beside a short explanation of the product, so a new visitor learns what it is first.",
    "Search, price and university filters share one bar above the course grid.",
    "Profile & Match keeps what you teach, what you want to learn and your matches on one screen.",
    "Messages pairs a fixed conversation list with the open chat.",
    "Colours and greys are defined once as CSS variables.",
  ],
  shots: {
    courses: dabaShot("courses", "DabaShare's course page, with a search bar, price filters and a grid of student-run courses", "Courses: search, filters and the card grid"),
    login: dabaShot("login", "DabaShare's sign-in screen, with a product explanation beside the form", "Sign-in, beside the product explanation"),
    match: dabaShot("match", "DabaShare's profile page, listing what a student can teach and wants to learn beside suggested matches", "Profile & Match, with sample people"),
    messages: dabaShot("messages", "DabaShare's messages screen, with a conversation list beside an open chat", "Messages, with sample conversations"),
    post: dabaShot("post", "DabaShare's dialog for posting a new course", "The post-a-course dialog"),
    webinars: dabaShot("webinars", "DabaShare's webinars page, with cards for upcoming study groups and sessions", "Webinars and study groups"),
    phone: {
      src: "/photos/work-daba-phone.webp",
      alt: "DabaShare's messages screen on a phone, zoomed out because the layout is wider than the screen",
      caption: "On a phone: the two-column layout doesn't stack yet",
      width: 780,
      height: 1688,
    } satisfies CaseShot,
  },
  features: {
    works: {
      title: "Works in the browser",
      note: "Real logic that runs when you use it. Changes last until the page is refreshed.",
      items: [
        "Course search by title or level",
        "Price and university filters, combined with search",
        "Posting a new course, with required-field checks",
        "Adding and removing skill tags",
        "Sending chat messages in a conversation",
        "Opening a conversation from a match",
        "Switching screens and webinar tabs",
      ],
    },
    simulated: {
      title: "Simulated",
      note: "Present in the interface, with nothing real behind it yet.",
      items: [
        "Sign-in accepts any email and password",
        "Sign-up only shows a confirmation",
        "Enroll and Join Session only show a confirmation",
        "Scheduling a webinar only shows a confirmation",
        "Chat replies are picked from five canned lines",
        "Matches are the same four sample people for everyone",
        "Course ratings are sample numbers",
      ],
    },
  },
  implementation: [
    {
      label: "Architecture",
      text: "There are no components in the framework sense. Nine JavaScript files, about 650 lines: App.js wires up events, auth, courses, profile, messages and webinars hold the features, and data, dom and state are shared.",
    },
    {
      label: "State management",
      text: "state.js exports one appState object for the active user, the price filter and the open conversation, plus cached references to common elements.",
    },
    {
      label: "Reusable pieces",
      text: "buildCourseCard, buildMatchCard, buildWebinarCard and buildConvItem each turn a data object into HTML. dom.js holds the shared helpers for selecting elements, switching screens, toasts and closing dialogs.",
    },
    {
      label: "Data handling",
      text: "data.js holds sample arrays: 9 courses, 4 matches, 3 conversations and 6 webinars. A posted course or sent message is pushed into those arrays in memory, then the screen is rendered again.",
    },
    {
      label: "Events",
      text: "Lists use event delegation. The listener sits on the parent grid, so buttons on cards rendered later still work.",
    },
    {
      label: "Responsive behavior",
      text: "Card grids use auto-fill columns and tag rows wrap, so they reflow. There are no media queries, and fixed two-column layouts such as Profile and Messages don't stack on a phone.",
    },
  ],
  code: {
    caption: "courses.js, getFilteredCourses: search, price and university in one pass",
    source: `return courseList.filter(course => {
  const matchesQuery = !query
    || course.title.toLowerCase().includes(query)
    || course.level.toLowerCase().includes(query);

  const matchesPrice = appState.priceFilter === 'all'
    || (appState.priceFilter === 'free' && course.price === 0)
    || (appState.priceFilter === 'paid' && course.price > 0);

  const matchesUni = uniVal === 'all' || course.uni === uniVal;

  return matchesQuery && matchesPrice && matchesUni;
});`,
  },
  learnings: [
    {
      title: "Wiring by hand",
      challenge: "Without a framework, every button and input has to be connected manually, and App.js grew into one long list of listeners.",
      learned: "Event delegation kept dynamic lists working, and showed me what frameworks handle for you.",
    },
    {
      title: "A product with no backend",
      challenge: "The interface had to feel complete with no server, so sign-in, matches and replies are stand-ins.",
      learned: "Keeping sample data in its own file means a real data source can replace it later without rewriting the screens.",
    },
    {
      title: "Modules don't prevent repeats",
      challenge: "Splitting the code by feature didn't stop overlap: joinWebinar exists in two files and the search listeners are attached twice.",
      learned: "Clear file boundaries still need a review pass to find code that has drifted into two places.",
    },
  ],
  future: [
    "A real backend with accounts and sign-in",
    "Saved courses, profiles and messages",
    "Matching based on what students actually teach and want to learn",
    "Media queries so Profile and Messages work on phones",
    "Escaping typed text, since messages and tags are inserted as raw HTML",
  ],
  repository: "https://github.com/IsfridLearn/DabaShare-FinalProject",
  linkNote: "No live demo is published yet.",
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
    "I started coding because a finished web page felt like a magic trick, and I wanted to see how it was done. Modeling had already taught me that anything that looks effortless has hours of unseen work behind it. Code turned out to work the same way.",
    "I study at Holy Cross of Davao College, the school I also represent as its brand ambassador. I built DabaShare in plain JavaScript to learn how an interface holds together, and now I'm learning React and Next.js by building with them.",
    "Next, I want to give DabaShare a real backend, so its accounts and messages actually work.",
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
