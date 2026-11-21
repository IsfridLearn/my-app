import { hasContact } from "@/data/contact";
import type { NavSection, SectionHeadingText } from "@/types";

export const navSections: NavSection[] = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "beyond", label: "Beyond the Screen" },
  { id: "about", label: "About" },
  ...(hasContact ? [{ id: "contact", label: "Contact" }] : []),
];

export const sectionHeadings: Record<
  "work" | "stack" | "experience" | "beyond" | "about" | "contact",
  SectionHeadingText
> = {
  work: { title: "Selected Work", script: "projects" },
  stack: { title: "Stack", script: "tools" },
  experience: { title: "Experience", script: "roles" },
  beyond: { title: "Beyond the Screen", script: "camera" },
  about: { title: "About", script: "two sides" },
  contact: { title: "Contact", script: "address" },
};

// The footer's list of every project and picture on the page.
