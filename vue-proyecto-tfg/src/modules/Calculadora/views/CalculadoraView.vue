<template>
  <div class="flex flex-col gap-5">
    <div
      v-if="$route.path === '/calculadora'"
      class="flex flex-col sm:grid sm:grid-cols-2 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonCalcComponent name="Tabla" path="calculadora/tabla" />
      <ButtonCalcComponent name="Losa" path="calculadora/losa" />
    </div>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    RouterView,
    ButtonCalcComponent: defineAsyncComponent(() => import('../components/ButtonCalcComponent.vue'))
  }
}
</script>
