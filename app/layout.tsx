import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display type: a condensed editorial serif. Text: a clean sans. Labels: mono.
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const text = Instrument_Sans({
  variable: "--font-text",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrei Sanchez, BSIT student and developer",
  description:
    "Andrei Sanchez is a BSIT student, developer, brand ambassador and model in Davao City.",
  openGraph: {
    title: "Andrei Sanchez, BSIT student and developer",
    description:
      "Andrei Sanchez is a BSIT student, developer, brand ambassador, and model in Davao City.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e12",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${text.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
