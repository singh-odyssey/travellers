"use client";
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setVisible(scrollTop > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
    
      className="
        fixed bottom-6 right-6 z-50
        h-12 w-12 rounded-full p-[2px]
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-110
      "
    >
      <div
        className="
          flex h-full w-full items-center justify-center rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-lg
          hover:bg-black/40 hover:text-[#38f888]
        "
      >
        <ArrowUp size={18} />
      </div>
    </button>
  )
}

