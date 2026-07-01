import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationFormPage } from "./pages/SimulationFormPage";
import { SimulationResultsPage } from "./pages/SimulationResultsPages";

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
                element: <SimulationResultsPage/>
            },
            {
                path: '/historico',
                element: <h1>Histórico de Simulação</h1>
            },
        ],
    }
])