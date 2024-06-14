import authApi from '@/api/stoneApi'

export const fetchConsumibles = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/consumibles', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los consumibles obtenidos
      commit('setConsumibles', response.data)
    } else {
      console.error('Error al obtener los consumibles:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los consumibles:', error.message)
  }
}

export const createConsumible = async ({ commit }, consumible) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/consumibles', consumible, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 201 && response.data) {
      if (response.data.id) {
        consumible.id = response.data.id
      }

      // Actualizar el estado con los consumibles obtenidos
      //commit('setResponse', response.data)

      commit('setNewConsumible', consumible)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los consumibles:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al crear el consumible:', error.message)
  }
}

export const getConsumibleById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/consumibles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      response.data.ok = true
      return response.data
    } else {
      console.error('Error al obtener el consumible:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    return { ok: false, message: 'Error en el acceso a consumibles' }
  }
}

export const editConsumible = async ({ commit }, consumible) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = consumible
  try {
    const response = await authApi.put(`/consumibles/${id}`, consumible, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Hacer un mutation que actualice los consumibles de Vuex
      commit('setConsumible', { id, consumible })

      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al editar consumible:', response.data.message)
      return { ok: false, message: response.data.message }
    }
  } catch (error) {
    console.error('Error al editar el consumible:', error.message)
  }
}

export const deleteConsumibles = async ({ commit }, consumibles) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []

  // Se utiliza bucle for...of en lugar de foreach para utilizar await y esperar a que cada promesa se resuelva antes de continuar con la siguiente iteración

  for (const consumible of consumibles) {
    const { id } = consumible

    try {
      const response = await authApi.delete(`/consumibles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })

      // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
      if (response.status === 200 && response.data) {
        // Hacer un mutation que elimine los consumibles de Vuex
        commit('deleteConsumible', id)
        results.push({ id, ok: true, message: response.data.message })
      } else {
        console.error('Error al eliminar consumible:', response.data.message)
        results.push({ id, ok: false, message: response.data.message })
      }
    } catch (error) {
      console.error('Error al eliminar los consumibles:', error.message)
      results.push({ id, ok: false, message: error.message })
    }
  }
  return results
}
