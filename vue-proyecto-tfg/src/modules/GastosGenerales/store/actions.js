import authApi from '@/api/stoneApi'

export const fetchGastosGen = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/gastos-generales', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los consumibles obtenidos
      commit('setGastosGen', response.data)
    } else {
      console.error('Error al obtener los gastos:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los gastos:', error.message)
  }
}

export const createGastoGen = async ({ commit }, gasto) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/gastos-generales', gasto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 201 && response.data) {
      if (response.data.id) {
        gasto.id = response.data.id
      }
      // Actualizar el estado con los consumibles obtenidos
      //commit('setResponse', response.data)
      commit('setNewGastoGen', gasto)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los gastos:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener los gastos:', error.message)
  }
}

export const getGastoGenById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/gastos-generales/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      response.data.ok = true
      return response.data
    } else {
      console.error('Error al obtener el gasto:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener el gasto:', error)
    return { ok: false, message: 'Error en el acceso a gastos generales' }
  }
}

export const editGastoGen = async ({ commit }, gasto) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = gasto
  try {
    const response = await authApi.put(`/gastos-generales/${id}`, gasto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los consumibles obtenidos
      commit('setGastoGen', { id, gasto })
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener el gasto:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al editar el gasto:', error)
  }
}

export const deleteGastosGen = async ({ commit }, gastos) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []

  // Se utiliza bucle for...of en lugar de foreach para utilizar await y esperar a que cada promesa se resuelva antes de continuar con la siguiente iteración
  for (const gasto of gastos) {
    const { id } = gasto
    try {
      const response = await authApi.delete(`/gastos-generales/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })

      // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
      if (response.status === 200 && response.data) {
        // Hacer un mutation que elimine los consumibles de Vuex
        commit('deleteGastoGen', id)
        results.push({ id, ok: true, message: response.data.message })
      } else {
        console.error('Error al eliminar gasto general:', response.data.message)
        results.push({ id, ok: false, message: response.data.message })
      }
    } catch (error) {
      console.error('Error al eliminar los gastos general:', error.message)
      results.push({ id, ok: false, message: error.message })
    }
  }
  return results
}
