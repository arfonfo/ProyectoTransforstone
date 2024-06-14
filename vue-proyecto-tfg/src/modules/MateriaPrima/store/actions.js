import authApi from '@/api/stoneApi'

export const fetchMateriasPrimas = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/materias-primas', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los consumibles obtenidos
      commit('setMateriasPrimas', response.data)
    } else {
      console.error('Error al obtener las materias primas:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener las materias primas:', error.message)
  }
}

export const createMateriaPrima = async ({ commit }, materiaPrima) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/materias-primas', materiaPrima, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 201 && response.data) {
      if (response.data.id) {
        materiaPrima.id = response.data.id
      }

      // Actualizar el estado con las materiaPrimas obtenidas
      //commit('setResponse', response.data)

      commit('setNewMateriaPrima', materiaPrima)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener las materias primas:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al crear la materia prima:', error.message)
  }
}

export const getMateriaPrimaById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/materias-primas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      response.data.ok = true
      return response.data
    } else {
      console.error('Error al obtener la materia prima:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener la materia prima:', error)
    return { ok: false, message: 'Error en el acceso a materias primas' }
  }
}

export const editMateriaPrima = async ({ commit }, materiaPrima) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = materiaPrima
  try {
    const response = await authApi.put(`/materias-primas/${id}`, materiaPrima, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Hacer un mutation que actualice las materias primas de Vuex
      commit('setMateriaPrima', { id, materiaPrima })

      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al editar materia prima:', response.data.message)
      return { ok: false, message: response.data.message }
    }
  } catch (error) {
    console.error('Error al editar el materia prima:', error.message)
  }
}

export const deleteMateriasPrimas = async ({ commit }, materiasPrimas) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []

  // Se utiliza bucle for...of en lugar de foreach para utilizar await y esperar a que cada promesa se resuelva antes de continuar con la siguiente iteración

  for (const materiaPrima of materiasPrimas) {
    const { id } = materiaPrima

    try {
      const response = await authApi.delete(`/materias-primas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })

      // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
      if (response.status === 200 && response.data) {
        commit('deleteMateriaPrima', id)
        results.push({ id, ok: true, message: response.data.message })
      } else {
        console.error('Error al eliminar materia prima:', response.data.message)
        results.push({ id, ok: false, message: response.data.message })
      }
    } catch (error) {
      console.error('Error al eliminar las materias primas:', error.message)
      results.push({ id, ok: false, message: error.message })
    }
  }
  return results
}
