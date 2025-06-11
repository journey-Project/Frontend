<template>
  <div class="card">
    <img :src="thumbnail" :alt="`${title} 썸네일`" class="card__thumbnail" />

    <div class="card__overlay">
      <div class="card__info">
        <div class="card__location">
          <img src="@/assets/icons/companion/nationSideIcon.svg" alt="국가 아이콘" class="icon" />
          {{ country }}
        </div>
        <div class="card__date">{{ period }}</div>
        <div class="card__participants">
          <img src="@/assets/icons/companion/participants.svg" alt="인원 아이콘" class="icon" />
          {{ participants }}명
        </div>
      </div>

      <div class="card__summary">{{ summary }}</div>

      <BaseButton @click="goToDetail">자세히 보기</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/Base/BaseButton.vue'

const props = defineProps({
  id: Number,
  country: String,
  period: String,
  title: String,
  summary: String,
  thumbnail: String,
  participants: {
    type: Number,
    default: 0,
  },
})

const router = useRouter()

function goToDetail() {
  router.push(`/companion-board/${props.country}/detail/${props.id}`)
}
</script>

<style scoped>

.card {
  position: relative;
  width: 18rem;
  height: 22rem; /* 임의로 수정X 디자인 변경 요청 */
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-0.25rem);
}

.card__thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 40%, transparent);
  color: #fff;
}

.card__info {
  margin-bottom: 0.5rem;
}

.card__info > div {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--fs-body, 1rem);
}

.card__location {
  font-weight: var(--fw-semibold, 600);
}

.card__date,
.card__participants {
  margin-top: 0.25rem;
}

.icon {
  width: 1rem;
  height: 1rem;
}

.card__summary {
  font-size: var(--fs-body, 1rem);
  line-height: 1.3;
  max-height: 2.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.75rem;
}
</style>
