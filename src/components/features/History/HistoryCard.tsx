import { Goal, Trash2, ExternalLink } from "lucide-react"
import { Button } from "../../shared/Button"

/* conteudo do card:

1 - ícone geral
2 - <nome da meta> + <data>
3 - Custo da meta: <custo>
4 - Prazo: <prazo-da-meta>
5 - Economia Mensal: <Economia>
6 - Botão de excluir
7 - Botão 'Ver detalhes'

*/

export interface HistoryCardProps {
    id: string
    nome: string
    //data: string
    custo: string
    prazo: string
    economia: string
    variant?: 'default' | 'primary'
}

const variantClasses = {
    default: {
        card: 'bg-card',
        accent: 'text-primary',
        value: 'text-foreground',
        subtitle: 'text-muted-foreground'
    },
    primary: {
        card: 'bg-primary',
        accent: 'text-primary-foreground',
        value: 'text-primary-foreground',
        subtitle: 'text-primary-foreground/70'
    }

}

export function HistoryCard({ 
    id,
    nome, 
    //data, 
    custo, 
    prazo, 
    economia, 
    variant = 'default' }: HistoryCardProps) {

    const styles = variantClasses[variant]

    return (
        <div className={["rounded-lg p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2) flex flex-row]", styles.card].join(' ')}>
            <Goal size={40} className={styles.accent} />
            <div className="order 2 flex-1 justify-center rounded-lg py-3 sm:order-1">
                <h3>{nome}</h3>
                <p className="hidden">{id}</p>
                {/* <span>{data}</span> */}
            </div>
            <div className={["order 2 flex-1 justify-center rounded-lg py-3 sm:order-1 text-3x1 font-semibold", styles.value].join(' ')}>
                <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">CUSTO DA META</h2>
                <h3 className="text-foreground mb-6 text-x1 leading-snug font-semibold sm:text-2x1">{custo}</h3>
            </div>
            <div className={["order 2 flex-1 justify-center rounded-lg py-3 sm:order-1 text-3x1 font-semibold", styles.value].join(' ')}>
                <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">PRAZO DA META</h2>
                <h3 className="text-foreground mb-6 text-x1 leading-snug font-semibold sm:text-2x1">{prazo}</h3>
            </div>
            <div className={["order 2 flex-1 justify-center rounded-lg py-3 sm:order-1 text-3x1 font-semibold", styles.value].join(' ')}>
                <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">ECONOMIA MENSAL</h2>
                <h3 className="text-foreground mb-6 text-x1 leading-snug font-semibold sm:text-2x1">{economia}</h3>
            </div>
            <Button
                icon={Trash2}
                type='button'
                variant="ghost"
                className="order 2 flex-1 justify-center rounded-lg py-3 sm:order-5">
            </Button>
            <Button
                icon={ExternalLink}
                type='button'
                variant="secondary"
                className="order 2 flex-1 justify-center rounded-lg py-3 sm:order-5">
                Ver detalhes
            </Button>
        </div>
    )
}