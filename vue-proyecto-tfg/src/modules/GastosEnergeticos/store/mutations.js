export const setGastos = (state, data) => {
  state.gastos = data
}

export const setGasto = (state, data) => {
  const index = state.gastos.findIndex(gasto => gasto.id === data.id);
  if (index !== -1) {
    state.gastos[index] = { ...state.gastos[index], ...data.gasto };
  }
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setNewGasto = (state, gasto) => {
  state.gastos.push(gasto)
}

export const deleteGasto = (state, id) => {
  state.gastos = state.gastos.filter((gasto) => gasto.id != id)
}
