import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { rentdavaoCase } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "RentDavao case study | Andrei Sanchez",
  description:
    "RentDavao, an Android rental marketplace for Davao City by Andrei Sanchez, built in Java with Firebase.",
};

export default function RentDavaoCasePage() {
  return <CaseStudy content={rentdavaoCase} />;
}
