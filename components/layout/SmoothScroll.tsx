"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Where a section link lands: just below the menu box in the top-left corner.
const ANCHOR_OFFSET = -80;

/**
 * Smooth scrolling for the whole site, plus the one-time wipe on section titles.
 * The mouse wheel glides (Lenis); touch screens keep their own native scrolling.
 * With reduced motion asked for, none of this runs and the page scrolls normally.
 * Renders nothing.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
      // The photo viewer and the open menu keep their own scrolling.
      prevent: (node) => Boolean(node.closest?.("dialog")),
    });
    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    // Links to a section on this page glide there instead of jumping.
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      // The skip link keeps its native jump, which also moves keyboard focus.
      if (!link || link.target === "_blank" || link.classList.contains("skip")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: target.id === "home" ? 0 : ANCHOR_OFFSET });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", handleClick, true);

    // When something locks the page (the photo viewer), the glide pauses too.
    const lockWatch = new MutationObserver(() => {
      if (root.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    lockWatch.observe(root, { attributes: true, attributeFilter: ["style"] });

    // Section titles below the first screen wipe in once, the first time they appear.
    const titles = [...document.querySelectorAll<HTMLElement>(".spread-title")].filter(
      (title) => title.getBoundingClientRect().top > window.innerHeight,
    );
    titles.forEach((title) => title.classList.add("wipe-wait"));
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.replace("wipe-wait", "wipe-in");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    titles.forEach((title) => reveal.observe(title));

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleClick, true);
      lockWatch.disconnect();
      reveal.disconnect();
      titles.forEach((title) => title.classList.remove("wipe-wait", "wipe-in"));
      lenis.destroy();
    };
  }, []);

  return null;
}
