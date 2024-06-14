export default {
  name: 'transportes',
  component: () => import('@/modules/Transportes/layouts/TransportesLayout.vue'),
  children: [
    {
      path: '/transportes',
      name: 'list-transportes',
      component: () => import('@/modules/Transportes/views/TransportesView.vue')
    }
  ]
}
