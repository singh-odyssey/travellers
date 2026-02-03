"use client";

import { useTheme } from "@/state/theme";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import {AnimatePresence, motion} from "framer-motion"
import Toggle from "./toggle";

type Props = {
  session :any;
}

export default function SiteHeader({session}: Props) {
  const [open, setOpen] = useState(false);
  const {theme, changeTheme} = useTheme()
  

  useEffect(()=> {
    if(open) {
      document.body.style.overflow= "hidden"
    }
    else {
      document.body.style.overflow= "auto"
    }
  },[open])


  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 transition duration-150 dark:border-slate-800 dark:bg-slate-900/80 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto *:flex-1 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-transform duration-300 group-hover:scale-110 shadow-sm overflow-hidden">
               <Plane className="h-5 w-5 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500" />
               <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
            </div>
            <span className="text-xl font-bold tracking-tight dark:text-white">travellersmeet</span>
          </Link>
        </div>

        <nav className="hidden items-center text-sm text-slate-800 dark:text-slate-400 hover:*:opacity-80 gap-6 md:flex">
          <Link href="/#features">Features</Link>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/#testimonials">Stories</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/upload">Upload</Link>
        </nav>

        <div className="hidden md:justify-between items-center gap-3 md:flex">
          <div></div>

          { session?.user?.id ? <div><Link className="rounded-lg bg-slate-900 px-4 py-2 text-sm dark:bg-white dark:text-slate-800 font-medium text-white hover:opacity-80" href="/dashboard">Dashboard</Link></div> :
          <div className="flex gap-3 items-center">
          <Link href="/signin" className="text-sm font-medium text-slate-700 dark:text-slate-400 hover:opacity-80">Sign in</Link>
          <Link href="/signup" className="rounded-lg bg-slate-900 px-4 py-2 text-sm dark:bg-white dark:text-slate-800 font-medium text-white hover:opacity-80">Get started</Link>
          </div>}

          <button onClick={changeTheme} className="float-right">
            {theme==="dark"? <HiOutlineMoon color="#64748B" size={24}/> : <HiOutlineSun color="#000" size={24}/>}
          </button>
        </div>
      
         

        <button
          aria-label="Toggle menu"
          className="inline-flex items-center justify-end rounded-md dark:text-white text-slate-800 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            {open ? (
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 5.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z" clipRule="evenodd" />
            )}
          </svg>
        </button>        
      </div>
      
      <AnimatePresence>
      {open && (
        <motion.div initial={{maxHeight: 0}} exit={{maxHeight:0}}  animate={{maxHeight: 500}} transition={{duration: 0.2}} className="overflow-hidden z-20 absolute left-0 right-0 border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 md:hidden transition duration-150">
          <div className=" mx-auto max-w-6xl px-6 py-3">
            <div className="grid gap-2 dark:*:text-slate-200">
              <Link href="/#features" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>Features</Link>
              <Link href="/#how-it-works" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>How it works</Link>
              <Link href="/#testimonials" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>Stories</Link>
              <Link href="/#faq" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>FAQ</Link>
              <Link href="/upload" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>Upload</Link>
              <div className="flex pl-2 pr-8 py-2 justify-between">
                <p>Dark Theme</p>
                <Toggle theme={theme} changeTheme={changeTheme}/>
              </div>
              { session?.user?.id ? <div className="mt-4"><Link className="rounded-lg bg-slate-900 px-4 py-2 text-sm dark:bg-white dark:text-slate-800 font-medium text-white hover:opacity-80" href="/dashboard">Dashboard</Link></div> :
          <div className="flex mt-4 gap-3 items-center">
          <Link href="/signin" className="text-sm font-medium text-slate-700 dark:text-slate-400 hover:opacity-80">Sign in</Link>
          <Link href="/signup" className="rounded-lg bg-slate-900 px-4 py-2 text-sm dark:bg-white dark:text-slate-800 font-medium text-white hover:opacity-80">Get started</Link>
          </div>
          }
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
