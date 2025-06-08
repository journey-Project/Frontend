<template>
  <div class="hero-wrapper">
    <div class="carousel-window" @transitionend="handleTransitionEnd">
      <div
        class="carousel-track"
        :style="trackStyle"
        :class="{ 'no-transition': isTransitionDisabled }"
      >
        <div class="carousel-slide" v-for="(banner, index) in bannersWithClone" :key="index">
          <BannerItem :banner="banner" />
        </div>
      </div>

      <button class="nav-button left" @click="prevSlide">
        <img src="@/assets/icons/main/back.svg" alt="이전" />
      </button>
      <button class="nav-button right" @click="nextSlide">
        <img src="@/assets/icons/main/next.svg" alt="다음" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import BannerItem from './BannerItem.vue'
import bannerImage1 from '@/assets/icons/main/Banner.svg'

const banners = [
  { image: bannerImage1 },
  { image: 'https://cdn.pixabay.com/photo/2023/06/21/16/26/warnemunde-8079731_960_720.jpg' },
  { image: 'https://cdn.pixabay.com/photo/2021/08/13/13/51/lake-6543167_640.jpg' },
]

// 1. 복제된 슬라이드 포함
const bannersWithClone = computed(() => [...banners, banners[0]])

const currentIndex = ref(0)
const isTransitionDisabled = ref(false)
let intervalId = null

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
}))

function nextSlide() {
  currentIndex.value++
}

function prevSlide() {
  if (currentIndex.value === 0) {
    isTransitionDisabled.value = true
    currentIndex.value = banners.length // clone 위치로
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitionDisabled.value = false
        currentIndex.value = banners.length - 1
      })
    })
  } else {
    currentIndex.value--
  }
}

function handleTransitionEnd() {
  // 마지막에서 clone으로 갔다면 진짜 첫 번째로 이동
  if (currentIndex.value === banners.length) {
    isTransitionDisabled.value = true
    currentIndex.value = 0

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitionDisabled.value = false
      })
    })
  }
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
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
  height: 380px;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.6s ease-in-out;
}

.carousel-track.no-transition {
  transition: none !important;
}

.carousel-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

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
.nav-button.left {
  left: 40px;
}
.nav-button.right {
  right: 40px;
}
</style>
