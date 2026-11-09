import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Three voices: a fashion serif for the camera side, a wide sans for the code
// side and for reading, and a mono for archive labels.
const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const text = Archivo({
  variable: "--font-text",
  subsets: ["latin"],
  axes: ["wdth"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Andrei Sanchez | BSIT student, brand ambassador and model";
const description =
  "Andrei Sanchez is a second-year BSIT student in Davao City, the brand ambassador of Holy Cross of Davao College, a model and a pageant titleholder.";

export const metadata: Metadata = {
  metadataBase: new URL("https://andreisanchez.vercel.app"),
  title,
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title,
    description,
    images: [{ url: "/photos/social.jpg", width: 1200, height: 630, alt: "Andrei Sanchez" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
