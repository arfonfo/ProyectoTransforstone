export default {
  name: 'usuarios',
  component: () => import('@/modules/Usuarios/layouts/UsuariosLayout.vue'),
  children: [
    {
      path: '/usuarios',
      name: 'list-usuarios',
      component: () => import('@/modules/Usuarios/views/UsuariosView.vue')
    }
  ]
}
