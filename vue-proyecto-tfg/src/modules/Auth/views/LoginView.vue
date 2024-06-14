<template>
  <div class="flex flex-col items-center gap-28">
    <LogoComponent class="w-36 h-36" />
    <LoginComponent :title="title" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  data() {
    return {
      title: 'Inicio de sesión'
    }
  },
  components: {
    LogoComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/LogoComponent.vue')
    ),
    LoginComponent: defineAsyncComponent(
      () => import('@/modules/Auth/components/LoginComponent.vue')
    )
  }
}
</script>
