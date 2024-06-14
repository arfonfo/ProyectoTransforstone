import { createRouter, createWebHashHistory } from 'vue-router'
import HomeRouter from '@/modules/Home/router'
import AuthRouter from '@/modules/Auth/router'
import store from '@/store'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      ...HomeRouter,
      meta: { requiresAuth: true }
    },
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/auth',
      ...AuthRouter
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isTokenExpired = await store.dispatch('Auth/isTokenExpired')

  if (requiresAuth && isTokenExpired) {
    next('/login')
  } else {
    const rutaFrom = from.matched[1] ? from.matched[1].path : from.path

    if (rutaFrom !== to.path) {
      store.commit('Shared/setMostrar', false)
    }

    if (to.path !== '/login' && store.state.Auth.roles === null && localStorage.getItem('email')) {
      await store.dispatch('Auth/obtenerRoles')
    }

    // Redirigir basándose en el rol
    if (to.path === '/login' && store.state.Auth.roles) {
      next('') // Redirige a la página de inicio si el usuario ya está autenticado
    } else if (store.state.Auth.roles && store.state.Auth.roles.includes('ADMIN')) {
      next()
    } else if (
      to.path !== '/logout' &&
      store.state.Auth.roles &&
      store.state.Auth.roles.includes('TRABAJADOR') &&
      to.path !== '/generador-partes'
    ) {
      next('/generador-partes')
    } else {
      next()
    }
  }
})

export default router
