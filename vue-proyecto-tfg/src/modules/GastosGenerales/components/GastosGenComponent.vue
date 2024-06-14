<template>
  <div>
    <div>
      <MensajesComponent
        v-if="getTipo !== 'warning'"
        :textClasses="'text-md'"
        :message="getMensaje"
        :type="getTipo"
        :mostrarMensaje="getMostrar"
      />
    </div>
    <TablaComponent
      :data="getGastosGenerales"
      :headers="headers"
      @saveData="persistData"
      @deleteSelected="deleteGastosSeleccionados"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useGastoGeneral from '@/modules/GastosGenerales/composables/useGastoGeneral'
import useShared from '@/modules/shared/composables/useShared'

export default {
  data() {
    return {
      headers: [{
        nombre: '',
        precio: 0,
      }],
    }
  },
  setup() {
    const { createGastoGeneral, editGastoGeneral, deleteGastosGenerales, getGastoGeneral } =
      useGastoGeneral()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          const { ok, message } = await createGastoGeneral(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          const { ok, message } = await editGastoGeneral(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        }
      } catch (error) {
        actualizarMensaje('error', 'Error guardando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    const deleteGastosSeleccionados = async (arrayData) => {
      try {
        const results = await deleteGastosGenerales(arrayData)
        const failedResults = results.filter((result) => result.ok === false)
        if (failedResults.length > 0) {
          const dataFailedPromises = failedResults.map(async (result) => {
            return await getGastoGeneral(result.id)
          })
          const dataFailed = await Promise.all(dataFailedPromises)
          if (!dataFailed[0].ok) {
            actualizarMensaje('error', 'Error accediendo a los gastos generales')
            actualizarMostrarMensaje(true)
          } else {
            const nombres = dataFailed.map((result) => result.nombre).join(', ')
            actualizarMensaje(
              'error',
              `Los siguientes gastos generales no se pudieron eliminar: ${nombres}`
            )
            actualizarMostrarMensaje(true)
          }
        } else {
          const nombresSuccess = arrayData.map((result) => result.nombre).join(', ')
          actualizarMensaje(
            'success',
            `Los siguientes consumibles se han eliminado: ${nombresSuccess}`
          )
          actualizarMostrarMensaje(true)
        }
      } catch (error) {
        actualizarMensaje('error', 'Error eliminando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    return {
      persistData,
      deleteGastosSeleccionados
    }
  },
  computed: {
    ...mapGetters('GastosGenerales', ['getGastosGenerales']),
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
