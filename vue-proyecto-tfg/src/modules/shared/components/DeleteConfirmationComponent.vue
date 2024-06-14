<template>
  <div class="grid grid-cols-1 pt-5 p-7 rounded gap-10">
    <div v-if="listItems.length === 0" class="text-gray-500 w-full">
      <p>No hay {{ itemType }} para eliminar</p>
    </div>
    <div v-else-if="itemType === 'parte cortabloques'"
      class="sm:w-90 mx-auto flex flex-col items-end sm:mb-2 relative"
      role="alert"
    >
      <FontAwesomeIcon
          :icon="['far', 'circle-question']"
          class="sm:mr-3 pr-6 text-5xl sm:text-7xl sm:inline-block text-stoneBackgroundContrast-2 absolute sm:left-2 left-0 -top-1 sm:top-6 sm:-mt-9 sm:-ml-0"
        />
        <div
          class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3 p-4 sm:w-5/6 text-center"
        >
          <span class="sr-only">Info</span>
          <div class="font-regular text-lg">
            <p class="ml-8 sm:ml-0">¿Desea eliminar el siguiente {{ itemType }}?</p>
            <ul 
              class="min-w-full sm:px-8 max-w-md divide-y divide-stoneBackground-1 divide-opacity-50 pt-4 text-stoneBackgroundContrast-1"
            >
              <li class="pb-2 pt-2 sm:pt-3 sm:pb-3 flex flex-row justify-between">
                <p class="font-light">Trabajador:</p> 
                <p>{{ items[0].employeeName }} ({{ items[0].employeeNumber }})</p>
              </li>
              <li class="pb-2 pt-2 sm:pt-3 sm:pb-3 flex flex-row justify-between">
                <p class="font-light">Fecha de inicio:</p> 
                <p>{{ formatDate(items[0].fechaInicioActual) }}</p>
              </li>
              <li class="pt-2 sm:pt-3 flex flex-row justify-between">
                <p class="font-light">Fecha de fin:</p> 
                <p>{{ formatDate(items[0].fechaFinActual) }}</p>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div
      v-else-if="listItems.length === total && listItems.length !== 1"
      class="sm:w-90 mx-auto flex flex-col items-end mb-2 relative"
      role="alert"
    >
      <FontAwesomeIcon
        :icon="['far', 'circle-question']"
        class="sm:mr-3 text-6xl sm:text-8xl sm:inline-block text-stoneBackgroundContrast-2 absolute left-2 -top-1 sm:top-3 sm:left-10 sm:-mt-9 sm:-ml-0"
      />
      <div
        class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3 p-4 sm:w-3/4 w-5/6 text-center"
      >
        <span class="sr-only">Info</span>
        <div>
          <span class="font-regular text-lg"
            >¿Desea {{ itemType === 'usuarios' ? 'desactivar' : 'eliminar' }} todos los registros de {{ itemType }}?
          </span>
        </div>
      </div>
      <div v-if="hasMaquinaCoste" class="w-full p-4 mt-12 rounded-md bg-red-200 bg-opacity-30 text-center">
        <div class="flex">
          <div class="flex-shrink-0">
            <FontAwesomeIcon
              :icon="['fas', 'exclamation-circle']"
              class="h-7 w-7 text-red-400"
            />
          </div>
          <div class="ml-2">
            <h3 class="font-semibold text-xl text-red-500">Advertencia:</h3>
            <div class="mt-2 text-md leading-5 text-stoneBackgroundContrast-2">
              <p v-if="itemType === 'usuarios'">
                Algunos usuarios tienen un coste y/o máquina asociados
              </p>
              <p v-else-if="itemType === 'máquinas'">
                Algunas máquinas tienen consumibles/gastos energéticos/trabajadores asociados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full sm:w-90 mx-auto items-center" role="alert">
      <div class="flex flex-col items-center pb-11">
        <div class="flex flex-row">
          <FontAwesomeIcon
            :icon="['fas', 'triangle-exclamation']"
            class="mr-3 text-2xl hidden sm:inline-block text-stoneBackground-3"
          />
          <div class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3">
            <span class="sr-only">Info</span>
            <div>
              <span class="font-regular text-md"
                >Va a {{ itemType === 'usuarios' ? 'desactivar' : 'eliminar' }} los siguientes registros de {{ itemType }}:</span
              >
            </div>
          </div>
        </div>
        <div v-if="hasMaquinaCoste" class="w-full p-4 mt-12 rounded-md bg-red-200 bg-opacity-20 text-center">
          <div class="flex">
            <div class="flex-shrink-0">
              <FontAwesomeIcon
                :icon="['fas', 'exclamation-circle']"
                class="h-7 w-7 text-red-400"
              />
            </div>
            <div class="m-auto">
              <span v-if="listItems.length === 1">
                <h3 class="font-semibold text-xl text-red-500">Advertencia:</h3>
                <div class="mt-2 text-md leading-5 text-stoneBackgroundContrast-2">
                  <p v-if="itemType === 'usuarios'">
                    El usuario tiene un coste y/o máquina asociados
                  </p>
                  <p v-else-if="itemType === 'máquinas'">
                    La máquina tiene consumibles/gastos energéticos/trabajadores asociados
                  </p>
                </div>
              </span>
              <span v-else>
                <h3 class="font-semibold text-xl text-red-500">Advertencia:</h3>
                <div class="mt-2 text-md leading-5 text-stoneBackgroundContrast-2">
                  <p v-if="itemType === 'usuarios'">
                    Los usuarios <span class="font-extrabold text-lg text-stoneBackgroundContrast-6 ">RESALTADOS</span> tienen un coste y/o máquina asociados
                  </p>
                  <p v-else-if="itemType === 'máquinas'">
                    Las máquinas <span class="font-semibold text-lg text-stoneBackgroundContrast-6" >RESALTADAS</span> tienen consumibles/gastos energéticos/trabajadores asociados
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="max-h-[18rem] sm:max-h-72 xl:max-h-80 overflow-hidden overflow-y-scroll py-2"
      >
        <ul class="w-full gap-2 flex justify-between flex-wrap list-none pl-0">
          <li
            v-for="item in listItems"
            :key="item.id"
            class="flex justify-between items-center w-full px-6 rounded-md text-md font-semibold text-stoneBackgroundContrast-1
            bg-stoneBackground-4
            min-h-16"
            :class="{
              'border-2 border-stoneBackgroundContrast-6': item.hasMaquinaCoste,
            }"
          >
            <div>
              <div class="flex items-center">
                <template v-for="(el, index) in item">
                  <span :key="`${el}-del`" class="text-wrap" v-if="index == 'nombre'">{{
                    el
                  }}&nbsp;</span>
                  <span
                    :key="`${el}-del`"
                    class="text-wrap"
                    v-if="index == 'apellido1'"
                    v-html="`&nbsp;${el}`"
                  ></span>
                  <span :key="`${el}-del`" class="text-wrap" v-if="index == 'email'">{{ el }}</span>
                  <span :key="`${el}-del`" class="text-wrap" v-if="index == 'nombre_completo'">{{ el }}</span>
                  <span :key="`${el}-del`" class="text-wrap" v-if="index == 'id_maquina'"> - {{ getNombreMaquina(el) }}</span>
                </template>
                <div class="tooltip ml-4 flex flex-row items-center"
                  v-if="item.hasMaquinaCoste && itemType === 'máquinas'"
                >
                  <FontAwesomeIcon :icon="['fas', 'exclamation-circle']" 
                    class="cursor-pointer h-6 w-6 text-stoneBackgroundContrast-2 text-opacity-85"
                    @click="(item.hasMaquinaCoste && itemType === 'máquinas') ? openModalInfo(item) : null"
                  />
                  <span class="tooltiptext text-xs p-2 text-wrap">
                    Información de {{ item.nombre }}
                  </span>
                </div>
              </div>
            </div>
            <ButtonComponent
              type="button"
              text="X"
              bgColor="bg-transparent"
              otherClasses="h-6 w-6 rounded-md text-stoneBackgroundContrast-2 hover:scale-105 ml-2"
              @click.stop="deselectItem(item.id)"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="sm:w-90 sm:mx-auto flex sm:flex-row flex-col items-center sm:justify-between sm:gap-9">
      <ButtonComponent
        :icon="['fas', 'floppy-disk']"
        :hidden="listItems.length === 0"
        text="Confirmar"
        @click="confirmDelete"
        bgColor="bg-primary"
        otherClasses="flex justify-center items-center gap-5 text-lg rounded-lg w-full py-4 mt-4 hover:ring-2 hover:ring-primary hover:bg-opacity-80"
      />
      <ButtonComponent
        :icon="['fas', 'circle-xmark']"
        text="Cancelar"
        @click="toggleModal"
        bgColor="bg-secondary"
        otherClasses="flex justify-center items-center gap-5 text-lg rounded-lg w-full py-4 mt-4 hover:ring-2 hover:bg-opacity-80"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    itemType: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      listItems: [],
      hasMaquinaCoste: false,
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas']),
    ...mapGetters('Trabajadores', ['getTrabajadores']),
    ...mapGetters('Consumible', ['getConsumibles']),
    ...mapGetters('GastosEnergeticos', ['getGastos']),
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('es-ES', options);
    },
    openModalInfo(item){
      this.$emit('openModalInfo', item.id, true)
    },
    getNombreMaquina(id){
      const maquinas = this.getMaquinas
      const maquina = maquinas.find(maquina => maquina.id === id)
      return maquina.nombre
    },
    checkTrabajadores(){
      const trabajadores = this.getTrabajadores
      const newListItems = this.listItems.map(item => {
        const trabajador = trabajadores.find(trabajador => trabajador.numero_trabajador === item.numero_trabajador)
        return {
          ...item,
          hasMaquinaCoste: trabajador ? true : false
        }
      })
      this.listItems = newListItems
      return newListItems.some(item => item.hasMaquinaCoste)
    },
    checkRelMaquinas(){
      const consumibles = this.getConsumibles
      const gastos = this.getGastos
      const trabajadores = this.getTrabajadores
      const newListItems = this.listItems.map(item => {
        const consumible = consumibles.find(consumible => consumible.id_maquina === item.id)
        const gasto = gastos.find(gasto => gasto.id_maquina === item.id)
        const trabajador = trabajadores.find(trabajador => trabajador.id_maquina === item.id)
        return {
          ...item,
          hasMaquinaCoste: consumible || gasto || trabajador ? true : false
        }
      })
      this.listItems = newListItems
      return newListItems.some(item => item.hasMaquinaCoste)
    },
    confirmDelete() {
      this.$emit('delete', this.listItems)
    },
    toggleModal() {
      this.$emit('close')
    },
    openLoader() {
      return this.listItems.length === this.total
    },
    deselectItem(id) {
      this.listItems = this.listItems.filter((item) => item.id !== id)
      if(!this.listItems.some(item => item.hasMaquinaCoste))
        this.hasMaquinaCoste = false
      this.$emit('deselectItem', id)
    }
  },
  mounted() {
    if(this.itemType === 'usuarios' || this.itemType === 'máquinas') {
      this.hasMaquinaCoste = this.checkTrabajadores() || this.checkRelMaquinas()
    }
  },
  watch: {
    items: {
      handler: function (newVal) {
        this.listItems = newVal
      },
      immediate: true
    }
  }
}
</script>



<style scoped>
.tooltip {
  position: relative;
  display: flex;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 220px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  left: 100%; /* Position the tooltip to the right of the icon */
  bottom: 50%; /* Adjust this value as needed */
  margin-left: 10px; /* Add some space between the icon and the tooltip */
  opacity: 0.5;
  transition: opacity 0.3s;
  transform: translateY(50%);
}


/* Responsive styles */
@media (max-width: 600px) {
  .tooltip .tooltiptext {
    font-size: 10px;
    width: 180px;
    left: 50%; /* Center the tooltip */
    bottom: -100%; /* Position the tooltip below the icon */
    transform: translateX(-50%); /* Adjust the tooltip's position */
    margin-left: 0; /* Remove the space between the icon and the tooltip */
    text-align: center; /* Center the text */
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .tooltip .tooltiptext {
    font-size: 12px;
    width: 200px;
  }
}

@media (min-width: 1025px) {
  .tooltip .tooltiptext {
    font-size: 13px;
    font-weight: normal;
    width: 220px;
  }
}


.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
