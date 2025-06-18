<template>
  <header>
    <div class="header-inner">
      <!-- 로고 -->
      <router-link to="/" class="left">
        <img src="@/assets/main_logo.svg" class="logimg" />
      </router-link>

      <!-- 메뉴 -->
      <div class="center">
        <ul class="navbar-nav menu-nav">
          <!-- <li class="nav-item"><a class="nav-link" href="#">About</a></li> -->
          <li class="nav-item" @mouseenter="showSubmenu('community')">
            <router-link
              class="nav-link"
              to="/community"
              :class="{
                'router-link-active':
                  currentPath === '/community' || currentPath.startsWith('/community-board'),
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
          <li class="nav-item"><a class="nav-link" href="https://journeysite.site/hotelreservation" @mouseenter="hideSubmenu">예약</a></li>
          <!-- 임시 -->
          <li class="nav-item"><a class="nav-link" href="https://journeysite.site/profile" @mouseenter="hideSubmenu">일정</a></li>
          <!-- <li class="nav-item"><a class="nav-link" href="#">공지사항</a></li> -->
        </ul>
      </div>

      <!-- 오른쪽 아이콘 + 프로필 -->

      <a v-if="auth.user.id" class="nav-link profile-wrapper" href="#" id="notify_icon_a">
        <img src="@/assets/icons/notify_icon.svg" class="notify_icon" />
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
    </div>
  </header>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, provide } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

import ProfilePopover from '../Profile/ProfilePopover.vue'
import CountrySubmenu from '../Common/Menu/CountrySubmenu.vue'

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
</script>
<style scoped>
header {
  background-color: var(--color-surface);
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  /* border: 2px solid var(--color-primary); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img {
  width: 100%;
  height: auto;
  object-position: contain;
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
  position: relative; /* 팝오버의 기준점 */
}
.profile-wrapper {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.profile-popover {
  position: absolute;
  top: 100%; /* 프로필 이미지 바로 아래 */
  left: -750%;
  transform: translateX(0%);
  margin-top: 10px;
  z-index: 1000; /* 다른 요소 위에 표시 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.submenu-item:hover {
  text-decoration: underline;
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
  .menu-nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .header-inner {
    flex-wrap: wrap;
  }

  .center {
    justify-content: space-between;
  }

  .right {
    margin-top: 12px;
    justify-content: flex-end;
    width: 100%;
    gap: 20px;
  }
}

.router-link-active {
  font-weight: 800;
  color: var(--color-dark);
}
</style>
