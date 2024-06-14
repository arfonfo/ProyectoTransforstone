export default {
  name: 'generador-partes',
  component: () => import('@/modules/ControlesHorarios/layouts/ControlesHorariosLayout.vue'),
  children: [
    {
      path: '/generador-partes',
      name: 'generador-partes',
      component: () => import('@/modules/ControlesHorarios/views/ControlHorarioView.vue')
    }
  ]
}
