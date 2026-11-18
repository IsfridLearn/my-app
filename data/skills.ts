import type { SkillGroup } from "@/types";

// Only list what the projects on this site actually use.
export const skillGroups: SkillGroup[] = [
  { category: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "C++", "Java"] },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Responsive web design"],
  },
  {
    category: "Backend and data",
    note: "Accounts, databases and storage for Isfridia and RentDavao.",
    items: ["Supabase", "Firebase"],
  },
  {
    category: "Development environment",
    note: "Where I write code and keep track of it.",
    items: ["Visual Studio Code", "Git", "GitHub"],
  },
  {
    category: "AI-assisted development",
    note: "Assistants in my workflow for explanations, debugging and drafting code.",
    items: ["ChatGPT", "Claude"],
  },
];
