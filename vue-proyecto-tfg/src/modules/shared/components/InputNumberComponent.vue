<template>
  <div>
    <label
      v-if="label"
      for="value"
      class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      {{ formattedLabel }}
    </label>
    <div class="relative">
      <input
        class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-4 placeholder:first-letter:uppercase shadow-sm"
        :class="{
          'border-gray-300 focus:ring-secondary focus:ring-1 focus:border-secondary': !noValidInput, 
          'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500': noValidInput 
        }"
        type="number"
        step="0.01"
        min="0"
        :value="newValue"
        @input="(event) => updateValue(label, event)"
        @keydown="preventNonNumericInput"
        @blur="!noValidInput"
        @change="!noValidInput"
        :name="value"
        :placeholder="formattedPlaceholder"
      />
      <FontAwesomeIcon :icon="['fas', 'fa-exclamation-circle']" 
        class="absolute top-1/2 right-14 transform -translate-y-1/2 h-5 w-5 text-red-500"
        v-if="noValidInput"
      />
    </div>
    <span class="block mt-2 text-xs font-light text-red-400" :style="{ fontSize: '12px' }">
      {{ errorMsg }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Numero'
    },
    label: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      newInputValue: this.value,
      noValidInput: false,
      errorMsg: ''
    }
  },
  computed: {
    newValue() {
      return this.newInputValue
    },
    formattedPlaceholder() {
      return this.formatText(this.placeholder)
    },
    formattedLabel() {
      return this.formatText(this.label) || ''
    }
  },
  methods: {
    preventNonNumericInput(event) {
      // También se puede hacer con regex
      const regex = /^[0-9]*[.,]?[0-9]*$/;
      const controlKeys = ['Suprimir', 'Enter', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'Tab', 'Shift', 'CapsLock', 'ArrowRight', 'ArrowLeft'];

      if (controlKeys.includes(event.key) || regex.test(event.key)) {
        this.errorMsg = '';
      } else {
        this.errorMsg = 'Solo se permiten números y decimales';
        event.preventDefault();
      }
    },
    updateValue(key, event) {
      // Permitir solo números, puntos y comas
      // const regex = /[^0-9.,]/g;
      // this.newInputValue = event.target.value.replace(regex, '');
      if(event.target.value === '') {
        this.noValidInput = true
      } else {
        this.noValidInput = false
      }
      this.newInputValue = event.target.value
      this.$emit('changeNumber', { [key]: Number(this.newInputValue) })
    },
    handleError() {
      this.$emit('errorNumber', 'Este campo no puede estar vacio')
    },
    formatText(text) {
      let formattedText = text.replace(/_/g, ' ')

      if (formattedText.includes('m2')) {
        formattedText = formattedText.replace('m2', 'm²')
      }

      if (formattedText.includes('m3')) {
        formattedText = formattedText.replace('m3', 'm³')
      }

      return formattedText
    }
  },
  watch: {
    error(newValue) {
      if (newValue) {
        this.$emit('errorNumber', 'Este campo no puede estar vacio')
      }
    },
    value(newValue) {
      if (newValue === 0 || newValue === null) {
        this.handleError()
        this.noValidInput = true
      }
    }
  }
}
</script>
