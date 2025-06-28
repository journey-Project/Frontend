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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-3xl);
  width: 100%;
  margin: 0 auto;
}

.banner-item {
  position: relative;
  overflow: hidden;
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
  border-radius: 16px;
  object-fit: cover;
  display: block;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 11px;
}

.icon {
  height: 16px;
  width: auto;
}

.sup_title {
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1;
}
</style>
