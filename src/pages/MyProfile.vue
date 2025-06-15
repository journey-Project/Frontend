<!-- 마이페이지 나의 프로필 -->
<template>
  <div class="profile-section">
    <UserCard :profile="profile" />
    <ScheduleManager :schedules="schedules" @refresh="fetchSchedules" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProfileById, getSchedulesById } from '@/api/profileApi'
import UserCard from '@/components/Profile/UserCard.vue'
import ScheduleManager from '@/components/Profile/ScheduleManager.vue'

const props = defineProps(['userId'])

const profile = ref(null)
const schedules = ref([])

const fetchProfile = async () => {
  const res = await getProfileById(props.userId)
  profile.value = res.data
}

const fetchSchedules = async () => {
  const scheduleRes = await getSchedulesById(props.userId)
  schedules.value = scheduleRes.data
}

onMounted(async () => {
  try {
    //  console.log(props.userId)
    await fetchProfile()
    await fetchSchedules()
  } catch (err) {
    console.error('프로필 or 일정 조회 실패:', err)
  }
})
</script>

<style scoped>
.profile-section {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  /* gap: 2rem; /* 위아래 간격 */
  /* align-items: center; /* 가운데 정렬 (선택사항) */
}
</style>
