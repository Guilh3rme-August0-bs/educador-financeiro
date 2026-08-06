import { Card } from "../components/features/SimulationResults/Card"
import { PageHero } from "../components/shared/PageHero"
import { CalendarClock, Goal, PiggyBank, Wallet, CreditCardIcon, Landmark, LoaderCircle, ArrowRight } from "lucide-react"
import { calcMonthlySavings } from "../utils/simulation"
import { useParams } from "react-router-dom"
import { useSimulationStorage } from "../components/hooks/useSimulationStorage"
import { AIInsightsCard } from "../components/features/SimulationResults/AIInsightCardProps"
import { ChatConversation } from "../components/features/SimulationResults/ChatConversation"
import { useState } from "react"
import { useChat } from "../components/hooks/useChat"

//modelo de resultado
// const mock: SimulationFormData = {
//     income: 'R$ 5.000,00',
//     expenses: 'R$ 2.000,00',
//     debts: 'R$ 500,00',
//     goalName: 'Viagem para o Japão',
//     goalAmount: 'R$ 15.000,00',
//     goalDeadline: '12',
// }

export function SimulationResultsPage() {

    //useParams pega o id que está na URL
    const { id } = useParams<{ id: string }>()
    const { getFormData } = useSimulationStorage()

    const data = id ? getFormData(id) : null
    if (!data) {
        return <p>Simulação não encontrada</p>
    }

    const monthlySavings = calcMonthlySavings(data)


    //estado para obter valor do input
    const [inputValue, setValue] = useState('')

    const { chatIsLoading, fetchChat } = useChat(data.id)

    //perguntar ao chat
    const askChat = async (question: string) => {

        const result = await fetchChat(data.id, question)
        const responseObject = { answer: result ?? '' }
        responseObject.answer === ' ' ? alert('A IA não conseguiu gerar uma resposta. Tente novamente') : console.log(responseObject)
        setValue('')
        return responseObject
    }


    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <PageHero
                title='Resultado da simulação'
                subtitle='Com base no seu perfil financeiro e objetivos' />

            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card
                    icon={Goal}
                    label="Custo da Meta"
                    value={data.goalAmount}
                    subtitle={data.goalName} />
                <Card
                    icon={CalendarClock}
                    label="Prazo"
                    value={`${data.goalDeadline} meses`}
                    subtitle={'Prazo para atingir a meta'} />
                <Card
                    variant="primary"
                    icon={PiggyBank}
                    label="Economia Mensal"
                    value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    subtitle={'Economia mensal necessária'} />
            </div>


            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <AIInsightsCard simulationId={data.id} />
                <div className="order-1 flex flex-col gap-6 lg:order-2">
                    <Card
                        icon={Wallet}
                        label="Renda mensal"
                        value={data.income}
                        subtitle={'Renda total bruta por mês'} />
                    <Card
                        icon={CreditCardIcon}
                        label="Custos Fixos de Vida"
                        value={data.expenses}
                        subtitle={'Gastos essenciais por mês'} />
                    <Card
                        icon={Landmark}
                        label="Dívidas / Parcelas"
                        value={data.debts}
                        subtitle={'Valor comprometido em parcelas/depósito'} />
                </div>
            </div>
            <ChatConversation simulationId={data.id} />
            <div className="grid grid-cols-10 mt-6 p-6 rounded-lg bg-card shadow-[6px_6px_6px_6px_rgba(0,0,0,0.1)]">
                <input className="col-span-8 p-3 rounded-lg text-foreground placeholder:text-muted-foreground shadow-[6px_2px_6px_4px_rgba(0,0,0,0.2)] sm:col-span-9" 
                placeholder="Tire as suas dúvidas sobre a simulação" value={inputValue} onChange={(e) => { setValue(e.target.value) }}
                onKeyDown={(e) => { if (e.key === 'Enter') { askChat(inputValue) } }} />
                <button className="col-span-2 ml-4 sm:col-span-1 flex justify-center items-center cursor-pointer bg-primary rounded-lg" onClick={() => { askChat(inputValue) }}>
                    {chatIsLoading ? <LoaderCircle className="animate-spin" /> : <ArrowRight />}
                </button>
            </div>

        </main>)
}