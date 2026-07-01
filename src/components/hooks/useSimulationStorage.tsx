import type { SimulationFormData } from "../../data/simulation"

//chave do localStorage
const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {

    //função para receber os dados do formulario
    //criação de um array com o tipo SimulationFormData
    const saveFormData = (formData: SimulationFormData) => {
    //verificar a existencia de dados no array (ex: simulações anteriores)
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        const saveData = storage ? (JSON.parse(storage) as SimulationFormData[]) : []

        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify([...saveData, formData]),
        )
    }
    //retornar função para que ela possa ser utilizada nos hooks
    return { saveFormData }
}