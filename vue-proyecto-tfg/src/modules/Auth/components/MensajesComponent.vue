<template>
  <div class="mb-5 flex justify-around items-center">
    <template v-if="show">
      <!-- Success -->
      <div
        class="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded flex flex-row justify-between items-center relative shadow-sm"
        role="alert"
        v-if="type === 'success'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'square-check']"
          class="text-green-600 mr-3 scale-150 hidden sm:inline-block"
        />
        <!-- <strong class="font-bold">¡Éxito!&nbsp;</strong> -->
        <span class="block sm:inline text-center text-wrap text-base sm:text-sm mr-12">{{
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
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-row justify-between items-center relative shadow-sm"
        role="alert"
        v-if="type === 'error'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'circle-exclamation']"
          class="mr-3 scale-150 hidden sm:inline-block"
        />
        <span class="block sm:inline text-center text-wrap text-base sm:text-sm mr-12">{{
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
        class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded flex flex-row justify-between items-center relative shadow-sm"
        role="alert"
        v-if="type === 'warning'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'triangle-exclamation']"
          class="mr-3 scale-150 hidden sm:inline-block"
        />
        <span class="block sm:inline text-center text-wrap text-base sm:text-sm mr-12">{{
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
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

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
    }
  },
  data() {
    return {
      show: this.mostrarMensaje
    }
  },
  methods: {
    cerrarMensaje() {
      this.show = !this.show
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  }
}
</script>
