<template>
  <div class="border border-opacity-50 shadow rounded-lg overflow-hidden bg-gray-50">
    <div
      class="flex flex-col sm:flex-row items-start sm:justify-between sm:items-center px-5 pt-5 pb-3"
    >
      <span
        class="inline-flex items-center justify-end mx-4 my-2 border border-transparent text-md font-bold rounded-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-4 text-bold cursor-pointer"
        @click="addNewItem"
      >
        <FontAwesomeIcon :icon="['fas', 'plus']" class="mr-1" />Añadir nuevo
      </span>
      <div class="relative inline-block text-left flex-shrink-0">
        <a
          class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-5 py-2 bg-gray-50 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:ring-2 hover:ring-secondary"
          :class="disabledButton"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="deleteSelectedItems"
        >
          <FontAwesomeIcon :icon="['fas', 'trash-can']" class="mr-2 hover:text-secondary" />
          Eliminar seleccionados
          <span v-if="selectedCheckboxes.length > 0">&nbsp;({{ selectedCheckboxes.length }})</span>
        </a>
      </div>
    </div>
    <div class="overflow-auto">
      <table class="w-full table-auto">
        <thead
          class="text-md font-bold text-stoneBackground-5 bg-gray-50 sticky top-0 rounded-t-lg"
        >
          <tr>
            <th scope="col" class="p-4 no-print">
              <div class="flex items-center">
                <input
                  @change="selectAllCheckboxes"
                  v-model="isAllChecked"
                  id="checkbox-all-search"
                  type="checkbox"
                  class="accent-stoneBackgroundContrast-1 w-4 h-4 bg-secondary-100 border-gray-300 rounded focus:ring-secondary"
                  :class="disabledCheckbox"
                />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="p-2">Largo</th>
            <th scope="col" class="p-2">Ancho</th>
            <th scope="col" class="p-2">Grosor</th>
            <th scope="col" class="p-2">Número de piezas</th>
            <th scope="col" class="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="items.length === 0" class="divide-gray-200 rounded-b-lg text-center">
          <tr>
            <td class="px-4 pt-4 bg-gray-50" colspan="6">No hay elementos para mostrar</td>
          </tr>
          <tr>
            <td class="pb-4 text-sm text-gray-400 bg-gray-50" colspan="6">
              Inserte un nuevo elemento desde el botón añadir.
            </td>
          </tr>
        </tbody>
        <tbody v-else class="divide-gray-200 rounded-b-lg text-center">
          <tr
            class="bg-gray-50 border-b hover:bg-gray-100"
            v-for="(item, index) in items"
            :key="index"
          >
            <td class="w-4 p-4 no-print">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  :value="index"
                  v-model="selectedCheckboxes"
                  class="accent-stoneBackgroundContrast-1 w-4 h-4 border-stoneBackground-3 rounded"
                />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <td class="px-3 py-4" v-if="!item.editing">
              {{ parseFloat(item.largo) }} <sup>cm</sup>
            </td>
            <td class="px-3 py-4" v-else>
              <input
                type="number"
                v-model="item.copy.largo"
                step="0.1"
                min="0"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-md"
                :style="{
                  width: `${item.copy.largo ? item.copy.largo.toString().length + 4 : 4}ch`
                }"
              />
            </td>

            <td class="px-3 py-4" v-if="!item.editing">
              {{ parseFloat(item.ancho) }} <sup>cm</sup>
            </td>
            <td class="px-3 py-4" v-else>
              <input
                type="number"
                v-model="item.copy.ancho"
                step="0.1"
                min="0"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-md"
                :style="{
                  width: `${item.copy.ancho ? item.copy.ancho.toString().length + 4 : 4}ch`
                }"
              />
            </td>

            <td class="px-3 py-4" v-if="!item.editing">
              {{ parseFloat(item.grosor) }} <sup>cm</sup>
            </td>
            <td class="px-3 py-4" v-else>
              <input
                type="number"
                v-model="item.copy.grosor"
                step="0.1"
                min="0"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-md"
                :style="{
                  width: `${item.copy.grosor ? item.copy.grosor.toString().length + 4 : 4}ch`
                }"
              />
            </td>

            <td class="px-3 py-4" v-if="!item.editing">{{ item.cantidad }} <sup>pz.</sup></td>
            <td class="px-3 py-4" v-else>
              <input
                type="number"
                v-model="item.copy.cantidad"
                step="1"
                min="0"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-md"
                :style="{
                  width: `${item.copy.cantidad ? item.copy.cantidad.toString().length + 4 : 4}ch`
                }"
              />
            </td>

            <td class="px-3 py-4 flex flex-col gap-1 justify-center items-center">
              <span
                v-if="!item.editing"
                class="text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer group"
                @click="startEdit(item)"
              >
                <FontAwesomeIcon :icon="['fas', 'pen-to-square']" />
                <span class="ml-2 transition-all duration-100 ease-in-out">Editar</span>
              </span>
              <span
                v-else
                class="text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer group"
                @click="saveAndDeleteEmptyItems(item)"
              >
                <FontAwesomeIcon :icon="['fas', 'floppy-disk']" />
                <span class="ml-2 transition-all duration-100 ease-in-out">Guardar</span>
              </span>
              <span
                v-if="item.editing"
                class="text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer group"
                @click="cancelEdit(item)"
              >
                <FontAwesomeIcon :icon="['fas', 'circle-xmark']" />
                <span class="ml-2 transition-all duration-100 ease-in-out">Cancelar</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      items: [...this.card],
      selectedCheckboxes: [],
      isAllChecked: false
    }
  },
  computed: {
    disabledButton() {
      return this.selectedCheckboxes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
    },
    disabledCheckbox() {
      return this.items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
    }
  },
  methods: {
    addNewItem() {
      const newItem = {
        largo: 0,
        ancho: 0,
        grosor: 0,
        cantidad: 0,
        editing: true,
        copy: {
          largo: 0,
          ancho: 0,
          grosor: 0,
          cantidad: 0
        }
      }
      this.items.push(newItem)
      this.$emit('update:card', this.items)
    },
    startEdit(item) {
      item.editing = true
      item.copy = { ...item }
    },
    cancelEdit(item) {
      item.editing = false
      item.largo = item.copy.largo
      item.ancho = item.copy.ancho
      item.grosor = item.copy.grosor
      item.cantidad = item.copy.cantidad
    },
    saveAndDeleteEmptyItems(item) {
      if (item.copy.largo && item.copy.ancho && item.copy.grosor && item.copy.cantidad) {
        item.largo = item.copy.largo
        item.ancho = item.copy.ancho
        item.grosor = item.copy.grosor
        item.cantidad = item.copy.cantidad
        item.editing = false
      } else {
        const index = this.items.indexOf(item)
        if (index > -1) this.items.splice(index, 1)
      }
      this.$emit('updateItems', this.items)
    },
    deleteSelectedItems() {
      this.items = this.items.filter((_, index) => !this.selectedCheckboxes.includes(index))
      this.selectedCheckboxes = []
      this.isAllChecked = false
      this.$emit('updateItems', this.items)
    },
    selectAllCheckboxes(event) {
      this.selectedCheckboxes = event.target.checked ? this.items.map((_, index) => index) : []
    }
  },
  watch: {
    card: {
      handler() {
        this.items = [...this.card]
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.table-auto {
  min-width: 100%;
}
</style>