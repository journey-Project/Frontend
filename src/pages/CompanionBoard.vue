<template>
  <div class="companion-board">
    <div class="layout-container">
      <!-- 국가명 + 국기 -->
      <div class="country-header">
        <img :src="countryFlagUrl" :alt="country" class="flag" />
        <h2>{{ country }}</h2>
      </div>

      <!-- 탭 전환 -->
      <BoardTypeTab v-model="activeTab" class="board-type-tab" />

      <!-- 필터 -->
      <BoardFilter
        class="board-filter"
        @filter-change="onFilterChange"
        @search="refresh"
        @create="goCreate"
      />

      <!-- 카드 리스트 -->
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

      <!-- 페이지네이션 -->
      <Pagination
        class="pagination"
        :totalPages="totalPages"
        :currentPage="page"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BoardTypeTab from '@/components/Common/Tap/BoardTypeTab.vue'
import BoardFilter from '@/components/Common/Filter/BoardFilter.vue'
import PostCard from '@/components/Common/Card/PostCard.vue'
import Pagination from '@/components/Base/Pagination.vue'
import * as companionApi from '@/api/companionApi'

import koreaFlag from '@/assets/icons/companion/flag_Korea.svg'
import japanFlag from '@/assets/icons/companion/flag_Japan.svg'
import chinaFlag from '@/assets/icons/companion/flag_China.svg'
import germanyFlag from '@/assets/icons/companion/flag_Germany.svg'
import franceFlag from '@/assets/icons/companion/flag_France.svg'
import vietnamFlag from '@/assets/icons/companion/flag_Vietnam.svg'
import usaFlag from '@/assets/icons/companion/flag_USA.svg'

const route = useRoute()
const router = useRouter()

const activeTab = ref('companion')
const country = computed(() => countryMap[routeCountry.value] || '국내')

const page = ref(Number(route.query.page || 1))
const filters = reactive({ startDate: '', endDate: '', category: '', title: '' })
const list = ref([])
const totalPages = ref(1)
const loading = ref(false)

const countryFlagMap = {
  국내: koreaFlag,
  일본: japanFlag,
  중국: chinaFlag,
  독일: germanyFlag,
  프랑스: franceFlag,
  베트남: vietnamFlag,
  미국: usaFlag,
}

const countryMap = {
  '국내': '국내',
  '일본': '일본',
  '중국': '중국',
  '독일': '독일',
  '프랑스': '프랑스',
  '베트남': '베트남',
  '미국': '미국',
}

const routeCountry = computed(() => decodeURIComponent(route.params.country))
const countryFlagUrl = computed(() => countryFlagMap[country.value] ?? '')

function formatPeriod(start, end) {
  return `${start} ~ ${end}`
}

function updateFilter(key, value) {
  filters[key] = value
}

function changePage(p) {
  if (p === '…') return
  page.value = p
  router.replace({ query: { ...route.query, page: p } })
}

async function fetchList() {
  loading.value = true
  try {
    const { data } = await companionApi.list({
      country: country.value,
      page: page.value,
      size: 6,
      title: filters.title || null,
      startDate: filters.startDate || null,
      nickname: filters.nickname || null, 
      endDate: filters.endDate || null,
    })

    list.value = Array.isArray(data.content) ? data.content : []
    totalPages.value = data.pagination?.totalPageCount ?? 1
  } catch (e) {
    console.error('API 호출 실패:', e)
    list.value = []
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

function onFilterChange(key, value) {
  if (key === 'search') {
    // value = { title: '여행' } or { nickname: '산책자' }
    Object.entries(value).forEach(([k, v]) => {
      filters[k] = v
    })
  } else {
    filters[key] = value
  }

  page.value = 1
  fetchList()
}

function refresh() {
  page.value = 1
  fetchList()
}

function openDetail(id) {
  router.push(`/companion/${id}`)
}

function goCreate() {
  router.push('/companion/write')
}

onMounted(fetchList)

watch(
  () => [page.value, filters.startDate, filters.endDate, filters.category, filters.title],
  fetchList,
)
</script>

<style scoped>
.layout-container {
  max-width: 60rem;
  margin: 0 auto;
}

.country-header {
  display: flex;
  align-items: center;
  gap: 2rem; /* 국기와 텍스트 사이 0.5rem */
  margin-top: 4rem; /* 헤더와의 거리 */
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
}

.country-header .flag {
  width: 4rem;
  height: 3rem;
  object-fit: contain;
}

.country-header h2 {
  font-size: 1.5rem; /* 24px */
  font-weight: bold;
  color: #3F72AF;
}


.board-type-tab {
  display: flex;
  align-items: center;
  margin-top: 3rem;
}

.board-filter {
  margin-top: 3rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 18rem);
  gap: 3rem;
  margin: 3rem auto 0;
}

.pagination {
  margin-top: 4.5rem;
  margin-bottom: 5rem;
}
</style>
