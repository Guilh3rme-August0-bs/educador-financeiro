import { useChatHistory } from '../../hooks/useChatHistory'

interface ChatConversationProps {
  simulationId: string
}

function renderAnswerContent(answer: unknown) {
  if (typeof answer === 'string') {
    return <p className="whitespace-pre-line text-foreground">{answer}</p>
  }

  if (answer && typeof answer === 'object') {
    const record = answer as Record<string, unknown>

    if (typeof record.mensagem === 'string') {
      return (
        <div className="space-y-2">
          <p className="whitespace-pre-line text-sm text-foreground">{record.mensagem}</p>

          {Array.isArray(record.impactos) && record.impactos.length > 0 && (
            <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
              {record.impactos.map((impacto, index) => (
                <li key={index}>{String(impacto)}</li>
              ))}
            </ul>
          )}
        </div>
      )
    }

    return (
      <pre className="whitespace-pre-wrap text-sm text-slate-800">
        {JSON.stringify(answer, null, 2)}
      </pre>
    )
  }

  return <p className="whitespace-pre-line text-sm text-slate-800">{String(answer ?? '')}</p>
}

export function ChatConversation({ simulationId }: ChatConversationProps) {
  const history = useChatHistory(simulationId) ?? []

  if (!history.length) {
    return null
  }

  return (
    <div className="mt-6 mb-6 rounded-lg bg-card">
      <div className="mb-4 text-sm font-semibold uppercase text-primary">
        Perguntas e respostas da IA
      </div>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={`${item.createdAt}-${index}`}
            className="rounded-lg border border-slate-200 bg-card p-4"
          >
            <div className="mb-2 text-xs uppercase text-primary">Pergunta</div>
            <p className="whitespace-pre-line text-sm text-foreground">{item.question}</p>

            <div className="mt-3 mb-2 text-xs uppercase text-primary">Resposta</div>
            {renderAnswerContent(item.answer)}
          </div>
        ))}
      </div>
    </div>
  )
}