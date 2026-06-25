import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        children: [
            {
                //rota principal
                path: '/',
                element: <h1>Formulário de Simulação</h1>
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