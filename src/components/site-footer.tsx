import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-600">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p>
            <span className="font-semibold text-slate-800">travellersmeet</span> · Meet verified travellers.
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="#features" className="hover:text-slate-900">Features</Link>
            <Link href="#how-it-works" className="hover:text-slate-900">How it works</Link>
            <Link href="#faq" className="hover:text-slate-900">FAQ</Link>
            <Link href="/signup" className="hover:text-slate-900">Get started</Link>
          </nav>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <p className="text-center text-sm font-medium text-slate-700">
            Made with love <span className="text-red-500">❤️</span> By The Community
          </p>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} travellersmeet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
