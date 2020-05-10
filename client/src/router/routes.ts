import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/Users/Login.vue') 
      },
      { 
        path: 'signup', 
        component: () => import('pages/Users/Register.vue') 
      },
      { 
        path: 'auth-ong', 
        component: () => import('pages/ONGs/Login.vue') 
      },
      { 
        path: 'signup-ong', 
        component: () => import('pages/ONGs/Register.vue') 
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'app',
        component: () => import('pages/Users/Index.vue')
      },
      {
        path: 'requests',
        component: () => import('pages/Users/Explore.vue')
      },
      {
        path: 'settings',
        component: () => import('pages/Users/Config.vue')
      },
      { 
        path: 'me', 
        component: () => import('pages/Users/Me.vue') 
      },
      { 
        path: 'donations', 
        component: () => import('pages/Users/Donations.vue') 
      },
      { 
        path: 'relatories', 
        component: () => import('pages/Users/Relatories.vue') 
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/ONGLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'main',
        component: () => import('pages/ONGs/Main.vue')
      },
      {
        path: 'packages',
        component: () => import('pages/ONGs/Packages.vue')
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
