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
      :data="getGastos"
      :headers="headers"
      @saveData="persistData"
      @deleteSelected="deleteGastosSeleccionados"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useGasto from '@/modules/GastosEnergeticos/composables/useGasto'
import useShared from '@/modules/shared/composables/useShared'

export default {
  data() {
    return {
      headers: [{
        nombre: '',
        coste_energia: 0,
        id_maquina: null,
      }],
    }
  },
  setup() {
    const { createGasto, editGasto, deleteGastos, getGasto } = useGasto()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()

    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          const { ok, message } = await createGasto(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          const { ok, message } = await editGasto(data)
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

    const deleteGastosSeleccionados = async (arrayData) => {
      try {
        const results = await deleteGastos(arrayData)
        const failedResults = results.filter((result) => result.ok === false)
        if (failedResults.length > 0) {
          const dataFailedPromises = failedResults.map(async (result) => {
            return await getGasto(result.id)
          })
          const dataFailed = await Promise.all(dataFailedPromises)
          if (!dataFailed[0].ok) {
            actualizarMensaje('error', 'Error accediendo a los gastos energéticos')
            actualizarMostrarMensaje(true)
          } else {
            const nombres = dataFailed.map((result) => result.nombre).join(', ')
            actualizarMensaje(
              'error',
              `Los siguientes gastos energéticos no se pudieron eliminar: ${nombres}`
            )
            actualizarMostrarMensaje(true)
          }
        } else {
          const nombresSuccess = arrayData.map((result) => result.nombre).join(', ')
          actualizarMensaje(
            'success',
            `Los siguientes gastos energéticos se han eliminado: ${nombresSuccess}`
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
    ...mapGetters('GastosEnergeticos', ['getGastos']),
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
