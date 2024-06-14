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
      :data="getUsuarios"
      :headers="headers"
      @saveData="persistData"
      @deleteSelected="deleteUsuariosSeleccionados"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useUsuarios from '@/modules/Usuarios/composables/useUsuarios'
import useTrabajadores from '@/modules/Trabajadores/composables/useTrabajadores'
import useShared from '@/modules/shared/composables/useShared'

export default {
  data() {
    return {
      headers: [{
        numero_trabajador: 0,
        email: '',
        roles: null
      }],
    }
  },
  setup() {
    const { createUsuario, editUsuario, deleteUsuarios, getUsuario, getUsuarios } = useUsuarios()
    const { getEmpleados, getTrabajadores } = useTrabajadores()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo usuario') {
          const { ok, message } = await createUsuario(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            await getEmpleados()
            await getUsuarios()
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar usuario') {
          const { ok, message } = await editUsuario(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            await getEmpleados()
            await getTrabajadores()
            await getUsuarios()
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

    const deleteUsuariosSeleccionados = async (arrayData) => {
      try {
        // No se incluye porque vuelve a mostrar el id del usuario en la tabla
        // const empleados = await getEmpleados()
        // arrayData.forEach(item => {
        //   const empleado = empleados.find(emp => emp.numero_trabajador === item.numero_trabajador)
        //   if (empleado){
        //     item.id_empleado = empleado.id
        //   }
        // })
        const empleados = await getEmpleados()
        const results = await deleteUsuarios(arrayData)
        const failedResults = results.filter((result) => result.ok === false)
        if (failedResults.length > 0) {
          const dataFailedPromises = failedResults.map(async (result) => {
            return await getUsuario(result.id)
          })
          const dataFailed = await Promise.all(dataFailedPromises)
          if (!dataFailed[0].ok) {
            actualizarMensaje('error', 'Error accediendo a los usuarios')
            actualizarMostrarMensaje(true)
          } else {
            const nombres = dataFailed.map((result) => {
              const empleado = empleados.find(emp => emp.numero_trabajador === result.numero_trabajador)
              return empleado ? `${empleado.nombre} ${empleado.apellido1} (${empleado.numero_trabajador})` : result.email
            }).join(', ')
            actualizarMensaje(
              'error',
              `Los siguientes usuarios no se pudieron desactivar: ${nombres}`
            )
            actualizarMostrarMensaje(true)
          }
        } else {
          const nombresSuccess = arrayData.map((result) => {
            const empleado = empleados.find(emp => emp.numero_trabajador === result.numero_trabajador)
            return empleado ? `${empleado.nombre} ${empleado.apellido1} (${empleado.numero_trabajador})` : result.email
          }).join(', ')
          actualizarMensaje(
            'success',
            `Los siguientes usuarios se han desactivado: ${nombresSuccess}`
          )
          actualizarMostrarMensaje(true)
          await getTrabajadores()
          await getEmpleados()
          await getUsuarios()
          
        }
      } catch (error) {
        console.error('Error changing data', error)
        actualizarMensaje('error', 'Error desactivando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    return {
      persistData,
      deleteUsuariosSeleccionados
    }
  },
  computed: {
    ...mapGetters('Usuarios', ['getUsuarios']),
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
