import authApi from '@/api/stoneApi'

export const fetchGastos = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/gastos-energeticos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los consumibles obtenidos
      commit('setGastos', response.data)
    } else {
      console.error('Error al obtener los gastos:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los gastos:', error.message)
  }
}

export const createGasto = async ({ commit }, gasto) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/gastos-energeticos', gasto, {
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
      commit('setNewGasto', gasto)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los gastos:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener los gastos:', error.message)
  }
}

export const getGastoById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/gastos-energeticos/${id}`, {
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
    return { ok: false, message: 'Error en el acceso a gastos energéticos' }
  }
}

export const editGasto = async ({ commit }, gasto) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = gasto
  try {
    const response = await authApi.put(`/gastos-energeticos/${id}`, gasto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los consumibles obtenidos
      commit('setGasto', { id, gasto })
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener el gasto:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al editar el gasto:', error)
  }
}

export const deleteGastos = async ({ commit }, gastos) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []

  // Se utiliza bucle for...of en lugar de foreach para utilizar await y esperar a que cada promesa se resuelva antes de continuar con la siguiente iteración
  for (const gasto of gastos) {
    const { id } = gasto
    try {
      const response = await authApi.delete(`/gastos-energeticos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })

      // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
      if (response.status === 200 && response.data) {
        // Hacer un mutation que elimine los consumibles de Vuex
        commit('deleteGasto', id)
        results.push({ id, ok: true, message: response.data.message })
      } else {
        console.error('Error al eliminar gasto energético:', response.data.message)
        results.push({ id, ok: false, message: response.data.message })
      }
    } catch (error) {
      console.error('Error al eliminar los gastos energéticos:', error.message)
      results.push({ id, ok: false, message: error.message })
    }
  }
  return results
}
