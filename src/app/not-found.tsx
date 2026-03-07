"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-slate-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl"
      >
        {/* 404 Title */}
        <h1 className="text-7xl font-bold text-slate-900 dark:text-white mb-4">
          404
        </h1>

        {/* Friendly Message */}
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
  {"Oops! The page you're looking for doesn't exist or may have been moved."}
</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Go Back
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}