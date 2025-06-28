<template>
  <div class="board">
    <div class="card" v-for="each in hotPosts" :key="each.postId">
      <div class="content">
        <div class="card_top">
          <Avatar :profileImageUrl="each.profileImageUrl" :nickname="each.nickname" size="50px" />
        </div>
        <div class="card_body" @click="goCommunity(each.postId)">
          <div class="image_list" v-if="each.firstImage">
            <img :src="each.firstImage" alt="대표 이미지" />
          </div>
          <div :class="['text', !each.firstImage ? 'full-text' : 'clamp-text']">
            {{ each.plainText }}
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
    console.log(response)
    hotPosts.value = response.data.map((post) => {
      const div = document.createElement('div')
      div.innerHTML = post.content

      // 첫 번째 이미지 추출
      const firstImg = div.querySelector('img')?.getAttribute('src') || null

      // 이미지 제거 후 텍스트 추출
      div.querySelectorAll('img').forEach((img) => img.remove())
      const textContent = div.textContent || ''

      return {
        ...post,
        firstImage: firstImg,
        plainText: textContent,
        time: post.createdAt ? new Date(post.createdAt) : new Date(),
      }
    })
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
  /* width: 288px; */
  height: 352px;
  transition: transform 0.2s ease;
  overflow: hidden;
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
  height: 235px;
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4em;
  max-height: calc(1.4em * 4);
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

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3xl);
  justify-content: center;
}

@media (max-width: 960px) {
  .board {
    grid-template-columns: repeat(2, 1fr);
  }

  .card {
    width: 100%;
    height: 22rem;
  }

  .image_list {
    width: 100%;
    height: 8rem;
  }
}

@media (max-width: 640px) {
  .board {
    grid-template-columns: 1fr;
    justify-items: center; 
  }

  .text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4em;
  max-height: calc(1.4em * 4);
}

  .image_list {
    height: 10rem;
  }
}

</style>
