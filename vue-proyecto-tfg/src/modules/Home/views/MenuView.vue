<template>
  <div class="space-y-4">
    <div
      class="flex flex-col sm:grid sm:grid-cols-2 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent
        name="Calcular costes"
        path="calculadora"
        :icon="['fas', 'calculator']"
        :image="fondo11"
      />
      <ButtonMenuComponent
        name="Generador de partes"
        path="generador-partes"
        :icon="['fas', 'fa-clipboard-list']"
        :image="fondo8"
      />
    </div>
    <div
      class="flex flex-col sm:grid sm:grid-cols-3 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent
        name="Máquinas"
        path="maquinas"
        :icon="['fas', 'fa-oil-well']"
        :image="fondo6"
      />
      <ButtonMenuComponent
        name="Consumibles"
        path="consumibles"
        :icon="['fas', 'fa-droplet']"
        :image="fondo"
      />
      <ButtonMenuComponent
        name="Gastos energéticos"
        path="gastos-energeticos"
        :icon="['fas', 'fa-bolt']"
        :image="fondo5"
      />
      <ButtonMenuComponent
        name="Gastos generales"
        path="gastos-generales"
        :icon="['fas', 'fa-euro-sign']"
        :image="fondo10"
      />
      <ButtonMenuComponent
        name="Materias primas"
        path="materias-primas"
        :icon="['fas', 'fa-gem']"
        :image="fondo7"
      />
      <ButtonMenuComponent
        name="Transportes"
        path="Transportes"
        :icon="['fas', 'fa-truck']"
        :image="fondo12"
      />
      <ButtonMenuComponent
        name="Trabajadores"
        path="trabajadores"
        :icon="['fas', 'fa-person-digging']"
        :image="fondo3"
      />
      <ButtonMenuComponent
        name="Usuarios"
        path="usuarios"
        :icon="['fas', 'fa-users']"
        :image="fondo4"
      />
      <ButtonMenuComponent
        name="Listado de partes"
        path="listado-partes"
        :icon="['fas', 'fa-list-check']"
        :image="fondo9"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import fondo from '@/assets/images/resources/fondo.webp'
import fondo3 from '@/assets/images/resources/fondo-3.webp'
import fondo4 from '@/assets/images/resources/fondo-4.webp'
import fondo5 from '@/assets/images/resources/fondo-5.webp'
import fondo6 from '@/assets/images/resources/fondo-6.webp'
import fondo7 from '@/assets/images/resources/fondo-7.webp'
import fondo8 from '@/assets/images/resources/fondo-8.webp'
import fondo9 from '@/assets/images/resources/fondo-9.webp'
import fondo10 from '@/assets/images/resources/fondo-10.webp'
import fondo11 from '@/assets/images/resources/fondo-11.webp'
import fondo12 from '@/assets/images/resources/fondo-12.webp'

export default {
  data() {
    return {
      fondo,
      fondo3,
      fondo4,
      fondo5,
      fondo6,
      fondo7,
      fondo8,
      fondo9,
      fondo10,
      fondo11,
      fondo12
    }
  },
  components: {
    ButtonMenuComponent: defineAsyncComponent(
      () => import('@/modules/Home/components/ButtonMenuComponent.vue')
    )
  }
}
</script>
