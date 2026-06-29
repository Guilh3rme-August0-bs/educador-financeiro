import type { LucideIcon } from "lucide-react"
import { Button } from "../../shared/Button"
import { Input, type InputProps } from "../../shared/Input"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface FormStepProps {
    icon: LucideIcon
    title: string
    question: string
    inputProps: InputProps
    submitButtonProps?: {
        label: string
        emojiIcon?: string
    }
}

export const FormStep = ({ icon: Icon, title, question, inputProps, submitButtonProps }: FormStepProps) => {
    return (
        <div className="bg-card rounded-lg p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8 text-left">
            <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-lg">
                <Icon size={32} className="text-primary-foreground" />
            </div>
            <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
                {title}</h2>
            <h3 className="text-foreground mb-6 text-x1 leading-snug font-semibold sm:text-2x1">{question}</h3>
            <form className="flex flex-col gap-4">
                <Input {...inputProps} />
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <Button
                    icon={ArrowLeft}
                    type="button"
                    variant="ghost"
                    className="order 2 flex-1 justify-center rounded-lg py-3 sm:order-1">
                    Anterior
                </Button>
                <Button
                    icon={!submitButtonProps ? ArrowRight : undefined}
                    type="button"
                    variant="primary"
                    className="order 2 flex-1 justify-center rounded-lg py-3 sm:order-2">
                    {submitButtonProps ?.label ?? 'Próximo'}
                    {submitButtonProps ?.emojiIcon}
                </Button>
                </div>
            </form>
        </div>
    )
} 