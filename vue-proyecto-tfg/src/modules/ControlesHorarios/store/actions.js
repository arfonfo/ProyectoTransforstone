import authApi from '@/api/stoneApi'
export const addParteCortabloques = async ({ commit }, form) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/partes/cortabloques', form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    if (response.status === 201 && response.data) {
      if (response.data.id) {
        form.id = response.data.id
      }
      //commit('setNewParte', form)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los partes:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al crear el parte:', error.message)
  }
}
