import { hasContact } from "@/data/contact";
import { photos, prints } from "@/data/photos";
import { caseStudyHref, projectFileNumber, projects } from "@/data/projects";
import type { ArchiveEntry, NavSection, SectionHeadingText } from "@/types";

export const navSections: NavSection[] = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "beyond", label: "Beyond the Screen" },
  { id: "about", label: "About" },
  ...(hasContact ? [{ id: "contact", label: "Contact" }] : []),
];

export const sectionHeadings: Record<
  "work" | "stack" | "experience" | "beyond" | "contact",
  SectionHeadingText
> = {
  work: { title: "Selected Work", script: "projects" },
  stack: { title: "Stack", script: "tools" },
  experience: { title: "Experience", script: "roles" },
  beyond: { title: "Beyond the Screen", script: "camera" },
  contact: { title: "Contact", script: "address" },
};

// The footer's list of every project and picture on the page.
export const archiveIndex: ArchiveEntry[] = [
  ...projects.map((project, index) => ({
    file: projectFileNumber(index),
    label: project.title,
    href: caseStudyHref(project),
  })),
  { file: prints.dark.file, label: prints.dark.label, href: "#home" },
  { file: prints.light.file, label: prints.light.label, href: "#about" },
  ...Object.values(photos).map((photo) => ({
    file: photo.file,
    label: photo.label,
    href: `#${photo.id}`,
  })),
];
