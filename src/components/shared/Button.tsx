import type { LucideIcon } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

/* as extensões de type permitem que as propriedades e atributos possam ser 
passadas para vários botões sem que todos eles precisem ser declarados */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /* variações do botão */
    variant: 'primary' | 'secondary' | 'ghost'
    icon?: LucideIcon
}

const classeBase = 'flex cursor-pointer items-center justify-center font-medium text-sm gap-2 px-4 py-3 rounded-xl transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80'

const classesVariantes = {
    primary: 'bg-primary text-primary-foreground font semibold rounded-x1', 
    secondary: 'bg-secondary-button border border-border rounded-3x1', 
    ghost: 'rounded-1g text-foreground',
}

export function Button({variant, icon: Icon, children, className, ...props}: ButtonProps) {
    return (
        /* Icon foi renomeado para ser renderizado como componente customizado */
        <button {...props} className={[classeBase, classesVariantes[variant], className].join(' ')}>
        {Icon && <Icon size={16}/>}
        {children}
        </button>
    )
}