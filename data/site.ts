import type { Metadata } from "next";

export const siteUrl = "https://andreisanchez.vercel.app";

const socialImage = {
  url: "/photos/social.jpg",
  width: 1200,
  height: 630,
  alt: "Andrei Sanchez in a black suit, on black",
};

/** Title, description and link-preview tags for one page. */
export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Andrei Sanchez",
      type: "website",
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
  };
}
