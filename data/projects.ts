import type { Project } from "@/types";

/** The archive label for a project, such as CODE·01. */
export function projectFileNumber(index: number): string {
  return `CODE·${String(index + 1).padStart(2, "0")}`;
}

/** The project's case-study page. */
export function caseStudyHref(project: Project): string {
  return `/work/${project.id}`;
}

// Add a project here and it appears on the page. Only write what is true.
// Each project also needs a case-study page in app/work/{id}.
export const projects: Project[] = [
  {
    id: "dabashare",
    title: "DabaShare",
    category: "School project · Web app",
    label: "Front-end prototype",
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
    stack: ["HTML", "CSS", "JavaScript"],
    cover: {
      kind: "logo",
      src: "/logos/dabashare.svg",
      alt: "The DabaShare app icon",
      width: 512,
      height: 512,
    },
    source: "https://github.com/IsfridLearn/DabaShare-FinalProject",
  },
  {
    id: "portfolio",
    title: "This portfolio",
    category: "Personal site",
    label: "Live",
    blurb: "My personal site, designed as an archive of one person in two prints.",
    why: "My first version leaned on template content and didn't say who I am. I wanted a site that introduces me, what I do and what I'm learning.",
    role: "I set the creative direction, chose the photos, supplied the facts and reviewed every change in the browser.",
    choices: [
      "The page is black, white and one red, with a poster headline for every section.",
      "Condensed poster type and script carry names and personality, IBM Plex Sans carries the reading and IBM Plex Mono the labels.",
      "Image details are reduced to 1-bit dither, the way early computers drew photographs, and jump to the real image on hover.",
      "All the text lives in dedicated content files, so updating the site never means touching components.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    cover: {
      kind: "screenshot",
      src: "/photos/work-portfolio.webp",
      alt: "The opening screen of this portfolio, with the name Andrei Sanchez in red across a portrait",
      width: 1600,
      height: 1000,
    },
    source: "https://github.com/IsfridLearn/my-app",
  },
  {
    id: "rentdavao",
    title: "RentDavao",
    category: "Android app",
    label: "Version 1.0",
    blurb:
      "A rental marketplace app for Davao City, where people can rent properties, vehicles, gadgets and more, or list their own things to earn from.",
    why: "Renting and lending in Davao City should be easier. RentDavao puts things to rent in one place and gives people and businesses a way to earn from what they already own.",
    choices: [
      "Activities and fragments are grouped by feature: sign-in, listings, the main tabs and the profile.",
      "Firebase handles accounts and stores listings in a Realtime Database, so changes reach every phone without a refresh.",
      "Photos are shrunk on the phone and saved as text inside each listing.",
    ],
    stack: ["Java", "Android", "Firebase"],
    status: "Version 1.0 of an Android app. The code is in a private repository.",
    cover: {
      kind: "logo",
      src: "/logos/rentdavao.svg",
      alt: "The RentDavao logo, a faceted eagle",
      width: 785,
      height: 705,
      caption: "Rent anything in Davao",
    },
  },
];
