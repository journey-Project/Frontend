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
const country = computed(() => decodeURIComponent(route.params.country || '국내'))
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
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
      title: filters.title || null,
      category: filters.category || null,
      page: page.value,
      size: 6,
      country: country.value,
    })

    list.value = Array.isArray(data.content) ? data.content : []
    totalPages.value = data.pagination?.totalPages ?? 1
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
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 22.1875rem);
  gap: 1.3125rem;
  width: calc(3 * 22.1875rem + 2 * 4.1875rem);
  margin: 60px auto 0;
  margin-right: 160px;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 22.1875rem);
    gap: 2rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 22.1875rem;
    gap: 1.5rem;
    margin-left: auto;
    margin-right: auto;
  }
}

.board-type-tab {
  margin-left: 23.1875rem;
  margin-bottom: 4.1875rem;
}

.country-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-left: 23rem;
  margin-top: 3.8125rem;
  margin-bottom: 3.875rem;
}

.country-header .flag {
  width: 4.25rem;
  height: 3.1875rem;
  object-fit: contain;
}

.country-header h2 {
  font-size: 1.875rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-left: 2rem;
  color: var(--color-text);
}

.pagination {
  margin-top: 73px;
  margin-bottom: 86px;
}
</style>
