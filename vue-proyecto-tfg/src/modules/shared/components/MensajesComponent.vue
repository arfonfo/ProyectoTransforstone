<template>
  <div class="mb-5 flex justify-around items-center">
    <template v-if="mostrarMensaje">
      <!-- Success -->
      <div
        class="flex flex-row items-center justify-between px-4 py-3 text-green-800 border border-green-600 rounded-lg bg-green-50 bg-opacity-20 shadow-sm"
        role="alert"
        v-if="type === 'success'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'square-check']"
          class="text-green-700 scale-125 flex-shrink-0 inline w-4 h-4 me-3"
          :class="iconClasses"
        />
        <!-- <strong class="font-bold">¡Éxito!&nbsp;</strong> -->
        <span class="block sm:inline text-center text-wrap mr-12 sm:text-md"
        :class="computedClass"
        >
        {{
          message
        }}</span>
        <ButtonComponent
          type="button"
          text="X"
          bgColor="bg-transparent"
          otherClasses="h-5 w-5 rounded-md inline-flex justify-center items-center hover:scale-105"
          @click="cerrarMensaje"
        />
      </div>

      <!-- Error -->
      <div
        class="bg-red-100 border border-stoneBackgroundContrast-2 text-stoneBackgroundContrast-2 px-4 py-3 rounded-lg flex flex-row justify-between items-center bg-opacity-20 shadow-sm"
        role="alert"
        v-if="type === 'error'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'circle-exclamation']"
          class="text-stoneBackgroundContrast-2 scale-125 flex-shrink-0 inline w-4 h-4 me-3"
          :class="iconClasses"
        />
        <span class="block sm:inline text-center text-wrap mr-12 sm:text-md"
        :class="computedClass"
        >{{
          message
        }}</span>
        <ButtonComponent
          type="button"
          text="X"
          bgColor="bg-transparent"
          otherClasses="h-5 w-5 rounded-md inline-flex justify-center items-center hover:scale-105"
          @click="cerrarMensaje"
        />
      </div>

      <!-- Warning -->
      <div
        class="bg-yellow-50 border border-stoneBackgroundContrast-6 text-stoneBackgroundContrast-6 px-4 py-3 rounded-lg flex flex-row justify-between items-center bg-opacity-20 shadow-sm"
        role="alert"
        v-if="type === 'warning'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'triangle-exclamation']"
          class="text-stoneBackgroundContrast-6 scale-125 flex-shrink-0 inline w-4 h-4 me-3"
          :class="iconClasses"
        />
        <span class="block sm:inline text-center text-wrap mr-12 sm:text-md"
        :class="computedClass"
        >{{
          message
        }}</span>
        <ButtonComponent
          type="button"
          text="X"
          bgColor="bg-transparent"
          otherClasses="h-5 w-5 rounded-md inline-flex justify-center items-center hover:scale-105"
          :class="iconClasses"
          @click="cerrarMensaje"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useShared from '@/modules/shared/composables/useShared'

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    mostrarMensaje: {
      type: Boolean,
      required: true
    },
    textClasses: {
      type: String,
      required: false
    },
    iconClasses: {
      type: String,
      required: false
    }
  },
  computed: {
    computedClass() {
      return this.textClasses ? this.textClasses : 'text-sm'
    }
  },
  setup() {
    const { actualizarMostrarMensaje } = useShared()

    const cerrarMensaje = () => {
      actualizarMostrarMensaje(false)
    }

    setTimeout(cerrarMensaje, 10 * 1000)

    return {
      cerrarMensaje
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  }
}
</script>
