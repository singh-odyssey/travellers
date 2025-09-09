'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContext {
    theme: "light" | "dark";
    changeTheme: ()=> void;
}

const ThemeContext = createContext<ThemeContext>({
    theme: 'light',
    changeTheme: ()=> {}
})

export function ThemeProvider({children}: {children: ReactNode}) {
    const [theme,setTheme] = useState<'light'|'dark'> ('light')

    useEffect(()=> {
        const darkSys = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(darkSys ? "dark" :"light")
    },[])

    const changeTheme = ()=> setTheme((p)=> (p==="light" ? "dark" : "light"))

    return(
        <ThemeContext.Provider value={{theme,changeTheme}}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
