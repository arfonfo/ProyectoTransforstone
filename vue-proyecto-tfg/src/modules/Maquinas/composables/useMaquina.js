import { useStore } from 'vuex'

const useMaquina = () => {
  const store = useStore()

  const getMaquinas = async () => {
    const resp = await store.dispatch('Maquinas/fetchMaquinas')
    return resp
  }

  const createMaquina = async (maquina) => {
    const resp = await store.dispatch('Maquinas/createMaquina', maquina)
    return resp
  }

  const editMaquina = async (maquina) => {
    const resp = await store.dispatch('Maquinas/editMaquina', maquina)
    return resp
  }

  const deleteMaquinas = async (maquinas) => {
    const resp = await store.dispatch('Maquinas/deleteMaquinas', maquinas)
    await store.dispatch('GastosEnergeticos/fetchGastos')
    await store.dispatch('Consumible/fetchConsumibles')
    await store.dispatch('Trabajadores/fetchTrabajadores')
    return resp
  }

  const getMaquina = async (id) => {
    const resp = await store.dispatch('Maquinas/getMaquinaById', id)
    return resp
  }

  return {
    getMaquinas,
    createMaquina,
    editMaquina,
    deleteMaquinas,
    getMaquina
  }
}

export default useMaquina
