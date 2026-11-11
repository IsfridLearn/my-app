import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { portfolioCase } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Portfolio case study | Andrei Sanchez",
  description:
    "How Andrei Sanchez designed and built this portfolio in Next.js: an archive of one person in two prints, in black, white and one red.",
};

export default function PortfolioCasePage() {
  return <CaseStudy content={portfolioCase} />;
}
