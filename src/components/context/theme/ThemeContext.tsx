import { createContext } from "react"

export type Theme = 'light' | 'dark'

interface ThemeContextValue {
    theme: Theme,
    //função para que outros componentes consigam alterar entre os temas
    toggleTheme: () => void 
}

export const ThemeContext = createContext<ThemeContextValue | undefined> //pode ser um objeto ou undefined
(undefined) 
/* se os componentes não estiverem em volta de um provider, os hooks implementados futuramente
 não funcionarão com os temas */