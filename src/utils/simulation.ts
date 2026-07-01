import type { SimulationFormData } from "../data/simulation";
import { parseCurrency } from "./currency";

/* função que determina o valor que falta para que o 
usuário atinja a meta estabelecida */
export function calcMonthlySavings(data: SimulationFormData) {
    return (
        //string para número
        parseCurrency(data.income) -
        parseCurrency(data.expenses) -
        parseCurrency(data.debts)
    )
}