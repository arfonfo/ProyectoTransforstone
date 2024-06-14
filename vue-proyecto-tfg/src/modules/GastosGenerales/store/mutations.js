export const setGastosGen = (state, data) => {
  state.gastosGenerales = data
}

export const setGastoGen = (state, data) => {
  state.gastosGenerales = state.gastosGenerales.map((gasto) => {
    if (gasto.id == data.id) {
      return { ...gasto, ...data.gasto }
    }
    return gasto
  })
}

export const setResponseGen = (state, data) => {
  state.response = data
}

export const setNewGastoGen = (state, gasto) => {
  state.gastosGenerales.push(gasto)
}

export const deleteGastoGen = (state, id) => {
  state.gastosGenerales = state.gastosGenerales.filter((gasto) => gasto.id != id)
}
