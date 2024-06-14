<template>
  <div>
    <h2 class="block text-xl font-bold first-letter:uppercase text-shadow text-stoneBackground-3">
      Máquinas usadas en el proceso:
    </h2>
    <div>
      <div
        v-if="maquinasSeleccionadas.length > 0"
        class="mt-2 overflow-hidden p-5 bg-stone rounded-lg bg-opacity-20"
      >
        <div class="flex flex-row flex-wrap justify-start items-center list-none gap-5 pl-2">
          <div
            v-for="(maquina, index) in maquinasSeleccionadas"
            :key="index"
            class="flex flex-2 sm:flex-1 md:flex-auto w-full md:w-auto items-center bg-stoneBackground-2 shadow py-2 px-4 rounded-md text-md font-bold text-stoneBackgroundContrast-1 border border-stone border-opacity-50 overflow-wrap break-word"
          >
            <span>{{ index + 1 + ': ' + maquina.nombre }}</span>
            <ButtonComponent
              type="button"
              text="X"
              bgColor="bg-transparent"
              otherClasses="h-10 w-6 rounded-md text-stoneBackgroundContrast-2 hover:scale-105 justify-self-end ml-auto"
              @click="removeMaquina(maquina.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex flex-row">
      <div class="flex items-center justify-center">
        <div
          v-if="errorMessage"
          class="inline-block text-sm mt-3 bg-primary bg-opacity-20 text-stoneBackgroundContrast-2 text-opacity-80 px-3 py-1 rounded-sm text-center"
        >
          <FontAwesomeIcon
            :icon="['fas', 'triangle-exclamation']"
            class="text-stoneBackgroundContrast-2 scale-125 flex-shrink-0 inline w-3 h-3 me-1"
          />
          {{ errorMessage }}
        </div>
      </div>
      <div class="flex flex-col w-full">
        <div
          @click="toggleOptions"
          class="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary flex justify-between items-center w-full py-2.5 px-4 shadow-sm cursor-pointer select-none"
          :class="
            options.length > 0
              ? ''
              : 'cursor-not-allowed pointer-events-none w-full bg-gray-200 text-gray-700'
          "
          tabindex="0"
          ref="select"
        >
          {{ mappedselected }}
          <FontAwesomeIcon
            v-if="options.length > 0"
            :icon="['fas', 'caret-down']"
            class="text-gray-700 ml-2 w-3 h-3"
            :class="showOptions ? 'rotate-90 transition-all duration-300 ease-in-out' : ''"
          />
        </div>
        <transition name="fade">
          <div
            v-if="showOptions"
            class="bg-white border border-gray-400 w-full mt-3 rounded shadow"
          >
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
      <div class="pl-4 w-1/4" v-if="options.length > 0">
        <ButtonComponent
          type="button"
          :text="'Añadir'"
          bgColor="bg-primary"
          @click="addMaquina"
          :class="options.length > 0 ? '' : 'cursor-not-allowed pointer-events-none'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    message: {
      type: String,
      default: 'Selecciona una opción'
    },
    maquinasSeleccionadas: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showOptions: false,
      selected: null,
      errorMessage: ''
    }
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions
    },
    selectOption(option) {
      this.selected = option
      this.showOptions = false
      this.$emit('input', option)
    },
    handleClickOutside(event) {
      if (!this.$refs.select.contains(event.target)) {
        this.showOptions = false
      }
    },
    handleChange() {
      this.$emit('changeSelect', this.selected)
    },
    addMaquina() {
      if (this.selected) {
        if (!this.maquinasSeleccionadas.some((maquina) => maquina.id === this.selected)) {
          this.$emit('addMaquina', this.selected)
          this.selected = null
          this.errorMessage = ''
        } else {
          this.errorMessage = 'La máquina está seleccionada'
          setTimeout(() => {
            this.errorMessage = ''
          }, 6000)
        }
      } else {
        this.errorMessage = 'No ha seleccionado ninguna máquina'
        setTimeout(() => {
          this.errorMessage = ''
        }, 6000)
      }
    },
    removeMaquina(id) {
      this.$emit('removeMaquina', id)
      this.errorMessage = ''
    }
  },
  watch: {
    value(newValue) {
      this.selected = newValue
    }
  },
  computed: {
    mappedselected() {
      if (this.options.length > 0) {
        return this.selected ? this.selected.nombre : this.message
      }
      if (this.options.length <= 0 && this.maquinasSeleccionadas.length > 0) {
        return 'Todas las máquinas selecionadas'
      }
      return 'No hay máquinas disponibles'
    }
  },
  mounted() {
    window.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
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
