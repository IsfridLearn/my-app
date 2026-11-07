// Everything the portfolio says lives here. Edit this file, not the components.
// TODO markers show what still needs your real details.

export const profile = {
  first: "Andrei",
  last: "Sanchez",
  lede: "2nd-year BSIT student, brand ambassador and model.",
};

export type WorkItem = {
  title: string;
  text: string;
  meta: string;
  href?: string;
};

// TODO: replace these three placeholders with your real projects.
export const work: WorkItem[] = [
  {
    title: "Project name",
    text: "One line on what you built and who it is for.",
    meta: "Next.js, TypeScript",
    href: "",
  },
  {
    title: "Project name",
    text: "One line on what you built and who it is for.",
    meta: "React",
    href: "",
  },
  {
    title: "Project name",
    text: "One line on what you built and who it is for.",
    meta: "School project",
    href: "",
  },
];

export const about = {
  bio: "I'm a 2nd-year BSIT student, the brand ambassador of Holy Cross of Davao College, and a model who works with other brands too. I'm building my future, one line of code at a time.",
  roles: [
    { role: "Student", detail: "BSIT, 2nd year" },
    { role: "Brand Ambassador", detail: "Holy Cross of Davao College" },
    { role: "Model", detail: "Works with other brands" },
    // TODO: add your pageant titles and events.
    { role: "Pageant King", detail: "Add your titles and events here." },
  ],
};

export type ContactItem = { label: string; value: string; href: string };

// TODO: replace with your real email and profiles.
export const contact: ContactItem[] = [
  { label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
  {
    label: "Instagram",
    value: "@yourhandle",
    href: "https://instagram.com/yourhandle",
  },
  {
    label: "GitHub",
    value: "github.com/yourhandle",
    href: "https://github.com/yourhandle",
  },
];
