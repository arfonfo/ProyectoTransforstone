export const actualizarMensaje = ({ commit }, { tipo, mensaje }) => {
  commit('setType', tipo)
  commit('setMessage', mensaje)
}

export const actualizarMostrarMensaje = ({ commit }, mostrar) => {
  commit('setMostrar', mostrar)
}
