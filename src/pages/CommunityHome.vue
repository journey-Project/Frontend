<template>
  <div class="container">
    <div class="text" id="storyText">스토리</div>
    <div class="text2">내가 팔로우한 사람들과 현재를 공유해 보세요!</div>
    <StoryCarousel :stories="storyList" />

    <div class="text" id="communitytext">국가별 커뮤니티</div>
    <CountrySelectBar class="countrySelectBar" :countryFlagMap="countryFlagMap" />

    <div class="row1">
      <div class="text">동행자 모집</div>
    </div>

    <div class="cards-grid">
      <PostCard
        v-for="item in list"
        :key="item.postId"
        :id="item.postId"
        :country="item.country"
        :period="formatPeriod(item.startDate, item.endDate)"
        :title="item.title"
        :summary="item.destination"
        :thumbnail="item.coverImageUrl"
        :participants="item.max_participants"
        @detail="openDetail"
      />
    </div>

    <div class="row1">
      <img src="@/assets/icons/hot_icon.svg" class="hot-icon" />
      <div class="text">오늘의 HOT 게시물</div>
    </div>
    <hr />

    <HotPostList :posts="hotPosts" />
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CountrySelectBar from '@/components/Community/CountrySelectBar.vue'
import HotPostList from '@/components/Common/HotPost/HotPostList.vue'
import PostCard from '@/components/Common/Card/PostCard.vue'
import { list as fetchHotPosts } from '@/api/communityApi'
import { getRandomList } from '@/api/companionApi'
import StoryCard from '@/components/Community/StoryCard.vue'
import StoryCarousel from '@/components/Community/StoryCarousel.vue'

const router = useRouter()
const route = useRoute()

const hotPosts = ref([])

const list = ref([])
const loading = ref(false)

const countryFlagMap = {
  국내: 'flag_Korea.svg',
  일본: 'flag_Japan.svg',
  중국: 'flag_China.svg',
  독일: 'flag_Germany.svg',
  프랑스: 'flag_France.svg',
  베트남: 'flag_Vietnam.svg',
  미국: 'flag_USA.svg',
}

//story 임시 데이터
const storyList = ref([
  {
    id: 1,
    nickname: 'xx_xxxx',
    profileImageUrl: new URL('@/assets/storyprofile.jpg', import.meta.url).href,
    storyImageUrl: new URL('@/assets/storyimage.jpg', import.meta.url).href,
  },
  {
    id: 2,
    nickname: 'xx_xxxx',
    profileImageUrl: new URL('@/assets/storyprofile.jpg', import.meta.url).href,
    storyImageUrl: new URL('@/assets/storyimage.jpg', import.meta.url).href,
  },
  {
    id: 3,
    nickname: 'xx_xxxx',
    profileImageUrl: new URL('@/assets/storyprofile.jpg', import.meta.url).href,
    storyImageUrl: new URL('@/assets/storyimage.jpg', import.meta.url).href,
  },
  {
    id: 4,
    nickname: 'xx_xxxx',
    profileImageUrl: new URL('@/assets/storyprofile.jpg', import.meta.url).href,
    storyImageUrl: new URL('@/assets/storyimage.jpg', import.meta.url).href,
  },
  {
    id: 5,
    nickname: 'xx_xxxx',
    profileImageUrl: new URL('@/assets/storyprofile.jpg', import.meta.url).href,
    storyImageUrl: new URL('@/assets/storyimage.jpg', import.meta.url).href,
  },
  {
    id: 6,
    nickname: 'xx_xxxx',
    profileImageUrl: new URL('@/assets/storyprofile.jpg', import.meta.url).href,
    storyImageUrl: new URL('@/assets/storyimage.jpg', import.meta.url).href,
  },
  {
    id: 7,
    nickname: 'xx_xxxx',
    profileImageUrl: new URL('@/assets/storyprofile.jpg', import.meta.url).href,
    storyImageUrl: new URL('@/assets/storyimage.jpg', import.meta.url).href,
  },
])

//hot 게시물 불러오기 api 호출
onMounted(async () => {
  try {
    const response = await fetchHotPosts({ page: 1, size: 3 })
    // createdAt → Date 객체로 변환
    hotPosts.value = response.data.posts.map((post) => ({
      ...post,
      time: new Date(post.createdAt),
    }))
  } catch (error) {
    console.error('HOT 게시물 불러오기 실패:', error)
  }
})

function formatPeriod(start, end) {
  return `${start} ~ ${end}`
}

async function fetchList() {
  loading.value = true
  try {
    const { data } = await getRandomList({ count: 3 })
    list.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('랜덤 게시물 불러오기 실패:', e)
    list.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchList)

function goToHotPosts() {
  router.push('/') //나중에 핫 게시물 페이지로 연결
}
</script>
<style scoped>
.container {
  margin-bottom: var(--space-3xl);
}
.text {
  padding: 0;
  margin: 0;
  font-size: var(--fs-title);
  font-weight: var(--fw-bold);
  color: var(--color-primary);
  height: 29px;
  line-height: 29px; /* 글자 높이 맞추기 */
}
.text2 {
  color: #666666;
  font-size: var(--fs-body);
  padding: 0;
  height: 19px;
  line-height: 19px; /* 글자 높이 맞추기 */
  margin-bottom: var(--space-xl);
}
.row1 {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 1rem; /* hot_icon과 text 사이의 여백을 16px로 설정 */
}
#storyText {
  margin-top: var(--space-3xl);
  margin-bottom: var(--space-md);
}
#communitytext {
  margin-top: 2.25rem;
  margin-bottom: 1.75rem;
}
hr {
  margin: 0;
  width: 100%;
  border: 0;
  border-top: 3px solid var(--color-primary);
  margin-top: var(--space-lg);
  opacity: 1 !important;
}
.hot-icon {
  width: 21px;
}
.arrow-icon {
  margin-left: auto; /* 오른쪽 끝으로 배치 */
  width: 1rem;
  cursor: pointer;
}

.countrySelectBar {
  margin-bottom: var(--space-2xl);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 기본: 3개 */
  gap: var(--space-3xl);
  width: 100%;
  margin: var(--space-lg) auto var(--space-2xl);
}

/* 태블릿: 2개 */
@media (max-width: 1023px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 모바일: 1개 */
@media (max-width: 639px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

</style>
