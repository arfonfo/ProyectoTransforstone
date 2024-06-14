export const getTransportes = (state) => {
  return state.Transportes
}

export const getTransporteById = (state) => (id) => {
  return state.Transportes.find((Transporte) => Transporte.id === id)
}

export const getResponse = (state) => {
  return state.response
}
