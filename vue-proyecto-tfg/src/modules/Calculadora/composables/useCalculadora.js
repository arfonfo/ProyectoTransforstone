import { useStore } from 'vuex'

const useCalculadora = () => {
  const getMaquinas = () => {
    const store = useStore()
    return store.getters['Calculadora/getMaquinas']
  }

  return {
    getMaquinas
  }
}

export default useCalculadora
