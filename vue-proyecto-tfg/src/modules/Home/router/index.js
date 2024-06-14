import ConsumiblesRouter from '@/modules/Consumible/router'
import GastosEnergeticosRouter from '@/modules/GastosEnergeticos/router'
import GastosGeneralesRouter from '@/modules/GastosGenerales/router'
import MaquinasRouter from '@/modules/Maquinas/router'
import CalculadoraRouter from '@/modules/Calculadora/router'
import MateriaPrimaRouter from '@/modules/MateriaPrima/router'
import TransportesRouter from '@/modules/Transportes/router'
import TrabajadoresRouter from '@/modules/Trabajadores/router'
import UsuariosRouter from '@/modules/Usuarios/router'
import ControlesHorariosRouter from '@/modules/ControlesHorarios/router'
import ListadoPartesRouter from '@/modules/ListadoPartes/router'

export default {
  name: 'home',
  component: () =>
    import(/* webpackChunkName: "HomeComponent" */ '@/modules/Home/layouts/HomeLayout.vue'),
  children: [
    {
      path: '/consumibles',
      ...ConsumiblesRouter
    },
    {
      path: '/gastos-energeticos',
      ...GastosEnergeticosRouter
    },
    {
      path: '/gastos-generales',
      ...GastosGeneralesRouter
    },
    {
      path: '/maquinas',
      ...MaquinasRouter
    },
    {
      path: '/calculadora',
      ...CalculadoraRouter
    },
    {
      path: '/Transportes',
      ...TransportesRouter
    },
    {
      path: '/materias-primas',
      ...MateriaPrimaRouter
    },
    {
      path: '/trabajadores',
      ...TrabajadoresRouter
    },
    {
      path: '/usuarios',
      ...UsuariosRouter
    },
    {
      path: '/generador-partes',
      ...ControlesHorariosRouter
    },
    {
      path: '/listado-partes',
      ...ListadoPartesRouter
    }
  ]
}
