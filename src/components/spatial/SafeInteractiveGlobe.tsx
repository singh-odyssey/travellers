"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";

import { getTravelRegion, type TravelRegionId } from "./spatial-data";
import type { InteractiveGlobeProps } from "./InteractiveGlobe";

const LazyInteractiveGlobe = dynamic<InteractiveGlobeProps>(
  () => import("./InteractiveGlobe"),
  {
    ssr: false,
    loading: () => <StaticGlobeFallback label="Loading 3D globe…" />,
  },
);

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class GlobeErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Interactive globe failed; using 2D fallback.", {
        error,
        errorInfo,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
  };
}

function browserSupportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function shouldEnable3D(): boolean {
  const deviceNavigator = navigator as NavigatorWithHints;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const lowMemory =
    typeof deviceNavigator.deviceMemory === "number" &&
    deviceNavigator.deviceMemory <= 2;

  const lowCpu =
    typeof deviceNavigator.hardwareConcurrency === "number" &&
    deviceNavigator.hardwareConcurrency > 0 &&
    deviceNavigator.hardwareConcurrency <= 2;

  const saveData = Boolean(deviceNavigator.connection?.saveData);

  return (
    browserSupportsWebGL() &&
    !prefersReducedMotion &&
    !lowMemory &&
    !lowCpu &&
    !saveData
  );
}

function StaticGlobeFallback({
  label,
  selectedRegionId,
}: {
  label?: string;
  selectedRegionId?: TravelRegionId;
}) {
  const selectedRegion = selectedRegionId
    ? getTravelRegion(selectedRegionId)
    : undefined;

  return (
    <div
      className="flex min-h-[390px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      role="img"
      aria-label="Static travel community globe"
    >
      <div className="relative h-56 w-56 overflow-hidden rounded-full bg-[#0B4B74] shadow-2xl ring-8 ring-sky-100 dark:ring-slate-800">
        <div className="absolute inset-x-4 top-1/2 h-px bg-sky-200/60" />
        <div className="absolute inset-y-4 left-1/2 w-px bg-sky-200/60" />
        <div className="absolute inset-7 rounded-full border border-sky-200/50" />
        <div className="absolute inset-x-10 inset-y-3 rounded-[50%] border border-sky-200/40" />
        <span className="absolute left-[63%] top-[30%] h-4 w-4 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.9)]" />
        <span className="absolute left-[28%] top-[38%] h-3 w-3 rounded-full bg-white" />
        <span className="absolute left-[46%] top-[62%] h-3 w-3 rounded-full bg-white" />
      </div>

      <p className="mt-6 text-center font-medium text-slate-800 dark:text-slate-100">
        {label ??
          (selectedRegion
            ? `${selectedRegion.name} community preview`
            : "Travel community preview")}
      </p>
      <p className="mt-2 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
        A lightweight 2D preview is shown when WebGL, motion, or device
        performance settings make 3D unsuitable.
      </p>
    </div>
  );
}

export default function SafeInteractiveGlobe({
  selectedRegionId,
  onSelectRegion,
}: InteractiveGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    setCanRender3D(shouldEnable3D());

    const element = containerRef.current;
    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const fallback = (
    <StaticGlobeFallback selectedRegionId={selectedRegionId} />
  );

  return (
    <div ref={containerRef}>
      {!canRender3D || !isNearViewport ? (
        fallback
      ) : (
        <GlobeErrorBoundary fallback={fallback}>
          <LazyInteractiveGlobe
            selectedRegionId={selectedRegionId}
            onSelectRegion={onSelectRegion}
          />
        </GlobeErrorBoundary>
      )}
    </div>
  );
}
