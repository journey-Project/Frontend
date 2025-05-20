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

      <BaseButton>자세히 보기</BaseButton>
    </div>
  </div>
</template>


<script setup>
import BaseButton from '@/components/Base/BaseButton.vue'

defineProps({
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

defineEmits(['select', 'detail'])
</script>

<style scoped>

.card {
  position: relative;
  width: 20rem;
  aspect-ratio: 320 / 394;
  border-radius: 1.25rem;
  overflow: hidden;
  background: var(--color-surface, #f5f5f5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
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

.card__button {
  width: 116px;
  height: 28px;
  font-size: 12px;
  border-radius: 20px;
  align-self: flex-start;
  padding: 0;
  margin: 0;
}
</style>