<template>
  <div class="relative">
    <label
      :for="label"
      class=""
      :class="otherClasses !== '' ? otherClasses : 'block text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3'"
    >
      {{ label }}
    </label>
    <div
      @click="toggleOptions"
      class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary flex justify-between items-center w-full py-2.5 px-4 shadow-sm cursor-pointer select-none"
      tabindex="0"
      ref="select"
    >
      {{ mappedSelectedOption }}
      <FontAwesomeIcon
        :icon="['fas', 'caret-down']"
        class="text-gray-700 ml-2 w-3 h-3"
        :class="showOptions ? 'rotate-90 transition-all duration-200 ease-in-out' : ''"
      />
    </div>
    <transition name="fade">
      <div
        v-if="showOptions && allOptions.length > 0"
        class="bg-white border border-gray-400 w-full mt-3 rounded shadow"
        :class="{ 'max-h-64 overflow-auto': allOptions.length > 7 }"
      >
        <div
          v-for="option in allOptions"
          @click="selectOption(option)"
          :key="option.id"
          class="px-4 py-4 cursor-pointer hover:bg-bgFrom hover:bg-opacity-50 hover:font-bold transition-all duration-200 ease-in-out"
        >
          {{ option.nombre }}
        </div>
      </div>
      <div
        v-else-if="showOptions"
        class="bg-white border border-gray-400 w-full mt-3 rounded shadow px-4 py-4"
      >
        No hay {{ label.toLowerCase() }} para mostrar
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    placeholder: {
      type: String,
      default: 'Seleccione una opción'
    },
    otherClasses: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showOptions: false,
      selectedOption: this.isEditing ? this.value : 'placeholder'
    }
  },
  computed: {
    allOptions() {
      if (this.label === 'Máquina') {
        return [{ id: null, nombre: 'Sin máquina asociada' }, ...this.options]
      } else {
        return this.options
      }
    },
    mappedSelectedOption() {
      if (this.selectedOption === 'placeholder') {
        return this.placeholder
      }
      const foundOption = this.allOptions.find(
        (option) => option.id === this.selectedOption
      )
      return foundOption ? foundOption.nombre : 'Sin máquina asociada'
    }
  },
  mounted() {
    window.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions
    },
    selectOption(option) {
      this.selectedOption = option.id
      this.showOptions = false
      this.$emit('changeSelect', option.id)
    },
    handleClickOutside(event) {
      if (!this.$refs.select.contains(event.target)) {
        this.showOptions = false
      }
    }
  },
  watch: {
    value(newValue) {
    }
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
