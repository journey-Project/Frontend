<!-- 국가 버튼 탭 -->
<template>
  <div class="country-button-group">
    <!-- 나중에 국가별 커뮤니티 페이지로 라우팅 -->
    <button
      v-for="(flag, name) in countryFlagMap"
      :key="name"
      :style="{ paddingLeft: name.length === 3 ? rem(14) : rem(20) }"
    >
      <img :src="getImagePath(flag)" class="flag-icon" alt="국기" />
      <span :style="{ width: name.length === 3 ? rem(47) : rem(32) }">{{ name }}</span>
    </button>
  </div>
</template>

<script setup>
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
</script>

<style scoped lang="scss">
@use '@/styles/_mixins' as m;
@use '@/styles/_variables' as v;

.country-button-group {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: m.rem(45);
}

.flag-icon {
  width: m.rem(40);
  height: m.rem(30);
}

button {
  padding: 0;

  width: m.rem(131);
  height: m.rem(71);
  border-radius: m.rem(20);
  background-color: v.$color-primary;
  color: v.$color-text;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: m.rem(17); // 국기와 텍스트 사이 간격
}

span {
  padding: 0;
  //   font-size: v.$fs-body;
  font-weight: 700;
  height: m.rem(21);
  white-space: nowrap;
}
</style>
