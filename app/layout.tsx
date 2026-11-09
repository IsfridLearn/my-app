import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, League_Gothic, Pinyon_Script } from "next/font/google";
import "./globals.css";

// Typewriter text everywhere, with poster and script faces for headlines.
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const poster = League_Gothic({
  variable: "--font-poster",
  subsets: ["latin"],
});

const script = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const title = "Andrei Sanchez | Aspiring developer and creative technologist";
const description =
  "Andrei Sanchez is a second-year BSIT student in Davao City learning web development, with a creative background as a model, brand ambassador and pageant titleholder.";

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
      className={`${mono.variable} ${poster.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
