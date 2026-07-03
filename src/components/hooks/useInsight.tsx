import { useCallback, useEffect, useRef, useState } from 'react'
import { buildAIPrompt } from '../../data/aiPrompt'
import { useSimulationStorage } from './useSimulationStorage'
import { getInsight, type InsightData } from '../../services/aiService'
import type { SimulationRecord } from '../../data/simulation'

export const useInsight = (id: string) => {

    //verificar se existe uma request pendente
    const isRequestPending = useRef(false)

    const { getFormData, updateSimulation } = useSimulationStorage()
    const [insight, setInsight] = useState<InsightData | null>(() => {
        const simulation = getFormData(id)

        if (simulation?.insight) {
            return simulation.insight
        }

        return null
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    /* Necessário o uso de useCallBack pois temos que colocar essa 
    função como array de dependências do useEffect */

    const fetchInsight = useCallback(
        async (simulationId: string) => {
            const simulation = getFormData(simulationId)

            if (!simulation) {
                setError('Simulação não Encontrada')
                return
            }

            isRequestPending.current = true
            setIsLoading(true)
            setError(null)

            try {
                const prompt = buildAIPrompt(simulation)
                const data = await getInsight(prompt)
                setInsight(data)

                //parâmetros: id da simulação e registro atualizado
                updateSimulation(simulationId, { ...simulation, insight: data } as SimulationRecord)

            } catch {
                setError('Erro ao gerar o diagnóstico. Tente novamente')
            } finally {
                setIsLoading(false)
                isRequestPending.current = false
            }
        }, [getFormData, updateSimulation]
    )

    useEffect(() => {
        //Evita o loop infinito de requisições para a API
        if (insight || isLoading || error || isRequestPending.current) {
            return
        }

        fetchInsight(id)
    }, [id, insight, isLoading, fetchInsight])

    return { insight, isLoading, error, fetchInsight }

}