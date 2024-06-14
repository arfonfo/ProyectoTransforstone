export const getUsuarios = (state) => {
  return state.usuarios.sort((a, b) => a.status.localeCompare(b.status));
}

export const getUsuarioById = (state) => (id) => {
  return state.usuarios.find((usuario) => usuario.id === id)
}

export const getResponse = (state) => {
  return state.response
}
