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
        @filter-change="updateFilter"
        @search="refresh"
        @create="goCreate"
      />

      <!-- 게시글 표 -->
      <PostTable :posts="list" :total="totalElements" :page="page" :size="12" @open="openDetail" />
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
import PostTable from '@/components/Common/Board/PostTable.vue'
import Pagination from '@/components/Base/Pagination.vue'
import { searchPosts } from '@/api/communityApi.js'

import koreaFlag from '@/assets/icons/companion/flag_Korea.svg'
import japanFlag from '@/assets/icons/companion/flag_Japan.svg'
import chinaFlag from '@/assets/icons/companion/flag_China.svg'
import germanyFlag from '@/assets/icons/companion/flag_Germany.svg'
import franceFlag from '@/assets/icons/companion/flag_France.svg'
import vietnamFlag from '@/assets/icons/companion/flag_Vietnam.svg'
import usaFlag from '@/assets/icons/companion/flag_USA.svg'

const route = useRoute()
const router = useRouter()

const activeTab = ref('community')
const country = computed(() => decodeURIComponent(route.params.country || '국내'))
const page = ref(Number(route.query.page || 1))
const filters = reactive({
  communityPostId: '',
  title: '',
  nickname: '',
  startDate: '',
  endDate: '',
})
const list = ref([])
const totalPages = ref(1)
const loading = ref(false)
const totalElements = ref(0)

const countryFlagMap = {
  국내: koreaFlag,
  일본: japanFlag,
  중국: chinaFlag,
  독일: germanyFlag,
  프랑스: franceFlag,
  베트남: vietnamFlag,
  미국: usaFlag,
}

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
    const { data } = await searchPosts({
      country: country.value,
      communityPostId: filters.communityPostId || null,
      title: filters.title || null,
      nickname: filters.nickname || null,
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
      page: page.value,
      recordSize: 12,
    })

    list.value = data.communityList || []
    totalPages.value = data.pagination?.totalPageCount ?? 1
    totalElements.value = data.pagination?.totalRecordCount ?? 0
  } catch (e) {
    console.error('API 호출 실패:', e)
    list.value = []
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

function refresh() {
  page.value = 1
  fetchList()
}

function openDetail(id) {
  router.push(`/community/${id}`)
}

function goCreate() {
  const path = activeTab.value === 'companion'
    ? `/companion/write/${country.value}`
    : `/community/write/${country.value}`

  router.push(path)
}
onMounted(fetchList)

watch(
  () => [
    page.value,
    filters.startDate,
    filters.endDate,
    filters.communityPostId,
    filters.nickname,
    filters.title,
  ],
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
  color: #3f72af;
}

.board-type-tab {
  display: flex;
  align-items: center;
  margin-top: 3rem;
}

.board-filter {
  margin-top: 3rem;
}

.post-table {
  margin-top: 3rem;
  width: 100%;
}

.pagination {
  margin-top: 4.5rem;
  margin-bottom: 5rem;
}
</style>
