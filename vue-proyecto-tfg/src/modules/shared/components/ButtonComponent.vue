<template>
  <button :class="buttonClasses" :type="type" v-if="text != 'X'">
    {{ text }}
    <FontAwesomeIcon :icon="icon" v-if="icon" class="ml-1" />
  </button>
  <button :class="buttonClasses" :type="type" v-else>
    <CloseIconComponent :customClasses="buttonClasses" />
  </button>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'bg-primary'
    },
    otherClasses: {
      type: String,
      default: 'rounded-lg w-full p-2.5 mt-4'
    },
    type: {
      type: String,
      default: ''
    },
    icon: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  computed: {
    buttonClasses() {
      let classes = `${this.bgColor} `

      if (this.bgColor === 'bg-primary') {
        classes += 'text-secondary hover:bg-secondary hover:text-primary'
      }

      if (this.bgColor === 'bg-secondary') {
        classes +=
          'text-primary hover:bg-primary hover:text-secondary hover:ring-2 hover:ring-secondary'
      }

      if (this.bgColor === 'bg-stoneBackground-2') {
        classes +=
          'text-stoneBackgroundContrast-2 hover:bg-stoneBackgroundContrast-2 hover:text-stoneBackground-2 ring-2 ring-stoneBackgroundContrast-2'
      }

      if (this.bgColor === 'bg-stoneBackground-2 text-stoneBackgroundContrast-4') {
        classes +=
          'hover:bg-stoneBackgroundContrast-4 hover:text-stoneBackground-2 ring-2 ring-stoneBackgroundContrast-4'
      }

      if (this.bgColor === 'bg-stoneBackground-2 text-stoneBackground-3') {
        classes +=
          'hover:bg-stoneBackground-3 hover:text-stoneBackground-2 ring-2 ring-stoneBackground-3'
      }

      classes += ` ${this.otherClasses} ease-in-out transition-all duration-75`
      return classes
    }
  },
  components: {
    CloseIconComponent: defineAsyncComponent(() => import('@/assets/images/CloseIconComponent.vue'))
  }
}
</script>
