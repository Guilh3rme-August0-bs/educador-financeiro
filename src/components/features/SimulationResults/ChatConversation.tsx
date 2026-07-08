import { useChatHistory } from '../../hooks/useChatHistory'

interface ChatConversationProps {
  simulationId: string
}

export function ChatConversation({ simulationId }: ChatConversationProps) {
  const history = useChatHistory(simulationId)

  if (!history.length) {
    return null
  }

  return (
    <div className="mt-6 rounded-lg bg-card p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="mb-4 text-sm font-semibold uppercase text-primary">
        Perguntas e respostas da IA
      </div>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={`${item.createdAt}-${index}`} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-2 text-xs uppercase text-slate-500">Pergunta</div>
            <p className="whitespace-pre-line text-sm text-slate-900">{item.question}</p>

            <div className="mt-3 mb-2 text-xs uppercase text-slate-500">Resposta</div>
            <p className="whitespace-pre-line text-sm text-slate-800">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}