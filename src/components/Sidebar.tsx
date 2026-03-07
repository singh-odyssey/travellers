"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Map, Settings } from "lucide-react"

export default function Sidebar() {
    const pathname = usePathname()

    const navItems = [
        { label: "Dashboard", icon: Home, href: "/dashboard" },
        { label: "Profile", icon: User, href: "/dashboard/profile" },
        { label: "Trips", icon: Map, href: "#" },
        { label: "Settings", icon: Settings, href: "#" },
    ]

    return (
        <aside className="w-64 bg-white dark:bg-[#0F1129] border-r border-gray-100 dark:border-gray-800 h-[calc(100vh-64px)] sticky top-16 p-4 flex flex-col">
            <nav className="space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? "bg-[#1E293B] text-white shadow-lg"
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                                }`}
                        >
                            <Icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
