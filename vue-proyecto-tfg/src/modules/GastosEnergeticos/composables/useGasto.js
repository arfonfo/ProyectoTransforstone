import { useStore } from 'vuex'

const useGasto = () => {
  const store = useStore()

  const getGastos = async () => {
    const resp = await store.dispatch('GastosEnergeticos/fetchGastos')
    return resp
  }
  const getGasto = async (id) => {
    const resp = await store.dispatch('GastosEnergeticos/getGastoById', id)
    return resp
  }

  const createGasto = async (gasto) => {
    const resp = await store.dispatch('GastosEnergeticos/createGasto', gasto)
    return resp
  }
  const editGasto = async (gasto) => {
    const resp = await store.dispatch('GastosEnergeticos/editGasto', gasto)
    return resp
  }

  const deleteGastos = async (gastos) => {
    const resp = await store.dispatch('GastosEnergeticos/deleteGastos', gastos)
    return resp
  }

  return {
    getGastos,
    createGasto,
    editGasto,
    getGasto,
    deleteGastos
  }
}

export default useGasto
