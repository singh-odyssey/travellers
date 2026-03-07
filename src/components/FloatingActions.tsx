"use client";

import ScrollToTop from "./ScrollToTop";
import Chatbot from "./chatbot";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-5">
      <ScrollToTop />
      <Chatbot />
    </div>
  );
}