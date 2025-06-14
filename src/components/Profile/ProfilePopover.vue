<template>
  <div v-if="userNickname" class="popover-box">
    <div class="profile-user-div">
      <img :src="userProfileImage" alt="프로필 이미지" class="profile-img" />
    </div>
    <p class="nickname">안녕, {{ userNickname }}!</p>
    <FollowStats :following-count="followingCount" :follower-count="followerCount" />
    <ProfileActionButtons />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { getFollowingList, getFollwerList } from '@/api/profileApi'

import FollowStats from './FollowStats.vue'
import ProfileActionButtons from './ProfileActionButtons.vue'

const auth = useAuthStore()

const followingCount = ref(0)
const followerCount = ref(0)

const userNickname = computed(() => auth.userNickname)
const userProfileImage = computed(() => (auth.userProfileImage ? auth.userProfileImage : ''))

onMounted(async () => {
  await auth.fetchUser()
  if (auth.user.id) {
    const [followingRes, followerRes] = await Promise.all([
      getFollowingList(auth.user.id),
      getFollwerList(auth.user.id),
    ])
    followingCount.value = followingRes.data.length
    followerCount.value = followerRes.data.length
  }
})
</script>

<style scoped>
.popover-box {
  flex-shrink: 0;
  width: 22.5rem;
  height: 29rem;
  background-color: var(--color-primary);
  border-radius: 1rem;

  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center; /* 수평 중앙 정렬 */
}

.profile-user-div {
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  overflow: hidden;
  /* border: 2px solid var(--color-primary); */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.profile-img {
  width: 100%;
  height: auto;
  object-position: contain;
}

.nickname {
  color: white;
  font-size: var(--fs-menu);
  font-weight: var(--fw-bold);
  margin-top: 1rem;
}
</style>
