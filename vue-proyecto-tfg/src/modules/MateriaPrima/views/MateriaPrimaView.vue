<template>
  <div>
    <MateriaPrimaComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    MateriaPrimaComponent: defineAsyncComponent(
      () => import('@/modules/MateriaPrima/components/MateriaPrimaComponent.vue')
    )
  }
}
</script>
