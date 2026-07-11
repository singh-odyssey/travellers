"use client";

import { Compass, Plane } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ScrollFlightPath() {
  const trackRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const plane = planeRef.current;

    if (!track || !plane) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches) {
      plane.style.transform =
        "translate3d(50%, 0, 0) rotateZ(-8deg)";
      return;
    }

    let animationFrame: number | null = null;

    const updatePosition = () => {
      animationFrame = null;

      const rectangle = track.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const rawProgress =
        (viewportHeight - rectangle.top) /
        (viewportHeight + rectangle.height);

      const progress = Math.max(0, Math.min(1, rawProgress));
      const availableWidth = Math.max(track.clientWidth - 72, 0);
      const x = availableWidth * progress;
      const y = Math.sin(progress * Math.PI) * -16;
      const rotation = -12 + progress * 24;

      plane.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rotation}deg) rotateY(${progress * 10}deg)`;
    };

    const requestUpdate = () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(updatePosition);
      }
    };

    updatePosition();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="relative mt-10 h-24 overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      aria-hidden="true"
    >
      <div className="absolute left-8 right-8 top-1/2 border-t-2 border-dashed border-sky-300/80 dark:border-sky-700/70" />

      <Compass className="absolute left-4 top-1/2 h-7 w-7 -translate-y-1/2 text-[#0B4B74] dark:text-sky-300" />

      <div
        ref={planeRef}
        className="absolute left-8 top-[31px] flex h-10 w-10 items-center justify-center rounded-full bg-[#0B4B74] text-white shadow-lg"
        style={{
          transform:
            "translate3d(0, 0, 0) rotateZ(-12deg)",
          willChange: "transform",
        }}
      >
        <Plane className="h-5 w-5" />
      </div>
    </div>
  );
}
