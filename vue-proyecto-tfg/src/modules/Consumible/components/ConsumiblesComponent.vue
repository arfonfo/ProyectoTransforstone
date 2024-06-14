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
      :data="getConsumibles"
      :headers="headers"
      @saveData="persistData"
      @deleteSelected="deleteConsumiblesSeleccionados"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useConsumible from '@/modules/Consumible/composables/useConsumible'
import useShared from '@/modules/shared/composables/useShared'

export default {
  data() {
    return {
      headers: [{
        nombre: '',
        precio: 0,
        id_maquina: null,
      }],
    }
  },
  setup() {
    const { createConsumible, editConsumible, deleteConsumibles, getConsumible } = useConsumible()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()

    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          const { ok, message } = await createConsumible(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          const { ok, message } = await editConsumible(data)
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

    const deleteConsumiblesSeleccionados = async (arrayData) => {
      try {

        const results = await deleteConsumibles(arrayData)
        const failedResults = results.filter((result) => result.ok === false)
        if (failedResults.length > 0) {
          const dataFailedPromises = failedResults.map(async (result) => {
            return await getConsumible(result.id)
          })
          const dataFailed = await Promise.all(dataFailedPromises)
          if (!dataFailed[0].ok) {
            actualizarMensaje('error', 'Error accediendo a los consumibles')
            actualizarMostrarMensaje(true)
          } else {
            const nombres = dataFailed.map((result) => result.nombre).join(', ')
            actualizarMensaje(
              'error',
              `Los siguientes consumibles no se pudieron eliminar: ${nombres}`
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
      deleteConsumiblesSeleccionados
    }
  },
  computed: {
    ...mapGetters('Consumible', ['getConsumibles']),
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar']),
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
