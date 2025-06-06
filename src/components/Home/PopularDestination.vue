<template>
  <div class="popular-container">
    <div v-for="(item, index) in banner" :key="index" class="banner-item">
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
  grid-template-columns: repeat(3, 1fr); /* 카드 3개를 균등하게 */
  gap: var(--space-3xl); /* 카드 사이 간격 */
  width: 100%; /* 전체 컨테이너 너비 차지 */
  margin: 0 auto;
}

.banner-item {
  width: 288px;
  position: relative;
  overflow: hidden;
}

/* 이미지 채우기 */
.banner-image img {
  width: 288px;
  height: 160px;
  border-radius: 16px;
  object-fit: cover;
  display: block;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  margin-top: 11px;
  padding: 0;
}

.icon {
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  padding: 0;
  height: 16px;
  width: auto;
}

.sup_title {
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1;
}
</style>
