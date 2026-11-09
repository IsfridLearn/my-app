import type { ContactDetails } from "@/types";

export const contact: ContactDetails = {
  lead: "A brand collaboration, a modeling inquiry or a web project: write to me.",
  email: "andreisanchez077@gmail.com",
  links: [
    { label: "GitHub", handle: "IsfridLearn", href: "https://github.com/IsfridLearn" },
    {
      label: "LinkedIn",
      handle: "Andrei Sanchez",
      href: "https://www.linkedin.com/in/andrei-sanchez-96207b398/",
    },
  ],
};

export const hasContact =
  contact.email.trim() !== "" || contact.links.some((l) => l.href.trim() !== "");
