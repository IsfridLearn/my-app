import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { portfolioCase } from "@/data/case-studies";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata(
  "Portfolio case study | Andrei Sanchez",
  "How Andrei Sanchez designed and built this portfolio in Next.js: an archive of one person in two prints, in black, white and one red.",
  "/work/portfolio",
);

export default function PortfolioCasePage() {
  return <CaseStudy content={portfolioCase} />;
}
