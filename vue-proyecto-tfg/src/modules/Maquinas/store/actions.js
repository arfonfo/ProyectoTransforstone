import authApi from '@/api/stoneApi'

export const fetchMaquinas = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/maquinas', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los maquinas obtenidos
      commit('setMaquinas', response.data)
    } else {
      console.error('Error al obtener los maquinas:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los maquinas:', error.message)
  }
}

export const createMaquina = async ({ commit }, maquina) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/maquinas', maquina, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    if (response.status === 201 && response.data) {
      if (response.data.id) {
        maquina.id = response.data.id
      }
      commit('setNewMaquina', maquina)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los maquinas:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al crear el maquina:', error.message)
  }
}
export const editMaquina = async ({ commit }, maquina) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = maquina
  try {
    const response = await authApi.put(`/maquinas/${id}`, maquina, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    if (response.status === 200 && response.data) {
      commit('setMaquina', { id, maquina })
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los maquinas:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al editar el maquina:', error.message)
  }
}

export const getMaquinaById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/maquinas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      response.data.ok = true
      return response.data
    } else {
      console.error('Error al obtener la máquina:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener la máquina:', error)
    return { ok: false, message: 'Error en el acceso a máquinas' }
  }
}

export const deleteMaquinas = async ({ commit }, maquinas) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []
  for (const maquina of maquinas) {
    const { id } = maquina
    try {
      const response = await authApi.delete(`/maquinas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })

      // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
      if (response.status === 200 && response.data) {
        // Hacer un mutation que elimine los maquinas de Vuex
        commit('deleteMaquina', id)
        results.push({ id, ok: true, message: response.data.message })
      } else {
        console.error('Error al eliminar una máquina:', response.data.message)
        results.push({ id, ok: false, message: response.data.message })
      }
    } catch (error) {
      console.error('Error al eliminar las máquinas:', error.message)
      results.push({ id, ok: false, message: error.message })
    }
  }
  return results
}
