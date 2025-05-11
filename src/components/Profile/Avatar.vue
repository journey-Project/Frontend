<!-- 사용자 이니셜/이미지 표시 -->
<template>
  <div class="profile-wrapper" :style="wrapperStyle">
    <div class="profile-user-div">
      <img :src="profileImageUrl" alt="프로필 이미지" class="profile-img" @click="goToProfile" />
    </div>
    <span :style="spanStyle">{{ nickname }}</span>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  profileImageUrl: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  spanColor: {
    type: String,
    default: '#333', // 기본 색상
  },
  spanFontSize: {
    type: String,
    default: '18px', // 기본 font-size
  },
  spanFontWeight: {
    type: String,
    default: '500', // 기본 font-weight
  },
  gap: {
    type: String,
    default: '15px', // 이미지와 텍스트 간격 기본값
  },
})

const wrapperStyle = {
  gap: props.gap, // 이미지와 텍스트 사이 간격
}

const spanStyle = {
  color: props.spanColor,
  fontSize: props.spanFontSize,
  fontWeight: props.spanFontWeight,
}

const router = useRouter()

const goToProfile = () => {
  router.push(`/companion`) // 추후 프로필 페이지 이동 연결
}
</script>
<style scoped lang="scss">
@use '@/styles/_mixins' as m;
@use '@/styles/_variables' as v;

.profile-wrapper {
  display: flex;
  align-items: center;
}

.profile-user-div {
  width: m.rem(36);
  height: m.rem(36);
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid v.$color-text;
  cursor: pointer;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
<!-- 사용 방법-->
<!-- <Avatar
    profileImageUrl="@/assets/profile.jpg"
    nickname="구름"
    :spanColor="'#ff6347'"  // 텍스트 색상
    :spanFontSize="'20px'"  // 텍스트 크기
    :spanFontWeight="'700'"  // 텍스트 두께
    :gap="'20px'"  // 이미지와 텍스트 간격
  /> -->
