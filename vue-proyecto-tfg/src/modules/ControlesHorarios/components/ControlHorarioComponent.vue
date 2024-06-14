<template>
  <div class="w-full mx-auto">
    <MensajesComponent
      v-if="getTipo !== 'warning'"
      :message="getMensaje"
      :type="getTipo"
      :mostrarMensaje="getMostrar"
      :textClasses="'text-lg'"
      :iconClasses="'scale-150'"      
    />
    <div class="bg-white shadow-md rounded-t-xl my-6">
      <div class="border-b border-gray-200">
        <button
          @click="toggleParte('Cortabloques')"
          class="flex items-center justify-between w-full px-5 py-3 text-3xl text-stoneBackground-3 bg-stoneBackground-2 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4 rounded-t-lg"
        >
          <span class="font-medium"
            ><FontAwesomeIcon :icon="['fas', 'fa-clipboard-list']" class="mr-2" />Parte:
            Cortabloques</span
          >
          <FontAwesomeIcon
            :icon="['fas', 'caret-down']"
            :class="{ 'rotate-90': isOpenCortabloques }"
          />
        </button>
        <transition name="fade">
          <div v-if="isOpenCortabloques" class="px-0 py-5 sm:px-5">
            <FormParteCortabloques @closeCortabloques="closeCortabloques" />
          </div>
        </transition>
      </div>
      <!-- <div>
        <button
          @click="toggleParte('Pulidora')"
          class="flex items-center justify-between w-full px-5 py-3 text-3xl text-stoneBackground-3 bg-stoneBackground-2 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4"
        >
          <span class="font-medium"
            ><FontAwesomeIcon :icon="['fas', 'fa-clipboard-list']" class="mr-2" />Parte:
            Pulidora</span
          >
          <FontAwesomeIcon :icon="['fas', 'caret-down']" :class="{ 'rotate-90': isOpenPulidora }" />
        </button>
        <transition name="fade">
          <div v-if="isOpenPulidora" class="p-5">
            <FormPartePulidora />
          </div>
        </transition>
      </div> -->
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isOpenCortabloques: true,
      isOpenPulidora: false,
      fechaActual: '',
      horaActual: ''
    }
  },
  components: {
    FormParteCortabloques: defineAsyncComponent(() =>
      import('@/modules/ControlesHorarios/components/FormParteCortabloquesComponent.vue')
    ),
    MensajesComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/MensajesComponent.vue')
    )
    // FormPartePulidora: defineAsyncComponent(() =>
    //   import('@/modules/ControlesHorarios/components/FormPartePulidoraComponent.vue')
    // )
  },
  computed: {
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  methods: {
    toggleParte(parte) {
      const maquinas = ['Telar', 'Pulidora', 'Cortabloques']
      maquinas.forEach((maquina) => {
        if (maquina !== parte) {
          this[`isOpen${maquina}`] = false
        } else {
          this[`isOpen${maquina}`] = !this[`isOpen${maquina}`]
        }
      })
    },
    closeCortabloques(isClose){
      this.isOpenCortabloques = isClose
      setTimeout(() => {
        this.isOpenCortabloques = true
      }, 2000)
    },
    toggleTelar() {
      this.isOpenTelar = !this.isOpenTelar
      this.$nextTick(() => {
        if (this.isOpenTelar) {
          this.$refs.telarAccordion.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    },
    togglePulidora() {
      this.isOpenCortabloques = false
      this.isOpenPulidora = !this.isOpenPulidora
    }
  }
}
</script>

<style scoped>
/* Transicion cuando aparece y desaparece el modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s 0.1s, transform 0.5s, max-height 0.5s, padding 0.5s;
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

.rotate-90 {
  transform: rotate(90deg);
}
</style>
