import type { LucideIcon } from "lucide-react"
import { Button } from "../../shared/Button"
import { Input, type InputProps } from "../../shared/Input"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState, type SyntheticEvent } from "react"
import { formatCurrencyMask } from "../../../utils/currency"

export interface FormStepProps {
    id: string
    icon: LucideIcon
    title: string
    question: string
    inputProps: InputProps
    submitButtonProps?: {
        label: string
        emojiIcon?: string
    }
}

interface ActionsButtonsProps {
    onBack: () => void
    onNext: () => void
    hideBackButton?: boolean
}

export const FormStep = ({
    icon: Icon,
    title,
    question,
    inputProps,
    submitButtonProps,
    onBack,
    onNext,
    hideBackButton }: FormStepProps & ActionsButtonsProps) => {

    //estado para obter valor do input
    const [inputValue, setInputValue] = useState('')

    //função para impedir o recarregamento da página ao navegar pelas etapas
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        onNext()
    }

    return (
        <div className="bg-card rounded-lg p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8 text-left">
            <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-lg">
                <Icon size={32} className="text-primary-foreground" />
            </div>
            <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
                {title}</h2>
            <h3 className="text-foreground mb-6 text-x1 leading-snug font-semibold sm:text-2x1">{question}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input {...inputProps} value={inputValue} 
                onChange={(e) => setInputValue(inputProps.prefix === 'R$'
                ? formatCurrencyMask(e.target.value) 
                : e.target.value)} />
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">

                    {/* botão só será renderizado se hideBackButton for false */}

                    {!hideBackButton && (
                        <Button
                            icon={ArrowLeft}
                            type="button"
                            onClick={onBack}
                            variant="ghost"
                            className="order 2 flex-1 justify-center rounded-lg py-3 sm:order-1">
                            Anterior
                        </Button>
                    )}
                    <Button
                        icon={!submitButtonProps ? ArrowRight : undefined}
                        type="button"
                        onClick={onNext}
                        disabled={!inputValue}
                        variant="primary"
                        className="order 2 flex-1 justify-center rounded-lg py-3 sm:order-2">
                        {submitButtonProps?.label ?? 'Próximo'}
                        {submitButtonProps?.emojiIcon}
                    </Button>
                </div>
            </form>
        </div>
    )
} 