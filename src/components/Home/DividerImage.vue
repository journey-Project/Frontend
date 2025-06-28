<template>
  <div class="divider">
    <img :src="divBannerUrl" alt="이벤트 배너" />
  </div>
</template>

<script setup>
import divBannerUrl from '@/assets/icons/main/divImage.svg'

// TODO: 추후 API로 대체 예정
/*
import { onMounted, ref } from 'vue'
import { fetchBanner } from '@/api/bannerApi'

const divBannerUrl = ref('')

// 마운트 시 배너 이미지 불러오기
onMounted(async () => {
  try {
    const res = await fetchBanner()
    divBannerUrl.value = res.data.imageUrl // 예시: API에서 imageUrl 받아옴
  } catch (err) {
    console.error('배너 불러오기 실패:', err)
    divBannerUrl.value = require('@/assets/icons/main/event_banner.svg') // fallback
  }
})
*/
</script>

<style scoped>
.divider {
  height: 200px;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
