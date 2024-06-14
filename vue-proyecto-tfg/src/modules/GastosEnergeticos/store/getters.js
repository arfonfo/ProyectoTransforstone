export const getGastos = (state) => {
  return state.gastos
}

export const getGastoById = (state) => (id) => {
  return state.gastos.find((gasto) => gasto.id === id)
}

export const getResponse = (state) => {
  return state.response
}
