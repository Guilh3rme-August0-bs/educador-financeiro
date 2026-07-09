import { useInsight } from "../../hooks/useInsight"
import { Error } from "../Insights/Error"
import { Content } from "../Insights/Content"
//import { Input } from "../../shared/Input"
//import { Button } from "../../shared/Button"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { useState } from "react"

//biblioteca para montar barras de loading do insight
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "react-loading-skeleton"
import { useChat } from "../../hooks/useChat"
import { ChatConversation } from "../SimulationResults/ChatConversation"

interface AIInsightCardProps {
    simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {

    //estado para obter valor do input
    const [inputValue, setValue] = useState('')

    const { chatIsLoading, fetchChat } = useChat(simulationId)

    //perguntar ao chat
    const askChat = async (question: string) => {
        
        const result = await fetchChat(simulationId, question)
        const responseObject = { answer: result ?? '' }
        responseObject.answer === ' ' ? alert('A IA não conseguiu gerar uma resposta. Tente novamente') : console.log(responseObject)
        setValue('')
        return responseObject
    }

    const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)

    return (
        <div className="bg-card order-2 rounded-lg p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">

            <div className="mb-3 flex items-center gap-1.5"> <span>✨</span>
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                    Insight Financeiro Personalizado
                </span>
            </div>
            {isLoading && (

                <div className="flex">
                    <Skeleton
                        count={10}
                        baseColor="var(--color-skeleton-base)"
                        highlightColor="var(--color-skeleton-highlight)"
                        className="mb-3 flex rounded-lg"
                        containerClassName="flex-1"
                        inline />
                </div>

            )}
            {!isLoading && error && <Error simulationId={simulationId} message={error} onRetry={() => { fetchInsight(simulationId) }} />}
            {!isLoading && insight &&
                <>
                    <Content insight={insight} />
                    <ChatConversation simulationId={simulationId} />
                    <div className="grid grid-cols-10">
                        <input className="col-span-8 p-3 rounded-lg text-foreground placeholder:text-muted-foreground sm:col-span-9 shadow-[10px_10px_24px_px_rgba(0,0,0,0.2)]" placeholder="Tire as suas dúvidas sobre a simulação" value={inputValue} onChange={(e) => { setValue(e.target.value) }} />
                        <button className="col-span-2 ml-4 sm:col-span-1 flex justify-center items-center cursor-pointer bg-primary rounded-lg" onClick={() => { askChat(inputValue) }}>
                            {chatIsLoading ? <LoaderCircle className="animate-spin"/> : <ArrowRight/>}
                        </button>
                    </div>
                </>}

        </div >
    )

}