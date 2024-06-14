<template>
  <div class="border border-opacity-0 rounded-lg overflow-hidden bg-stoneBackground-2">
    <div
      class="flex flex-col sm:flex-row items-start sm:justify-between sm:items-center px-5 pt-5 pb-3"
    >
      <span
        class="inline-flex items-center justify-end mx-4 my-2 border border-transparent text-lg font-bold rounded-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-4 text-bold"
        @click="addNewItem"
      >
        <FontAwesomeIcon :icon="['fas', 'plus']" class="mr-1" />Añadir nuevo
      </span>
      <div class="relative inline-block text-left flex-shrink-0">
        <a
          class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-5 py-2 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:ring-2 hover:ring-secondary"
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
          class="text-lg font-bold text-stoneBackground-5 bg-stoneBackground-2 sticky top-0 rounded-t-lg"
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

            <th scope="col" class="p-4">Largo</th>
            <th scope="col" class="p-4">Ancho</th>
            <th scope="col" class="p-4">Grosor</th>
            <th scope="col" class="p-4">Número de piezas</th>
            <th scope="col" class="p-4">Acciones</th>
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
            <td class="px-6 py-4" v-if="!item.editing">
              {{ parseFloat(item.largo) }} <sup>cm</sup>
            </td>
            <td class="px-6 py-4" v-else>
              <input
                type="number"
                v-model="item.copy.largo"
                step="0.1"
                min="0"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-xl"
                :style="{
                  width: `${item.copy.largo ? item.copy.largo.toString().length + 4 : 4}ch`
                }"
              />
            </td>

            <td class="px-6 py-4" v-if="!item.editing">
              {{ parseFloat(item.ancho) }} <sup>cm</sup>
            </td>
            <td class="px-6 py-4" v-else>
              <input
                type="number"
                v-model="item.copy.ancho"
                step="0.1"
                min="0"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-xl"
                :style="{
                  width: `${item.copy.ancho ? item.copy.ancho.toString().length + 4 : 4}ch`
                }"
              />
            </td>

            <td class="px-6 py-4" v-if="!item.editing">
              {{ parseFloat(item.grosor) }} <sup>cm</sup>
            </td>
            <td class="px-6 py-4" v-else>
              <input
                type="number"
                v-model="item.copy.grosor"
                step="0.1"
                min="0"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-xl"
                :style="{
                  width: `${item.copy.grosor ? item.copy.grosor.toString().length + 4 : 4}ch`
                }"
              />
            </td>

            <td class="px-6 py-4" v-if="!item.editing">{{ item.numeroPiezas }} <sup>pz.</sup></td>
            <td class="px-6 py-4" v-else>
              <input
                type="number"
                v-model="item.copy.numeroPiezas"
                step="1"
                min="0"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-xl"
                :style="{
                  width: `${
                    item.copy.numeroPiezas ? item.copy.numeroPiezas.toString().length + 4 : 4
                  }ch`
                }"
              />
            </td>

            <td class="px-6 py-4 flex flex-col gap-2 justify-center items-center">
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
  data() {
    return {
      items: [],
      selectedCheckboxes: [],
      selectedItems: [],
      isAllChecked: false
    }
  },
  created() {
    // Carga los elementos desde el localStorage cuando se crea el componente
    const storedItems = localStorage.getItem('items')
    if (storedItems) {
      this.items = JSON.parse(storedItems)
      this.$emit('updateItems', this.items)
    }
  },
  methods: {
    startEdit(item) {
      // Hacer una copia profunda del item antes de empezar a editar
      item.original = JSON.parse(JSON.stringify(item))
      // También crea una copia para guardar los cambios temporales durante la edición
      item.copy = JSON.parse(JSON.stringify(item))
      item.editing = true
    },
    saveAndDeleteEmptyItems(item) {
      // Solo guarda los cambios si el item no está vacío
      if (item.copy) {
        Object.assign(item, item.copy)
        item.editing = false
        delete item.copy
        item.largo = parseFloat(item.largo).toFixed(2)
        item.ancho = parseFloat(item.ancho).toFixed(2)
        item.grosor = parseFloat(item.grosor).toFixed(2)

        // Guarda los elementos en el localStorage cuando se guardan los cambios
        delete item.original
        delete item.copy
        localStorage.setItem('items', JSON.stringify(this.items))
        this.$emit('updateItems', this.items)
      } else {
        // Si el item está vacío, cancela la edición
        this.cancelEdit(item)
      }
    },
    deleteSelectedItems() {
      this.items = this.items.filter((_, index) => !this.selectedCheckboxes.includes(index))
      this.selectedCheckboxes = []
      localStorage.setItem('items', JSON.stringify(this.items))
      this.$emit('updateItems', this.items)
    },
    cancelEdit(item) {
      const index = this.items.indexOf(item)
      if (index > -1) {
        if (item.original) {
          // Si se estaba editando el item, restaura los valores originales
          Object.assign(item, item.original)
          item.editing = false
          delete item.original
        } else {
          // Si el item es nuevo y está vacío, lo elimina
          this.items.splice(index, 1)
          // Elimina el índice del item de selectedCheckboxes
          const checkboxIndex = this.selectedCheckboxes.indexOf(index)
          if (checkboxIndex > -1) {
            this.selectedCheckboxes.splice(checkboxIndex, 1)
          }
          if(this.selectedCheckboxes.length === 0) {
            this.isAllChecked = false
          }
        }
      }
      // Guarda los elementos en el localStorage cuando se cancela la edición
      localStorage.setItem('items', JSON.stringify(this.items))
      this.$emit('updateItems', this.items)
    },
    addNewItem() {
      this.items.push({
        largo: '',
        ancho: '',
        grosor: '',
        numeroPiezas: '',
        editing: true,
        copy: {}
      })
    },
    selectAllCheckboxes(event) {
      if (event.target.checked) {
        this.selectedCheckboxes = this.items.map((_, index) => index)
      } else {
        this.selectedCheckboxes = []
        this.isAllChecked = false
      }
    }
  },
  computed: {
    disabledButton() {
      return this.selectedCheckboxes.length > 0
        ? ''
        : 'pointer-events-none opacity-50 cursor-not-allowed'
    },
    disabledCheckbox() {
      return this.items.length > 0 ? '' : 'pointer-events-none opacity-50 cursor-not-allowed'
    }
  },
  watch: {
    largo() {
      if (isNaN(this.largo) || this.largo < 0) {
        this.largo = ''
      }
    },
    ancho() {
      if (isNaN(this.ancho) || this.ancho < 0) {
        this.ancho = ''
      }
    },
    grosor() {
      if (isNaN(this.grosor) || this.grosor < 0) {
        this.grosor = ''
      }
    },
    numeroPiezas() {
      if (isNaN(this.numeroPiezas) || this.numeroPiezas < 0) {
        this.numeroPiezas = ''
      }
    },
    selectedCheckboxes(newVal) {
      this.isAllChecked = newVal.length !== 0
    }
  }
}
</script>