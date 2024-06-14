<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col gap-5 w-full">
      <h1 class="text-4xl text-center text-stoneBackground-3 font-bold">Listado de partes</h1>
      <MensajesComponent
        v-if="!editMode && getTipo !== 'warning'"
        :textClasses="'text-lg'"
        :message="getMensaje"
        :type="getTipo"
        :mostrarMensaje="getMostrar"
        :iconClasses="'scale-150'"  
      />
      <div>
        <div class="flex justify-center items-center">
          <div class="flex flex-col lg:flex-row py-5 gap-3 w-full lg:justify-center items-center">
            <div
              class="flex flex-col sm:flex-row gap-2 justify-between lg:justify-start items-center w-full"
            >
              <div
                class="flex flex-col sm:flex-row gap-5 justify-between lg:justify-start items-center w-full"
              >
                <label
                  for="fechaInicio"
                  class="text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
                  >Fecha inicio</label
                >
                <input
                  type="date"
                  class="rounded-lg p-2.5 shadow w-full sm:w-1/2"
                  v-model="fechaInicio"
                />
              </div>
              <div
                class="flex flex-col sm:flex-row gap-5 justify-between lg:justify-start items-center w-full"
              >
                <label
                  for="fechaFin"
                  class="text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
                  >Fecha fin</label
                >
                <input
                  type="date"
                  class="rounded-lg p-2.5 shadow w-full sm:w-1/2"
                  v-model="fechaFin"
                />
              </div>
            </div>
            <div
              class="flex flex-col lg:flex-row items-center justify-between gap-2 w-full lg:w-auto"
            >
              <ButtonComponent
                text="Mostrar partes"
                bgColor="bg-secondary"
                otherClasses="rounded-lg p-2.5 mt-0 shadow w-full"
                @click="changeFilter"
                :icon="['fas', 'fa-clipboard-list']"
              />
              <ButtonComponent
                v-if="beforeFilter"
                text="Cambiar vista"
                bgColor="bg-secondary"
                otherClasses="rounded-lg p-2.5 mt-0 shadow w-full"
                @click="toggleView"
                :icon="['fas', 'fa-exchange-alt']"
              />
            </div>
          </div>
        </div>
      </div>
      <template v-if="beforeFilter">
        <div class="flex justify-start items-center gap-5">
          <div v-if="cards.length === 0" class="flex justify-center items-center gap-5">
            <div class="flex flex-col gap-5">
              <!--Si no se encuentran resultados....-->
              <h2 class="text-2xl text-center text-stoneBackground-3 font-bold">
                No se han encontrado resultados
              </h2>
            </div>
          </div>
          <div v-else class="w-full flex flex-col">
            <div class="flex flex-col items-start mb-3">
              <span
                class="w-auto inline-flex items-center justify-start m-2 border border-transparent text-lg font-bold rounded-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-4 text-bold flex-shrink-0 cursor-pointer hover:text-shadow hover:scale-105 transition-transform duration-150 ease-in-out"
                @click="exportToPDF()"
              >
                <FontAwesomeIcon :icon="['fas', 'file-pdf']" class="mr-1" />Exportar a PDF
              </span>
              <SelectComponent
                label="Ordenar por"
                :options="orderByOptions"
                @changeSelect="callMethod"
                class="px-2 my-2 text-md w-full gap-5"
              />
            </div>

            <div>
              <template v-if="isTableView">
                <TablaListadoPartesComponent
                  :cards="cards"
                  @editTable="editElement"
                  @deleteTable="toggleModalDelete"
                />
              </template>
              <template v-else>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="(card, index) in cards" :key="index" class="p-2">
                    <CardParteComponent
                      :employeeNumber="card.employeeNumber"
                      :employeeName="card.employeeName"
                      :toggleRetalActive="card.toggleRetalActive"
                      :nbloque="card.nbloque"
                      :toggleBisActive="card.toggleBisActive"
                      :fechaInicioActual="card.fechaInicioActual"
                      :horaInicioActual="card.horaInicioActual"
                      :fechaFinActual="card.fechaFinActual"
                      :horaFinActual="card.horaFinActual"
                      :observaciones="card.observaciones"
                      :produccionMaquina="card.produccionMaquina"
                      @editCard="editElement(card)"
                      @deleteCard="toggleModalDelete(card)"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
      <LoadingComponent :loading="loading" :fullScreen="true" size="48px" />
      <ModalComponent
        title="Editar parte"
        :modalActive="editMode"
        :button="true"
        headClass="mt-[20%] sm:mt-[0%] mb-2"
        bodyClass="p-0"
        titleClass="p-0"
        @close="editMode = false"
      >
        <FormEditParteCortabloquesComponent
          class="mb-5"
          :card="selectedElement"
          @closeCortabloques="editMode = false"
        />
      </ModalComponent>
    </div>
    <ModalComponent
      title="Eliminar parte"
      :modalActive="deleteMode"
      :bodyClass="'pt-6'"
      @close="toggleModalClose"
    >
      <DeleteConfirmationComponent
        v-if="deleteMode"
        :items="deleteCard"
        :itemType="'parte cortabloques'"
        :total="deleteCard.length"
        @delete="deleteElement"
        @close="toggleModalClose"
      />
    </ModalComponent>
  </div>
</template>
  
  <script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default {
  data() {
    return {
      isSortedAscending: false,
      isSortedBlockNumberAsc: true,
      isTableView: window.innerWidth > 768,
      editMode: false,
      deleteMode: false,
      beforeFilter: false,
      fechaInicio: '',
      fechaFin: '',
      loading: false,
      cards: [],
      selectedCardId: null,
      selectedElement: null,
      deleteCard: [],
      orderByOptions: [
        { id: 'ordenarPorNumeroBloque', nombre: 'Número de bloque' },
        { id: 'ordenarPorTrabajador', nombre: 'Trabajador' },
        { id: 'ordenarPorFechaInicio', nombre: 'Fecha de inicio' },
        { id: 'ordenarPorFechaFin', nombre: 'Fecha de fin' }
      ]
    }
  },
  async created() {
    window.addEventListener('resize', this.checkIfMobile)
    this.fechaInicio = this.getFechaActual()
    this.fechaFin = this.getFechaActual()
    await this.fetchPartesCortabloques()
  },
  beforeUnmount() {
    // Cambia 'unmounted' a 'beforeUnmount'
    window.removeEventListener('resize', this.checkIfMobile)
  },
  methods: {
    toggleModalDelete(card){
      this.deleteMode = true
      this.deleteCard.push(card)
      this.actualizarMostrarMensaje(false)
    },
    toggleModalClose() {
      this.deleteMode = false
      this.deleteCard = []
      this.actualizarMostrarMensaje(false)
    },
    editElement(card) {
      this.editMode = true
      this.selectedElement = card
    },
    deleteElement(listCards) {
      this.toggleModalClose()
      const card = listCards[0]
      // Llamar a la acción de eliminar
      this.$store
        .dispatch('ListadoPartes/deleteParteCortabloques', card.id)
        .then(() => {
          this.actualizarMensaje({
            tipo: 'success',
            mensaje: 'Parte de cortabloques eliminado correctamente'
          })
          this.actualizarMostrarMensaje(true)
          //this.$emit('closeCortabloques', false)
          this.changeFilter()
        })
        .catch((error) => {
          this.actualizarMensaje({
            tipo: 'error',
            mensaje: 'Error al eliminar el parte de cortabloques'
          })
          this.actualizarMostrarMensaje(true)
        })
    },
    checkIfMobile() {
      this.isTableView = window.innerWidth > 768 // Cambia a 'true' para PC y 'false' para móvil
    },
    async exportToPDF() {
      // Ordenar las tarjetas antes de generar las filas para el PDF
      if (this.orderByOptionSelected === 'ordenarPorNumeroBloque') {
        this.ordenarPorNumeroBloque()
      } else if (this.orderByOptionSelected === 'ordenarPorTrabajador') {
        this.ordenarPorTrabajador()
      } else if (this.orderByOptionSelected === 'ordenarPorFechaInicio') {
        this.ordenarPorFechaInicio()
      } else if (this.orderByOptionSelected === 'ordenarPorFechaFin') {
        this.ordenarPorFechaFin()
      }

      const doc = new jsPDF('landscape')
      const columns = [
        { title: 'Trabajador', dataKey: 'employeeName' },
        { title: 'Número de bloque', dataKey: 'nbloque' },
        { title: 'Fecha y hora inicio', dataKey: 'fechaHoraInicio' },
        { title: 'Fecha y hora fin', dataKey: 'fechaHoraFin' },
        { title: 'Producción Máquina', dataKey: 'produccionMaquina' },
        { title: 'Observaciones', dataKey: 'observaciones' }
      ]
      const rows = await this.cards.map((card) => {
        const produccionMaquina = card.produccionMaquina
          .map((item) => {
            return `· ${item.largo} cm * ${item.ancho} cm * ${item.grosor} cm = ${item.cantidad} piezas`
          })
          .join('\n')

        return {
          employeeName: `${card.employeeNumber} - ${card.employeeName}`,
          nbloque: card.nbloque || 'RETAL',
          fechaHoraInicio: `${card.fechaInicioActual} ${card.horaInicioActual}`,
          fechaHoraFin: `${card.fechaFinActual} ${card.horaFinActual}`,
          produccionMaquina,
          observaciones: card.observaciones
        }
      })
      const fechaInicioDate = new Date(this.fechaInicio)
      const fechaFinDate = new Date(this.fechaFin)

      const fechaInicio = `${fechaInicioDate.getDate().toString().padStart(2, '0')}${(
        fechaInicioDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}${fechaInicioDate.getFullYear()}`
      const fechaFin = `${fechaFinDate.getDate().toString().padStart(2, '0')}${(
        fechaFinDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}${fechaFinDate.getFullYear()}`
      autoTable(doc, {
        columns,
        body: rows,
        theme: 'grid',
        columnStyles: {
          // Estilos generales para todas las columnas
          fontSize: 12,
          textCenter: true,
          cellPadding: 2,
          overflow: 'linebreak',
          columnWidth: 'wrap',
          cellHeight: 'auto',
          cellWidth: 'auto',
          halign: 'center',
          valign: 'middle',
          // Estilos específicos para las columnas 'Producción Máquina' y 'Observaciones'
          produccionMaquina: { cellWidth: 80, halign: 'center', valign: 'middle' }, // Aumenta el ancho de la celda para 'Producción Máquina'
          observaciones: {
            cellWidth: 50,
            overflow: 'ellipsize',
            halign: 'center',
            valign: 'middle'
          } // Reduce el ancho de la celda para 'Observaciones'
        },
        headStyles: {
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255]
        },
        margin: { top: 20, left: 15, right: 15, bottom: 10 },
        didDrawPage: async function () {
          doc.text(
            `Listado de partes: ${fechaInicioDate.toLocaleDateString()} - ${fechaFinDate.toLocaleDateString()}`,
            14,
            15
          )
        }
      })

      fechaInicio.replace(/[^0-9]/g, '')
      fechaFin.replace(/[^0-9]/g, '')
      doc.save(`listado_partes_${fechaInicio}${fechaFin}.pdf`)
    },
    callMethod(methodName) {
      if (this[methodName]) {
        this[methodName]()
      } else {
        console.error(`El método ${methodName} no existe en este componente.`)
      }
    },
    ordenarPorFechaInicio() {
      if (this.isSortedAscending) {
        this.cards.sort((a, b) => {
          return new Date(a.fechaInicioActual) - new Date(b.fechaInicioActual)
        })
      } else {
        this.cards.sort((a, b) => {
          return new Date(b.fechaInicioActual) - new Date(a.fechaInicioActual)
        })
      }
      this.isSortedAscending = !this.isSortedAscending
    },
    ordenarPorFechaFin() {
      if (this.isSortedAscending) {
        this.cards.sort((a, b) => {
          return new Date(a.fechaFinActual) - new Date(b.fechaFinActual)
        })
      } else {
        this.cards.sort((a, b) => {
          return new Date(b.fechaFinActual) - new Date(a.fechaFinActual)
        })
      }
      this.isSortedAscending = !this.isSortedAscending
    },
    ordenarPorNumeroBloque() {
      if (this.isSortedBlockNumberAsc) {
        this.cards.sort((a, b) => {
          if (a.nbloque === null) return 1
          if (b.nbloque === null) return -1
          return a.nbloque - b.nbloque || (a.retal === true ? -1 : b.retal === true ? 1 : 0)
        })
      } else {
        this.cards.sort((a, b) => {
          if (a.nbloque === null) return 1
          if (b.nbloque === null) return -1
          return b.nbloque - a.nbloque || (a.retal === true ? -1 : b.retal === true ? 1 : 0)
        })
      }
      this.isSortedBlockNumberAsc = !this.isSortedBlockNumberAsc
    },
    ordenarPorTrabajador() {
      if (this.isSortedAscending) {
        this.cards.sort((a, b) => a.employeeName.localeCompare(b.employeeName))
      } else {
        this.cards.sort((a, b) => b.employeeName.localeCompare(a.employeeName))
      }
      this.isSortedAscending = !this.isSortedAscending
    },
    toggleView() {
      this.isTableView = !this.isTableView
    },
    async getEmployeeByNumber(employeeNumber) {
      const empleado = await this.getEmpleados.find(
        (empleado) => empleado.numero_trabajador === employeeNumber
      )
      return empleado
    },
    async changeFilter() {
      this.loading = true
      this.cards = []
      let response = await this.getPartesCortabloques

      // Convertir las fechas a objetos Date y establecer la hora
      const fechaInicioDate = new Date(this.fechaInicio)
      fechaInicioDate.setHours(0, 0, 0, 0)
      const fechaFinDate = new Date(this.fechaFin)
      fechaFinDate.setHours(23, 59, 59, 999)

      // Comprobar si las fechas son válidas
      if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
        this.loading = false
        this.actualizarMensaje({ tipo: 'warning', mensaje: 'Debes rellenar los campos de fecha' })
        this.actualizarMostrarMensaje(true)
        setTimeout(() => {
          this.actualizarMostrarMensaje(false)
        }, 5000)
        //alert('Debes rellenar los campos de fecha')
        return
      } else if (fechaFinDate < fechaInicioDate) {
        this.loading = false
        this.actualizarMensaje({
          tipo: 'warning',
          mensaje: 'La fecha de inicio no puede ser mayor que la fecha de fin'
        })
        this.actualizarMostrarMensaje(true)
        setTimeout(() => {
          this.actualizarMostrarMensaje(false)
        }, 5000)
        //alert('La fecha de inicio no puede ser mayor que la fecha de fin')
        return
      }

      let filteredParts = response.partesCortabloques.filter((parte) => {
        const fechaInicioParte = new Date(parte.fecha_inicio)
        fechaInicioParte.setMinutes(
          fechaInicioParte.getMinutes() + fechaInicioParte.getTimezoneOffset()
        )
        const fechaFinParte = new Date(parte.fecha_fin)
        fechaFinParte.setMinutes(fechaFinParte.getMinutes() + fechaFinParte.getTimezoneOffset())

        const fechaInicioParteSeg = fechaInicioParte.getTime()
        const fechaFinParteSeg = fechaFinParte.getTime()
        const fechaInicioDateSeg = fechaInicioDate.getTime()
        const fechaFinDateSeg = fechaFinDate.getTime()

        
        // Devolver true si la fecha de inicio de la parte ocurre dentro del rango de fechas y la fecha de fin no excede el límite superior del rango
        return (
          fechaInicioParteSeg >= fechaInicioDateSeg &&
          fechaInicioParteSeg <= fechaFinDateSeg &&
          fechaFinParteSeg <= fechaFinDateSeg
        )
      })

      // Ahora puedes trabajar con filteredParts, que solo incluye las partes que ocurren en el range de fechas especificado
      filteredParts.forEach(async (parte) => {
        const empleado = await this.getEmployeeByNumber(parte.numero_trabajador)
        this.cards.push({
          id: parte.id,
          employeeNumber: parte.numero_trabajador,
          employeeName: `${empleado.nombre} ${empleado.apellido1}`,
          toggleRetalActive: parte.retal,
          nbloque: parte.numero_bloque,
          toggleBisActive: parte.bis,
          fechaInicioActual: parte.fecha_inicio,
          horaInicioActual: parte.hora_inicio,
          fechaFinActual: parte.fecha_fin,
          horaFinActual: parte.hora_fin,
          observaciones: parte.observaciones,
          produccionMaquina: parte.produccionMaquina
        })
      })
      this.ordenarPorFechaInicio()
      this.beforeFilter = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    getFechaActual() {
      const fecha = new Date()
      const año = fecha.getFullYear()
      const mes = ('0' + (fecha.getMonth() + 1)).slice(-2) // Los meses en JavaScript comienzan en 0
      const dia = ('0' + fecha.getDate()).slice(-2)
      return `${año}-${mes}-${dia}`
    },
    ...mapActions('ListadoPartes', ['fetchPartesCortabloques']),
    ...mapActions('Shared', ['actualizarMostrarMensaje', 'actualizarMensaje'])
  },
  computed: {
    ...mapGetters('ListadoPartes', ['getPartesCortabloques']),
    ...mapGetters('Trabajadores', ['getEmpleados']),
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    TablaListadoPartesComponent: defineAsyncComponent(() =>
      import('@/modules/ListadoPartes/components/TablaListadoPartesComponent.vue')
    ),
    CardParteComponent: defineAsyncComponent(() =>
      import('@/modules/ListadoPartes/components/CardParteComponent.vue')
    ),
    LoadingComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/LoadingComponent.vue')
    ),
    SelectComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/SelectComponent.vue')
    ),
    MensajesComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/MensajesComponent.vue')
    ),
    ModalComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ModalComponent.vue')
    ),
    FormEditParteCortabloquesComponent: defineAsyncComponent(() =>
      import('@/modules/ListadoPartes/components/FormEditParteCortabloquesComponent.vue')
    ),
    DeleteConfirmationComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/DeleteConfirmationComponent.vue')
    )
  },
  watch: {
    editMode() {
      if (this.editMode === false) {
        this.changeFilter()
      }
    },
    getMensaje(newVal) {
    },
    getTipo(newVal) {
    },
    getMostrar(newVal) {
    }
  }
}
</script>

<style>
</style>