import authApi from '@/api/stoneApi'

export const fetchTrabajadores = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/trabajadores', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los trabajadores obtenidos
      commit('setTrabajadores', response.data)
    } else {
      console.error('Error al obtener los trabajadores:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los trabajadores:', error.message)
  }
}

export const fetchEmpleados = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/empleados', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los empleados obtenidos
      commit('setEmpleados', response.data)

      return response.data
    } else {
      console.error('Error al obtener los empleados:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los empleados:', error.message)
  }
}

export const createTrabajador = async ({ commit }, trabajador) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const { numero_trabajador, precio, id_maquina } = trabajador
    const response = await authApi.post('/trabajadores', { numero_trabajador, precio, id_maquina }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 201 && response.data) {
      if (response.data.id) {
        trabajador.id = response.data.id
      }
      commit('setNewTrabajador', trabajador)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los trabajadores:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al crear el trabajador:', error.message)
  }
}

export const getTrabajadorById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/trabajadores/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      response.data.ok = true
      return response.data
    } else {
      console.error('Error al obtener el trabajador:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener el trabajador:', error)
    return { ok: false, message: 'Error en el acceso a trabajadores' }
  }
}

export const editTrabajador = async ({ commit }, trabajador) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = trabajador
  try {
    const response = await authApi.put(`/trabajadores/${id}`, trabajador, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Hacer un mutation que actualice los consumibles de Vuex
      commit('setTrabajador', { id, trabajador })

      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al editar trabajador:', response.data.message)
      return { ok: false, message: response.data.message }
    }
  } catch (error) {
    console.error('Error al editar el trabajador (persistencia):', error.message)
  }
}

export const deleteTrabajadores = async ({ commit }, trabajadores) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []

  // Se utiliza bucle for...of en lugar de foreach para utilizar await y esperar a que cada promesa se resuelva antes de continuar con la siguiente iteración

  for (const trabajador of trabajadores) {
    const { id } = trabajador

    try {
      const response = await authApi.delete(`/trabajadores/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })

      // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
      if (response.status === 200 && response.data) {
        // Hacer un mutation que elimine los consumibles de Vuex
        commit('deleteTrabajador', id)
        results.push({ id, ok: true, message: response.data.message })
      } else {
        console.error('Error al eliminar trabajador:', response.data.message)
        results.push({ id, ok: false, message: response.data.message })
      }
    } catch (error) {
      console.error('Error al eliminar los trabajadores:', error.message)
      results.push({ id, ok: false, message: error.message })
    }
  }
  return results
}
