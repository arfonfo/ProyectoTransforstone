import { useStore } from 'vuex'

const useTrabajadores = () => {
  const store = useStore()

  const getTrabajadores = async () => {
    const resp = await store.dispatch('Trabajadores/fetchTrabajadores')
    return resp
  }

  const getEmpleados = async () => {
    const resp = await store.dispatch('Trabajadores/fetchEmpleados')
    return resp
  }

  const getTrabajador = async (id) => {
    const resp = await store.dispatch('Trabajadores/getTrabajadorById', id)
    return resp
  }

  const createTrabajador = async (trabajador) => {
    const resp = await store.dispatch('Trabajadores/createTrabajador', trabajador)
    return resp
  }

  const editTrabajador = async (trabajador) => {
    const resp = await store.dispatch('Trabajadores/editTrabajador', trabajador)
    return resp
  }

  const deleteTrabajadores = async (trabajadores) => {
    const resp = await store.dispatch('Trabajadores/deleteTrabajadores', trabajadores)

    return resp
  }

  return {
    getTrabajadores,
    getEmpleados,
    createTrabajador,
    editTrabajador,
    getTrabajador,
    deleteTrabajadores
  }
}

export default useTrabajadores
