import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrei Sanchez, BSIT student and developer",
  description:
    "Andrei Sanchez is a BSIT student, developer, brand ambassador, and model in Davao City.",
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
    title: "Andrei Sanchez, BSIT student and developer",
    description:
      "Andrei Sanchez is a BSIT student, developer, brand ambassador, and model in Davao City.",
    images: ["/1232922c-09c4-4cf1-af32-222a31053126.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
