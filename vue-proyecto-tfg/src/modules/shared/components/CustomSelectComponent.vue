<template>
  <div class="relative">
    <div
      @click="toggleOptions"
      class="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary flex justify-between items-center w-full py-2.5 px-4 shadow-sm cursor-pointer select-none"
      tabindex="0"
      ref="select"
    >
      {{ mappedSelectedOption }}
      <FontAwesomeIcon
        :icon="['fas', 'caret-down']"
        class="text-gray-700 ml-2 w-3 h-3"
        :class="showOptions ? 'rotate-90 transition-all duration-300 ease-in-out' : ''"
      />
    </div>
    <transition name="fade">
      <div v-if="showOptions" class="bg-white border border-gray-400 w-full mt-3 rounded shadow">
        <div
          v-for="option in options"
          @click="selectOption(option)"
          :key="option.id"
          class="px-4 py-4 cursor-pointer hover:bg-bgFrom hover:bg-opacity-50 hover:font-bold transition-all duration-200 ease-in-out"
        >
          {{ option.nombre }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    message: {
      type: String,
      default: 'Selecciona una opción'
    }
  },
  data() {
    return {
      showOptions: false,
      selectedOption: null
    }
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions
    },
    selectOption(option) {
      this.selectedOption = option
      this.showOptions = false
      this.$emit('input', option)
    },
    handleClickOutside(event) {
      if (!this.$refs.select.contains(event.target)) {
        this.showOptions = false
      }
    }
  },
  computed: {
    mappedSelectedOption() {
      return this.selectedOption ? this.selectedOption.nombre : this.message
    }
  },
  mounted() {
    window.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.2s ease;
}
.fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

/* Estilos de transición para la salida */
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
