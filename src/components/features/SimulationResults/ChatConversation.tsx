import { useEffect, useRef } from 'react'
import { useChatHistory } from '../../hooks/useChatHistory'

interface ChatConversationProps {
  simulationId: string
}

function renderAnswerContent(answer: unknown) {
  // Trata diferentes formatos de resposta do histórico de chat
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
  // Carrega o histórico de chat para a simulação atual
  const history = useChatHistory(simulationId) ?? []

  // Referência para o elemento que ficará no fim da lista de mensagens
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Quando o histórico mudar, rola automaticamente para o fim
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  if (!history.length) {
    // Não renderiza nada se não houver histórico
    return null
  }

  return (
    <div className="mt-6 p-6 mb-9 rounded-lg bg-card shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="mb-4 text-sm font-semibold uppercase text-primary">
        Perguntas e respostas da IA
      </div>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={`${item.createdAt}-${index}`}
            className="rounded-lg bg-card p-2"
          >
            <div className="mb-2 text-xs uppercase text-primary">Pergunta</div>
            <p className="whitespace-pre-line text-sm text-foreground">{item.question}</p>

            <div className="mt-3 mb-2 text-xs uppercase text-primary">Resposta</div>
            {renderAnswerContent(item.answer)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}