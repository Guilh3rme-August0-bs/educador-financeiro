import { useEffect, useState, type PropsWithChildren } from "react";
import { type Theme, ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<Theme>(() => {
        /* esta função faz com que o estado do tema seja inicializado de acordo com 
        as configurações do sistema */
        const localStorageTheme = localStorage.getItem('theme') as Theme | null

        if (localStorageTheme) {
            return localStorageTheme
        }

        const systemPrefersDark = window.matchMedia(
            '(prefers-color-theme: dark)',
        ).matches

        return systemPrefersDark ? 'dark' : 'light'
    })

    //useEffect vai determinar como a página irá reagir à função de mudar tema
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((temaAtual) => (temaAtual === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
