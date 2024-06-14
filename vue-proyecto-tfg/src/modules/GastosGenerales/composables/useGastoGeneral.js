import { useStore } from 'vuex'

const useGastoGeneral = () => {
  const store = useStore()

  const getGastosGenerales = async () => {
    const resp = await store.dispatch('GastosGenerales/fetchGastosGen')
    return resp
  }
  const getGastoGeneral = async (id) => {
    const resp = await store.dispatch('GastosGenerales/getGastoGenById', id)
    return resp
  }

  const createGastoGeneral = async (gasto) => {
    const resp = await store.dispatch('GastosGenerales/createGastoGen', gasto)
    return resp
  }
  const editGastoGeneral = async (gasto) => {
    const resp = await store.dispatch('GastosGenerales/editGastoGen', gasto)
    return resp
  }

  const deleteGastosGenerales = async (gastos) => {
    const resp = await store.dispatch('GastosGenerales/deleteGastosGen', gastos)
    return resp
  }

  return {
    getGastosGenerales,
    createGastoGeneral,
    editGastoGeneral,
    getGastoGeneral,
    deleteGastosGenerales
  }
}

export default useGastoGeneral
