<script>
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-bgFrom to-bgTo flex flex-col items-center font-lexend px-3"
  >
    <RouterView />
  </div>
</template>
