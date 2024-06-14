<template>
  <div
    class="flex flex-col justify-center gap-6 p-6 bg-stoneBackground-2 bg-opacity-50 border border-stone border-opacity-50 rounded-lg shadow-md"
  >
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
      <h1 class="text-3xl font-bold text-stoneBackground-3">
        Resumen de gasto:
        <span
          >{{
            $route.path.split('/').pop().charAt(0).toUpperCase() +
            $route.path.split('/').pop().slice(1)
          }}
          ({{ terminacion.charAt(0).toUpperCase() + this.terminacion.slice(1)
          }}{{ embalado > 0 ? ', Embalado' : ', No embalado' }})</span
        >
      </h1>
      <span
        class="inline-flex items-center justify-end border border-transparent text-md font-bold rounded-md text-stoneBackgroundContrast-1 transition-all duration-150 ease-linear text-bold cursor-pointer hover:text-shadow hover:scale-105"
        @click="exportToPDF()"
      >
        <FontAwesomeIcon :icon="['fas', 'file-pdf']" class="mr-1" />Exportar a PDF
      </span>
    </div>
    <div class="flex flex-row gap-7 flex-wrap justify-center">
      <ul
        v-for="(maquina, index) in maquinas"
        :key="maquina.id"
        class="bg-white border border-stoneBackgroundContrast-1 text-stoneBackgroundContrast-3 px-10 py-6 rounded-lg shadow"
      >
        <!--RECORRER LAS MAQUINAS-->
        <li
          class="font-bold text-2xl mb-2 text-stoneBackgroundContrast-1 text-center flex items-center gap-3"
        >
          {{ index + 1 }}. {{ maquina.nombre }}
          <span class="text-sm">( {{ maquina.produccion_m2 }}m² producidos )</span>
        </li>
        <li class="flex flex-col gap-1">
          <h1 class="font-semibold text-md mt-3 mb-1 text-stoneBackgroundContrast-3">
            <FontAwesomeIcon :icon="['fas', 'fa-droplet']" class="mr-2" /> Consumibles:
          </h1>
          <div v-if="getConsumiblesMaquina(maquina.id).length">
            <ul
              v-for="consumible in getConsumiblesMaquina(maquina.id)"
              :key="consumible.id"
              class="ml-5"
            >
              <li>> {{ consumible.nombre }} - {{ consumible.precio }}€</li>
            </ul>
          </div>
          <p v-else class="text-gray-400">No conlleva gasto</p>

          <h1 class="font-semibold text-md mt-3 mb-1 text-stoneBackgroundContrast-3">
            <FontAwesomeIcon :icon="['fas', 'fa-bolt']" class="mr-2" />Gastos energéticos:
          </h1>
          <div v-if="getGastosEnergeticos(maquina.id).length">
            <ul
              v-for="gastoEnergetico in getGastosEnergeticos(maquina.id)"
              :key="gastoEnergetico.id"
              class="ml-5"
            >
              <li>> {{ gastoEnergetico.nombre }} - {{ gastoEnergetico.coste_energia }}€</li>
            </ul>
          </div>
          <p v-else class="text-gray-400">No conlleva gasto</p>

          <h1 class="font-semibold text-md mt-3 mb-1 text-stoneBackgroundContrast-3">
            <FontAwesomeIcon :icon="['fas', 'fa-person-digging']" class="mr-2" />Trabajadores:
          </h1>
          <div v-if="getTrabajadores(maquina.id).length">
            <ul v-for="trabajador in getTrabajadores(maquina.id)" :key="trabajador.id" class="ml-5">
              <li>> {{ trabajador.nombre_completo }} - {{ trabajador.precio }}€</li>
            </ul>
          </div>
          <p v-else class="text-gray-400">No conlleva gasto</p>
        </li>
      </ul>
    </div>
    <div class="flex flex-col bg-stoneBackground-1 bg-opacity-10 p-4 rounded-lg">
      <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
        <h3 class="text-center text-2xl mb-2 font-bold text-stoneBackground-3">
          <span class="text-secondary font-semibold text-lg mr-2"
            >Gastos generales
            <div class="tooltip">
              <FontAwesomeIcon :icon="['fas', 'exclamation-circle']" class="text-warning" />
              <span class="tooltiptext text-xs p-2"
                >" Este valor representa la parte proporcional del total de los gastos, dividido
                entre el número de máquinas y será utilizado para calcular el coste de fabricación.
                "</span
              >
            </div>
            :
          </span>

          {{ gastoGeneral.toFixed(2) / maquinas.length }}€
        </h3>
        <h3 class="text-center text-2xl mb-2 font-bold text-stoneBackground-3">
          <span class="text-secondary font-semibold text-lg mr-2">Coste materia prima: </span
          >{{ costeMaterial.toFixed(2) }}€
        </h3>
        <h3 class="text-center text-xl font-bold text-stoneBackground-3">
          <span class="text-secondary font-semibold text-lg mr-2">Coste desperdicio: </span
          >{{ costeDesperdicio.toFixed(2) }}€
        </h3>
      </div>
      <h1 class="text-center text-4xl font-bold text-stoneBackgroundContrast-2 mt-4">
        <span class="font-semibold text-2xl mr-2 text-stoneBackground-3"
          >Coste de fabricación: </span
        >{{ precio.toFixed(2) }}€<span class="text-stoneBackground-3 text-lg"> /pieza.</span>
      </h1>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
/**
 * Component for displaying a summary of calculations.
 */
export default {
  props: {
    /**
     * The price value.
     */
    precio: {
      type: Number,
      required: true
    },
    /**
     * The array of machines.
     */
    maquinas: {
      type: Array,
      required: true
    },
    /**
     * The array of consumables.
     */
    consumibles: {
      type: Array,
      required: true
    },
    /**
     * The array of energy costs.
     */
    gastosEnergeticos: {
      type: Array,
      required: true
    },
    /**
     * The array of workers.
     */
    trabajadores: {
      type: Array,
      required: true
    },
    /**
     * The general expense value.
     */
    gastoGeneral: {
      type: Number,
      required: true
    },
    /**
     * The material cost value.
     */
    costeMaterial: {
      type: Number,
      required: true
    },
    /**
     * The waste cost value.
     */
    costeDesperdicio: {
      type: Number,
      required: true
    },
    /**
     * The termination type.
     */
    terminacion: {
      type: String,
      default: 'solo cortado'
    },
    /**
     * The packaging cost value.
     */
    embalado: {
      type: Number,
      default: 0
    }
  },
  methods: {
    exportToPDF() {
      const doc = new jsPDF()
      const columns = [
        'Nombre',
        'Producción m²',
        'Consumibles',
        'Gastos energéticos',
        'Trabajadores'
      ]
      const data = this.maquinas.flatMap((maquina) => [
        [
          maquina.nombre,
          maquina.produccion_m2,
          this.getConsumiblesMaquina(maquina.id)
            .map((consumible) => `${consumible.nombre} - ${consumible.precio}€`)
            .join('\n'),
          this.getGastosEnergeticos(maquina.id)
            .map((gasto) => `${gasto.nombre} - ${gasto.coste_energia}€`)
            .join(', '),
          this.getTrabajadores(maquina.id)
            .map((trabajador) => `${trabajador.nombre_completo} - ${trabajador.precio}€`)
            .join('\n')
        ]
      ])

      autoTable(doc, { columns, body: data })

      const additionalRows = [
        ['Gastos generales', this.gastoGeneral.toFixed(2) / this.maquinas.length + '€'],
        ['Precio de materia prima', this.costeMaterial.toFixed(2) + '€'],
        ['Desperdicio', this.costeDesperdicio.toFixed(2) + '%'],
        ['Coste de fabricación: ', this.precio.toFixed(2) + '€']
      ]

      autoTable(doc, {
        columns: ['Concepto', 'Valor'],
        body: additionalRows,
        startY: doc.autoTable.previous.finalY + 10
      })

      doc.save('Resumen.pdf')
    },
    /**
     * Get the consumables for a specific machine.
     * @param {number} maquina - The machine ID.
     * @returns {Array} - The array of consumables for the machine.
     */
    getConsumiblesMaquina(maquina) {
      return this.consumibles.filter((consumible) => consumible.id_maquina === maquina)
    },
    /**
     * Get the energy costs for a specific machine.
     * @param {number} maquina - The machine ID.
     * @returns {Array} - The array of energy costs for the machine.
     */
    getGastosEnergeticos(maquina) {
      return this.gastosEnergeticos.filter((gasto) => gasto.id_maquina === maquina)
    },
    /**
     * Get the workers for a specific machine.
     * @param {number} maquina - The machine ID.
     * @returns {Array} - The array of workers for the machine.
     */
    getTrabajadores(maquina) {
      return this.trabajadores.filter((trabajador) => trabajador.id_maquina === maquina)
    }
  }
}
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 420px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the icon */
  left: 50%;
  margin-left: -210px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
