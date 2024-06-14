<template>
  <ListadoPartesComponent />
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    ListadoPartesComponent: defineAsyncComponent(() =>
      import('@/modules/ListadoPartes/components/ListadoPartesComponent.vue')
    )
  }
}
</script>

<style></style>
