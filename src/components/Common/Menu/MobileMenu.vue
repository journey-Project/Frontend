<template>
  <nav :class="['mobile-menu', { 'is-active': isOpen }]">
    <div class="mobile-menu-header">
      <div class="profile-section-mobile" @click="auth.user.id ? goToProfile() : null">
        <div v-if="auth.user.id" class="profile-user-div-mobile">
          <img :src="userProfileImage" alt="프로필 이미지" class="profile-img" />
        </div>
        <span class="user-nickname">{{
          auth.user.id ? auth.user.nickname + '님' : '로그인 해주세요'
        }}</span>
      </div>
      <button class="close-mobile-menu" @click="closeMenu">&times;</button>
    </div>
    <ul class="mobile-menu-nav">
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="goTo('/community')">대시보드</a>
      </li>
      <li class="nav-item">
        <div class="mobile-menu-item-wrapper">
          <a
            href="#"
            class="nav-link"
            @click.prevent="toggleMobileSubmenu('community')"
            :class="{
              'router-link-active':
                currentPath === '/community' || currentPath.startsWith('/community-board'),
            }"
          >
            커뮤니티
          </a>
          <span
            class="submenu-toggle-arrow"
            @click.stop="toggleMobileSubmenu('community')"
            :class="{ 'rotate-arrow': openMobileSubmenu === 'community' }"
            >&#9660;</span
          >
        </div>
        <CountrySubmenu
          v-if="openMobileSubmenu === 'community'"
          :countries="['국내', '일본', '중국', '독일', '프랑스', '베트남', '미국']"
          basePath="/community-board"
          @item-clicked="closeMenu"
          class="mobile-submenu"
        />
      </li>
      <li class="nav-item">
        <div class="mobile-menu-item-wrapper">
          <a
            href="#"
            class="nav-link"
            @click.prevent="toggleMobileSubmenu('companion')"
            :class="{
              'router-link-active': currentPath.startsWith('/companion-board'),
            }"
          >
            동행자
          </a>
          <span
            class="submenu-toggle-arrow"
            @click.stop="toggleMobileSubmenu('companion')"
            :class="{ 'rotate-arrow': openMobileSubmenu === 'companion' }"
            >&#9660;</span
          >
        </div>
        <CountrySubmenu
          v-if="openMobileSubmenu === 'companion'"
          :countries="['국내', '일본', '중국', '독일', '프랑스', '베트남', '미국']"
          @item-clicked="closeMenu"
          class="mobile-submenu"
        />
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="goToMyTrips()"> 일정 </a>
      </li>
    </ul>
    <button v-if="auth.user.id" class="logout-button" @click="handleLogout">로그아웃</button>
    <button v-if="!auth.user.id" class="login-button mobile-login-button" @click="goToLogin">
      로그인
    </button>
    <BaseModal v-if="showLoginModal" @confirm="goToLogin" @close="showLoginModal = false">
      로그인이 필요한 서비스입니다.<br />
      로그인 하시겠습니까?
    </BaseModal>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter, useRoute } from 'vue-router'
import CountrySubmenu from './CountrySubmenu.vue'

import defaultProfileImage from '@/assets/default_profile.png'
import BaseModal from '@/components/Base/BaseModal.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const showLoginModal = ref(false)
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const currentPath = computed(() => route.path)

const userProfileImage = computed(() =>
  auth.userProfileImage ? auth.userProfileImage : defaultProfileImage,
)

const openMobileSubmenu = ref(null)

const closeMenu = () => {
  openMobileSubmenu.value = null
  emit('close')
}

const goToLogin = () => {
  router.push('/login').then(() => {
    closeMenu()
  })
}

function goTo(path) {
  router.push(path).then(() => {
    closeMenu()
  })
}

// 일정 페이지 이동
const goToMyTrips = () => {
  if (!auth.user.id) {
    showLoginModal.value = true
  } else {
    router.push('/mytripspage').then(() => {
      closeMenu()
    })
  }
}

const goToProfile = () => {
  if (auth.user.id) {
    router.push('/profile').then(() => {
      closeMenu()
    })
  }
}

// 서브메뉴 토글
const toggleMobileSubmenu = (menu) => {
  if (openMobileSubmenu.value === menu) {
    openMobileSubmenu.value = null
  } else {
    openMobileSubmenu.value = menu
  }
}

const handleLogout = () => {
  auth.logout()
  router.push('/').then(() => {
    closeMenu()
  })
}
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: var(--color-surface);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  box-sizing: border-box;
}

.mobile-menu.is-active {
  right: 0;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0.8rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.profile-section-mobile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer; /* 프로필 섹션 클릭 가능하게 커서 변경 */
}

.profile-user-div-mobile {
  width: 2.5rem; /* 모바일 메뉴에서 더 크게 */
  height: 2.5rem; /* 모바일 메뉴에서 더 크게 */
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid var(--color-primary); */
}

.profile-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.user-nickname {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--color-dark);
}

.close-mobile-menu {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-dark);
}

.mobile-menu-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 0.8rem;
  flex-grow: 1;
}

.mobile-menu-nav .nav-item {
  margin-bottom: 1rem; /* Reduced space between main menu items */
  display: flex;
  flex-direction: column; /* Stack link and submenu */
  align-items: flex-start; /* Align text to the left */
}

.mobile-menu-item-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.mobile-menu-nav .nav-link {
  font-size: 1.2rem;
  color: var(--color-dark);
  font-weight: 600;
  padding: 0.5rem 0;
  display: block;
  width: auto; /* Allow link to take natural width */
  flex-grow: 1; /* Allow link to take available space */
}

.submenu-toggle-arrow {
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 0.5rem; /* Make it easier to tap */
}

.submenu-toggle-arrow.rotate-arrow {
  transform: rotate(180deg);
}

.mobile-submenu {
  width: 100%;
  padding-left: 1rem; /* Indent submenus */
  border-left: 2px solid var(--color-border); /* Visual separation */
  margin-top: 0.5rem;
}

.logout-button,
.login-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
  border: 1px solid var(--color-primary);
  border-radius: 25px;
  background-color: var(--color-primary);
  color: var(--color-surface);
  font-size: var(--fs-button-lg);
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 0.75rem;
}

.mobile-login-button {
  width: 100%;
}

.router-link-active {
  font-weight: 800;
  color: var(--color-dark);
}
</style>
