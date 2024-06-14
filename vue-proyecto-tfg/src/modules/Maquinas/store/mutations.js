export const setMaquinas = (state, data) => {
  state.maquinas = data
}
export const setNewMaquina = (state, maquina) => {
  state.maquinas.push(maquina)
}
export const setResponse = (state, data) => {
  state.response = data
}

export const setMaquina = (state, data) => {
  state.maquinas = state.maquinas.map((maquina) => {
    if (maquina.id == data.id) {
      return { ...maquina, ...data.maquina }
    }
    return maquina
  })
}

export const deleteMaquina = (state, id) => {
  state.maquinas = state.maquinas.filter((maquina) => maquina.id != id)
}
