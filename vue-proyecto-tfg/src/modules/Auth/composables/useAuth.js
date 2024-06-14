import { useStore } from 'vuex'

const useAuth = () => {
  const store = useStore()

  const createUser = async (user) => {
    const resp = await store.dispatch('Auth/createUser', user)

    return resp
  }

  const loginUser = async (user) => {
    const resp = await store.dispatch('Auth/loginUser', user)
    return resp
  }

  const getRoles = async () => {
    const resp = await store.dispatch('Auth/obtenerRoles')
    return resp
  }

  const changePassword = async (user) => {
    const resp = await store.dispatch('Auth/changePassword', user)
    return resp
  }

  return {
    createUser,
    loginUser,
    getRoles,
    changePassword
  }
}

export default useAuth
