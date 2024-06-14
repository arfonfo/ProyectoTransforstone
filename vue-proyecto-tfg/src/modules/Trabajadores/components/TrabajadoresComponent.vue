<template>
  <div>
    <template v-if="getMostrar">
      <MensajesComponent
        v-if="getTipo !== 'warning'"
        :textClasses="'text-md'"
        :message="getMensaje"
        :type="getTipo"
        :mostrarMensaje="getMostrar"
      />
    </template>
    <TablaComponent
      :data="getTrabajadores"
      :headers="headers"
      @saveData="persistData"
      @deleteSelected="deleteTrabajadoresSeleccionados"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useTrabajadores from '@/modules/Trabajadores/composables/useTrabajadores'
import useShared from '@/modules/shared/composables/useShared'
import { useStore } from 'vuex'

export default {
  data() {
    return {
      headers: [{
        numero_trabajador: 0,
        nombre_completo: '',
        precio: 0,
        id_maquina: null,
      }],
    }
  },
  setup() {
    const { createTrabajador, editTrabajador, deleteTrabajadores, getTrabajador, getEmpleados } = useTrabajadores()
    const store = useStore()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        const empleados = await getEmpleados()
        const empleado = empleados.find(empleado => empleado.numero_trabajador === data.numero_trabajador)

        if (empleado) {
          const nombre_completo = empleado.nombre + ' ' + empleado.apellido1 + ' ' + empleado.apellido2
          data = {
            numero_trabajador: data.numero_trabajador, 
            nombre_completo, 
            ...data 
          }
        }

        if (type === 'Añadir nuevo trabajador') {
          const { ok, message } = await createTrabajador(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar trabajador') {
          const { ok, message } = await editTrabajador(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        }
      } catch (error) {
        console.error('Error persisting data', error)
        actualizarMensaje('error', 'Error guardando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    const deleteTrabajadoresSeleccionados = async (arrayData) => {
      try {
        const maquinas = store.getters['Maquinas/getMaquinas']
        const results = await deleteTrabajadores(arrayData)
        const failedResults = results.filter((result) => result.ok === false)
        if (failedResults.length > 0) {
          const dataFailedPromises = failedResults.map(async (result) => {
            return await getTrabajador(result.id)
          })
          const dataFailed = await Promise.all(dataFailedPromises)
          if (!dataFailed[0].ok) {
            actualizarMensaje('error', 'Error accediendo a los trabajadores')
            actualizarMostrarMensaje(true)
          } else {
            const nombres = dataFailed.map((result) => {
              const maquina = maquinas.find(maquina => maquina.id === result.id_maquina)
              return `${result.nombre_completo} - ${maquina.nombre}`
              }).join(', ')

            actualizarMensaje(
              'error',
              `Los siguientes trabajadores no se pudieron eliminar: ${nombres}`
            )
            actualizarMostrarMensaje(true)
          }
        } else {
          const dataSuccess = arrayData.map((result) => {
            const maquina = maquinas.find(maquina => maquina.id === result.id_maquina)
            return `${result.nombre_completo} - ${maquina.nombre}`
          }).join(', ')

          actualizarMensaje(
            'success',
            `Los siguientes trabajadores se han eliminado: ${dataSuccess}`
          )
          actualizarMostrarMensaje(true)
        }
      } catch (error) {
        console.error('Error deleting data', error)
        actualizarMensaje('error', 'Error eliminando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    return {
      persistData,
      deleteTrabajadoresSeleccionados
    }
  },
  computed: {
    ...mapGetters('Trabajadores', ['getTrabajadores']),
    ...mapGetters('Maquinas', ['getMaquinas']),
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  components: {
    MensajesComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/MensajesComponent.vue')
    ),
    TablaComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/TablaComponent.vue')
    )
  }
}
</script>
