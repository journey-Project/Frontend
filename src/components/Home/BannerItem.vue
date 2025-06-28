<template>
  <div class="banner-item" :style="backgroundStyle">
    <div class="overlay" :class="`align-${props.banner.position}`">
      <p class="banner-text" v-html="formattedText"></p>
      <div class="icon-list">
        <img
          v-for="(icon, index) in props.banner.img.slice(1)"
          :key="index"
          :src="icon"
          class="icon-image"
          alt="아이콘"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ banner: Object })

// 배경 스타일
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${props.banner.img[0]})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: getJustify(props.banner.position),
  padding: '0 100px',
  position: 'relative',
}))

// 텍스트 줄바꿈
const formattedText = computed(() => props.banner.text.replace(/\n/g, '<br>'))

// 정렬 함수들
function getJustify(pos) {
  switch (pos) {
    case 'left':
      return 'flex-start'
    case 'right':
      return 'flex-end'
    default:
      return 'center'
  }
}
</script>

<style scoped>
.banner-item {
  width: 100%;
  height: 100%;
}

.overlay {
  display: flex;
  flex-direction: column;
}

/* 위치별 텍스트 및 아이콘 정렬 */
.overlay.align-left {
  text-align: left;
  align-items: flex-start;
}
.overlay.align-center {
  text-align: center;
  align-items: center;
}
.overlay.align-right {
  text-align: right;
  align-items: flex-end;
}

/* 반응형 처리: 작은 화면에서는 무조건 가운데 정렬 */
@media (max-width: 768px) {
  .overlay {
    text-align: center !important;
    align-items: center !important;
  }

  .icon-image {
    height: 30px;
  }
}

.banner-text {
  font-size: 35px;
  font-weight: var(--fw-semibold);
  color: #fff;
  text-shadow: 1px 1px 2px black;
  white-space: pre-line;
  margin-bottom: 12px;
  line-height: 1.2; /* 줄 간격을 조절 (기본은 보통 1.5~1.6) */
}

.icon-list {
  display: flex;
  gap: 12px;
}

.icon-image {
  height: 40px;
}
</style>
