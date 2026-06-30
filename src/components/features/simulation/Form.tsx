import { Progress } from "./Progress"
import { FormStep } from "./FormStep"
import { simulationFormSteps } from "../../../data/simulation"
import { useState } from "react"

export const SimulationForm = () => {

    //Estado para navegar entre as etapas
    const [currentStepIndex, setCurrentIndex] = useState(0)
    const totalSteps = simulationFormSteps.length
    const currentStep = simulationFormSteps[currentStepIndex]

    //avançar formulário
    const nextStep = () => {
        if (currentStepIndex + 1 > totalSteps - 1) {
            return
        }

        setCurrentIndex((prev) => prev + 1)
    }

    //voltar ao passo anterior
    const previousStep = () => {
        if (currentStepIndex === 0) {
            return
        }
        setCurrentIndex((prev) => prev - 1)
    }

    //formulário
    return (
        <div className="mb-8 text-center">
            <Progress currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
            <FormStep key={currentStep.id} {...currentStep} 
            onBack={previousStep} onNext={nextStep}
            hideBackButton={currentStepIndex === 0}/>
        </div>
    )
}