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
import { ref, computed, onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import BannerItem from './BannerItem.vue'
import bannerImage1 from '@/assets/icons/main/bannerImage.png'
import bannerImage2 from '@/assets/icons/main/bannerImage2.jpg'
import bannerImage3 from '@/assets/icons/main/bannerImage3.jpg'
import mainLogo from '@/assets/main_logo_w.svg'

const banners = [
  {
    img: [bannerImage1, mainLogo],
    text: '여정을 기록하는,\n 여행 커뮤니티',
    position: 'left',
  },
  {
    img: [bannerImage2, mainLogo],
    text: '여정을 기록하는,\n 여행 커뮤니티',
    position: 'right',
  },
  {
    img: [bannerImage3, mainLogo],
    text: '여정을 기록하는,\n 여행 커뮤니티',
    position: 'center',
  },
]
const bannersWithClone = computed(() => [...banners, banners[0]]) // 마지막에 첫 번째 배너 복제

const currentIndex = ref(0)
const isTransitionDisabled = ref(false)
let intervalId = null

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
}))

function nextSlide() {
  if (isTransitionDisabled.value) return
  if (currentIndex.value < banners.length) {
    currentIndex.value++
  }
}

function prevSlide() {
  if (currentIndex.value === 0) {
    // 첫 번째에서 뒤로 가려는 경우 → 복제된 마지막 배너로 이동 → 실제 마지막으로 자연스럽게 이동
    isTransitionDisabled.value = true
    currentIndex.value = banners.length
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
  if (currentIndex.value === banners.length) {
    // 마지막 복제 배너 → 진짜 첫 번째 배너로 순간 이동
    isTransitionDisabled.value = true
    currentIndex.value = 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitionDisabled.value = false
      })
    })
  }
}

function startAutoSlide() {
  clearInterval(intervalId)
  intervalId = setInterval(nextSlide, 5000)
}

function stopAutoSlide() {
  clearInterval(intervalId)
}

function resetSlider() {
  stopAutoSlide()
  currentIndex.value = 0
  isTransitionDisabled.value = true
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isTransitionDisabled.value = false
      startAutoSlide()
    })
  })
}

onMounted(() => {
  resetSlider()
})

onBeforeUnmount(() => {
  stopAutoSlide()
})
</script>

<style scoped>
.hero-wrapper {
  width: 100%;
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
