import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/registrer',
      name: 'registrer',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/glemtpassord',
      name: 'glemtpassord',
      component: () => import('../views/ForgottenPasswordView.vue'),
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/StartView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue'),
    },
    {
      path: '/resultater',
      name: 'resultater',
      component: () => import('../views/ResultView.vue'),
    },
    {
      path: '/statistikk',
      name: 'statistikk',
      component: () => import('../views/StatsView.vue'),
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/ProfileView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const tokenStore = useTokenStore()
  try {
    await axios.get(`http://localhost:8080/check_token`, tokenStore.getAuthorizationConfig())
  } catch (error) {
    if (
      to.name !== 'login' &&
      to.name !== 'registrer' &&
      to.name !== 'home' &&
      to.name !== 'glemtpassord' &&
      error.response &&
      error.response.status === 401
    ) {
      console.error('Unauthorized!')
      return { name: 'login' }
    }
  }
})

export default router
