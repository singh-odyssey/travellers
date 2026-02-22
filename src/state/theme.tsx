'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContext {
    theme: "light" | "dark" | null;
    changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContext>({
    theme: null,
    changeTheme: () => { }
})

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark' | null>('dark')
    useEffect(() => {
        const darkSys = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(darkSys ? "dark" : "light")
    }, [])

    const changeTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"))

    useEffect(() => {
        if (!theme) return;
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
        }
    }, [theme]);

    if (theme) return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
