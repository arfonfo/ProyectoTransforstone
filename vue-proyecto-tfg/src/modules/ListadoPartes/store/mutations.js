export const setPartesCortabloques = (state, data) => {
  state.partesCortabloques = data
}

export const editParteCortabloques = (state, data) => {
  const index = state.partesCortabloques.findIndex((parte) => parte.id === data.id)
  state.partesCortabloques[index] = data
}

export const deleteParteCortabloques = (state, id) => {
  state.partesCortabloques = state.partesCortabloques.filter((parte) => parte.id !== id)
}
