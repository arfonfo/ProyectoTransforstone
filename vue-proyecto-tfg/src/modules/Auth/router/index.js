import store from '@/store'
export default {
  name: 'auth',
  component: () => import(/* webpackChunkName: "Auth" */ '@/modules/Auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: '/login',
      name: 'auth-login',
      component: () => import(/* webpackChunkName: "Login" */ '@/modules/Auth/views/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'auth-logout',
      beforeEnter(to, from, next) {
        store.dispatch('Auth/logoutUser')

        next('/login')
      }
    }
  ]
}
