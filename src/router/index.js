import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/pages/HomePage.vue') },
      { path: 'products', name: 'products', component: () => import('@/pages/ProductListPage.vue') },
      { path: 'products/:id', name: 'product-detail', component: () => import('@/pages/ProductDetailPage.vue') },
      { path: 'category/:slug', name: 'category', component: () => import('@/pages/ProductListPage.vue') },
      { path: 'categories', name: 'categories', component: () => import('@/pages/CategoriesPage.vue') },
      { path: 'contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
      { path: 'cart', name: 'cart', component: () => import('@/pages/CartPage.vue') },
      { path: 'checkout', name: 'checkout', component: () => import('@/pages/CheckoutPage.vue'), meta: { requiresAuth: true } },
      { path: 'wishlist', name: 'wishlist', component: () => import('@/pages/WishlistPage.vue'), meta: { requiresAuth: true } },
      { path: 'orders', name: 'orders', component: () => import('@/pages/OrdersPage.vue'), meta: { requiresAuth: true } },
      { path: 'orders/:id', name: 'order-detail', component: () => import('@/pages/OrderDetailPage.vue'), meta: { requiresAuth: true } },
      { path: 'profile', name: 'profile', component: () => import('@/pages/ProfilePage.vue'), meta: { requiresAuth: true } },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('@/pages/auth/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('@/pages/auth/RegisterPage.vue') },
      { path: 'auth/social/callback/:driver', name: 'social-callback', component: () => import('@/pages/auth/SocialCallbackPage.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFoundPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
