import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { isfridiaCase } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Isfridia case study | Andrei Sanchez",
  description:
    "Isfridia, a web-based manhwa reading platform by Andrei Sanchez where people can read for free, built with Next.js and Supabase.",
};

export default function IsfridiaCasePage() {
  return <CaseStudy content={isfridiaCase} />;
}
