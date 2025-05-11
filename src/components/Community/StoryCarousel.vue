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
<style scoped lang="scss">
@use '@/styles/_variables' as v;
@use '@/styles/_mixins' as m;

.addStory {
  border: m.rem(3) solid v.$color-text;
  width: m.rem(200);
  height: m.rem(246);
  border-radius: m.rem(10);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
.story-carousel {
  display: flex;
  gap: 50px; // 카드 간 간격
  overflow-x: auto; // 필요 시 스크롤
}
</style>
