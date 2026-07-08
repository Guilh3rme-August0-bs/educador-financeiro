type SavedSimulation = {
    id: string
    goalName?: string
    goalAmount?: string
    goalDeadline?: string
    income?: string
}

function loadSavedSimulations(): SavedSimulation[] {
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
}

export function buildChatPrompt(id: string, userText: string) {
    const simulations = loadSavedSimulations()
    const simulation = simulations.find((item) => item.id === id)

    const insight = simulation
        ? `id: ${simulation.id}
meta: ${simulation.goalName ?? 'não informada'}
valor: ${simulation.goalAmount ?? 'não informado'}
prazo: ${simulation.goalDeadline ?? 'não informado'}
renda: ${simulation.income ?? 'não informada'}`
        : 'Nenhum insight encontrado para esta simulação.'

    return `Você é um educador financeiro especializado em finanças pessoais.
Um insight com dicas de educação financeira foi gerado com base nas condições e objetivos do usuário, a sua função será usar ele como base para responder perguntas sobre ele que lhe serão enviadas.

Texto do usuário: ${userText}

Insight da simulação:
${insight}

Regras:
- Todos os textos em português do Brasil
- Máximo de 4 itens por lista
- Seja específico ao citar valores calculados
- Não repita informações entre seções
- Nunca use markdown dentro dos valores do JSON`
}