import { createBrowserRouter } from "react-router-dom";
import { Button } from "./components/shared/Button";
import { PiggyBank } from "lucide-react"; //biblioteca de ícones
import { RootLayout } from "./components/layout/RootLayout";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                //rota principal
                path: '/',
                element: <>
                    <h1>Formulário de Simulação</h1>
                    <Button variant='primary' icon={PiggyBank}>Botão</Button>
                </>
            },
            {
                path: '/resultado',
                element: <h1>Resultado da Simulação</h1>
            },
            {
                path: '/historico',
                element: <h1>Histórico de Simulação</h1>
            },
        ],
    }
])