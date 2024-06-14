export const getMateriasPrimas = (state) => {
  return state.materiasPrimas
}

export const getMateriaPrimaById = (state) => (id) => {
  return state.materiasPrimas.find((materiaPrima) => materiaPrima.id === id)
}

export const getResponse = (state) => {
  return state.response
}
