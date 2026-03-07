"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

return (
  <button
    onClick={scrollToTop}
    aria-label="Scroll to top"
className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-all duration-300 hover:scale-110"  >
    ↑
  </button>
);
}