import { useState } from "react"
import { PageHero } from "../components/shared/PageHero"
import type { HistoryCardProps } from "../components/features/History/HistoryCard"
import { HistoryCard } from "../components/features/History/HistoryCard"

// Define a estrutura esperada para cada simulação salva no localStorage.
type SavedSimulation = {
    id: string
    goalName?: string
    goalAmount?: string
    goalDeadline?: string
    income?: string
}

export const SimulationHistoryPage = () => {

    // Lê os dados salvos e garante que o valor seja sempre um array de simulações.
    const [history] = useState<SavedSimulation[]>(() => {
        const savedData = localStorage.getItem('simulation-data')

        if (!savedData) {
            return []
        }

        try {
            const parsedData = JSON.parse(savedData) as unknown

            if (!Array.isArray(parsedData)) {
                return []
            }

            return parsedData.filter((item): item is SavedSimulation => {
                return typeof item === 'object' && item !== null && 'id' in item
            })
        } catch {
            return []
        }
    })

    // Converte os dados salvos para o formato usado pelo componente HistoryCard.
    const historyCards: HistoryCardProps[] = history.map(item => ({
        id: item.id,
        nome: item.goalName ?? 'Meta sem nome',
        custo: item.goalAmount ?? '—',
        prazo: item.goalDeadline ?? '—',
        economia: item.income ?? '—'
    }))

    return (

        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <PageHero
                title='Últimas Simulações'
                subtitle='Confira as simulações feitas anteriormente' />

            <div className="flex flex-col gap-6 justify-center">
                {historyCards.length > 0 ? (
                    historyCards.map(item => (
                        <HistoryCard
                            key={item.id}
                            id={item.id}
                            nome={item.nome}
                            custo={item.custo}
                            prazo={item.prazo}
                            economia={item.economia} />
                    ))
                ) : (
                    <p>Nenhuma simulação encontrada</p>
                )}
            </div>

        </main>
    )
}