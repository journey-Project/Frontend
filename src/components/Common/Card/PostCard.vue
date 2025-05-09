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

      <BaseButton
        _text="자세히 보기"
        _style="fill"
        class="card__button"
        @click="$emit('detail', id)"
      />
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

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

.card {
  position: relative;
  width: m.rem(320);
  aspect-ratio: 320 / 394;
  border-radius: m.rem(20);
  overflow: hidden;
  background: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  &__thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: m.rem(16);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 40%, transparent);
    color: #fff;
  }

  &__info {
    margin-bottom: m.rem(8);

    & > div {
      display: flex;
      align-items: center;
      gap: m.rem(4);
      font-size: m.rem(16);
    }

    .card__location {
      font-weight: 600;
    }

    .card__date {
      margin-top: m.rem(4);
    }

    .card__participants {
      margin-top: m.rem(4);
    }

    .icon {
      width: m.rem(18);
      height: m.rem(18);
    }
  }

  &__summary {
    font-size: m.rem(16);
    line-height: 1.3;
    max-height: 2.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: m.rem(12);
  }

  &__button {
    width: m.rem(116) !important;
    height: m.rem(28) !important;
    font-size: m.rem(12) !important;
    border-radius: m.rem(20) !important;
    align-self: flex-start;
    padding: 0;
    margin: 0 !important;
  }
}
</style>
