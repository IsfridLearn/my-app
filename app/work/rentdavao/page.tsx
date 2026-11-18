import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { rentdavaoCase } from "@/data/case-studies";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata(
  "RentDavao case study | Andrei Sanchez",
  "RentDavao, an Android rental marketplace for Davao City by Andrei Sanchez, built in Java with Firebase.",
  "/work/rentdavao",
);

export default function RentDavaoCasePage() {
  return <CaseStudy content={rentdavaoCase} />;
}
