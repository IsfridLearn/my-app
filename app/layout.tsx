import type { Metadata } from "next";
import { Instrument_Sans, Pixelify_Sans, VT323 } from "next/font/google";
import "./globals.css";

const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
});

const text = Instrument_Sans({
  variable: "--font-text",
  subsets: ["latin"],
});

const terminal = VT323({
  variable: "--font-terminal",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Andrei Sanchez, BSIT student and developer",
  description: "I build things for the love of the game.",
  openGraph: {
    title: "Andrei Sanchez, BSIT student and developer",
    description:
      "Andrei Sanchez is a BSIT student, developer, brand ambassador, and model in Davao City.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pixel.variable} ${text.variable} ${terminal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
