<!-- 메인 홈 랜딩 페이지 -->
<template>
  <div class="container">
    <div class="box" style="margin-top: var(--space-2xl)"><HeroBanner></HeroBanner></div>

    <div class="box">
      <div class="title">
        <BaseText bold size="--fs-title">
          {{
            auth.userNickname
              ? auth.userNickname + '님, 이런 여행지는 어떠세요?'
              : '여정만의 여행지 추천'
          }}
        </BaseText>
        <BaseText color="--color-text" size="--fs-body" class="sub_title" font-weight="--fw-medium"
          >사용자님이 기록한 여행을 토대로 <span class="point">여정</span>에서 다음 여행지를
          추천해드려요</BaseText
        >
      </div>
      <PopularDestination :banner="banners" />
    </div>

    <div class="box package-section">
      <BaseText bold size="--fs-title" class="title">오늘의 추천 패키지</BaseText>
      <TravelPackageCard :card="cards[0]" />
    </div>

    <div class="box">
      <div class="title">
        <BaseText bold size="--fs-title">함께 여행 갈 사람을 찾아요!</BaseText
        ><BaseText color="--color-text" size="--fs-body" class="sub_title"
          >사용자님이 기록한 여행을 토대로 <span class="point">여정</span>에서 다음 여행지를
          추천해드려요</BaseText
        >
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
    </div>
    <div class="box"><DividerImage></DividerImage></div>
    <div class="box">
      <div class="title">
        <BaseText bold size="--fs-title">오늘 어떤 이야기를 나누었을까요?</BaseText
        ><BaseText color="--color-text" size="--fs-body" class="sub_title"
          >커뮤니티에서 오늘 가장 인기가 많았던 게시물을 모아보았어요</BaseText
        >
      </div>
      <div><TodayStory></TodayStory></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import PostCard from '@/components/Common/Card/PostCard.vue'
import { list as fetchHotPosts } from '@/api/communityApi'
import { getRandomList } from '@/api/companionApi'
import BaseText from '@/components/Base/BaseText.vue'
import HeroBanner from '@/components/Home/HeroBanner.vue'
import DividerImage from '@/components/Home/DividerImage.vue'
import PopularDestination from '@/components/Home/PopularDestination.vue'
import JapanImage from '@/assets/icons/main/Japan.png'
import VietnamImage from '@/assets/icons/main/Vietnam.png'
import FranceImage from '@/assets/icons/main/France.png'
import TravelPackageImage from '@/assets/icons/main/TravelPackageImage.png'
import TravelPackageCard from '@/components/Home/TravelPackageCard.vue'
import TodayStory from '@/components/Home/TodayStory.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()

const hotPosts = ref([])
const list = ref([])
const loading = ref(false)
const auth = useAuthStore()

// hot 게시물 불러오기
onMounted(async () => {
  try {
    const response = await fetchHotPosts({ page: 1, size: 3 })
    hotPosts.value = response.data.posts.map((post) => ({
      ...post,
    }))
  } catch (error) {
    console.error('HOT 게시물 불러오기 실패:', error)
  }
})

// 랜덤 게시물 불러오기
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

function formatPeriod(start, end) {
  return `${start} ~ ${end}`
}

function openDetail(postId) {
  router.push(`/post/${postId}`)
}

const banners = [
  {
    image: JapanImage,
    location: '일본, 나고야',
  },
  {
    image: VietnamImage,
    location: '베트남, 나트랑',
  },
  {
    image: FranceImage,
    location: '프랑스, 파리',
  },
]
const cards = [
  {
    image: TravelPackageImage,
    title: '일본 도쿄 패키지 3일',
    price_b: '750,000',
    price_n: '680,000',
    desc: '일본의 수도인 도쿄에서 1일 자유일정을 포함한 패키지 상품입니다. 도쿄 외곽에 위치한 다양한 지역관광으로 일본 도쿄에서 보다 좋은 추억을 만들어 갈 수 있도록 손님들에게 맞는 일정을 조율하고 있습니다.\n\n호텔 및 항공권이 포함된 패키지입니다. 여행 시기에 따라 가격의 변동이 발생할 수 있으니 이 점 유의해 주시기 바랍니다. ',
  },
]
</script>

<style scoped>
.container {
  margin-bottom: var(--space-3xl);
  align-items: center;
}
.title {
  margin-bottom: var(--space-xl);
  padding-left: 0 !important;
  width: auto !important;
}

.sub_title {
  margin-top: var(--space-md);
}
.point {
  color: var(--color-primary);
  font-weight: var(--fw-bold);
}
.box {
  margin-bottom: var(--space-3xl);
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3xl);
  width: 100%;
  margin: 0 auto;
  margin-bottom: var(--space-2xl);
}

@media (max-width: 1023px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 960px) {
  .package-section {
    display: none;
  }
}

@media (max-width: 639px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
