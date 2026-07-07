import { Goal, Trash2, ExternalLink } from "lucide-react"
import { Button } from "../../shared/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

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
    custo: string
    prazo: string
    economia: string
    variant?: 'default' | 'primary'
}

type StoredSimulation = Record<string, unknown>

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

function readStoredSimulations(): StoredSimulation[] {
    if (typeof window === "undefined") {
        return []
    }

    const raw = window.localStorage.getItem("simulation-data")
    if (!raw) return []

    try {
        const parsed = JSON.parse(raw)

        if (Array.isArray(parsed)) {
            return parsed.filter(
                (item): item is StoredSimulation =>
                    typeof item === "object" && item !== null
            )
        }

        return typeof parsed === "object" && parsed !== null ? [parsed as StoredSimulation] : []
    } catch {
        return []
    }
}

export function HistoryCard({
    id,
    nome,
    custo,
    prazo,
    economia,
    variant = 'default'
}: HistoryCardProps) {

    const styles = variantClasses[variant]
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
    const [isDeleted, setIsDeleted] = useState(false)

    const deleteItem = (itemId: string) => {
        setPendingDeleteId(itemId)
        setIsModalOpen(true)
    }

    const confirmDelete = () => {
        if (!pendingDeleteId) {
            setIsModalOpen(false)
            return
        }

        const currentItems = readStoredSimulations()
        const newList = currentItems.filter(
            (item) => String(item.id ?? "") !== pendingDeleteId
        )

        window.localStorage.setItem("simulation-data", JSON.stringify(newList))

        setIsModalOpen(false)
        setPendingDeleteId(null)
        setIsDeleted(true)
    }

    const cancelDelete = () => {
        setIsModalOpen(false)
        setPendingDeleteId(null)
    }

    if (isDeleted) {
        return null
    }

    return (
        <>
            <div className={["flex flex-col rounded-lg items-center p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] gap-5 sm:flex-row", styles.card].join(' ')}>
                <Goal size={40} className={styles.accent} />
                <p className="hidden">{id}</p>

                <div className="order-1 flex-1 justify-center rounded-lg py-3">
                    <h3>{nome}</h3>
                </div>

                <div className={["order-2 flex-1 justify-center rounded-lg py-3 text-3xl font-semibold", styles.value].join(' ')}>
                    <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">CUSTO DA META</h2>
                    <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">{custo}</h3>
                </div>

                <div className={["order-3 flex-1 justify-center rounded-lg py-3 text-3xl font-semibold", styles.value].join(' ')}>
                    <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">PRAZO DA META</h2>
                    <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">{prazo}</h3>
                </div>

                <div className={["order-4 flex-1 justify-center rounded-lg py-3 text-3xl font-semibold", styles.value].join(' ')}>
                    <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">ECONOMIA MENSAL</h2>
                    <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">{economia}</h3>
                </div>

                <div className="order-5 flex items-center space-x-2 sm:order-5">
                    <button
                        type="button"
                        onClick={() => deleteItem(id)}
                        className="bg-[#ef4444a6] mr-10 text-center flex w-10 justify-center py-3 sm:order-5 rounded-full cursor-pointer"
                    >
                        <Trash2 size={16} />
                    </button>

                    <Button
                        icon={ExternalLink}
                        type='button'
                        variant="secondary"
                        className="flex-1 justify-center rounded-lg py-3 sm:order-6"
                        onClick={() => navigate(`/resultado/${id}`)}
                    >
                        <span>Ver detalhes</span>
                    </Button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
                        <h2 className="text-lg font-semibold text-foreground">
                            Deseja excluir esta simulação?
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Esta ação removerá a simulação do armazenamento local.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={cancelDelete}
                                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                não
                            </button>

                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                            >
                                sim
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}