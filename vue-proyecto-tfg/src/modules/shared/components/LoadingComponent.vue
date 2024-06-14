<template>
  <div v-if="loading">
    <div
      v-if="fullScreen"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full backdrop-blur-md bg-bgFrom/30"
    >
      <Transition name="loader">
        <PulseLoader
          :size="size"
          :color="color"
          :loading="loading"
          :margin="margin"
          :radius="radius"
        />
      </Transition>
    </div>
    <div v-else>
      <Transition name="loader">
        <PulseLoader
          :size="size"
          :color="color"
          :loading="loading"
          :margin="margin"
          :radius="radius"
        />
      </Transition>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#59544F'
    },
    size: {
      type: String,
      default: '15px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  components: {
    PulseLoader
  }
}
</script>

<style>
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.5s;
}
.loader-enter,
.loader-leave-to {
  opacity: 0;
}
</style>
