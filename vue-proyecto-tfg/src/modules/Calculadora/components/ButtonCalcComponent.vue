<template>
  <router-link
    :to="`/${path.toLowerCase()}`"
    class="flex flex-row sm:items-center sm:justify-center items-center justify-center bg-stone font-bold text-secondary rounded-lg border-secondary hover:ring-2 hover:ring-secondary hover:ring-offset-2 w-5/6 sm:w-full sm:h-96 h-48 text-center text-4xl sm:text-5xl"
  >
    <CustomIconComponent :v-if="icon" :icon="icon" />
    {{ name }}
  </router-link>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    }
  },
  components: {
    CustomIconComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/CustomIconComponent.vue')
    )
  }
}
</script>
