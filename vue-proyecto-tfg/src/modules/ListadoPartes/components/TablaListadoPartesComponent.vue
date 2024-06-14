<template>
  <table
    class="border border-opacity-0 rounded-lg overflow-auto bg-stoneBackground-2 text-center w-full"
  >
    <thead
      class="text-lg font-bold text-stoneBackground-3 bg-stoneBackground-2 sticky top-0 rounded-t-lg"
    >
      <tr>
        <th scope="col" class="p-4 no-print">Empleado</th>
        <th scope="col" class="p-4">Número de bloque</th>
        <th scope="col" class="p-4">Fecha de inicio</th>
        <th scope="col" class="p-4">Fecha de fin</th>
        <th scope="col" class="p-4">Acciones</th>
      </tr>
    </thead>

    <tbody class="bg-white">
      <template v-for="(card, index) in cards" :key="'card-' + index">
        <tr class="border-t-4 group">
          <td class="px-6 py-10 text-lg">{{ card.employeeNumber }} - {{ card.employeeName }}</td>
          <td class="px-6 py-10 text-lg font-bold text-stoneBackgroundContrast-2">
            {{ card.nbloque || 'Retal' }}
          </td>
          <td class="px-6 py-10 text-lg">
            {{ formatFechaHora(card.fechaInicioActual, card.horaInicioActual) }}
          </td>
          <td class="px-6 py-10 text-lg">
            {{ formatFechaHora(card.fechaFinActual, card.horaFinActual) }}
          </td>
          <td
            class="flex flex-col px-6 py-10 no-print invisible group-hover:visible transition-all duration-100 ease-in-out"
          >
            <span
              class="flex flex-row items-center justify-start text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer"
              @click.prevent="editTable(card)"
            >
              <FontAwesomeIcon :icon="['fas', 'pen-to-square']" />
              <span class="ml-2">Editar</span>
            </span>
            <span
              class="flex flex-row items-center justify-start text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer"
              @click.prevent="deleteTable(card)"
            >
              <FontAwesomeIcon :icon="['fas', 'trash-can']" />
              <span class="ml-2">Eliminar</span>
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="px-6 py-5">
            <h3 class="text-md font-bold text-stoneBackgroundContrast-1 mb-2">
              Producción de la máquina
            </h3>
            <div class="border border-opacity-0 overflow-hidden rounded-lg">
              <table class="w-full divide-y">
                <thead class="text-lg font-bold text-stoneBackground-3 bg-stoneBackground-2">
                  <tr>
                    <th scope="col" class="p-4">Largo</th>
                    <th scope="col" class="p-4">Ancho</th>
                    <th scope="col" class="p-4">Grosor</th>
                    <th scope="col" class="p-4">Cantidad</th>
                  </tr>
                </thead>
                <tbody class="bg-gray-50">
                  <tr
                    v-for="(prod, prodIndex) in card.produccionMaquina"
                    :key="'prod-' + index + '-item-' + prodIndex"
                    class="border-b bg-gray-100"
                  >
                    <td class="px-6 py-4">{{ prod.largo }}<sup>cm</sup></td>
                    <td class="px-6 py-4">{{ prod.ancho }}<sup>cm</sup></td>
                    <td class="px-6 py-4">{{ prod.grosor }}<sup>cm</sup></td>
                    <td class="px-6 py-4">{{ prod.cantidad }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="px-6 py-4 font-bold">
            Observaciones: <span class="font-normal">{{ card.observaciones }}</span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  methods: {
    editTable(card) {
      this.$emit('editTable', card)
    },
    deleteTable(card) {
      this.$emit('deleteTable', card)
    },
    formatFechaHora(fecha, hora) {
      if (!fecha || !hora) {
        return ''
      }
      const fechaHora = new Date(fecha.split('T')[0] + 'T' + hora)
      const optionsFecha = { day: '2-digit', month: '2-digit', year: 'numeric' }
      const optionsHora = { hour: '2-digit', minute: '2-digit', hour12: false }
      return (
        fechaHora.toLocaleDateString('es-ES', optionsFecha) +
        ' - ' +
        fechaHora.toLocaleTimeString('es-ES', optionsHora)
      )
    }
  }
}
</script>

<style>
</style>