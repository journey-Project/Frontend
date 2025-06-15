<!--프로필 페이지 -->
<template>
  <div v-if="auth.user && auth.user.id" class="profile-layout">
    <ProfileSideMenu />
    <router-view :userId="auth.user.id" />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { onMounted } from 'vue'
import ProfileSideMenu from '@/components/Profile/ProfileSideMenu.vue'

const auth = useAuthStore()

onMounted(async () => {
  await auth.fetchUser()
})
</script>

<style scoped>
.profile-layout {
  margin-top: 8rem;
  margin-bottom: 14rem;
  display: flex; /* 가로 배치 */
  gap: 3.625rem;
}
</style>
