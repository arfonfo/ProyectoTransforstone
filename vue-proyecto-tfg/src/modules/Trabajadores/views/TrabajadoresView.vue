<template>
  <div>
    <TrabajadoresComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    TrabajadoresComponent: defineAsyncComponent(
      () => import('@/modules/Trabajadores/components/TrabajadoresComponent.vue')
    )
  }
}
</script>
