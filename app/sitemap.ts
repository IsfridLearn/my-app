import type { MetadataRoute } from "next";
import { caseStudyHref, projects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${siteUrl}${caseStudyHref(project)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
