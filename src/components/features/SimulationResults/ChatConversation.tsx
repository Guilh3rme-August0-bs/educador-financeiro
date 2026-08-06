import { useEffect, useRef, useState } from 'react'
import { useChatHistory } from '../../hooks/useChatHistory'

interface ChatConversationProps {
  simulationId: string
}

function getAnswerText(answer: unknown) {
  if (typeof answer === 'string') return answer
  if (answer && typeof answer === 'object') {
    const record = answer as Record<string, unknown>
    if (typeof record.mensagem === 'string') return record.mensagem
    if (typeof record.resposta === 'string') return record.resposta
    return JSON.stringify(answer, null, 2)
  }
  return String(answer ?? '')
}

function renderAnswerContent(answer: unknown) {
  if (typeof answer === 'string') {
    return <p className="whitespace-pre-line text-sm text-foreground">{answer}</p>
  }

  if (answer && typeof answer === 'object') {
    const record = answer as Record<string, unknown>
    const message =
      typeof record.mensagem === 'string'
        ? record.mensagem
        : typeof record.resposta === 'string'
        ? record.resposta
        : undefined

    return (
      <div className="space-y-2">
        <p className="whitespace-pre-line text-sm text-foreground">
          {message ?? JSON.stringify(answer, null, 2)}
        </p>

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

  return <pre className="whitespace-pre-wrap text-sm text-slate-800">{String(answer ?? '')}</pre>
}

function TypingAnswer({ answer, typedText, complete }: { answer: unknown; typedText: string; complete: boolean }) {
  if (typeof answer === 'string') {
    return (
      <p className="whitespace-pre-line text-sm text-foreground">
        {typedText}
        {!complete && <span className="ml-1 inline-block animate-pulse">|</span>}
      </p>
    )
  }

  if (answer && typeof answer === 'object') {
    const record = answer as Record<string, unknown>
    const message =
      typeof record.mensagem === 'string'
        ? record.mensagem
        : typeof record.resposta === 'string'
        ? record.resposta
        : undefined

    if (message) {
      return (
        <div className="space-y-2">
          <p className="whitespace-pre-line text-sm text-foreground">
            {typedText}
            {!complete && <span className="ml-1 inline-block animate-pulse">|</span>}
          </p>

          {complete && Array.isArray(record.impactos) && record.impactos.length > 0 && (
            <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
              {record.impactos.map((impacto, index) => (
                <li key={index}>{String(impacto)}</li>
              ))}
            </ul>
          )}
        </div>
      )
    }
  }

  return (
    <pre className="whitespace-pre-wrap text-sm text-slate-800">
      {typedText}
      {!complete && <span className="inline-block animate-pulse">|</span>}
    </pre>
  )
}

export function ChatConversation({ simulationId }: ChatConversationProps) {
  const history = useChatHistory(simulationId) ?? []
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [typingIndex, setTypingIndex] = useState<number | null>(null)
  const [typedText, setTypedText] = useState('')
  const [typingComplete, setTypingComplete] = useState(false)

  const previousHistoryLengthRef = useRef(history.length)
  const previousLastAnswerTextRef = useRef<string | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    if (typingIndex === null) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [typedText, typingIndex])

  useEffect(() => {
    if (!history.length) {
      previousHistoryLengthRef.current = 0
      previousLastAnswerTextRef.current = null
      return
    }

    const index = history.length - 1
    const answer = history[index].answer
    const fullText = getAnswerText(answer)

    const isInitialRender =
      previousLastAnswerTextRef.current === null &&
      previousHistoryLengthRef.current === history.length

    const isNewHistoryItem = history.length > previousHistoryLengthRef.current
    const lastAnswerChanged =
      previousLastAnswerTextRef.current !== null &&
      fullText !== previousLastAnswerTextRef.current

    previousHistoryLengthRef.current = history.length
    previousLastAnswerTextRef.current = fullText

    if (isInitialRender || !(isNewHistoryItem || lastAnswerChanged)) return

    setTypingIndex(index)
    setTypedText('')
    setTypingComplete(false)

    let current = 0
    const interval = window.setInterval(() => {
      current += 1
      setTypedText(fullText.slice(0, current))

      if (current >= fullText.length) {
        setTypingComplete(true)
        window.clearInterval(interval)
      }
    }, 10)

    return () => window.clearInterval(interval)
  }, [history])

  if (!history.length) return null

  return (
    <div className="mt-6 p-6 mb-9 rounded-lg bg-card shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="mb-4 text-sm font-semibold uppercase text-primary">
        Perguntas e respostas da IA
      </div>

      <div className="max-h-84 overflow-auto [scrollbar-color:var(--border)_transparent]">
        {history.map((item, index) => {
          const answer =
            item.answer && typeof item.answer === 'object'
              ? (item.answer as Record<string, unknown>).resposta ?? item.answer
              : item.answer

          const isTyping = index === typingIndex && !typingComplete

          return (
            <div key={`${item.createdAt}-${index}`} className="rounded-lg bg-card p-2">
              <div className="mb-2 mt-2 text-sm uppercase text-primary">Pergunta</div>
              <p className="whitespace-pre-line text-sm text-foreground">{item.question}</p>

              <div className="mb-2 mt-4 text-sm uppercase text-primary">Resposta</div>
              {isTyping ? (
                <TypingAnswer answer={answer} typedText={typedText} complete={typingComplete} />
              ) : (
                renderAnswerContent(answer)
              )}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}