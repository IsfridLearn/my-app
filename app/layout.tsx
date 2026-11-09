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

const title = "Andrei Sanchez | BSIT student, brand ambassador and model";
const description =
  "Andrei Sanchez is a second-year BSIT student in Davao City, the brand ambassador of Holy Cross of Davao College, a model and a pageant titleholder.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
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
