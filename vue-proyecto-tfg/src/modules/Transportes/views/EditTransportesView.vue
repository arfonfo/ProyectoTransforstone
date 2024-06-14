<template>
  <div>
    <TransportesComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    TransportesComponent: defineAsyncComponent(
      () => import('@/modules/Transportes/components/TransportesComponent.vue')
    )
  }
}
</script>
