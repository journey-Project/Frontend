import { createRouter, createWebHistory } from 'vue-router'
import CompanionBoard from '@/pages/CompanionBoard.vue'
import CommunityHome from '@/pages/CommunityHome.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CommunityBoard from '@/pages/CommunityBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      //    component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/companion-board',
      name: 'CompanionBoardPage',
      component: CompanionBoard,
    },
    {
      path: '/community-board',
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
  ],
})

export default router
