"use client";

import { useEffect, useRef } from "react";

// Desktop only: phones keep the plain hero and never download the 3D library.
const DESKTOP = "(min-width: 1100px)";

/**
 * A red glass sphere rendered live with Three.js. Its reflections drift slowly
 * and follow the cursor (read from the --mx/--my values the hero sets), so it
 * reads as a real object catching studio light. Reduced motion gets one still frame.
 */
export function GlassSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const art = canvas?.closest<HTMLElement>(".fp-art");
    if (!canvas || !art || !window.matchMedia(DESKTOP).matches) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return; // No WebGL: the hero simply has no sphere.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(new RoomEnvironment(), 0.01).texture;
      scene.environment = environment;

      // Deep red glass: dark in the middle, bright where it catches light.
      const glass = new THREE.MeshPhysicalMaterial({
        color: 0x5c0409,
        roughness: 0.015,
        metalness: 0.25,
        clearcoat: 1,
        clearcoatRoughness: 0.01,
        emissive: new THREE.Color(0x140001),
        envMapIntensity: 2,
      });
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 96), glass);
      scene.add(sphere);

      // A small dark core seen through the glass gives it depth.
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.72, 64, 48),
        new THREE.MeshStandardMaterial({ color: 0x120002, roughness: 0.3, metalness: 0.6 }),
      );
      core.position.set(0.12, -0.08, -0.2);
      scene.add(core);
      glass.transparent = true;
      glass.opacity = 0.9;

      const key = new THREE.DirectionalLight(0xffffff, 1.3);
      key.position.set(-2, 3, 4);
      const rim = new THREE.PointLight(0xff2a35, 26, 8);
      rim.position.set(2.2, -1.2, 1.4);
      scene.add(key, rim);

      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 30);
      camera.position.set(0, 0, 4.6);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = canvas;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const clock = new THREE.Clock();
      const lean = { x: 0, y: 0 };
      let visible = true;
      let frame = 0;

      const draw = () => {
        const t = clock.getElapsedTime();
        const mx = parseFloat(art.style.getPropertyValue("--mx")) || 0;
        const my = parseFloat(art.style.getPropertyValue("--my")) || 0;
        lean.x += (mx - lean.x) * 0.05;
        lean.y += (my - lean.y) * 0.05;
        // Turning the studio around the sphere moves its reflections.
        scene.environmentRotation.set(0.3 + lean.y * 0.4, t * 0.15 + lean.x * 0.8, 0);
        key.position.set(-2 + lean.x * 2, 3 - lean.y * 1.5, 4);
        sphere.position.y = Math.sin(t * 0.7) * 0.04;
        core.position.y = -0.08 + sphere.position.y;
        renderer.render(scene, camera);
      };
      const loop = () => {
        frame = 0;
        if (!visible || document.hidden || reduced.matches) return;
        draw();
        frame = requestAnimationFrame(loop);
      };
      const start = () => {
        if (!frame) frame = requestAnimationFrame(loop);
      };

      // Pause when the hero is off screen or the tab is hidden.
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      });
      visibility.observe(canvas);
      document.addEventListener("visibilitychange", start);

      draw();
      start();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibility.disconnect();
        document.removeEventListener("visibilitychange", start);
        sphere.geometry.dispose();
        core.geometry.dispose();
        glass.dispose();
        (core.material as InstanceType<typeof THREE.MeshStandardMaterial>).dispose();
        environment.dispose();
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="fp-sphere-canvas" aria-hidden="true" />;
}
