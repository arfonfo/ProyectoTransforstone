export const setTransportes = (state, data) => {
  state.Transportes = data
}

export const setNewTransporte = (state, Transporte) => {
  state.Transportes.push(Transporte)
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setTransporte = (state, data) => {
  state.Transportes = state.Transportes.map((Transporte) => {
    if (Transporte.id == data.id) {
      return { ...Transporte, ...data.Transporte }
    }
    return Transporte
  })
}

export const deleteTransporte = (state, id) => {
  state.Transportes = state.Transportes.filter((Transporte) => Transporte.id != id)
}
