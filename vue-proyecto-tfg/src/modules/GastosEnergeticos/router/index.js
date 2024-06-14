export default {
  name: 'gastos-energeticos',
  component: () => import('@/modules/GastosEnergeticos/layouts/GastosLayout.vue'),
  children: [
    {
      path: '/gastos-energeticos',
      name: 'gastos-energeticos',
      component: () => import('@/modules/GastosEnergeticos/views/GastosView.vue')
    }
  ]
}
