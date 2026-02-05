"use client";

import React from "react";

export default function VerifiedTicket() {
    return (
        <div className="relative w-full h-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center overflow-hidden p-6 group">
            <svg
                viewBox="0 0 200 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full max-w-[180px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
            >
                {/* Ticket Background */}
                <rect x="30" y="40" width="140" height="70" rx="8" fill="white" stroke="currentColor" strokeWidth="2" className="dark:fill-slate-800 text-slate-200 dark:text-slate-700" />

                {/* Ticket Details (lines) */}
                <rect x="45" y="55" width="40" height="6" rx="3" fill="currentColor" className="text-slate-100 dark:text-slate-700" />
                <rect x="45" y="70" width="60" height="4" rx="2" fill="currentColor" className="text-slate-50 dark:text-slate-700/50" />
                <rect x="45" y="80" width="30" height="4" rx="2" fill="currentColor" className="text-slate-50 dark:text-slate-700/50" />

                {/* QR Code Placeholder */}
                <rect x="130" y="55" width="25" height="25" rx="4" fill="currentColor" className="text-slate-50 dark:text-slate-700/50" />

                {/* Scanner Beam */}
                <g className="animate-scan">
                    <rect x="25" y="45" width="150" height="2" fill="url(#scanGradient)" opacity="0.8" />
                </g>

                {/* Success Mark (appearing after scan) */}
                <circle cx="100" cy="75" r="25" fill="#10b981" className="opacity-0 group-hover:opacity-10 dark:opacity-0 dark:group-hover:opacity-20 transition-opacity duration-300" />
                <path d="M85 75L95 85L115 65" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:animate-draw-check" />

                <defs>
                    <linearGradient id="scanGradient" x1="25" y1="45" x2="175" y2="45" gradientUnits="userSpaceOnUse">
                        <stop stopColor="transparent" />
                        <stop offset="0.5" stopColor="#10b981" />
                        <stop offset="1" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>

            <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0px); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(60px); }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        @keyframes draw-check {
          0% { stroke-dasharray: 50; stroke-dashoffset: 50; opacity: 0; }
          50% { opacity: 1; }
          100% { stroke-dasharray: 50; stroke-dashoffset: 0; opacity: 1; }
        }
        .group-hover\:animate-draw-check {
          animation: draw-check 0.6s ease-out forwards;
          animation-delay: 1.5s;
        }
      `}</style>
        </div>
    );
}
