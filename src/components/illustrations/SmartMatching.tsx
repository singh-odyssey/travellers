"use client";

import Image from "next/image";

export default function SmartMatching() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-6 dark:bg-slate-900/50 group">
      <div
        className={`
          relative
          w-full
          max-w-[280px]
          transition-transform
          duration-300
          ease-out
          group-hover:scale-105
          group-hover:-translate-y-1
          group-hover:drop-shadow-[0_12px_28px_rgba(168,85,247,0.35)]
          animate-float
        `}
      >
        <Image
          src="/smart-matching.png"
          alt="Smart matching illustration"
          width={560}
          height={560}
          className="h-auto w-full object-contain"
          priority
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}