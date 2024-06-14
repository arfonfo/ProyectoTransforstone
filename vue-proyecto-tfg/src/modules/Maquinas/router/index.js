export default {
  name: 'maquinas',
  component: () => import('@/modules/Maquinas/layouts/MaquinasLayout.vue'),
  children: [
    {
      path: '/maquinas',
      name: 'list-maquinas',
      component: () => import('@/modules/Maquinas/views/MaquinasView.vue')
    }
  ]
}
