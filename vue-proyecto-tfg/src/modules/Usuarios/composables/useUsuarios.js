import { useStore } from 'vuex'

const useUsuarios = () => {
  const store = useStore()

  const getUsuarios = async () => {
    const resp = await store.dispatch('Usuarios/fetchUsuarios')
    return resp
  }

  const getUsuario = async (id) => {
    const resp = await store.dispatch('Usuarios/getUsuarioById', id)
    return resp
  }

  const createUsuario = async (usuario) => {
    const resp = await store.dispatch('Usuarios/createUsuario', usuario)
    return resp
  }

  const editUsuario = async (usuario) => {
    const resp = await store.dispatch('Usuarios/editUsuario', usuario)
    return resp
  }

  const deleteUsuarios = async (usuarios) => {
    const resp = await store.dispatch('Usuarios/deleteUsuarios', usuarios)

    return resp
  }

  return {
    getUsuarios,
    createUsuario,
    editUsuario,
    getUsuario,
    deleteUsuarios
  }
}

export default useUsuarios
