export default {
  name: 'trabajadores',
  component: () => import('@/modules/Trabajadores/layouts/TrabajadoresLayout.vue'),
  children: [
    {
      path: '/trabajadores',
      name: 'list-trabajadores',
      component: () => import('@/modules/Trabajadores/views/TrabajadoresView.vue')
    }
  ]
}
