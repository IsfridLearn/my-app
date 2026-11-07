import type { Metadata } from "next";
import { Instrument_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
});

const text = Instrument_Sans({
  variable: "--font-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrei Sanchez — Personal Portfolio",
  description: "I build things for the love of the game.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Andrei Sanchez, BSIT student and developer",
    description:
      "Andrei Sanchez is a BSIT student, developer, brand ambassador, and model in Davao City.",
    images: [
      {
        url: "/1232922c-09c4-4cf1-af32-222a31053126.png",
        width: 773,
        height: 1024,
        alt: "Andrei Sanchez in a white suit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrei Sanchez — Personal Portfolio",
    description: "I build things for the love of the game.",
    images: ["/1232922c-09c4-4cf1-af32-222a31053126.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pixel.variable} ${text.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
