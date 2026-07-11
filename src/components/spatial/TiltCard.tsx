"use client";

import {
  useEffect,
  useRef,
  type FocusEvent,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function TiltCard({
  children,
  className = "",
  style,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const precisePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const updateAvailability = () => {
      enabledRef.current =
        !reducedMotion.matches && precisePointer.matches;
    };

    updateAvailability();
    reducedMotion.addEventListener("change", updateAvailability);
    precisePointer.addEventListener("change", updateAvailability);

    return () => {
      reducedMotion.removeEventListener("change", updateAvailability);
      precisePointer.removeEventListener("change", updateAvailability);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const resetCard = () => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    card.style.transition =
      "transform 180ms ease-out, box-shadow 180ms ease-out";
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.willChange = "auto";
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);

    if (!enabledRef.current || !cardRef.current) {
      return;
    }

    const currentTarget = event.currentTarget;
    const clientX = event.clientX;
    const clientY = event.clientY;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const rectangle = currentTarget.getBoundingClientRect();
      const relativeX = (clientX - rectangle.left) / rectangle.width;
      const relativeY = (clientY - rectangle.top) / rectangle.height;
      const rotateY = (relativeX - 0.5) * 7;
      const rotateX = (0.5 - relativeY) * 7;

      currentTarget.style.transition =
        "transform 70ms linear, box-shadow 160ms ease";
      currentTarget.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      currentTarget.style.willChange = "transform";
    });
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    onPointerEnter?.(event);

    if (enabledRef.current) {
      event.currentTarget.style.willChange = "transform";
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);
    resetCard();
  };

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    onFocus?.(event);

    if (!enabledRef.current) {
      return;
    }

    event.currentTarget.style.transition =
      "transform 180ms ease, box-shadow 180ms ease";
    event.currentTarget.style.transform =
      "perspective(900px) rotateX(-1.5deg) rotateY(2deg) translateY(-2px)";
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    onBlur?.(event);

    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    resetCard();
  };

  return (
    <div
      {...rest}
      ref={cardRef}
      className={className}
      style={{ transformStyle: "preserve-3d", ...style }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </div>
  );
}
