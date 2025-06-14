<template>
  <div class="profile-wrapper" :style="{ gap: gap }">
    <div class="profile-user-div" :style="{ width: size, height: size }">
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
    default: '#333',
  },
  spanFontSize: {
    type: String,
    default: '1rem',
  },
  spanFontWeight: {
    type: String,
    default: '500',
  },
  gap: {
    type: String,
    default: '0.75rem',
  },
  size: {
    type: String,
    default: '1.75rem', // 🟡 바로 이거! 28px
  },
})

const spanStyle = {
  color: props.spanColor,
  fontSize: props.spanFontSize,
  fontWeight: props.spanFontWeight,
}

const router = useRouter()
const goToProfile = () => {
  router.push(`/companion`)
}
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  align-items: center;
}

.profile-user-div {
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
