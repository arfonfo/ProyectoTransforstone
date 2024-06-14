<template>
  <div>
    <GastosComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    GastosComponent: defineAsyncComponent(
      () => import('@/modules/GastosEnergeticos/components/GastosComponent.vue')
    )
  }
}
</script>
