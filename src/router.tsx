import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationFormPage } from "./pages/SimulationFormPage";
import { SimulationResultsPage } from "./pages/SimulationResultsPages";
import { SimulationHistoryPage } from "./pages/SimulationHistoryPage";

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
                path: '/resultado/:id',
                element: <SimulationResultsPage/>
            },
            {
                path: '/historico',
                element: <SimulationHistoryPage/>
            },
        ],
    }
])