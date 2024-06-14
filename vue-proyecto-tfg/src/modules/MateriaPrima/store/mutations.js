export const setMateriasPrimas = (state, data) => {
  state.materiasPrimas = data
}

export const setNewMateriaPrima = (state, materiaPrima) => {
  state.materiasPrimas.push(materiaPrima)
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setMateriaPrima = (state, data) => {
  state.materiasPrimas = state.materiasPrimas.map((materiaPrima) => {
    if (materiaPrima.id == data.id) {
      return { ...materiaPrima, ...data.materiaPrima }
    }
    return materiaPrima
  })
}

export const deleteMateriaPrima = (state, id) => {
  state.materiasPrimas = state.materiasPrimas.filter((materiaPrima) => materiaPrima.id != id)
}
