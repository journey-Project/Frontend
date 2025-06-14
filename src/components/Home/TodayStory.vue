<template>
  <div class="board">
    <div class="card" v-for="each in hotPosts" :key="each.postId">
      <div class="content">
        <div class="card_top">
          <Avatar :profileImageUrl="each.profileImageUrl" :nickname="each.nickname" size="50px" />
          <!-- <div class="profile_image" v-if="each.profileImageUrl != null">
            <img :src="each.profileImageUrl" alt="" />
          </div>
          <div v-else class="profile_image">
            <img src="@/assets/main_logo.svg" class="logimg" alt="여정 로고" />
          </div>
          <div class="nickname">
            <BaseText bold size="--fs-subtitle">{{ each.nickname }}</BaseText>
          </div> -->
        </div>
        <div class="card_body" @click="goCommunity(each.postId)">
          <div class="image_list" v-if="each.imageUrls && each.imageUrls.length > 0">
            <img v-for="(imgUrl, index) in each.imageUrls" :key="index" :src="imgUrl" alt="" />
          </div>
          <div :class="['text', each.imageUrls?.length === 0 ? 'full-text' : 'clamp-text']">
            {{ each.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { mainHot } from '@/api/communityApi'
import BaseText from '../Base/BaseText.vue'
import Avatar from '../Profile/Avatar.vue'
import { useRouter } from 'vue-router'

const hotPosts = ref([])

onMounted(async () => {
  try {
    const response = await mainHot({ count: 3 })
    hotPosts.value = response.data.map((post) => ({
      ...post,
      time: post.createdAt ? new Date(post.createdAt) : new Date(),
    }))
  } catch (error) {
    console.error('HOT 게시물 불러오기 실패:', error)
  }
})

const router = useRouter()
const goCommunity = (id) => {
  router.push(`/community/${id}`)
}
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 카드 3개를 균등하게 */
  gap: var(--space-3xl);
}
.card {
  background-color: var(--color-surface);
  border: none;
  border-radius: var(--card-radius-lg);
  width: 288px;
  height: 352px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-0.25rem);
}
.content {
  margin: var(--space-lg);
}
.card_top {
  display: flex;
  gap: 8px;
  margin-bottom: var(--space-md2);
}
.card_body {
  cursor: pointer;
}

.profile_image img {
  background-color: var(--color-bg);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: var(--space-sm);
}
.nickname {
  margin-top: var(--space-sm);
}
.image_list {
  width: 240px;
  height: 120px;
  display: flex;
  gap: 4px;
  overflow-x: auto; /* 가로 스크롤 가능 */
  margin-bottom: var(--space-md2);
}
.image_list img {
  width: 100%;
  flex-shrink: 0;
  object-fit: cover;
}
.text {
  line-height: 1.4em;
  white-space: normal;
}

.clamp-text {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: calc(1.4em * 4);
}

.full-text {
  max-height: none;
}
</style>
