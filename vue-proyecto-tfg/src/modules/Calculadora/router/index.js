export default {
  name: 'calculadora',
  component: () => import('@/modules/Calculadora/layouts/CalculadoraLayout.vue'),
  children: [
    {
      path: '/calculadora',
      name: 'calculadora',
      component: () => import('@/modules/Calculadora/views/CalculadoraView.vue'),
      children: [
        {
          path: '/calculadora/tabla',
          name: 'calculadora-tabla',
          component: () => import('@/modules/Calculadora/components/TablaStoneComponent.vue')
        },
        {
          path: '/calculadora/losa',
          name: 'calculadora-losa',
          component: () => import('@/modules/Calculadora/components/LosaStoneComponent.vue')
        }
      ]
    }
  ]
}
