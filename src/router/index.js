import { createRouter, createWebHistory } from 'vue-router'
import { getActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/companion-board/:country',
      name: 'CompanionBoard',
      component: () => import('@/pages/CompanionBoard.vue'),
    },
    {
      path: '/community-board/:country',
      name: 'CommmunityBoardPage',
      component: () => import('@/pages/CommunityBoard.vue'),
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/pages/CommunityHome.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { hideLayout: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/SignUpPage.vue'),
      meta: { hideLayout: true },
    },
    {
      path: '/login/callback/kakao',
      name: 'callbackkakao',
      component: () => import('@/components/Auth/CallbacKkakao.vue'),
    },
    {
      path: '/login/callback/naver',
      name: 'callbacnaver',
      component: () => import('@/components/Auth/CallbacNaver.vue'),
    },
    {
      path: '/community/write',
      name: 'CommunityCreate',
      component: () => import('@/pages/CommunityWrite.vue'),
    },
    {
      path: '/community/write/:country/edit/:id',
      name: 'CommunityEdit',
      component: () => import('@/pages/CommunityWrite.vue'),
      props: true,
    },
    {
      path: '/community/:id',
      name: 'CommunityDetail',
      component: () => import('@/pages/CommunityDetail.vue'),
      props: true,
    },
    {
      path: '/companion/write',
      name: 'CompanionCreate',
      component: () => import('@/pages/CompanionWrite.vue'),
    },
    {
      path: '/companion-board/:country/detail/:id',
      name: 'CompanionDetail',
      component: () => import('@/pages/CompanionDetail.vue'),
      props: true,
    },
    {
      path: '/companion/write/:country/edit/:id',
      component: () => import('@/pages/CompanionWrite.vue'),
    },
    {
      path: '/hotelreservation',
      name: 'HotelReservation',
      component: () => import('@/pages/HotelReservation.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue'),
      meta: { hideLayout: true },
    },
    {
      path: '/mytripspage',
      name: 'MyTripsPage',
      component: () => import('@/pages/MyTripsPage.vue'),
    },
    {
      path: '/profile',
      name: 'ProfilePage',
      component: () => import('@/pages/ProfilePage.vue'),
      children: [
        {
          path: '',
          name: 'MyProfile',
          component: () => import('@/pages/MyProfile.vue'),
        },
        {
          path: 'follow',
          name: 'FollowPage',
          component: () => import('@/pages/FollowPage.vue'),
        },
        {
          path: 'story',
          name: 'StoryPage',
          component: () => import('@/pages/StoryPage.vue'),
        },
        {
          path: 'setting',
          name: 'SettingPage',
          component: () => import('@/pages/SettingPage.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const pinia = getActivePinia()
  const auth = useAuthStore(pinia)

  const protectedPathPatterns = [/^\/community\/write/, /^\/companion\/write/]

  const requiresAuth = protectedPathPatterns.some((regex) => regex.test(to.path))

  if (!auth.isLoggedIn) {
    await auth.fetchUser()
  }

  if (auth.isLoggedIn && to.path === '/login') {
    return next('/')
  }

  if (requiresAuth && !auth.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  } else {
    next()
  }
})

export default router
