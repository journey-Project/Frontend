<template>
  <header>
    <div class="header-inner">
      <!-- 로고 -->
      <router-link to="/" class="left">
        <img src="@/assets/main_logo.svg" class="logimg" />
      </router-link>

      <!-- 메뉴 -->
      <div class="center desktop-menu">
        <ul class="navbar-nav menu-nav">
          <!-- <li class="nav-item"><a class="nav-link" href="#">About</a></li> -->
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/community/"
              :class="{
                'router-link-active': currentPath.startsWith === '/community',
              }"
              >대시보드</router-link
            >
          </li>
          <li class="nav-item" @mouseenter="showSubmenu('community')">
            <router-link
              class="nav-link"
              to="/community-board/국내"
              :class="{
                'router-link-active': currentPath === currentPath.startsWith('/community-board'),
              }"
              >커뮤니티</router-link
            >
            <CountrySubmenu
              @mouseenter="showSubmenu('community')"
              @mouseleave="hideSubmenu"
              v-if="activeMenu === 'community'"
              :countries="['국내', '일본', '중국', '독일', '프랑스', '베트남', '미국']"
              basePath="/community-board"
            />
          </li>
          <li class="nav-item" @mouseenter="showSubmenu('companion')">
            <router-link
              class="nav-link"
              to="/companion-board/국내"
              :class="{
                'router-link-active': currentPath.startsWith('/companion-board'),
              }"
              >동행자</router-link
            >
            <CountrySubmenu
              @mouseenter="showSubmenu('companion')"
              @mouseleave="hideSubmenu"
              v-if="activeMenu === 'companion'"
              :countries="['국내', '일본', '중국', '독일', '프랑스', '베트남', '미국']"
              basePath="/companion-board"
            />
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="goToMyTrips" @mouseenter="hideSubmenu">
              일정
            </a>
          </li>
          <BaseModal v-if="showLoginModal" @confirm="goToLogin" @close="showLoginModal = false">
            로그인이 필요한 서비스입니다.<br />
            로그인 하시겠습니까?
          </BaseModal>
        </ul>
      </div>

      <!-- 오른쪽 아이콘 + 프로필 -->

      <a v-if="auth.user.id" class="nav-link profile-wrapper" href="#" id="notify_icon_a">
        <!-- <img src="@/assets/icons/notify_icon.svg" class="notify_icon" /> -->
      </a>
      <div v-if="auth.user.id" class="nav-link profile-container" ref="profileContainer">
        <a class="profile-wrapper" href="#" @click.prevent="toggleProfilePopover">
          <div class="profile-user-div">
            <img :src="userProfileImage" alt="프로필 이미지" class="profile-img" />
          </div>
        </a>
        <ProfilePopover v-if="showProfilePopover" class="profile-popover" />
      </div>

      <button v-if="!auth.user.id" class="login-button" @click="goToLogin">
        <img src="@/assets/icons/profile_icon.svg" />로그인
      </button>

      <button
        :class="['hamburger-menu-toggle', { 'is-active': isMobileMenuOpen }]"
        @click="toggleMobileMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <MobileMenu :is-open="isMobileMenuOpen" @close="toggleMobileMenu" />

    <div class="overlay" :class="{ 'is-active': isMobileMenuOpen }" @click="toggleMobileMenu"></div>
  </header>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, provide } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

import ProfilePopover from '../Profile/ProfilePopover.vue'
import CountrySubmenu from '../Common/Menu/CountrySubmenu.vue'
import BaseModal from '../Base/BaseModal.vue'
import MobileMenu from '../Common/Menu/MobileMenu.vue'

const showLoginModal = ref(false)
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const currentPath = computed(() => route.path)

const showProfilePopover = ref(false)
const profileContainer = ref(null)

const userProfileImage = computed(() => (auth.userProfileImage ? auth.userProfileImage : ''))

const goToLogin = () => {
  router.push('/login')
}

function goTo(path) {
  router.push(path)
}

const goToMyTrips = () => {
  console.log('일정 클릭', auth.user.id)
  if (!auth.user.id) {
    showLoginModal.value = true
  } else {
    router.push('/mytripspage')
  }
}

const toggleProfilePopover = () => {
  showProfilePopover.value = !showProfilePopover.value
}

const closePopover = () => {
  showProfilePopover.value = false
}

provide('closePopover', closePopover)

// 바깥 클릭 시 닫기 처리
const onClickOutside = (event) => {
  if (profileContainer.value && !profileContainer.value.contains(event.target)) {
    showProfilePopover.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  console.log(currentPath.value)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

const activeMenu = ref(null)

const showSubmenu = (menu) => {
  activeMenu.value = menu
}

const hideSubmenu = () => {
  activeMenu.value = null
}

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogout = () => {
  auth.logout()
  router.push('/')
  toggleMobileMenu()
}
</script>
<style scoped>
header {
  background-color: var(--color-surface);
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* 모바일 메뉴 오버레이를 위해 필요 */
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 60rem;
  padding: 0;
  box-sizing: border-box;
}

.left {
  width: 3.5rem;
}

.logimg {
  width: 100%;
  height: 100%;
}

.center {
  margin-left: 8rem;
  display: flex;
  align-items: center;
  height: 1.5rem;
  flex: 1;
  max-width: 32.5rem;
  margin-right: 8rem;
}

.menu-nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-link {
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--fs-menu);
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
}

/* 공통 정렬 */
.left,
.center,
.right,
.li-center {
  display: flex;
  align-items: center;
}

.right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0rem;
}

.nav-item.li-center {
  gap: 3rem;
}

.profile-user-div {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-user-div-mobile {
  width: 2.5rem; /* 모바일 메뉴에서 더 크게 */
  height: 2.5rem; /* 모바일 메뉴에서 더 크게 */
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--color-primary);
}

.profile-img {
  width: 100%;
  height: auto;
  object-fit: cover; /* 이미지가 잘리지 않고 채워지도록 */
}

.notify_icon,
.info_icon {
  width: 1.25rem;
  height: auto;
}

.profile_button {
  width: 1rem;
  height: 0.7rem;
}

#notify_icon_a {
  margin-left: 2rem;
  margin-right: 2rem;
}
#profile_buton_a {
  margin-left: 2rem;
}

.login-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 7.5rem;
  height: 2rem;
  gap: 0.875rem;
  border: 1px solid var(--color-primary);
  border-radius: 25px;
  background-color: var(--color-surface);
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.login-button:hover {
  background-color: rgba(63, 114, 175, 0.3);
}
.profile-container {
  position: relative;
}
.profile-wrapper {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.profile-popover {
  position: absolute;
  top: 100%;
  left: -750%;
  transform: translateX(0%);
  margin-top: 10px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.submenu-item:hover {
  text-decoration: underline;
}

/* 햄버거 메뉴 아이콘 */
.hamburger-menu-toggle {
  display: none; /* 기본적으로 데스크탑에서는 숨김 */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001; /* 다른 요소 위에 표시되도록 */
}

.hamburger-menu-toggle .bar {
  display: block;
  width: 1.5rem;
  height: 0.2rem;
  background-color: var(--color-primary);
  margin: 5px 0;
  transition: all 0.3s ease-in-out;
}

/* 모바일 메뉴 */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%; /* 초기에는 화면 오른쪽 밖으로 */
  width: 80%; /* 필요에 따라 조정 */
  max-width: 300px; /* 큰 화면에서도 최대 너비 제한 */
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
  right: 0; /* 슬라이드인 */
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
  flex-grow: 1; /* 메뉴 항목이 사용 가능한 공간을 차지하도록 */
}

.mobile-menu-nav .nav-item {
  margin-bottom: 1.2rem;
}

.mobile-menu-nav .nav-link {
  font-size: 1.2rem;
  color: var(--color-dark);
  font-weight: 600;
  padding: 0.5rem 0;
  display: block;
  width: 100%;
}

.logout-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
  border: 1px solid var(--color-primary);
  border-radius: 25px;
  background-color: var(--color-primary);
  color: var(--color-surface);
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: auto; /* 버튼을 하단으로 밀어냄 */
}

.logout-button:hover {
  background-color: var(--color-secondary);
}

/* 모바일 메뉴가 열렸을 때 오버레이 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none; /* 기본적으로 숨김 */
}

.overlay.is-active {
  display: block;
}

/* 반응형 설정 */
@media (max-width: 1024px) {
  .center {
    margin-left: 40px;
    margin-right: 40px;
  }

  .nav-link {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none; /* 데스크탑 메뉴 숨김 */
  }

  .profile-wrapper {
    /* 데스크탑 로그인 버튼 숨김 */
    display: none;
  }

  .hamburger-menu-toggle {
    display: block; /* 햄버거 아이콘 표시 */
    margin-left: auto; /* 오른쪽으로 정렬 */
  }

  .login-button {
    display: none; /* 로그인 버튼 숨김 (모바일 메뉴에서 처리) */
  }

  /* 일관성을 위해 프로필 아이콘 위치 조정 */
  .profile-container {
    margin-left: auto;
    margin-right: 1rem; /* 간격 조정 */
  }

  #notify_icon_a {
    margin-left: 0;
    margin-right: 0.5rem;
  }

  .header-inner {
    justify-content: space-between;
  }

  header .header-inner:has(~ .overlay.is-active) .hamburger-menu-toggle {
    display: none;
  }
}

.router-link-active {
  font-weight: 800;
  color: var(--color-dark);
}
</style>
