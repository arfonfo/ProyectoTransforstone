<template>
  <div class="w-full mx-auto">
    <div class="rounded-md shadow-md my-6 mx-4">
      <!-- Consumibles -->
      <div
        class="rounded-t-md border-b border-stoneBackground-5 bg-stoneBackground-1 bg-opacity-20"
        :class="{ 'border-opacity-30': !isOpenConsumibles, 'border-opacity-15': isOpenConsumibles }"
      >
        <button
          @click="toggleConsumibles"
          class="rounded-t-md flex items-center justify-between w-full px-5 py-3 text-xl text-stoneBackground-3 bg-stoneBackground-1 bg-opacity-10 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4"
          :class="{ 'border-b border-stoneBackground-5 border-opacity-10': isOpenConsumibles }"
        >
          <span class="font-semibold"
            ><FontAwesomeIcon :icon="['fas', 'fa-droplet']" class="mr-2" />Consumibles</span
          >
          <div class="icon mr-2" :class="{ open: isOpenConsumibles }">
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </button>
        <transition name="fade">
          <div v-if="isOpenConsumibles" class="p-3 flex justify-center">
            <ul
              v-if="consumiblesMaquina.length > 0"
              class="min-w-full sm:px-24 max-w-md divide-y divide-stoneBackground-1 divide-opacity-50"
            >
              <li
                v-for="consumible in consumiblesMaquina"
                :key="consumible.id"
                class="pb-2 pt-2 sm:pt-3 sm:pb-3"
              >
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                      {{ consumible.nombre }}
                    </p>
                  </div>
                  <div
                    class="inline-flex items-center text-lg font-semibold text-stoneBackgroundContrast-1"
                  >
                    {{ consumible.precio }}€
                  </div>
                </div>
              </li>
            </ul>
            <p v-else class="text-stoneBackgroundContrast-3 font-semibold text-lg">
              Sin consumibles asociados
            </p>
          </div>
        </transition>
      </div>

      <!-- Trabajadores -->
      <div
        class="bg-stoneBackground-1 bg-opacity-20 border-b border-stoneBackground-5"
        :class="{
          'border-opacity-30': !isOpenTrabajadores,
          'border-opacity-15': isOpenTrabajadores
        }"
      >
        <button
          @click="toggleTrabajadores"
          class="flex items-center justify-between w-full px-5 py-3 text-xl text-stoneBackground-3 bg-stoneBackground-1 bg-opacity-10 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4"
          :class="{ 'border-b border-stoneBackground-5 border-opacity-10': isOpenTrabajadores }"
        >
          <span class="font-semibold"
            ><FontAwesomeIcon :icon="['fas', 'fa-person-digging']" class="mr-2" />Trabajadores</span
          >
          <div class="icon mr-2" :class="{ open: isOpenTrabajadores }">
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </button>
        <transition name="fade">
          <div v-if="isOpenTrabajadores" class="p-3 flex justify-center">
            <ul
              v-if="trabajadoresMaquina.length > 0"
              class="min-w-full sm:px-24 max-w-md divide-y divide-stoneBackground-1 divide-opacity-50"
            >
              <li
                v-for="trabajador in trabajadoresMaquina"
                :key="trabajador.id"
                class="pb-2 pt-2 sm:pt-3 sm:pb-3"
              >
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                      {{ trabajador.numero_trabajador }} - {{ trabajador.nombre_completo }}
                    </p>
                  </div>
                  <div
                    class="inline-flex items-center text-lg font-semibold text-stoneBackgroundContrast-1"
                  >
                    {{ trabajador.precio }}€
                  </div>
                </div>
              </li>
            </ul>
            <p v-else class="text-stoneBackgroundContrast-3 font-semibold text-lg">
              Sin trabajadores asociados
            </p>
          </div>
        </transition>
      </div>
      <!-- Gastos -->
      <div class="rounded-b-md bg-stoneBackground-1 bg-opacity-20">
        <button
          @click="toggleGastos"
          class="flex items-center justify-between w-full px-5 py-3 text-xl text-stoneBackground-3 bg-stoneBackground-1 bg-opacity-10 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4"
          :class="{
            'border-b border-stoneBackground-5 border-opacity-10': isOpenGastos,
            'rounded-b-md': !isOpenGastos
          }"
        >
          <span class="font-semibold"
            ><FontAwesomeIcon :icon="['fas', 'fa-bolt']" class="mr-2" />Gastos energéticos</span
          >
          <div class="icon mr-2" :class="{ open: isOpenGastos }">
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </button>
        <transition name="fade">
          <div v-if="isOpenGastos" class="p-3 flex justify-center">
            <ul
              v-if="gastosMaquina.length > 0"
              class="min-w-full sm:px-24 max-w-md divide-y divide-stoneBackground-1 divide-opacity-50"
            >
              <li v-for="gasto in gastosMaquina" :key="gasto.id" class="pb-2 pt-2 sm:pt-3 sm:pb-3">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                      {{ gasto.nombre }}
                    </p>
                  </div>
                  <div
                    class="inline-flex items-center text-lg font-semibold text-stoneBackgroundContrast-1"
                  >
                    {{ gasto.coste_energia }}€
                  </div>
                </div>
              </li>
            </ul>
            <p v-else class="text-stoneBackgroundContrast-3 font-semibold text-lg">
              Sin gastos energéticos asociados
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpenConsumibles: false,
      isOpenTrabajadores: false,
      isOpenGastos: false,
      consumiblesMaquina: [],
      trabajadoresMaquina: [],
      gastosMaquina: []
    }
  },
  computed: {
    ...mapGetters('Consumible', ['getConsumibles']),
    ...mapGetters('Trabajadores', ['getTrabajadores']),
    ...mapGetters('GastosEnergeticos', ['getGastos'])
  },
  methods: {
    toggleConsumibles() {
      this.isOpenConsumibles = !this.isOpenConsumibles
    },
    toggleTrabajadores() {
      this.isOpenTrabajadores = !this.isOpenTrabajadores
    },
    toggleGastos() {
      this.isOpenGastos = !this.isOpenGastos
    },
    async obtenerConsumibles() {
      const response = await this.getConsumibles
      this.consumiblesMaquina = response.filter(
        (consumible) => consumible.id_maquina === this.data.id
      )
      if(this.consumiblesMaquina.length > 0){
        this.isOpenConsumibles = true
      }
    },
    async obtenerTrabajadores() {
      const response = await this.getTrabajadores
      this.trabajadoresMaquina = response.filter(
        (trabajador) => trabajador.id_maquina === this.data.id
      )
      if(this.trabajadoresMaquina.length > 0){
        this.isOpenTrabajadores = true
      }
    },
    async obtenerGastos() {
      const response = await this.getGastos
      this.gastosMaquina = response.filter((gasto) => gasto.id_maquina === this.data.id)
      if(this.gastosMaquina.length > 0){
        this.isOpenGastos = true
      }
    }
  },
  mounted() {
    this.obtenerConsumibles()
    this.obtenerTrabajadores()
    this.obtenerGastos()
  }
}
</script>

<style scoped>
/* Transicion cuando aparece y desaparece el modal */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s 0.1s,
    transform 0.3s,
    max-height 0.3s,
    padding 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
  max-height: 0;
  padding: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
  max-height: 1000px; /* Ajusta este valor según tus necesidades */
  padding: 1.25rem; /* Este es el valor de p-5 en Tailwind CSS */
}
/* Rotar el icono */
.icon {
  width: 16px;
  height: 16px;
  position: relative;
}

.bar {
  position: absolute;
  width: 100%;
  height: 2.5px;
  background: currentColor;
  transition: all 0.3s ease-in-out;
  border-radius: 2px;
}

.icon .bar:first-child {
  top: 50%;
  transform: translateY(-50%);
}

.icon.open .bar:first-child {
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
}

.icon .bar:last-child {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}

.icon.open .bar:last-child {
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
}
</style>
