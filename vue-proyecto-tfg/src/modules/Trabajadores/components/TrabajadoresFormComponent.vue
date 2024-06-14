<template>
  <form @submit.prevent="handleSubmit" class="px-10 pb-10" novalidate>
    <SelectComponent
      :value="form.numero_trabajador || 0"
      label="Empleados"
      :options="selectFormattedEmpleados()"
      :placeholder="'Seleccione un empleado'"
      :isEditing="tipo === 'Editar trabajador' ? true : false"
      @changeSelect="selectEmpleado"
    />
    <label
      for="precio"
      class="block mt-4 mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      Coste trabajador
    </label>
    <div class="relative">
      <input
        :value="form.precio"
        class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-4 mb-4 placeholder:first-letter:uppercase shadow-sm"
        :class="{
          'border-gray-300 focus:ring-secondary focus:ring-1 focus:border-secondary': !noValidInput,
          'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500': noValidInput
        }"
        type="number"
        name="numWorker"
        id="numWorker"
        min="1"
        placeholder="Coste del trabajador"
        @input="updateValue"
        @keydown="preventNonNumericInput"
      />
      <FontAwesomeIcon
        :icon="['fas', 'fa-exclamation-circle']"
        class="absolute top-1/2 right-14 transform -translate-y-1/2 h-5 w-5 text-red-500"
        v-if="noValidInput"
      />
    </div>
    <span class="block mb-4 text-xs font-light text-red-400" :style="{ fontSize: '12px' }">
      {{ errorMsg }}
    </span>
    <SelectComponent
      :value="form.id_maquina"
      :label="'Máquina'"
      :options="getMaquinas"
      :placeholder="'Seleccione una máquina relacionada'"
      :isEditing="tipo === 'Editar trabajador' ? true : false"
      @changeSelect="selectMaquina"
    />
    <div class="flex flex-col mt-6 sm:flex-row items-center sm:gap-4 sm:mt-4">
      <ButtonComponent
        :text="textoBoton"
        bgColor="bg-secondary"
        class="hover:bg-opacity-80 flex justify-center items-center gap-5 text-lg py-4 mt-4"
        :icon="['fas', 'floppy-disk']"
      />
      <ButtonComponent
        :icon="['fas', 'circle-xmark']"
        :text="'Cancelar'"
        bgColor="bg-primary"
        class="hover:ring-2 hover:ring-primary hover:bg-opacity-80 flex justify-center items-center gap-5 text-lg py-4 mt-4"
        @click="toggleModal"
      />
    </div>
  </form>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    tipo: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.data },
      error: {
        status: false,
        type: '',
        message: ''
      },
      errorMsg: '',
      noValidInput: false
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    SelectComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/SelectComponent.vue')
    )
  },
  computed: {
    ...mapGetters('Trabajadores', ['getEmpleados', 'getTrabajadores']),
    ...mapGetters('Maquinas', ['getMaquinas']),
    textoBoton() {
      return this.tipo === 'Editar trabajador' ? 'Modificar' : 'Guardar'
    }
  },
  watch: {
    data(newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    updateValue(event) {
      this.form.precio = event.target.value
      this.inputNumberErroneo()
    },
    selectFormattedEmpleados() {
      const empleados = this.getEmpleados
      return empleados
        .filter(empleado => empleado.activo === 1)
        .map((empleado) => {
          return {
            id: empleado.numero_trabajador,
            nombre: `${empleado.numero_trabajador} - ${empleado.nombre} ${empleado.apellido1} ${empleado.apellido2}`
          }
        })
    },
    inputNumberErroneo() {
      if (this.form.precio === '') {
        this.noValidInput = true
      } else {
        this.noValidInput = false
      }
    },
    preventNonNumericInput(event) {
      // También se puede hacer con regex
      const regex = /^[0-9]*[.,]?[0-9]*$/
      const controlKeys = [
        'Suprimir',
        'Enter',
        'Backspace',
        'Delete',
        'ArrowUp',
        'ArrowDown',
        'Tab',
        'Shift',
        'CapsLock',
        'ArrowRight',
        'ArrowLeft'
      ]

      if (controlKeys.includes(event.key) || regex.test(event.key)) {
        this.errorMsg = ''
      } else {
        this.errorMsg = 'Solo se permiten números y decimales'
        event.preventDefault()
      }
    },
    handleError(e) {
      this.error.status = true
      this.error.message = e
      console.error('Dentro del handleError', this.error.message)
    },
    selectEmpleado(id) {
      this.form.numero_trabajador = id
    },
    selectMaquina(id) {
      this.form.id_maquina = id
    },
    toggleModal() {
      this.$emit('close')
    },
    objectsAreEqual(obj1, obj2) {
      for (let prop in obj1) {
        if (typeof obj1[prop] === 'string' && typeof obj2[prop] === 'string') {
          if (obj1[prop].trim() !== obj2[prop].trim()) {
            return false
          }
        } else if (obj1[prop] !== obj2[prop]) {
          return false
        }
      }
      return true
    },
    handleSubmit() {
      const isEmpty = (value) => value === '' || value === 0 || value === null

      const requiredFields = ['numero_trabajador', 'precio']
      // Comprueba si algún campo del formulario está vacío
      const hasEmptyFields = requiredFields.some((field) => isEmpty(this.form[field]))

      // Permitir solo números, puntos y comas
      // const regex = /^[0-9]+([.,][0-9]+)?$/;
      // const isValidInput = regex.test(this.form.precio);

      // if (!isValidInput) {
      //   this.error = {
      //     status: true,
      //     type: 'warning',
      //     message: 'La entrada contiene caracteres no válidos. Solo se permiten números, puntos y comas.'
      //   }
      //   this.$emit('errorForm', this.error)
      //   return
      // }

      // Comprueba que el num_trabajador no tenga asociada ya ese id_maquina
      const trabajadores = this.getTrabajadores
      const trabajador = trabajadores.find(
        (trabajador) =>
          trabajador.numero_trabajador === this.form.numero_trabajador &&
          trabajador.id_maquina === this.form.id_maquina
      )

      if (hasEmptyFields) {
        this.error = {
          status: true,
          type: 'warning',
          message: 'No se pueden enviar campos vacíos o erróneos'
        }
        this.$emit('errorForm', this.error)
      } else if (this.tipo === 'Editar trabajador' && this.objectsAreEqual(this.form, this.data)) {
        this.error = {
          status: true,
          type: 'warning',
          message: 'No se ha modificado ningún campo'
        }
        this.$emit('errorForm', this.error)
      } else if (trabajador && this.data.id !== trabajador.id) {
        const maquina = this.getMaquinas.find((maquina) => maquina.id === this.form.id_maquina)
        this.error = {
          status: true,
          type: 'warning',
          message: `El trabajador ${this.form.numero_trabajador} - ${trabajador.nombre_completo} ya tiene asociada la máquina ${maquina.nombre}`
        }
        this.$emit('errorForm', this.error)
      } else {
        // Crea un nuevo objeto con solo los campos que quieres enviar
        const dataToSend = {
          id: this.form.id,
          numero_trabajador: this.form.numero_trabajador,
          precio: this.form.precio,
          id_maquina: this.form.id_maquina
        }
        this.$emit('send', dataToSend)
        this.form = {}
        this.toggleModal()
        window.scrollTo(0, 0)
      }
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