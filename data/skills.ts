import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
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
