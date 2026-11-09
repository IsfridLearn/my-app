import type { FrameImages, Photo, Print, Shot } from "@/types";

export const prints: Record<"dark" | "light", Print> = {
  dark: {
    file: "CAM·01",
    label: "Portrait, dark print",
    src: "/photos/print-dark.webp",
    alt: "Andrei Sanchez in a black suit and tie, looking at the camera",
    width: 896,
    height: 1187,
  },
  light: {
    file: "CAM·02",
    label: "Portrait, light print",
    src: "/photos/print-light.webp",
    alt: "Andrei Sanchez in a white suit and black tie, looking at the camera",
    width: 773,
    height: 1024,
  },
};

// Layered artwork behind the hero and About portraits. Empty alt means decorative.
export const portraitArt: Record<
  "ghostLeft" | "ghostRight" | "panel" | "stain" | "square" | "outline" | "outlineLight",
  Shot
> = {
  ghostLeft: { src: "/photos/hero-ghost-l.webp", alt: "", width: 620, height: 807 },
  ghostRight: { src: "/photos/hero-ghost-r.webp", alt: "", width: 620, height: 739 },
  panel: {
    src: "/photos/hero-panel.webp",
    alt: "Close portrait of Andrei Sanchez in a black t-shirt, looking at the camera",
    width: 1100,
    height: 1483,
  },
  stain: { src: "/photos/hero-stain.webp", alt: "", width: 900, height: 520 },
  square: { src: "/photos/hero-square.webp", alt: "", width: 360, height: 360 },
  outline: { src: "/photos/hero-outline.webp", alt: "", width: 1036, height: 1327 },
  outlineLight: { src: "/photos/hero-outline-light.webp", alt: "", width: 913, height: 1164 },
};

// Pictures in Beyond the Screen. Crops are set in scripts/make-plates.mjs.
export const photos: Record<
  "profile" | "set" | "gold" | "ginoo" | "patnubay" | "stage" | "headshot" | "eyes",
  Photo
> = {
  profile: {
    id: "cam-03",
    file: "CAM·03",
    label: "Studio profile",
    src: "/photos/hero-profile.webp",
    alt: "Andrei Sanchez in profile, looking up and to the left",
    width: 2400,
    height: 1200,
  },
  set: {
    id: "cam-04",
    file: "CAM·04",
    label: "On set, gold shoot",
    src: "/photos/plate-set.webp",
    alt: "Andrei Sanchez in white drapes and gold body paint on a set of satin and cotton clouds",
    width: 760,
    height: 1060,
  },
  gold: {
    id: "cam-05",
    file: "CAM·05",
    label: "Gold shoot",
    src: "/photos/plate-gold.webp",
    alt: "Andrei Sanchez wearing a beaded headpiece and neck rings, lifting a white drape around the head",
    width: 1080,
    height: 990,
  },
  ginoo: {
    id: "cam-06",
    file: "CAM·06",
    label: "Ginoo ng Ilang 2026",
    src: "/photos/plate-ilang-2026.webp",
    alt: "Andrei Sanchez on stage in a crown and sash, smiling and holding flowers and a large Ginoo ng Ilang 2026 check",
    width: 1080,
    height: 1080,
  },
  patnubay: {
    id: "cam-07",
    file: "CAM·07",
    label: "Patnubay ng Ilang 2025",
    src: "/photos/plate-ilang-2025.webp",
    alt: "Andrei Sanchez in an embroidered white suit, cape and crown, holding roses in front of a Ginoo ng Ilang 2025 backdrop",
    width: 900,
    height: 1085,
  },
  stage: {
    id: "cam-08",
    file: "CAM·08",
    label: "On stage",
    src: "/photos/plate-stage.webp",
    alt: "Andrei Sanchez walking a pageant stage in a beaded velvet blazer and white gloves",
    width: 620,
    height: 900,
  },
  headshot: {
    id: "cam-09",
    file: "CAM·09",
    label: "Headshot",
    src: "/photos/hero-headshot.webp",
    alt: "Andrei Sanchez in a black t-shirt, turned slightly and looking at the camera",
    width: 800,
    height: 1200,
  },
  eyes: {
    id: "cam-10",
    file: "CAM·10",
    label: "Headshot, eyes",
    src: "/photos/hero-eyes.webp",
    alt: "A close crop across Andrei Sanchez's eyes",
    width: 1800,
    height: 600,
  },
};

// The contact sheet in Beyond the Screen: a dithered frame over each real photo.
export const contactSheetFrames: FrameImages[] = [1, 2, 3, 4, 5, 6, 7, 8].map((frame) => ({
  frame,
  dither: { src: `/photos/frame-${frame}-dither.png`, alt: "", width: 240, height: 180 },
  photo: { src: `/photos/frame-${frame}.webp`, alt: "", width: 640, height: 480 },
}));
