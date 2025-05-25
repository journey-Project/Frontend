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
  min-width: 10rem;
  height: 13rem;
  border-radius: 1rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 2.5rem;
  height: 2.5rem;
}
.story-carousel {
  display: flex;
  gap: 2.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.story-carousel::-webkit-scrollbar {
  height: 0.5rem; /* 가로 스크롤바 높이 */
}

.story-carousel::-webkit-scrollbar-track {
  background: #f0f8ff; /* 트랙: 밝은 하늘색 */
  border-radius: 10px;
}

.story-carousel::-webkit-scrollbar-thumb {
  background: var(--color-surface);
  border-radius: 10px;
}

.story-carousel::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary); /* 호버 시 색상 */
}
</style>
c
