<template>
  <div class="flex justify-center items-center min-h-screen">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  }
}
</script>
