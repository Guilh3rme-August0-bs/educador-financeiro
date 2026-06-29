import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationFormPage } from "./pages/SimulationFormPage";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                //rota principal
                path: '/',
                element:
                    <SimulationFormPage/>
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