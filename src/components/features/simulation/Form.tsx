import { Progress } from "./Progress"
import { FormStep } from "./FormStep"
import { PiggyBank } from "lucide-react"

export const SimulationForm = () => {
    return (
        <div className="mb-8 text-center">
            <Progress currentStep={6} totalSteps={10} />
            <FormStep
                icon={PiggyBank}
                title="Renda Mensal Bruta"
                question="Somando todas as fontes de renda, qual é o valor depositado na sua conta todo mês?"
                inputProps={{ type: 'text', placeholder: 'ex: 5.000,00', prefix: 'R$', suffix: 'meses'}}
                />
        </div>
    )
}