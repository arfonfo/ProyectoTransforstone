<template>
  <component v-if="icon" :is="dynamicComponent" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dynamicComponent: null
    }
  },
  async created() {
    if (this.icon) {
      const module = await import(`@/modules/shared/icons/${this.icon}.vue`)
      //const module = await import(`@/modules/shared/components/icons/${this.icon}.vue`)
      this.dynamicComponent = module.default
    }
  }
}
</script>
