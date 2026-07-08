export type ChatHistoryItem = {
  question: string
  answer: string
  createdAt: string
}

const CHAT_HISTORY_KEY = 'simulation-chat-history'

function loadAllHistory(): Record<string, ChatHistoryItem[]> {
  const raw = localStorage.getItem(CHAT_HISTORY_KEY)

  if (!raw) {
    return {}
  }

  try {
    const parsed = JSON.parse(raw)

    if (typeof parsed !== 'object' || parsed === null) {
      return {}
    }

    return parsed as Record<string, ChatHistoryItem[]>;
  } catch {
    return {}
  }
}

export function loadChatHistory(simulationId: string): ChatHistoryItem[] {
  const allHistory = loadAllHistory()
  return allHistory[simulationId] ?? []
}

export function saveChatHistory(simulationId: string, history: ChatHistoryItem[]) {
  const allHistory = loadAllHistory()
  allHistory[simulationId] = history
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(allHistory))
}

export function dispatchChatHistoryUpdate(simulationId: string) {
  window.dispatchEvent(
    new CustomEvent('chat-history-updated', {
      detail: simulationId,
    }),
  )
}