import type { CaseShot, CaseStudyContent } from "@/types";

// Case studies built from data. Every statement was checked against the project's code
// or its own notes. Anything left out shows on the page as a marked placeholder, so fill
// those in yourself rather than letting anything be made up.

const portfolioShot = (name: string, alt: string, caption: string): CaseShot => ({
  src: `/photos/work-portfolio${name}.webp`,
  alt,
  caption,
  width: 1600,
  height: 1000,
});

export const portfolioCase: CaseStudyContent = {
  id: "portfolio",
  lead: portfolioShot(
    "",
    "The opening screen of this portfolio, with the name Andrei Sanchez in red across a portrait",
    "The front page, in the dark print",
  ),
  intro: [
    { label: "What it is", text: "My personal site, designed as an archive of one person in two prints." },
    {
      label: "The idea",
      text: "My first version leaned on template content and didn't say who I am. I wanted a site that introduces me, what I do and what I'm learning.",
    },
    { label: "Who it's for", todo: "Who you want to reach with it: schools, recruiters, clients, brands." },
  ],
  status: "live, deployed on Vercel.",
  timeline: "Started in October 2026, with the first commit on 3 October, and still being updated.",
  tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  techNote: "Built on the Next.js App Router. Fonts load through next/font and images through next/image.",
  direction: [
    "The page is black, white and one red, with a poster headline for every section.",
    "League Gothic carries the name and section titles, Anton the headings and statements, IBM Plex Sans the reading and IBM Plex Mono the labels.",
    "The same portrait is printed dark and light, and one button swaps between the two.",
    "Image details are reduced to 1-bit dither, the way early computers drew photographs, and jump to the real image on hover.",
  ],
  shots: [
    portfolioShot(
      "-light",
      "The front page in the light print, with the portrait in a white suit",
      "The same front page, in the light print",
    ),
    portfolioShot(
      "-work",
      "The Selected Work section, showing one project as a cut-paper spread with its screenshots and details",
      "Selected Work, one cut-paper spread per project",
    ),
  ],
  features: [
    "Print dark and print light: one button swaps the front-page portrait between the two prints",
    "Selected Work as cut-paper spreads, changed with the arrows, the arrow keys or a swipe",
    "A case-study page for every project",
    "Dithered contact sheet in Beyond the Screen, revealing each photo on hover",
    "Navigation that marks the section you are reading",
    "An archive index in the footer that lists every project and photo by its file number",
  ],
  implementation: [
    {
      label: "Content files",
      text: "All text lives in data files such as profile.ts and projects.ts, so updating the site never means touching components.",
    },
    {
      label: "Components",
      text: "The homepage is built from section components, such as Hero, Selected Work and Stack, inside a shared shell with the navigation and footer.",
    },
    {
      label: "Styles",
      text: "Plain CSS split by section in the styles folder, with shared colors, fonts and spacing set once in base.css.",
    },
    {
      label: "Generated art",
      text: "The smeared portraits and red outlines on the front page are made from the original photos by a Node script using sharp.",
    },
  ],
};

export const rentdavaoCase: CaseStudyContent = {
  id: "rentdavao",
  lead: {
    src: "/logos/rentdavao.svg",
    alt: "The RentDavao logo, a faceted eagle",
    caption: "The RentDavao logo",
    width: 785,
    height: 705,
  },
  intro: [
    {
      label: "What it does",
      text: "A rental marketplace app for Davao City. People can find and rent properties, vehicles, gadgets and other items, or list what they own and earn from rentals.",
    },
    {
      label: "The idea",
      text: "Make renting and lending easier and more accessible in Davao City, with renters and owners connected in one place.",
    },
    { label: "Who it's for", text: "Renters, and the people and businesses who own things to rent out, in the Davao community." },
  ],
  status: "version 1.0 of an Android app. The code is in a private repository.",
  goals: [
    "Put rentals across Davao City in one convenient app.",
    "Give people and businesses a way to list what they own and earn from it.",
    "Let renters deal directly with owners.",
  ],
  tech: ["Java", "Android", "Firebase"],
  techNote:
    "Firebase Authentication with email and Google sign-in, Firebase Realtime Database and Material components. It runs on Android 8.0 and newer.",
  direction: [
    "A palette called Midnight Sage: near-black ink, a warm off-white page and a sage-green accent, with its own dark-mode version.",
    "Plus Jakarta Sans as the app's typeface.",
    "A faceted eagle as the logo, with a version for dark screens such as the splash screen.",
    "Three onboarding pages: rent instead of buying, let idle things earn, and deal directly with the owner.",
    "Pulsing skeleton cards while listings load.",
  ],
  shots: [
    { todo: "Home, with the featured carousel and category chips" },
    { todo: "A listing's details page" },
    { todo: "The form for posting a listing" },
    { todo: "Profile or My Listings" },
  ],
  features: [
    "Sign up and log in with email and password, or with a Google account",
    "Home: the newest rentals in a featured carousel and the rest in a grid, updating as listings change",
    "Browse: search by words and filter by category: Properties, Vehicles, Gadgets, Events, Equipment and Fashion",
    "Post a listing with a photo, price, rental period, location and contact number, and edit it later",
    "My Listings: only your own listings, with edit and delete",
    "Listing details: owners get an Edit button, and everyone else can call the owner if a number was given",
    "Favorites: heart a listing to save it on your phone",
    "Profile: change your name and phone number",
    "Light and dark mode",
  ],
  implementation: [
    {
      label: "Structure",
      text: "Activities and fragments grouped by feature, in auth, listing, main and profile packages, with shared helpers in util.",
    },
    {
      label: "Accounts and privacy",
      text: "Private details are saved under users/{uid}. Only the name and photo go under publicProfiles/{uid}, so other users never see an email or phone number.",
    },
    {
      label: "Live data",
      text: "Home and My Listings listen to the Realtime Database, so new and edited listings appear without a refresh.",
    },
    {
      label: "Photos",
      text: "Photos are turned upright, shrunk on the phone and saved as text inside each listing in the Realtime Database.",
    },
    {
      label: "Search",
      text: "Realtime Database can't search inside text, so Browse matches the words against the listings on the phone.",
    },
    {
      label: "Favorites",
      text: "Saved on the phone for each user, not in Firebase.",
    },
  ],
  challenges: [
    {
      title: "Developing with AI as part of the workflow",
      challenge:
        "Working with AI assistance changed how I approached development. Instead of treating every problem as something I had to solve from scratch, I could use AI to explore possible approaches, understand unfamiliar code, and work through implementation issues.",
      solution:
        "However, generated code still needed to be reviewed and tested. I learned that getting an answer from an AI tool isn't the same as knowing whether that answer actually works within an application.",
    },
    {
      title: "Connecting the different parts of the application",
      challenge:
        "RentDavao also helped me understand how an Android application depends on several systems working together. Authentication, database operations, listing management, and user information all needed to communicate properly.",
      solution:
        "Working through these integrations helped me become more familiar with Firebase and the structure of an application that handles real user data.",
    },
  ],
  learnings: [
    "This project helped me become more comfortable developing an application with AI-assisted tools while still taking responsibility for the implementation.",
    "I learned to treat AI-generated code as something to understand, review, and improve rather than something to accept without question.",
    "It also strengthened my understanding of Android development, Firebase integration, application structure, and the importance of handling user information carefully.",
  ],
  approach: [
    "AI-assisted development was part of my workflow, but the goal was always to produce an application that worked as intended.",
    "I see AI as a development partner for exploring ideas and solving technical problems, while the developer remains responsible for the decisions, implementation, and quality of the final product.",
  ],
  linkNote: "The code is in a private repository, so there is no public link yet.",
};

export const isfridiaCase: CaseStudyContent = {
  id: "isfridia",
  tagline: "A reading space built around the love of manhwa.",
  lead: {
    src: "/logos/isfridia.svg",
    alt: "The Isfridia logo, a capital I on a white rounded tile",
    caption: "The Isfridia logo",
    width: 512,
    height: 512,
  },
  intro: [
    {
      label: "What it is",
      text: "A web-based manhwa reading platform where people can read for free: browse, read, bookmark and pick up where they left off.",
    },
    {
      label: "The idea",
      text: "A dark, focused reading site for original manhwa, published and managed from its own admin dashboard.",
    },
    {
      label: "Who it's for",
      text: "Isfridia is for people who enjoy reading manhwa and want a straightforward place to discover titles, follow updates, and keep track of what they're reading. I wanted the experience to feel simple and focused. Readers should be able to browse, find something interesting, save titles they like, and continue where they left off without having to figure out how the platform works. It's also built with content management in mind, giving administrators a dedicated space to organize comics, chapters, and releases.",
    },
  ],
  status: "live at isfridia.vercel.app, deployed on Vercel.",
  goals: [
    "Let anyone browse and read without paying.",
    "Give readers accounts with bookmarks, favorites, reading history and saved progress.",
    "Run the whole catalog, from comics and chapters to covers and users, from an admin dashboard.",
    "Only show content the site is allowed to show.",
  ],
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
  techNote:
    "Next.js App Router with React, Supabase for the database, sign-in and image storage, and Zod for checking input. Built to deploy on Vercel.",
  direction: [
    "Dark only: near-black blue-grey backgrounds with one accent, a glacier blue, a nod to the name, since “is” means ice.",
    "Bricolage Grotesque for headings and Inter for reading.",
    "Covers in a 2:3 frame, and cards that lift slightly on hover, with reduced motion respected.",
    "A reader with three widths, space reserved for every page image so nothing jumps, and controls at the bottom on phones.",
  ],
  shots: [
    {
      src: "/photos/work-isfridia-home.webp",
      alt: "Isfridia's homepage, with genre buttons and a Trending This Week row of five manhwa covers ranked by followers",
      caption: "Home: browse by genre, and Trending This Week",
      width: 1802,
      height: 917,
    },
    {
      src: "/photos/work-isfridia-comic.webp",
      alt: "A comic's page on Isfridia, with the cover, genres, status, release year, latest chapter, synopsis and Start reading button",
      caption: "A comic's page, with Start reading and the bookmark button",
      width: 1790,
      height: 895,
    },
    {
      src: "/photos/work-isfridia-comics.webp",
      alt: "Isfridia's Comics page, with filters for title or author, genre, status, type and sort order above a grid of manhwa covers",
      caption: "Comics: the whole library, filtered by genre, status or type",
      width: 1843,
      height: 890,
    },
    {
      src: "/photos/work-isfridia-genres.webp",
      alt: "Isfridia's Genres page, a grid of genre tiles from Action to Wuxia, each showing how many series it has",
      caption: "Genres, each with its number of series",
      width: 1799,
      height: 889,
    },
  ],
  features: [
    "Browse by genre, latest updates, popular and recently added, with search and filters",
    "A reader with saved progress for signed-in readers and view counting after five seconds of reading",
    "Accounts with sign-up, login, password reset, bookmarks, favorites and reading history",
    "Account page with profile editing and a download of your own data",
    "Admin dashboard for comics, chapters, page and cover uploads, genres, users and a trash bin",
    "Scheduled chapters that stay hidden until their release time",
    "A MangaDex catalog that lists titles and links only to official chapters on the publisher's site",
    "Trending This Week, ranked from each title's weekly follower growth on MangaDex",
  ],
  implementation: [
    {
      label: "Caching",
      text: "Public pages are cached, and anything personal, such as bookmark state or continue reading, loads separately for each reader.",
    },
    {
      label: "Security",
      text: "Supabase row-level security rules decide what visitors, readers and admins can read and change, checked by an automated test suite.",
    },
    {
      label: "Content rules",
      text: "Chapters hosted on MangaDex are fan translations, so they are never imported or shown. Only official chapters appear, as links to the publisher.",
    },
    {
      label: "Images",
      text: "Covers are converted on the server with sharp and stored in Supabase Storage, with page sizes saved so the reader never shifts.",
    },
    {
      label: "Testing",
      text: "Scripts check sign-in, the admin tools, the reader and the library against a running copy of the site.",
    },
  ],
  challenges: [
    {
      title: "Keeping reader data separate from public content",
      challenge:
        "One thing I had to think carefully about was how to handle information that should only belong to a specific reader. Public comic information can be shared with everyone, but things like bookmarks, reading history, and reading progress should belong to the account that created them.",
      solution:
        "I used Supabase Row Level Security to control which records visitors, signed-in readers, and administrators can access or modify. This helped me understand that having authentication isn't enough. An application also needs proper rules for what each account is allowed to do.",
    },
    {
      title: "Building a reader that feels comfortable to use",
      challenge:
        "The reading experience needed more attention than simply displaying comic pages. I worked on different reader widths, image sizing, and reserving space for page images so the layout wouldn't constantly shift while images load. I also considered smaller screens, where the reading controls need to remain accessible without getting in the way.",
      solution:
        "It made me realize how much small interface decisions can affect the overall experience, especially in applications where people spend a lot of time viewing content.",
    },
    {
      title: "Managing content and scheduled releases",
      challenge:
        "Another part of Isfridia that required careful planning was its admin dashboard. Managing comics involves more than uploading a cover. There are chapters, individual pages, genres, users, and release schedules to consider.",
      solution:
        "I built administrative tools to organize these parts, including scheduled chapters that remain hidden until their release time. Working on this helped me understand how the administrative side of an application is just as important as the interface regular users see.",
    },
    {
      title: "Handling external content responsibly",
      challenge:
        "I also worked on a MangaDex catalog that helps readers discover titles while respecting content availability and publishing rules. Rather than importing fan-translated chapters, Isfridia only links to official chapters available through publishers. Its own reading experience is used for content managed and published through Isfridia.",
      solution:
        "This made me consider not just how to implement a feature, but also what content the application should and shouldn't serve.",
    },
  ],
  learnings: [
    "Isfridia pushed me to think beyond building individual pages and start thinking about an entire application.",
    "I gained experience working with Next.js, TypeScript, Supabase, authentication, database permissions, storage, image processing, and application deployment.",
    "I also learned that features are connected in ways that aren't always obvious at first. A bookmark, for example, involves authentication, database access, user-specific state, and the interface that displays it.",
    "Building Isfridia gave me a better understanding of how frontend and backend systems work together, and why security and data organization need to be considered from the beginning.",
  ],
  futureIntro:
    "I want to keep improving Isfridia as the project grows. Some areas I'd like to focus on include:",
  future: [
    "Improving the overall reading experience, especially on mobile.",
    "Refining the discovery and trending sections.",
    "Making the admin workflow easier to manage.",
    "Continuing to improve loading performance and image handling.",
    "Strengthening testing around authentication, permissions, and reading features.",
    "Improving the experience for readers who return to the platform regularly.",
  ],
  closing:
    "Isfridia is already live, but I see it as an ongoing project rather than something that's finished just because it's deployed.",
};
