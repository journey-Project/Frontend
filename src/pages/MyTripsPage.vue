<template>
  <div class="my-trips-page">
    <h1 class="title">나의 일정관리</h1>
    <p class="description">
      나의 여행일정을 관리할 수 있어요! 하단의 펜 버튼을 클릭해 여행 일정을 추가해보세요!<br />
      <span class="highlight">여행 일정을 누르면 지도에서 상세 일정을 계획</span>할 수 있어요!
    </p>

    <div class="schedule-section">
      <ScheduleManager :schedules="schedules" @refresh="fetchSchedules" />
      <SingleDatePicker :schedules="schedules" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { getProfileById, getSchedulesById } from '@/api/profileApi'
import UserCard from '@/components/Profile/UserCard.vue'
import ScheduleManager from '@/components/Profile/ScheduleManager.vue'
import SingleDatePicker from '@/components/Base/SingleDatePicker.vue'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)
const userId = computed(() => currentUser.value?.id)

const profile = ref(null)
const schedules = ref([])

const fetchProfile = async () => {
  if (!userId.value) return
  const res = await getProfileById(userId.value)
  profile.value = res.data
}
const fetchSchedules = async () => {
  if (!userId.value) return
  const res = await getSchedulesById(userId.value)
  schedules.value = res.data
}

onMounted(async () => {
  try {
    await fetchProfile()
    await fetchSchedules()
  } catch (err) {
    console.error('프로필 or 일정 조회 실패:', err)
  }
})
</script>

<style scoped>
.my-trips-page {
  margin-top: 3rem;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: #3f72af;
}

.description {
  margin-top: 1.5rem;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text, #333);
}

.highlight {
  font-weight: bold;
  color: #3f72af;
}

.schedule-section {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
