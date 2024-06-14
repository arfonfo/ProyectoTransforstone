export default {
  name: 'consumibles',
  component: () => import('@/modules/Consumible/layouts/ConsumibleLayout.vue'),
  children: [
    {
      path: '/consumibles',
      name: 'list-consumibles',
      component: () => import('@/modules/Consumible/views/ConsumiblesView.vue')
    }
  ]
}
