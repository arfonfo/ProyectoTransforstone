export const getConsumibles = (state) => {
  return state.consumibles
}

export const getConsumibleById = (state) => (id) => {
  return state.consumibles.find((consumible) => consumible.id === id)
}

export const getResponse = (state) => {
  return state.response
}
