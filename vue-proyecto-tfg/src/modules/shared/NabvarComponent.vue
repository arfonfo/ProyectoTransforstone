<template>
  <header class="py-4 text-stoneBackground-3">
    <nav class="flex flex-col justify-between gap-10 items-center sm:items-end sm:flex-row sm:mx-2">
      <div class="flex items-center gap-3">
        <LogoComponent class="w-10 h-10 text-shadow" />
        <router-link
          to="/"
          class="text-2xl lg:text-5xl md:text-4xl sm:text-4xl font-bold text-shadow"
          >Transforstone App</router-link
        >
      </div>
      <div class="relative inline-block text-left">
        <button
          @click.stop="toggleDropdown"
          class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Bienvenido,&nbsp;&nbsp;<FontAwesomeIcon
            class="text-stoneBackgroundContrast-1 font-bold"
            :icon="['fas', 'circle-user']"
          />&nbsp;&nbsp;<span
            class="first-letter:uppercase font-bold text-stoneBackgroundContrast-1"
            >{{ employeeName }}</span
          >
          <FontAwesomeIcon :icon="['fas', 'caret-down']" class="text-gray-700 ml-2" />
        </button>
        <Transition name="drop">
          <div
            v-show="open"
            class="origin-top-right absolute right-0 w-full mt-3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
            ref="dropdown"
          >
            <div
              class="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <router-link
                to="/logout"
                class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                role="menuitem"
                ><FontAwesomeIcon
                  class="mr-3"
                  :icon="['fas', 'right-from-bracket']"
                />Desconectar</router-link
              >
            </div>
          </div>
        </Transition>
      </div>
    </nav>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      open: false,
      employeeName: null
    }
  },
  created() {
    this.employeeName = this.getEmployeeName || localStorage.getItem('employeeName')
  },

  components: {
    LogoComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/LogoComponent.vue')
    )
  },
  computed: {
    ...mapGetters('Auth', ['getEmployeeName'])
  },
  methods: {
    toggleDropdown() {
      this.open = !this.open
    },
    handleClickOutside(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.open = false
      }
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
/* Estilos de transición para la entrada */
.drop-enter-active {
  transition: all 0.2s ease;
}
.drop-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.drop-enter-to {
  transform: translateY(0);
  opacity: 1;
}

/* Estilos de transición para la salida */
.drop-leave-active {
  transition: all 0.3s ease;
}
.drop-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.drop-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
