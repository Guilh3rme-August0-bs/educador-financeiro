import type { SimulationFormData, SimulationRecord } from "../../data/simulation"

//chave do localStorage
const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {

    //função para receber os dados do formulario
    //criação de um array com o tipo SimulationFormData
    const saveFormData = (formData: SimulationFormData) => {

        //atribuir um id
        const id = crypto.randomUUID()
        const record: SimulationRecord = { ...formData, id }

        //verificar a existencia de dados no array (ex: simulações anteriores)
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        const saveData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify([...saveData, record]),
        )

        return id

    }

    //função para buscar os dados do form pelo id
    const getFormData = (id: string): SimulationRecord | null => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (!storage) {
            return null
        }

        const savedData = JSON.parse(storage) as SimulationRecord[]
        return savedData.find((record) => record.id === id) || null
    }

    //atualizar simulação
    const updateSimulation = (id: string, data: SimulationRecord) => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

        const updated = savedData.map((record) =>
            record.id === id ? { ...data } : record)

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    }

    //retornar função para que ela possa ser utilizada nos hooks
    return { saveFormData, getFormData, updateSimulation }
}