<template>
  <ControlHorarioComponent />
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    ControlHorarioComponent: defineAsyncComponent(
      () => import('@/modules/ControlesHorarios/components/ControlHorarioComponent.vue')
    )
  }
}
</script>

<style></style>
