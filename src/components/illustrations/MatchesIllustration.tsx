"use client";

import React from "react";

export default function MatchesIllustration() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-2 group">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
            >
                {/* Two overlapping circles representing people/matches */}
                <circle cx="40" cy="50" r="15" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-600" />
                <circle cx="60" cy="50" r="15" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-600" />

                {/* Magnifying glass or heart in middle */}
                <g className="group-hover:animate-pulse">
                    <circle cx="50" cy="50" r="8" fill="#a855f7" />
                    <path d="M50 47V53M47 50H53" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Radar waves */}
                <circle cx="50" cy="50" r="35" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow opacity-30" />
            </svg>
            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
          transform-origin: center;
        }
      `}</style>
        </div>
    );
}
