<template>
  <div>
    <UsuariosComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    UsuariosComponent: defineAsyncComponent(
      () => import('@/modules/Usuarios/components/UsuariosComponent.vue')
    )
  }
}
</script>
