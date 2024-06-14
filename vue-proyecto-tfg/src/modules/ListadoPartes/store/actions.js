import authApi from '@/api/stoneApi'
const pathPartes = '/partes'
export const fetchPartesCortabloques = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(pathPartes + '/cortabloques', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los partes del cortabloques obtenidos
      commit('setPartesCortabloques', response.data)
    } else {
      console.error('Error al obtener los partes del cortabloques:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los partes del cortabloques:', error.message)
  }
}

export const editParteCortabloques = async ({ commit }, parte) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const id = parte.id
  delete parte.id
  try {
    const response = await authApi.put(pathPartes + '/cortabloques/' + id, parte, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con el parte del cortabloques editado
      commit('editParteCortabloques', response.data.parte)
    } else {
      console.error('Error al editar el parte del cortabloques:', response.message)
    }
  } catch (error) {
    console.error('Error al editar el parte del cortabloques:', error.message)
  }
}

export const deleteParteCortabloques = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.delete(pathPartes + '/cortabloques/' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado eliminando el parte del cortabloques
      commit('deleteParteCortabloques', id)
    } else {
      console.error('Error al eliminar el parte del cortabloques:', response.message)
    }
  } catch (error) {
    console.error('Error al eliminar el parte del cortabloques:', error.message)
  }
}
