<template>
  <div class="info-box">
    <div class="grid-box">
      <div class="info-item">
        <img src="@/assets/icons/companion/date_icon.svg" alt="기간" />
        <span class="label">기간</span>
        <span class="value">{{ formattedDate }}</span>
      </div>
      <div class="info-item">
        <img src="@/assets/icons/companion/navi_icon.svg" alt="장소" />
        <span class="label">장소</span>
        <span class="value">{{ destination }}</span>
      </div>
      <div class="info-item">
        <img src="@/assets/icons/companion/person.svg" alt="희망인원" />
        <span class="label">희망인원</span>
        <span class="value">{{ max_participants }}명</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  start_date: String,
  end_date: String,
  destination: String,
  max_participants: Number,
})

// 기간 포맷팅
const formattedDate = computed(() => {
  const start = props.start_date?.slice(5).replace('-', '.')
  const end = props.end_date?.slice(5).replace('-', '.')
  return start && end ? `${start} - ${end}` : ''
})
</script>

<style scoped>
img {
  width: 1rem;
  height: 1rem;
}
.info-box {
  margin-top: 1rem;
  background-color: var(--color-surface);
  border-radius: 1.25rem;
  width: 60rem;
  height: 8rem;
  padding-left: 1.5rem;
  padding-top: 1.25rem;
}
.grid-box {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}
.info-item {
  display: grid;
  grid-template-columns: auto 3.5rem 1fr;
  align-items: center;
  column-gap: 1.5rem;
  color: var(--color-primary);
  height: auto;
}
.value {
  color: var(--color-text);
}
</style>
