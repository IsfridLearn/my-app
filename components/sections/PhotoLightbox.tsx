"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { ContentImage } from "@/components/ui/ContentImage";
import type { Photo } from "@/types";

type LightboxPhoto = Photo & { lang?: string };

/**
 * A larger view of the photographs. Any button with data-lightbox="<photo id>"
 * opens it, so the photos themselves can stay in server-rendered markup.
 */
export function PhotoLightbox({ photos }: { photos: LightboxPhoto[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;
  const photo = isOpen ? photos[index] : null;

  // Open from any photo button on the page.
  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-lightbox]");
      if (!trigger) return;
      const found = photos.findIndex((entry) => entry.id === trigger.dataset.lightbox);
      if (found < 0) return;
      triggerRef.current = trigger;
      setIndex(found);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [photos]);

  // The native dialog keeps focus inside, closes on Escape and returns focus to the photo.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // The page behind stays still while the viewer is open.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const step = (direction: number) =>
    setIndex((current) => (current === null ? current : (current + direction + photos.length) % photos.length));
  const close = () => dialogRef.current?.close();

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  };
  // A click on the dark area around the photo closes the viewer.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    const target = event.target as HTMLElement;
    if (target === event.currentTarget || target.classList.contains("lightbox-stage")) close();
  };
  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  };
  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (start === null) return;
    const dx = event.clientX - start;
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Photo viewer"
      onClose={() => {
        setIndex(null);
        // Back to the photo that was opened, so keyboard users keep their place.
        triggerRef.current?.focus();
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {photo && index !== null && (
        <>
          <div className="lightbox-bar file">
            <p>
              <b>{String(index + 1).padStart(2, "0")}</b> / {String(photos.length).padStart(2, "0")}
            </p>
            <button type="button" className="lightbox-close" onClick={close}>
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="lightbox-stage">
            <figure
              className="lightbox-figure"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => (swipeStart.current = null)}
            >
              <ContentImage
                key={photo.src}
                image={photo}
                className="lightbox-image"
                sizes="(max-width: 760px) 100vw, 80vw"
              />
              <figcaption className="file">
                {photo.file} <span lang={photo.lang}>{photo.label}</span>
              </figcaption>
            </figure>
          </div>

          <div className="lightbox-nav">
            <button type="button" className="deck-button" aria-label="Previous photo" onClick={() => step(-1)}>
              <span aria-hidden="true">⟵</span>
            </button>
            <button type="button" className="deck-button" aria-label="Next photo" onClick={() => step(1)}>
              <span aria-hidden="true">⟶</span>
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
