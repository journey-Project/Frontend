<script setup>
import { onMounted, computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/useAuthStore'

import Footer from './components/Layout/Footer.vue'
import Header from './components/Layout/Header.vue'
import BoardFilter from './components/Common/Filter/BoardFilter.vue'
import BoardTypeTab from './components/Common/Tap/BoardTypeTab.vue'
import CompanionBoard from '@/pages/CompanionBoard.vue'
import Pagination from './components/Base/Pagination.vue'
import HeroSection from './components/Reservation/HeroSection.vue'

import BaseModal from './components/Base/BaseModal.vue'
import SingleDatePicker from './components/Base/SingleDatePicker.vue'
import RangeDatePicker from './components/Base/RangeDatePicker.vue'

const activeTab = ref('community')

const route = useRoute()
const hideLayout = computed(() => route.meta.hideLayout === true)

const auth = useAuthStore()
// onMounted 시 유저 정보 가져오기
onMounted(async () => {
  await auth.fetchUser()
  console.log('🔐 현재 로그인 유저 정보:', auth.user)
})
</script>

<template>
  <div class="layout-wrapper">
    <Header v-if="!hideLayout" />
    <!-- HeroSection 수정금지 -->
    <HeroSection v-if="route.path === '/hotelreservation'" />
    <main v-if="!hideLayout" class="main-content">
      <router-view />
    </main>
    <router-view v-else />

    <Footer v-if="!hideLayout" />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--font-family);
}

.main-content {
  flex: 1;
  max-width: 990px;
  width: 100%;
  margin: 0 auto;
}
</style>
