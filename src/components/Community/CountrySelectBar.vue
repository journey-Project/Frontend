<!-- 국가 버튼 탭 -->
<template>
  <div class="country-button-group">
    <button v-for="(flag, name) in countryFlagMap" :key="name" @click="goToCountryCommunity(name)">
      <img
        :src="getImagePath(flag)"
        class="flag-icon"
        alt="국기"
        :style="{ marginRight: name.length === 3 ? rem(12) : rem(16) }"
      />
      <span>{{ name }}</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// rem 계산 유틸 (m.rem 함수처럼)
const rem = (px) => `${px / 16}rem`

const { countryFlagMap } = defineProps({
  countryFlagMap: {
    type: Object,
    required: true,
  },
})

// 이미지 경로 처리
const getImagePath = (filename) => {
  if (!filename) return ''
  try {
    return new URL(`../../assets/icons/country_flag/${filename}`, import.meta.url).href
  } catch (err) {
    console.error('이미지 경로 에러:', filename, err)
    return ''
  }
}

const goToCountryCommunity = (countryName) => {
  router.push(`/community-board/${countryName}`)
}
</script>

<style scoped>
.country-button-group {
  max-width: 60rem;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.flag-icon {
  width: 2rem;
  height: 1.5rem;
}

button {
  padding: 0;

  padding-left: 1.25rem;
  width: 7.5rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: var(--color-surface);
  color: var(--color-primary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

span {
  padding: 0;
  /* font-size: v.$fs-body; */
  font-weight: 700;
  height: 21px;
  white-space: nowrap;
}
</style>
