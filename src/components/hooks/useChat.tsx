import { useCallback, useEffect, useRef, useState } from 'react'
import { buildChatPrompt } from '../../data/chatPrompt'
import { loadChatHistory, saveChatHistory, dispatchChatHistoryUpdate } from '../../data/chatHistory'
import { useSimulationStorage } from './useSimulationStorage'
import { getChatResponse } from '../../services/aiService'

export const useChat = (id: string) => {
  const isRequestPending = useRef(false)

  const { getFormData } = useSimulationStorage()
  const [insight, setInsight] = useState(() => {
    const simulation = getFormData(id)

    if (simulation?.insight) {
      return simulation.insight
    }

    return null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchChat = useCallback(
    async (simulationId: string, userText: string): Promise<string | null> => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada')
        return null
      }

      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildChatPrompt(simulationId, userText)
        const data = await getChatResponse(prompt)

        if (!data) {
          setError('Resposta vazia da IA. Tente novamente.')
          return null
        }

        if (userText.trim()) {
          const history = loadChatHistory(simulationId)
          const nextHistory = [
            ...history,
            {
              question: userText,
              answer: data,
              createdAt: new Date().toISOString(),
            },
          ]
          saveChatHistory(simulationId, nextHistory)
          dispatchChatHistoryUpdate(simulationId)
        }

        setInsight(data)
        return data
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente')
        return null
      } finally {
        setIsLoading(false)
        isRequestPending.current = false
      }
    },
    [getFormData],
  )

  const askChat = async (question: string) => {
    const answer = await fetchChat(id, question)

    if (!answer) {
      console.warn('IA não retornou resposta')
      return { answer: '' }
    }

    const responseObject = { answer }
    console.log('askChat responseObject', responseObject)

    return responseObject
  }

  useEffect(() => {
    if (insight || isLoading || error || isRequestPending.current) {
      return
    }

    fetchChat(id, '')
  }, [id, insight, isLoading, error, fetchChat])

  return { insight, isLoading, error, fetchChat, askChat }
}