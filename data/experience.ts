import type { ExperienceContent } from "@/types";

const shot = (name: string, alt: string, width = 1600, height = 1000) => ({
  src: `/photos/${name}.webp`,
  alt,
  width,
  height,
});

// Each role's tags repeat only what its text says. Previews are real screenshots
// of the work the role describes, and each one opens that project's case study.
export const experience: ExperienceContent = {
  note: "Practiced through school and personal projects.",
  roles: [
    {
      title: "Web Developer",
      text: "I build sites with HTML, CSS and JavaScript. This portfolio runs on Next.js and deploys through Vercel.",
      tags: ["HTML", "CSS", "JavaScript", "Next.js", "Vercel"],
      shots: [
        shot(
          "work-portfolio",
          "The opening screen of this portfolio, with the name Andrei Sanchez in red across a portrait",
        ),
      ],
      link: { label: "This portfolio", href: "/work/portfolio" },
    },
    {
      title: "Frontend Developer",
      text: "I work on interfaces in React, Next.js and Tailwind CSS. DabaShare's screens, filtering and navigation are written in plain JavaScript.",
      tags: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
      shots: [
        shot(
          "work-isfridia-home",
          "Isfridia's homepage, with genre buttons and a Trending This Week row of manhwa covers",
          1802,
          917,
        ),
        shot(
          "work-daba-courses",
          "DabaShare's course page, with a search bar, price filters and a grid of student-run courses",
        ),
      ],
      link: { label: "Isfridia", href: "/work/isfridia" },
    },
    {
      title: "UI/UX Designer",
      text: "DabaShare began as my final project for a Human-Computer Interaction class, including its screens and user flows.",
      tags: ["Human-Computer Interaction", "Screens", "User flows"],
      shots: [
        shot(
          "work-daba-login",
          "DabaShare's sign-in screen, with a product explanation beside the form",
        ),
        shot(
          "work-daba-match",
          "DabaShare's profile page, listing what a student can teach and wants to learn beside suggested matches",
        ),
      ],
      link: { label: "DabaShare case study", href: "/work/dabashare" },
    },
  ],
};
