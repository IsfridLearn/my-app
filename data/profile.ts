import type { AboutContent, HeroContent, Profile } from "@/types";

// Only facts you have told me are used. Anything not filled in yet is left
// empty, and the matching part of the page simply does not appear.

export const profile: Profile = {
  first: "Andrei",
  last: "Sanchez",
  location: "Davao City",
};

export const hero: HeroContent = {
  role: ["Developer", "& Creative Technologist"],
  lede: [
    "Second-year BSIT student at Holy Cross of Davao College, learning to build for the web one project at a time.",
    "My main project so far is DabaShare, a skill-exchange site for students across Davao City universities.",
  ],
  tags: ["HTML, CSS, JavaScript", "React, Next.js", "Tailwind CSS", "C++, Java"],
  label: "Portfolio /2026",
  script: ["art", "meets code"],
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

export const about: AboutContent = {
  headline: ["Some of my time is on camera.", "Some of it is in code."],
  paragraphs: [
    "I started coding because a finished web page felt like a magic trick, and I wanted to see how it was done. Modeling had already taught me that anything that looks effortless has hours of unseen work behind it. Code turned out to work the same way.",
    "I study at Holy Cross of Davao College, the school I also represent as its brand ambassador. I built DabaShare in plain JavaScript to learn how an interface holds together, and now I'm learning React and Next.js by building with them.",
    "Next, I want to give DabaShare a real backend, so its accounts and messages actually work.",
  ],
  interview: [],
};
