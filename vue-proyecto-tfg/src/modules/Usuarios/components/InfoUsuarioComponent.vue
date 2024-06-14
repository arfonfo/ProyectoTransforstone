<template>
  <div class="w-full mx-auto">
    <div class="rounded-md shadow-md my-6 mx-4">
      <!-- Información del usuario -->
      <div class="rounded-t-md bg-stoneBackground-1 bg-opacity-20">
        <div class="rounded-t-md flex items-center justify-between w-full px-5 py-3 text-xl text-stoneBackground-3 bg-stoneBackground-1 bg-opacity-10 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4">
          <span class="font-semibold">
            <FontAwesomeIcon :icon="['fas', 'fa-user']" class="mr-4" />{{ dataEmpleado.nombreCompleto }} ({{ data.numero_trabajador }})
          </span>
        </div>
        <div class="p-3 flex justify-center">
          <ul class="min-w-full sm:px-24 max-w-md divide-y divide-stoneBackground-1 divide-opacity-50">
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3 flex justify-between">
              <p class="text-stoneBackgroundContrast-3 text-lg font-semibold truncate">
                Email:
              </p>
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                {{ data.email }}
              </p>
            </li>
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3 flex justify-between">
              <p class="text-stoneBackgroundContrast-3 text-lg font-semibold truncate">
                Rol:
              </p>
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                {{ data.roles }}
              </p>
            </li>
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3 flex justify-between">
              <p class="text-stoneBackgroundContrast-3 text-lg font-semibold truncate">
                Fecha de registro:
              </p>
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                {{ dataEmpleado.fechaRegistro }}
              </p>
            </li>
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3 flex justify-between">
              <p class="text-stoneBackgroundContrast-3 text-lg font-semibold truncate">
                Última conexión:
              </p>
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                {{ dataEmpleado.ultimaConexion }}
              </p>
            </li>
            <!-- <li class="pb-2 pt-2 sm:pt-3 sm:pb-3 flex flex-col">
              <template v-if="dataEmpleado.maquinasCostes.length > 0">
                <table class="table-auto w-full mt-2">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 text-center text-lg font-semibold text-stoneBackgroundContrast-3">Máquina Asociada</th>
                      <th class="px-4 py-2 text-center text-stoneBackgroundContrast-3 text-lg font-semibold">Coste Asociado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(element, index) in dataEmpleado.maquinasCostes" :key="index"
                      class="text-center bg-stoneBackground-1 bg-opacity-10 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4"
                    >
                      <td class="border-t border-stoneBackground-1 px-4 py-2 text-stoneBackgroundContrast-4">{{ element.maquina }}</td>
                      <td class="border-t border-stoneBackground-1 px-4 py-2 text-stoneBackgroundContrast-4">{{ element.coste }} €</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <p v-else class="text-stoneBackgroundContrast-3 text-lg font-semibold truncate">
                No tiene máquinas ni costes asociados
              </p>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataEmpleado: {
        nombreCompleto: '',
        fechaRegistro: '',
        ultimaConexion: 'Registro sin completar',
        // maquinasCostes: []
      }
    }
  },
  computed: {
    // ...mapGetters('Trabajadores', ['getTrabajadores']),
    ...mapGetters('Trabajadores', ['getEmpleados']),
    // ...mapGetters('Maquinas', ['getMaquinas']),
  },
  created(){
    this.dataEmpleado.fechaRegistro = new Date(this.data.fecha_registro).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
    if(this.data.ultima_conexion !== null){
      this.dataEmpleado.ultimaConexion = new Date(this.data.ultima_conexion).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
    }

    // const trabajador = this.getTrabajadores.filter(
    //   (trabajador) => trabajador.numero_trabajador === this.data.numero_trabajador
    // )

    const empleado = this.getEmpleados.find(
      (empleado) => empleado.numero_trabajador === this.data.numero_trabajador
    )

    if (empleado) {
      this.dataEmpleado.nombreCompleto = empleado.nombre + ' ' + empleado.apellido1 + ' ' + empleado.apellido2
      // this.dataEmpleado.maquinasCostes = trabajador.map((trabajador) => {
      //   const maquina = this.getMaquinas.find((maquina) => maquina.id === trabajador.id_maquina)
      //   return {
      //     maquina: maquina ? maquina.nombre : 'Sin máquina asociada',
      //     coste: trabajador.precio ? trabajador.precio : 'Sin coste asociado'
      //   }
      // })
    }

  }
}
</script>
