<!-- 일정 카드 (여행지, 날짜, n박 n일) -->
<template>
  <div class="schedule-card">
    <img
      v-if="editMode"
      src="/src/assets/icons/cancel_icon_sm.svg"
      class="cancel-icon"
      @click="$emit('delete')"
    />
    <div class="location-row">
      <span class="location-text">{{ schedule.country }}, {{ schedule.city }}</span>
    </div>
    <div class="date-text">{{ formattedDate }} ({{ nights }}박 {{ days }}일)</div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps(['schedule', 'editMode'])

const formattedDate = computed(() => {
  const start = dayjs(props.schedule.startDate).format('MM.DD')
  const end = dayjs(props.schedule.endDate).format('MM.DD')
  return `${start} - ${end}`
})

const nights = computed(() => {
  return dayjs(props.schedule.endDate).diff(dayjs(props.schedule.startDate), 'day')
})
const days = computed(() => nights.value + 1)
</script>
<style scoped>
.schedule-card {
  position: relative;
  padding-left: 2rem;
  padding-top: 1.2rem;
  background-color: var(--color-bg);
  border-radius: 1rem;
  width: 18.5rem;
  height: 5.8rem;
}
.cancel-icon {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  cursor: pointer;
}
.location-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.location-text {
  color: var(--color-primary);
  font-weight: var(--fw-bold);
  font-size: var(--fs-body);
}

.date-text {
  margin-top: 0.5rem;
  color: var(--color-text);
  font-size: var(--fs-body);
}
</style>
