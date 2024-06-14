<template>
  <form @submit.prevent="handleSubmit" class="px-10 pb-10" novalidate>
    <div v-for="(el, index) in data" :key="index">
      <component
        v-if="index !== 'id' && index !== 'id_maquina'"
        :is="checkType(typeof el)"
        :label="index"
        :placeholder="'Introduce ' + index"
        :value="el"
        @changeText="handleChange"
        @changeNumber="handleChange"
        @errorNumber="handleError"
        class="mb-4"
      />
      <SelectComponent
        v-else-if="index === 'id_maquina'"
        :label="'Máquina'"
        :options="maquinas"
        :value="el"
        :placeholder="'Seleccione una máquina relacionada'"
        :isEditing="tipo === 'Editar' ? true : false"
        @changeSelect="handleSelectChange"
      />
    </div>
    <div class="flex flex-col mt-6 sm:flex-row items-center sm:gap-4 sm:mt-4">
      <ButtonComponent :text="textoBoton" 
        bgColor="bg-secondary"
        class="hover:bg-opacity-80 flex justify-center items-center gap-5 text-lg py-4 mt-4"
        :icon="['fas', 'floppy-disk']"
      />
      <ButtonComponent
        :text="'Cancelar'"
        :icon="['fas', 'circle-xmark']"
        bgColor="bg-primary"
        class="hover:ring-2 hover:ring-primary hover:bg-opacity-80 flex justify-center items-center gap-5 text-lg py-4 mt-4"
        @click="toggleModal"
      />
    </div>
  </form>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    tipo: {
      type: String,
      required: true
    },
    maquinas: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: { ...this.data },
      error: {
        status: false,
        type: '',
        message: ''
      }
    }
  },
  components: {
    InputTextComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputTextComponent.vue')
    ),
    InputNumberComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputNumberComponent.vue')
    ),
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    ),
    SelectComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/SelectComponent.vue')
    )
  },
  computed: {
    textoBoton() {
      return this.tipo === 'Editar' ? 'Modificar' : 'Guardar'
    }
  },
  watch: {
    data(newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    handleError(e) {
      this.error.status = true
      this.error.message = e
      console.error('Dentro del handleError', this.error.message)
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
      //si alguno de los campos esta vacio no se envia
      // Comprobamos si this.form se ha inicializado
      if (
        Object.keys(this.form).length === 0 ||
        Object.entries(this.form).some(
          ([key, value]) => key !== 'id_maquina' && (value == '' || value == null)
        )
      ) {
        this.error.status = true
        this.error.type = 'warning'
        this.error.message = 'Está introduciendo campos vacíos o erróneos'
        this.$emit('errorForm', this.error)
        window.scrollTo(0, 0)
        // return
      } else if (this.objectsAreEqual(this.form, this.data)) {
        this.error.status = true
        this.error.type = 'warning'
        this.error.message = 'No se ha modificado ningún campo'
        this.$emit('errorForm', this.error)
        window.scrollTo(0, 0)
      } else {
        this.$emit('send', this.form)
        this.form = {}
        this.toggleModal()
        window.scrollTo(0, 0)
      }
    },
    handleChange(e) {
      if (this.tipo === 'Editar') {
        this.form.id = this.data.id
      } else {
        delete this.form.id
      }

      // Accede a la primera propiedad de e
      let firstProp = Object.keys(e)[0]
      if (typeof e[firstProp] === 'string') {
        e[firstProp] = e[firstProp].trim()
      }

      this.form = { ...this.form, ...e }
      return this.form
    },
    handleSelectChange(value) {
      this.form.id_maquina = value
    },
    checkType(type) {
      if (type === 'string') {
        return 'InputTextComponent'
      } else if (type === 'number' || type === 'object') {
        return 'InputNumberComponent'
      } else {
        return 'InputTextComponent'
      }
    }
  }
}
</script>
