<!--프로필 페이지 -->
<template>
  <div class="profile-layout" v-if="auth.user">
    <ProfileSideMenu />
    <router-view :userId="auth.user.id" />
  </div>
</template>
<script setup>
import ProfileSideMenu from '@/components/Profile/ProfileSideMenu.vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { onMounted } from 'vue'

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
