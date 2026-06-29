interface Props {
    currentStep: number,
    totalSteps: number
}

export const Progress = ({ currentStep, totalSteps }: Props) => {

    const progress = (currentStep / totalSteps) * 100

    return (
        <div className="mb-4 text-left">
            <p>Etapa {currentStep} de {totalSteps}</p>
            <div className="bg-border h-1 w-full overflow:hidden rounded-full">

                <div
                    role="progressbar"
                    aria-valuenow={currentStep}
                    aria-valuemin={1}
                    aria-valuemax={totalSteps}
                    aria-label={`Passo ${currentStep}`}
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}>
                </div>
            </div>

        </div>
    )
}