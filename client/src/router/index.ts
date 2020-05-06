import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { StoreInterface } from '../store'
import routes from './routes'

import { isAuthenticated } from '../validators/auth'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<StoreInterface>(function ({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: 'history',
    base: '/'
  })

  Router.beforeEach((to, from, next) => {
    // See if any of the matched routes has meta "requiresAuth"
    if (to.matched.some(route => route.meta.requiresAuth)) {
      // Yes this route requires authentication. See if the user is authenticated.
      if (isAuthenticated() === true) {
        // User is authenticated, we allow access.
        next();
      } else {
        // User is not authenticated. We can redirect her to
        // our login page. Or wherever we want.
        next("/");
      }
    } else {
      next();
    }
  });

  return Router
})
