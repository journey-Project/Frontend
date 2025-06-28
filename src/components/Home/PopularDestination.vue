<template>
  <div class="popular-container">
    <div v-for="(item, index) in banner.slice(0, 3)" :key="index" class="banner-item">
      <div class="banner-image">
        <img :src="item.image" alt="배너 이미지" />
      </div>
      <div class="location">
        <img src="/src/assets/icons/main/navi_icon.svg" class="icon" />
        <BaseText bold size="--fs-subtitle" class="sup_title">{{ item.location }}</BaseText>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseText from '../Base/BaseText.vue'

defineProps({
  banner: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.popular-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3xl);
  width: 100%;
}

.banner-item {
  transition: transform 0.2s ease;
  width: 100%;
  max-width: 288px;
  margin: 0 auto;
}

.banner-item:hover {
  transform: translateY(-0.25rem);
}

.banner-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 288 / 160;
  object-fit: cover;
  display: block;
  border-radius: 16px;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: nowrap;
}

.icon {
  height: 16px;
  width: auto;
  flex-shrink: 0;
}

.sup_title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  line-height: 1;
  margin: 0 !important;
  padding: 0 !important;
}

/* 반응형 처리 */
@media (max-width: 960px) {
  .popular-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .popular-container {
    grid-template-columns: 1fr;
  }

  .banner-item {
    max-width: 100%;
  }
}
</style>
