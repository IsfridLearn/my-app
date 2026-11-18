import type { Metadata } from "next";
import { Dabashare } from "@/components/dabashare/Dabashare";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata(
  "DabaShare case study | Andrei Sanchez",
  "How Andrei Sanchez built DabaShare, a front-end prototype of a skill-exchange site for students in Davao City, in plain HTML, CSS and JavaScript modules.",
  "/work/dabashare",
);

export default function DabaSharePage() {
  return <Dabashare />;
}
