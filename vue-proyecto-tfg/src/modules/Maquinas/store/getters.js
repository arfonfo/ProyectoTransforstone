export const getMaquinas = (state) => {
  return state.maquinas
}

export const getConsumibleById = (state) => (id) => {
  return state.consumibles.find((consumible) => consumible.id === id)
}

export const getResponse = (state) => {
  return state.response
}
