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
    "Condensed poster type and script carry names and personality, IBM Plex Sans carries the reading and IBM Plex Mono the labels.",
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
      "The Selected Work section, with project cards stacked and tilted behind the front card",
      "Selected Work, as a deck of project cards",
    ),
  ],
  features: [
    "Print dark and print light: one button swaps the front-page portrait between the two prints",
    "A deck of project cards, changed by clicking, by the buttons or with the arrow keys",
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
  linkNote: "The code is in a private repository, so there is no public link yet.",
};
