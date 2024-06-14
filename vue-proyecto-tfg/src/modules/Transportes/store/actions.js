import authApi from '@/api/stoneApi'

export const fetchTransportes = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/transportes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los Consumibles obtenidos
      commit('setTransportes', response.data)
    } else {
      console.error('Error al obtener los Transportes:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los Transportes:', error.message)
  }
}

export const createTransporte = async ({ commit }, Transporte) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/Transportes', Transporte, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 201 && response.data) {
      if (response.data.id) {
        Transporte.id = response.data.id
      }

      // Actualizar el estado con los consumibles obtenidos
      //commit('setResponse', response.data)

      commit('setNewTransporte', Transporte)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los Transportes:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al crear el Transportes:', error.message)
  }
}

export const getTransporteById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/Transportes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      response.data.ok = true
      return response.data
    } else {
      console.error('Error al obtener el Transporte:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener el Transporte:', error)
    return { ok: false, message: 'Error en el acceso a transportes' }
  }
}

export const editTransporte = async ({ commit }, Transporte) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = Transporte
  try {
    const response = await authApi.put(`/Transportes/${id}`, Transporte, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Hacer un mutation que actualice los consumibles de Vuex
      commit('setTransporte', { id, Transporte })

      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al editar Transporte:', response.data.message)
      return { ok: false, message: response.data.message }
    }
  } catch (error) {
    console.error('Error al editar el Transporte:', error.message)
  }
}

export const deleteTransportes = async ({ commit }, Transportes) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []

  // Se utiliza bucle for...of en lugar de foreach para utilizar await y esperar a que cada promesa se resuelva antes de continuar con la siguiente iteración
  for (const Transporte of Transportes) {
    const { id } = Transporte
    try {
      const response = await authApi.delete(`/Transportes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })

      // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
      if (response.status === 200 && response.data) {
        // Hacer un mutation que elimine los consumibles de Vuex
        commit('deleteTransporte', id)
        results.push({ id, ok: true, message: response.data.message })
      } else {
        console.error('Error al eliminar Transporte:', response.data.message)
        results.push({ id, ok: false, message: response.data.message })
      }
    } catch (error) {
      console.error('Error al eliminar los Transporte:', error.message)
      results.push({ id, ok: false, message: error.message })
    }
  }
  return results
}
