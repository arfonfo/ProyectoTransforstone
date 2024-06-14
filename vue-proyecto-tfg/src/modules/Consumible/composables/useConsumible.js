import { useStore } from 'vuex'

const useConsumible = () => {
  const store = useStore()

  const getConsumibles = async () => {
    const resp = await store.dispatch('Consumible/fetchConsumibles')
    return resp
  }

  const getConsumible = async (id) => {
    const resp = await store.dispatch('Consumible/getConsumibleById', id)
    return resp
  }

  const createConsumible = async (consumible) => {
    const resp = await store.dispatch('Consumible/createConsumible', consumible)
    return resp
  }

  const editConsumible = async (consumible) => {
    const resp = await store.dispatch('Consumible/editConsumible', consumible)
    return resp
  }

  const deleteConsumibles = async (consumibles) => {
    const resp = await store.dispatch('Consumible/deleteConsumibles', consumibles)
    return resp
  }

  return {
    getConsumibles,
    createConsumible,
    editConsumible,
    getConsumible,
    deleteConsumibles
  }
}

export default useConsumible
