import { useStore } from 'vuex'

const userListadoPartes = () => {
  const store = useStore()

  const getPartesCortabloques = async () => {
    const resp = await store.dispatch('ListadoPartes/fetchPartesCortabloques')
    return resp
  }

  return {
    getPartesCortabloques
  }
}

export default userListadoPartes
