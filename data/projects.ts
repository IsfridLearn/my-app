import type { Project } from "@/types";

/** The archive label for a project, such as CODE·01. */
export function projectFileNumber(index: number): string {
  return `CODE·${String(index + 1).padStart(2, "0")}`;
}

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
      "All the text lives in dedicated content files, so updating the site never means touching components.",
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
