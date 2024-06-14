export const setUsuarios = (state, data) => {
  state.usuarios = data
}

export const setNewUsuario = (state, usuario) => {
  state.usuarios.push(usuario)
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setUsuario = (state, data) => {
  state.usuarios = state.usuarios.map((usuario) => {
    if (usuario.id === data.id) {
      return { ...usuario, ...data.userToCommit }
    }
    return usuario
  })
}

export const deleteUsuario = (state, id) => {
  state.usuarios = state.usuarios.filter((usuario) => usuario.id != id)
}
