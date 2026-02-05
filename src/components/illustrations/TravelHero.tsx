"use client";

import React from "react";

export default function TravelHero() {
  return (
    <div className="relative w-full h-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center overflow-hidden p-8 group">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-2xl drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
      >
        {/* Background Stars (Dark Mode Only) */}
        <g className="opacity-0 dark:opacity-40">
          <circle cx="100" cy="100" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="700" cy="150" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="200" cy="50" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          <circle cx="600" cy="80" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '2s' }} />
        </g>

        {/* Animated Background Clouds */}
        <g className="animate-pulse-slow opacity-40">
          <circle cx="150" cy="100" r="40" fill="currentColor" className="text-slate-300 dark:text-slate-700" />
          <circle cx="190" cy="110" r="30" fill="currentColor" className="text-slate-300 dark:text-slate-700" />
          <circle cx="120" cy="110" r="30" fill="currentColor" className="text-slate-300 dark:text-slate-700" />
        </g>

        <g className="animate-pulse-slower opacity-30" transform="translate(400, 50)">
          <circle cx="150" cy="100" r="40" fill="currentColor" className="text-slate-300 dark:text-slate-700" />
          <circle cx="190" cy="110" r="30" fill="currentColor" className="text-slate-300 dark:text-slate-700" />
          <circle cx="120" cy="110" r="30" fill="currentColor" className="text-slate-300 dark:text-slate-700" />
        </g>

        {/* The World Circle */}
        <g className="animate-spin-very-slow origin-center">
          <circle cx="400" cy="300" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="12 12" className="text-slate-200 dark:text-slate-800" />
          <circle cx="400" cy="300" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" className="text-slate-100 dark:text-slate-900" />
        </g>

        {/* Skyline / Grounded Elements */}
        <g className="opacity-20 dark:opacity-30">
          <path d="M0 500 L100 450 L200 480 L350 420 L500 460 L650 430 L800 500 V600 H0 Z" fill="currentColor" className="text-slate-400 dark:text-slate-800" />
          <rect x="50" y="450" width="20" height="50" fill="currentColor" className="text-slate-400 dark:text-slate-800" />
          <rect x="120" y="470" width="15" height="30" fill="currentColor" className="text-slate-400 dark:text-slate-800" />
          <rect x="580" y="430" width="25" height="70" fill="currentColor" className="text-slate-400 dark:text-slate-800" />
          <rect x="650" y="460" width="15" height="40" fill="currentColor" className="text-slate-400 dark:text-slate-800" />
        </g>

        {/* Travel Path */}
        <path
          d="M250 400C250 400 300 200 550 250"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 10"
          className="animate-dash"
          style={{ strokeDashoffset: 100 }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient" x1="250" y1="400" x2="550" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Animated Plane/Icon */}
        <g className="animate-float">
          <path
            d="M545 235L575 250L545 265L552 250L545 235Z"
            fill="currentColor"
            className="text-slate-900 dark:text-slate-100 shadow-xl"
          />
        </g>

        {/* Destination Dots */}
        <g>
          <circle cx="250" cy="400" r="10" fill="#10b981" className="shadow-lg" />
          <circle cx="250" cy="400" r="20" stroke="#10b981" strokeWidth="2" className="animate-ping opacity-20" />
        </g>

        <g>
          <circle cx="550" cy="250" r="10" fill="#3b82f6" className="shadow-lg" />
          <circle cx="550" cy="250" r="20" stroke="#3b82f6" strokeWidth="2" className="animate-ping opacity-20" />
        </g>
      </svg>
    </div>
  );
}
