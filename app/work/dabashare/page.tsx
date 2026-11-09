import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";

export const metadata: Metadata = {
  title: "DabaShare case study | Andrei Sanchez",
  description:
    "How Andrei Sanchez built DabaShare, a front-end prototype of a skill-exchange site for students in Davao City, in plain HTML, CSS and JavaScript modules.",
};

export default function DabaSharePage() {
  return <CaseStudy />;
}
