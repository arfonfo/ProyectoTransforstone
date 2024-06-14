<template>
  <div>
    <MaquinasComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    MaquinasComponent: defineAsyncComponent(
      () => import('@/modules/Maquinas/components/MaquinasComponent.vue')
    )
  }
}
</script>
