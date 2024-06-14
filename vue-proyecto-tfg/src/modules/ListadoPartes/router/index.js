export default {
  name: 'listado-partes',
  component: () => import('@/modules/ListadoPartes/layouts/ListadoPartesLayout.vue'),
  children: [
    {
      path: '/listado-partes',
      name: 'listado-partes',
      component: () => import('@/modules/ListadoPartes/views/ListadoPartesView.vue')
    }
  ]
}
