import { useStore } from 'vuex'

const useShared = () => {
  const store = useStore()

  const actualizarMensaje = (tipo, mensaje) => {
    store.dispatch('Shared/actualizarMensaje', { tipo, mensaje })
  }

  const actualizarMostrarMensaje = (mostrarMensaje) => {
    store.dispatch('Shared/actualizarMostrarMensaje', mostrarMensaje)
  }

  return {
    actualizarMensaje,
    actualizarMostrarMensaje
  }
}

export default useShared
