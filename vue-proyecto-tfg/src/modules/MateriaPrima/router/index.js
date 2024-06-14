export default {
  name: 'materias-primas',
  component: () => import('@/modules/MateriaPrima/layouts/MateriaPrima.vue'),
  children: [
    {
      path: '/materias-primas',
      name: 'materias-primas',
      component: () => import('@/modules/MateriaPrima/views/MateriaPrimaView.vue')
    }
  ]
}
