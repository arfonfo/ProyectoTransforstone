import { useStore } from 'vuex'

const useMateriaPrima = () => {
  const store = useStore()

  const getMateriasPrimas = async () => {
    const resp = await store.dispatch('MateriaPrima/fetchMateriasPrimas')
    return resp
  }

  const getMateriaPrima = async (id) => {
    const resp = await store.dispatch('MateriaPrima/getMateriaPrimaById', id)
    return resp
  }

  const createMateriaPrima = async (materiaPrima) => {
    const resp = await store.dispatch('MateriaPrima/createMateriaPrima', materiaPrima)
    return resp
  }

  const editMateriaPrima = async (materiaPrima) => {
    const resp = await store.dispatch('MateriaPrima/editMateriaPrima', materiaPrima)
    return resp
  }

  const deleteMateriasPrimas = async (materiaPrima) => {
    const resp = await store.dispatch('MateriaPrima/deleteMateriasPrimas', materiaPrima)
    return resp
  }

  return {
    getMateriasPrimas,
    getMateriaPrima,
    createMateriaPrima,
    editMateriaPrima,
    deleteMateriasPrimas
  }
}

export default useMateriaPrima
