export const setTrabajadores = (state, data) => {
  state.trabajadores = data
}

export const setEmpleados = (state, data) => {
  state.empleados = data
}

export const setNewTrabajador = (state, trabajador) => {
  state.trabajadores.push(trabajador)
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setTrabajador = (state, data) => {
  state.trabajadores = state.trabajadores.map((trabajador) => {
    if (trabajador.id == data.id) {
      return { ...trabajador, ...data.trabajador }
    }
    return trabajador
  })
}

export const deleteTrabajador = (state, id) => {
  state.trabajadores = state.trabajadores.filter((trabajador) => trabajador.id != id)
}
