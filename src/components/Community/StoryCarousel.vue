<!-- 유저 스토리 가로 슬라이더 -->
<template>
  <div class="story-carousel">
    <div class="addStory" @click="goToAddStory">
      <img src="@/assets/icons/plus_icon.svg" />
    </div>

    <div class="story-items" v-for="story in stories" :key="story.id">
      <StoryCard
        :profileImageUrl="story.profileImageUrl"
        :nickname="story.nickname"
        :storyImageUrl="story.storyImageUrl"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import StoryCard from './StoryCard.vue'

defineProps({
  stories: Array,
})

const router = useRouter()

const goToAddStory = () => {
  router.push('/') // 추후 스토리 추가 페이지로 이동 연결
}
</script>
<style scoped>

.addStory {
  border: 3px solid var(--color-primary);
  width: 200px;
  height: 246px;
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
.story-carousel {
  display: flex;
  gap: 50px; 
  overflow-x: auto; 
}
</style>