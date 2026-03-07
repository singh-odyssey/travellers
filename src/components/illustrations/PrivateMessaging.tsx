"use client";

import Image from "next/image";
import React from "react";

export default function PrivateMessaging() {
  return (
    <div
      className="
        relative
        w-full
        h-[220px]               /* ✅ explicit height (CRITICAL FIX) */
        bg-slate-50
        dark:bg-slate-900/50
        flex
        items-center
        justify-center
        overflow-hidden
        p-6
        rounded-xl
        group
      "
    >
      <div
        className="
          relative
          w-[200px]              /* ✅ explicit width */
          h-[200px]              /* ✅ explicit height */

          transition-transform duration-300 ease-out
          group-hover:scale-105
          group-hover:-translate-y-1

          group-hover:drop-shadow-[0_12px_28px_rgba(99,102,241,0.35)]

          animate-float
        "
      >
        <Image
          src="/privateMessaging.png"
          alt="Private messaging illustration"
          fill
          className="object-contain drop-shadow-md"
          priority
        />
      </div>

      {/* animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .animate-float {
          animation: float 4.8s ease-in-out infinite;
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
