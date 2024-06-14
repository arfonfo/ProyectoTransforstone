<template>
  <div class="container max-w-6xl">
    <header class="mt-5 sm:mx-3">
      <NabvarComponent />
    </header>
    <ModalComponent
      v-if="showModal"
      title="Debería cambiar su contraseña"
      :modalActive="showModal"
      @close="showModal = false"
    >
      <form @submit.prevent="handleSubmit" class="mx-5 mb-10">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
          Contraseña actual
        </label>
        <div
          class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500 block w-full mb-3"
        >
          <FontAwesomeIcon
            :icon="['fas', 'lock']"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="userForm.oldPassword"
            class="pl-10 bg-transparent w-full py-2.5"
            type="password"
            name="password"
            placeholder="•••••••••"
            autocomplete="current-password"
          />
        </div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
          Nueva contraseña
        </label>
        <div
          class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500 block w-full mb-3"
        >
          <FontAwesomeIcon
            :icon="['fas', 'lock']"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="userForm.newPassword"
            class="pl-10 bg-transparent w-full py-2.5"
            type="password"
            name="password"
            placeholder="•••••••••"
            autocomplete="current-password"
          />
        </div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
          Repite contraseña
        </label>
        <div
          class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500 block w-full"
        >
          <FontAwesomeIcon
            :icon="['fas', 'lock']"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="userForm.repeatedPassword"
            class="pl-10 bg-transparent w-full py-2.5"
            type="password"
            name="password"
            placeholder="•••••••••"
            autocomplete="current-password"
          />
        </div>
        <ButtonComponent text="Cambiar" bgColor="bg-secondary" @click="handleModalSubmit" />
      </form>
    </ModalComponent>
    <main v-else class="flex flex-col justify-between my-3 lg:my-10 sm:mx-3">
      <MenuView v-if="$route.path === '/home'" />
      <RouterMapComponent
        v-else
        class="text-center sm:text-left text-lg font-bold font-lexend text-secondary mb-5"
      />
      <LoadingComponent :fullScreen="true" size="48px" :loading="loading" />
      <RouterView class="w-full" />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import useGasto from '@/modules/GastosEnergeticos/composables/useGasto'
import useGastoGeneral from '@/modules/GastosGenerales/composables/useGastoGeneral'
import useConsumible from '@/modules/Consumible/composables/useConsumible'
import useMaquina from '@/modules/Maquinas/composables/useMaquina'
import useMateriaPrima from '@/modules/MateriaPrima/composables/useMateriaPrima'
import useTransporte from '@/modules/Transportes/composables/useTransporte'
import useTrabajadores from '@/modules/Trabajadores/composables/useTrabajadores'
import useUsuarios from '@/modules/Usuarios/composables/useUsuarios'
import useAuth from '@/modules/Auth/composables/useAuth'
import LoadingComponent from '@/modules/shared/components/LoadingComponent.vue'
import store from '@/store'

export default {
  components: {
    RouterView,
    NabvarComponent: defineAsyncComponent(() => import('@/modules/shared/NabvarComponent.vue')),
    MenuView: defineAsyncComponent(() => import('@/modules/Home/views/MenuView.vue')),
    RouterMapComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/RouterMapComponent.vue')
    ),
    ModalComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ModalComponent.vue')
    ),
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    LoadingComponent
  },
  setup() {
    const loading = ref(false)

    const showModal = ref(false)

    const userForm = ref({
      email: store.state.Auth.email,
      oldPassword: '',
      newPassword: '',
      repeatedPassword: ''
    })

    const someThingRequired = store.state.Auth.someThingRequired

    const obtenerConsumibles = async () => {
      const { getConsumibles } = useConsumible()
      return await getConsumibles()
    }

    const obtenerGastos = async () => {
      const { getGastos } = useGasto()
      return await getGastos()
    }

    const obtenerGastosGenerales = async () => {
      const { getGastosGenerales } = useGastoGeneral()
      return await getGastosGenerales()
    }

    const obtenerMaquinas = async () => {
      const { getMaquinas } = useMaquina()
      return await getMaquinas()
    }

    const obtenerMateriasPrimas = async () => {
      const { getMateriasPrimas } = useMateriaPrima()
      return await getMateriasPrimas()
    }

    const obtenerTransportes = async () => {
      const { getTransportes } = useTransporte()
      return await getTransportes()
    }

    const obtenerTrabajadores = async () => {
      const { getTrabajadores } = useTrabajadores()
      return await getTrabajadores()
    }

    const obtenerEmpleados = async () => {
      const { getEmpleados } = useTrabajadores()
      return await getEmpleados()
    }

    const obtenerUsuarios = async () => {
      const { getUsuarios } = useUsuarios()
      return await getUsuarios()
    }
    const { changePassword } = useAuth()

    const resetPassword = async (user) => {
      return await changePassword(user)
    }

    onMounted(async () => {
      try {
        loading.value = true
        if (someThingRequired === 'CHANGE_PASSWORD') {
          showModal.value = true
        }
        obtenerMaquinas()
        obtenerGastos()
        obtenerGastosGenerales()
        obtenerConsumibles()
        obtenerMateriasPrimas()
        obtenerTransportes()
        obtenerTrabajadores()
        obtenerEmpleados()
        obtenerUsuarios()
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      } finally {
        //esperar 1 segundos para que se vea el loading
        setTimeout(() => {
          loading.value = false
        }, 1000)
      }
    })

    const handleSubmit = async () => {
      if (
        !userForm.value.oldPassword ||
        !userForm.value.newPassword ||
        !userForm.value.repeatedPassword
      ) {
        showModal.value = true
      } else {
        if (userForm.value.newPassword !== userForm.value.repeatedPassword) {
          showModal.value = true
        } else {
          userForm.value = {
            email: userForm.value.email,
            oldPassword: userForm.value.oldPassword,
            newPassword: userForm.value.newPassword
          }
          const { ok, message } = await resetPassword(userForm.value)
        }
      }
    }

    const handleModalSubmit = async () => {
      try {
        await handleSubmit()
      } catch (error) {
        console.error('Error en handleSubmit:', error)
        // Maneja el error de la manera que prefieras...
      }
      showModal.value = false
    }
    return {
      loading,
      showModal,
      userForm,
      handleModalSubmit
    }
  }
}
</script>
