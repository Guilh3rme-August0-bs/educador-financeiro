import { SimulationHero } from "../components/features/simulation/Hero"
import { SimulationForm } from "../components/features/simulation/Form"

export const SimulationFormPage = () => {
    return (
        <div>
           <main className="mx-auto max-w-150 px-4 py-10 sm:py-14">
            <SimulationHero/>
            <SimulationForm/>
           </main>
        </div>
    )
}