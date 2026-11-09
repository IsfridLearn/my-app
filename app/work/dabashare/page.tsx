import type { Metadata } from "next";
import { Dabashare } from "@/components/dabashare/Dabashare";

export const metadata: Metadata = {
  title: "DabaShare case study | Andrei Sanchez",
  description:
    "How Andrei Sanchez built DabaShare, a front-end prototype of a skill-exchange site for students in Davao City, in plain HTML, CSS and JavaScript modules.",
};

export default function DabaSharePage() {
  return <Dabashare />;
}
