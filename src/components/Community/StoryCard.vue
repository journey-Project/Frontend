<!-- 유저 스토리 -->
<template>
  <div class="storyCard">
    <img :src="storyImageUrl" alt="스토리 이미지" class="story-image" @click="goToStoryDetail" />
    <div class="avatar-overlay">
      <Avatar
        :profileImageUrl="profileImageUrl"
        :nickname="nickname"
        spanColor="white"
        spanFontSize="14px"
        spanFontWeight="700"
        gap="6px"
      />
    </div>
  </div>
</template>

<script setup>
import Avatar from '../Profile/Avatar.vue'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  profileImageUrl: String,
  nickname: String,
  storyImageUrl: String,
})

const router = useRouter()

const goToStoryDetail = () => {
  router.push(`/`) // 추후 스토리 클릭시 이동 페이지 연결
}
</script>
<style scoped>
.storyCard {
  position: relative;
  width: 10rem;
  height: 13rem;
  border-radius: 1rem;
  box-shadow: 3 4 4 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.story-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
.avatar-overlay {
  position: absolute;
  top: 0.5rem;
  left: 0.375rem;
}
</style>
