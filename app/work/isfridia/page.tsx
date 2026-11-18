import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { isfridiaCase } from "@/data/case-studies";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata(
  "Isfridia case study | Andrei Sanchez",
  "Isfridia, a web-based manhwa reading platform by Andrei Sanchez where people can read for free, built with Next.js and Supabase.",
  "/work/isfridia",
);

export default function IsfridiaCasePage() {
  return <CaseStudy content={isfridiaCase} />;
}
