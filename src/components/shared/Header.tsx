import { Wallet, TrendingUp, Clock} from "lucide-react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
/* hook para ativar navegação entre rotas */
export function Header() {

    const navigate = useNavigate()

    return (
        <header className="border-b_border-(--border) px-6 py-3">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
                        <Wallet size={20} className="text-primary-foreground" />
                    </div>
                    <span className="text-lg">
                        <span className="text-muted-foreground font-medium">Educador</span>
                        <span className="font-extrabold"> IA</span>
                    </span>
                </div>


                {/* Botões de navegação */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="secondary"
                        icon={TrendingUp}
                        onClick={() => void navigate('/')}>

                        <span className="hidden_sm:inline">Nova Simulação</span> </Button>
                    <Button
                        variant="ghost"
                        icon={Clock}
                        onClick={() => void navigate('/historico')}>
                        <span className="hidden sm:inline">Histórico</span> </Button>
                </div>

            </nav >
        </header >
    )
}