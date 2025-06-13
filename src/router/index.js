import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CompanionBoard from '@/pages/CompanionBoard.vue'
import CommunityHome from '@/pages/CommunityHome.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import CommunityBoard from '@/pages/CommunityBoard.vue'
import CallbacKkakao from '@/components/Auth/CallbacKkakao.vue'
import CallbacNaver from '@/components/Auth/CallbacNaver.vue'
import CommunityDetail from '@/pages/CommunityDetail.vue'
import CompanionWrite from '@/pages/CompanionWrite.vue'
import CommunityWrite from '@/pages/CommunityWrite.vue'
import CompanionDetail from '@/pages/CompanionDetail.vue'
import NotFound from '@/pages/NotFound.vue'
import HotelReservation from '@/pages/HotelReservation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/companion-board/:country',
      name: 'CompanionBoard',
      component: CompanionBoard,
      props: true,
    },
    {
      path: '/community-board/:country',
      name: 'CommmunityBoardPage',
      component: CommunityBoard,
    },
    {
      path: '/community',
      name: 'Community',
      component: CommunityHome,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { hideLayout: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage,
      meta: { hideLayout: true },
    },
    {
      path: '/login/callback/kakao',
      name: 'callbackkakao',
      component: CallbacKkakao,
    },
    {
      path: '/login/callback/naver',
      name: 'callbacnaver',
      component: CallbacNaver,
    },
    {
      path: '/community/write/:country',
      name: 'CommunityWrite',
      component: CommunityWrite,
    },
    {
      path: '/community/:id',
      name: 'CommunityDetail',
      component: CommunityDetail,
      props: true,
    },
    {
      path: '/companion/write/:country',
      name: 'CompanionWrite',
      component: CompanionWrite,
    },
    {
      path: '/companion-board/:country/detail/:id',
      name: 'CompanionDetail',
      component: CompanionDetail,
      props: true,
    },
    {
      path: '/HotelReservation',
      name: 'HotelReservation',
      component: HotelReservation,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: { hideLayout: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
