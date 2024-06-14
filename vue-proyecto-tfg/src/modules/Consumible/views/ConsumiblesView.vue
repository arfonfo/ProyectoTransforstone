<template>
  <div>
    <ConsumiblesComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ConsumiblesComponent: defineAsyncComponent(
      () => import('@/modules/Consumible/components/ConsumiblesComponent.vue')
    )
  }
}
</script>
