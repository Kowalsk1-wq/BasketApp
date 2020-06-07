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
        path: 'user-active',
        component: () => import('pages/Users/Actived.vue')
      },
      { 
        path: 'auth-ong', 
        component: () => import('pages/ONGs/Login.vue') 
      },
      { 
        path: 'signup-ong', 
        component: () => import('pages/ONGs/Register.vue') 
      },
      {
        path: 'ong-actived',
        component: () => import('pages/ONGs/Actived.vue')
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
        path: 'donation',
        component: () => import('pages/Users/Donation.vue')
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
        path: 'baskets',
        component: () => import('pages/ONGs/Basket.vue')
      },
      {
        path: 'approved',
        component: () => import('pages/ONGs/Approved.vue')
      }
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
