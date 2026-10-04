import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { CanvasText } from "@/components/ui/canvas-text";

const canvasTextColors = [
  "rgba(0, 180, 255, 1)",
  "rgba(0, 180, 255, 0.9)",
  "rgba(0, 180, 255, 0.8)",
  "rgba(0, 180, 255, 0.7)",
  "rgba(0, 180, 255, 0.6)",
  "rgba(0, 180, 255, 0.5)",
  "rgba(0, 180, 255, 0.4)",
  "rgba(0, 180, 255, 0.3)",
  "rgba(0, 180, 255, 0.2)",
  "rgba(0, 180, 255, 0.1)",
];

export default function Home() {
  return (
    <main className="portfolio-page">
      <BackgroundRippleEffect
        className="ripple-grid"
        rows={16}
        cols={28}
        cellSize={64}
      />
      <div className="hero-content">
        <h1 className="name">
          <span>Andrei</span>
          <CanvasText
            text="Sanchez"
            className="canvas-highlight"
            backgroundClassName="bg-[#0056a3]"
            colors={canvasTextColors}
            lineGap={4}
            animationDuration={20}
          />
        </h1>
        <h2 className="tagline">
          An IT student who wanna build things for the{" "}
          <CanvasText
            text="love of the game."
            className="canvas-highlight"
            backgroundClassName="bg-[#0056a3]"
            colors={canvasTextColors}
            lineGap={4}
            animationDuration={20}
          />
        </h2>
      </div>
    </main>
  );
}
