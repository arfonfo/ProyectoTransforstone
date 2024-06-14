<template>
  <Transition name="modal-outter">
    <div
      v-show="modalActive"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-full backdrop-blur-md bg-bgFrom/30"
    >
      <Transition name="modal-inner">
        <div
          v-show="modalActive"
          class="relative w-full max-w-2xl bg-stoneBackground-2 rounded-lg shadow"
          :class="headClass"
        >
          <!-- Modal header -->
          <header
            class="sticky flex items-start justify-between p-4 border-b rounded-t bg-stoneBackground-2"
          >
            <h3
              class="text-2xl font-semibold text-secondary drop-shadow-sm text-shadow pt-1 pl-2"
              :class="titleClass"
            >
              {{ title }}
            </h3>
            <ButtonComponent
              v-if="button"
              type="button"
              text="X"
              otherClasses="text-xl text-gray-400 bg-transparent rounded-lg w-6 h-6 ms-auto inline-flex justify-center items-center"
              data-modal-hide="editConsumibleModal"
              @click="toggleModal"
            >
            </ButtonComponent>
          </header>
          <main :class="bodyClass"
            class="overflow-y-auto max-h-[calc(100vh-1rem)]"
          >
            <MensajesComponent
              v-if="getMostrar && getTipo !== 'success'"
              :textClasses="textMessage"
              :message="getMensaje"
              :type="getTipo"
              :mostrarMensaje="getMostrar"
            />
            <slot />
          </main>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    modalActive: {
      type: Boolean,
      required: true
    },
    button: {
      type: Boolean,
      default: true
    },
    textMessage: {
      type: String,
      default: ''
    },
    headClass: {
      type: String,
      default: ''
    },
    bodyClass: {
      type: String,
      default: ''
    },
    titleClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    toggleModal() {
      this.$emit('close')
    }
  },
  computed: {
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    MensajesComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/MensajesComponent.vue')
    )
  }
}
</script>
<style scoped>
.modal-outter-enter-active,
.modal-outter-leave-active {
  transition: opacity 0.3s;
}
.modal-outter-enter-from,
.modal-outter-leave-to {
  opacity: 0;
}
.modal-inner-enter-active,
.modal-inner-leave-active {
  transition: transform 0.4s;
}
.modal-inner-enter-from,
.modal-inner-leave-to {
  transform: scale(0);
}
</style>
