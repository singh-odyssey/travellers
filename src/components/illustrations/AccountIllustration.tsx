"use client";

import React from "react";

export default function AccountIllustration() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-2 group">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
            >
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" className="text-slate-100 dark:text-slate-800" />
                <circle cx="50" cy="40" r="12" fill="currentColor" className="text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 transition-colors" />
                <path d="M25 75C25 65 35 60 50 60C65 60 75 65 75 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 transition-colors" />

                {/* Plus sign */}
                <g className="group-hover:animate-bounce">
                    <circle cx="75" cy="35" r="8" fill="#10b981" />
                    <path d="M75 31V39M71 35H79" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </g>
            </svg>
        </div>
    );
}
