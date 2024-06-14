export default {
  name: 'gastos-generales',
  component: () => import('@/modules/GastosGenerales/layouts/GastosGenLayout.vue'),
  children: [
    {
      path: '/gastos-generales',
      name: 'gastos-generales',
      component: () => import('@/modules/GastosGenerales/views/GastosGenView.vue')
    }
  ]
}
