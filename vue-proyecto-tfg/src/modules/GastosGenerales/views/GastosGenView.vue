<template>
  <div>
    <GastosGenComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    GastosGenComponent: defineAsyncComponent(
      () => import('@/modules/GastosGenerales/components/GastosGenComponent.vue')
    )
  }
}
</script>
