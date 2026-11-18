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
    id: "isfridia",
    title: "Isfridia",
    category: "Web app",
    label: "Live",
    blurb:
      "A web-based manhwa reading platform where people can read for free, with accounts, bookmarks and an admin dashboard for publishing comics.",
    why: "I wanted a reading site for original manhwa, run from my own dashboard, where readers don't have to pay to read.",
    role: [
      "I developed Isfridia, working across the frontend, backend integration, database structure, authentication, and administrative tools.",
      "I handled the interface and reading experience, connected the application to Supabase, and worked on the systems that manage accounts, bookmarks, reading progress, and comic content.",
      "I also worked on the deployment and the overall structure of the application using Next.js.",
    ].join("\n\n"),
    choices: [
      "Public pages are cached, and personal details such as bookmarks and reading progress load separately for each reader.",
      "Supabase row-level security decides what each visitor, reader and admin can see and change.",
      "Titles from the MangaDex catalog only link to official chapters on the publisher's site; fan translations are never imported.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    status: "Live on Vercel.",
    cover: {
      kind: "logo",
      src: "/logos/isfridia.svg",
      alt: "The Isfridia logo, a capital I on a white rounded tile",
      width: 512,
      height: 512,
    },
    href: "https://isfridia.vercel.app",
    source: "https://github.com/IsfridLearn/Isfridia",
  },
  {
    id: "rentdavao",
    title: "RentDavao",
    category: "Android app",
    label: "Version 1.0",
    blurb:
      "A rental marketplace app for Davao City, where people can rent properties, vehicles, gadgets and more, or list their own things to earn from.",
    why: "Renting and lending in Davao City should be easier. RentDavao puts things to rent in one place and gives people and businesses a way to earn from what they already own.",
    role: [
      "Overall Developer · AI-Assisted Development",
      "I was responsible for developing RentDavao as an Android application, working across its interface, application logic, Firebase integration, and overall functionality.",
      "AI tools were part of my development workflow. I used AI assistance to help explore implementation approaches, draft and refine code, work through errors, and speed up parts of the development process.",
      "But building the application still required me to understand how its different parts worked together, review the generated code, make implementation decisions, and test the resulting functionality.",
      "This experience helped me see AI as more than just a tool for generating code. Used properly, it can become part of the development process, helping me work through problems and turn ideas into functioning software.",
    ].join("\n\n"),
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
];
