<template>
  <div class="hero-wrapper">
    <div class="carousel-window">
      <BannerItem :banner="banners[currentIndex]" />

      <button class="nav-button left" @click="prevSlide" :disabled="currentIndex === 0">
        <img src="@/assets/icons/main/back.svg" alt="이전" />
      </button>

      <button
        class="nav-button right"
        @click="nextSlide"
        :disabled="currentIndex === banners.length - 1"
      >
        <img src="@/assets/icons/main/next.svg" alt="다음" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BannerItem from './BannerItem.vue'
import bannerImage1 from '@/assets/icons/main/Banner.svg'

const banners = [
  {
    image: bannerImage1,
  },
  {
    image: 'https://cdn.pixabay.com/photo/2023/06/21/16/26/warnemunde-8079731_960_720.jpg',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2021/08/13/13/51/lake-6543167_640.jpg',
  },
]

const currentIndex = ref(0)

function nextSlide() {
  if (currentIndex.value < banners.length - 1) {
    currentIndex.value++
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>

<style scoped>
.hero-wrapper {
  width: 100%;
  max-width: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-window {
  position: relative;
  width: 100%;
  height: 380px; /* 원하는 배너 높이 */
}

/* 버튼 공통 스타일 */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;
}
.nav-button img {
  height: 52px;
}

.nav-button:disabled img {
  opacity: 0.3;
  cursor: default;
}

.nav-button.left {
  left: 40px;
}
.nav-button.right {
  right: 40px;
}
</style>
