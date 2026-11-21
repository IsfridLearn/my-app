import type { SkillGroup } from "@/types";

// Only list what the projects on this site actually use.
export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "C++", "Java"],
    layout: "tiles",
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Responsive web design"],
    layout: "wide",
  },
  {
    category: "Backend and data",
    note: "Accounts, databases and storage for Isfridia and RentDavao.",
    items: ["Supabase", "Firebase"],
    layout: "panels",
  },
  {
    category: "Development environment",
    note: "Where I write code and keep track of it.",
    items: ["Visual Studio Code", "Git", "GitHub"],
    layout: "compact",
  },
  {
    category: "AI-assisted development",
    note: "Assistants in my workflow for explanations, debugging and drafting code.",
    items: ["ChatGPT", "Claude"],
    layout: "compact",
  },
];
