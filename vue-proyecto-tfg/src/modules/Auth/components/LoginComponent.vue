<template>
  <div>
    <MensajesComponent
      :type="getTipo"
      :message="getMensaje"
      :mostrarMensaje="getMostrar"
    />
    <h1 class="text-4xl sm:text-5xl text-stoneBackground-1 mb-3">{{ title }}</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
        Correo Electrónico
      </label>
      <div
        class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500 block w-full"
      >
        <FontAwesomeIcon
          :icon="['fas', 'envelope']"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="userForm.email"
          type="email"
          class="pl-10 bg-transparent w-full py-2.5"
          placeholder="email@email.es"
          autocomplete="email"
        />
      </div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
        Contraseña
      </label>
      <div
        class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500 block w-full"
      >
        <FontAwesomeIcon
          :icon="['fas', 'lock']"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="userForm.password"
          class="pl-10 bg-transparent w-full py-2.5"
          type="password"
          name="password"
          id="password"
          placeholder="•••••••••"
          autocomplete="current-password"
        />
      </div>
      <ButtonComponent text="Acceder" bgColor="bg-primary" :icon="['fas', 'right-to-bracket']" />
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent, ref } from 'vue'
import useAuth from '../composables/useAuth'
import { useRouter } from 'vue-router'
import useShared from '@/modules/shared/composables/useShared'

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    MensajesComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/MensajesComponent.vue')
    )
  },
  setup() {
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const formattedDate = new Date().toLocaleString().slice(0, 19).replace('T', ' ')
    const userForm = ref({
      email: '',
      password: '',
      ultima_conexion: formattedDate
    })
    const errorMessage = ref({
      type: '',
      show: false,
      message: ''
    })

    const router = useRouter()
    const { loginUser } = useAuth()

    const handleSubmit = async () => {
      errorMessage.value = {
        type: '',
        show: false,
        message: ''
      }
      if (!userForm.value.email || !userForm.value.password) {
        actualizarMensaje('warning', 'Debes rellenar todos los campos')
        actualizarMostrarMensaje(true)
        // errorMessage.value.type = 'warning'
        // errorMessage.value.show = true
        // errorMessage.value.message = 'Debes rellenar todos los campos'
        setTimeout(() => {
          actualizarMostrarMensaje(false)
          // errorMessage.value.show = !errorMessage.value.show
        }, 6 * 1000)
        return
      }
      const { ok, message } = await loginUser(userForm.value)

      if (!ok) {
        actualizarMensaje('error', message)
        actualizarMostrarMensaje(true)
        // errorMessage.value.type = 'error'
        // errorMessage.value.show = !ok
        // errorMessage.value.message = message
      } else {
        router.push('/home')
      }
      setTimeout(() => {
          actualizarMostrarMensaje(false)
        }, 6 * 1000)
      // if (ok) {
      //   setTimeout(() => {
      //     errorMessage.value.show = !errorMessage.value.show
      //   }, 6 * 1000)
      // } else {
      //   router.push('/home')
      // }
    }

    return { userForm, errorMessage, handleSubmit }
  },
  computed: {
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  }
}
</script>