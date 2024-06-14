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
      :data="getMaquinas"
      :headers="headers"
      @saveData="persistData"
      @deleteSelected="deleteMaquinasSeleccionadas"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useMaquina from '@/modules/Maquinas/composables/useMaquina'
import useShared from '@/modules/shared/composables/useShared'

export default {
  data() {
    return {
      headers: [{
        nombre: '',
        produccion_m2: 0,
        porcentaje_desperdicio: 0,
      }],
    }
  },
  setup() {
    const { createMaquina, editMaquina, deleteMaquinas, getMaquina } = useMaquina()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          const { ok, message } = await createMaquina(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          const { ok, message } = await editMaquina(data)
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

    const deleteMaquinasSeleccionadas = async (arrayData) => {
      try {
        const results = await deleteMaquinas(arrayData)
        const failedResults = results.filter((result) => result.ok === false)
        if (failedResults.length > 0) {
          const dataFailedPromises = failedResults.map(async (result) => {
            return await getMaquina(result.id)
          })
          const dataFailed = await Promise.all(dataFailedPromises)
          if (!dataFailed[0].ok) {
            actualizarMensaje('error', 'Error accediendo a las máquinas')
            actualizarMostrarMensaje(true)
          } else {
            const nombres = dataFailed.map((result) => result.nombre).join(', ')
            actualizarMensaje(
              'error',
              `Las siguientes máquinas no se pudieron eliminar: ${nombres}`
            )
            actualizarMostrarMensaje(true)
          }
        } else {
          const nombresSuccess = arrayData.map((result) => result.nombre).join(', ')
          actualizarMensaje(
            'success',
            `Las siguientes máquinas se han eliminado: ${nombresSuccess}`
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
      deleteMaquinasSeleccionadas
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas']),
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  components: {
    TablaComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/TablaComponent.vue')
    ),
    MensajesComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/MensajesComponent.vue')
    )
  }
}
</script>
