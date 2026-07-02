import { Progress } from "./Progress"
import { FormStep } from "./FormStep"
import { simulationFormSteps, type SimulationFormData } from "../../../data/simulation"
import { useState } from "react"
import { useSimulationStorage } from "../../hooks/useSimulationStorage"
import { useNavigate } from "react-router-dom"

export const SimulationForm = () => {
    
    const navigate = useNavigate()
    
    //hook para armazenar dados em localStorage
    const { saveFormData } = useSimulationStorage()

    //Estado para navegar entre as etapas
    const [currentStepIndex, setCurrentIndex] = useState(0)

    //estado que vai armazenar as respostas do form
    const [formData, setFormData] = useState<SimulationFormData>({} as SimulationFormData)

    const totalSteps = simulationFormSteps.length
    const currentStep = simulationFormSteps[currentStepIndex]

    //avançar formulário
    const nextStep = (value: string) => {

        /* todas as vezes que o botão próximo for clicado, o valor digitado 
        será armazenado no objeto formData */
        const updatedFormData = { ...formData, [currentStep.id]: value }
        setFormData(updatedFormData)

        
        if (currentStepIndex + 1 > totalSteps - 1) {
            const id = saveFormData(updatedFormData)
            void navigate(`/resultado/${id}`)
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
                hideBackButton={currentStepIndex === 0} />
        </div>
    )
}