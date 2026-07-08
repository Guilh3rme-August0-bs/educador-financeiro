import { useEffect, useState } from 'react'
import { loadChatHistory, type ChatHistoryItem } from '../../data/chatHistory'

export function useChatHistory(simulationId: string) {
  const [history, setHistory] = useState<ChatHistoryItem[]>(() =>
    loadChatHistory(simulationId),
  )

  useEffect(() => {
    setHistory(loadChatHistory(simulationId))

    const handler = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return
      }

      if (event.detail === simulationId) {
        setHistory(loadChatHistory(simulationId))
      }
    }

    window.addEventListener('chat-history-updated', handler)
    return () => window.removeEventListener('chat-history-updated', handler)
  }, [simulationId])

  return history
}