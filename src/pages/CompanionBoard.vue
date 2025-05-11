<template>
  <div class="companion-board">
    <div class="country-header">
      <img :src="countryFlagUrl" :alt="country" class="flag" />
      <h2>{{ country }}</h2>
    </div>

    <BoardTypeTab v-model="activeTab" class="board-type-tab" />
    <BoardFilter
      class="board-filter"
      @filter-change="updateFilter"
      @search="refresh"
      @create="goCreate"
    />

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
    <Pagination :totalPages="totalPages" :currentPage="page" @change="changePage" />
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

const route = useRoute()
const router = useRouter()

const activeTab = ref('companion')
const country = computed(() => decodeURIComponent(route.params.country || '국내'))
const page = ref(Number(route.query.page || 1))
const filters = reactive({ startDate: '', endDate: '', category: '', title: '' })
const list = ref([])
const totalPages = ref(1)
const loading = ref(false)

import koreaFlag from '@/assets/icons/companion/flag_Korea.svg'
import japanFlag from '@/assets/icons/companion/flag_Japan.png'
import chinaFlag from '@/assets/icons/companion/flag_China.png'
import germanyFlag from '@/assets/icons/companion/flag_Germany.png'
import franceFlag from '@/assets/icons/companion/flag_France.png'
import vietnamFlag from '@/assets/icons/companion/flag_Vietnam.png'
import usaFlag from '@/assets/icons/companion/flag_USA.png'

const countryFlagMap = {
  국내: koreaFlag,
  일본: japanFlag,
  중국: chinaFlag,
  독일: germanyFlag,
  프랑스: franceFlag,
  베트남: vietnamFlag,
  미국: usaFlag,
}

const countryFlagUrl = computed(() => {
  const flag = countryFlagMap[country.value]
  return flag ?? ''  // 플래그 없으면 빈 문자열
})

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

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, m.rem(355));
  gap: m.rem(21);
  width: calc(3 * #{m.rem(355)} + 2 * #{m.rem(67)});
  margin: 0 auto;
  margin-top: 60px;
  margin-right: 160px;

  @include m.respond('tablet') {
    grid-template-columns: repeat(2, m.rem(355));
    gap: m.rem(32);
    margin-left: m.rem(24);
    margin-right: m.rem(24);
  }

  @include m.respond('mobile') {
    grid-template-columns: m.rem(355);
    gap: m.rem(24);
    margin-left: auto;
    margin-right: auto;
  }
}

.board-type-tab {
  margin-left: m.rem(371);
  margin-bottom: m.rem(67);
}

.country-header {
  display: flex;
  align-items: center;
  gap: m.rem(10);
  margin-left: m.rem(368);
  margin-top: m.rem(61);
  margin-bottom: m.rem(62);

  .flag {
    width: m.rem(68);
    height: m.rem(51);
    object-fit: contain;
  }

  h2 {
    font-size: m.rem(30);
    font-weight: bold;
    margin-top: m.rem(8);
    margin-left: m.rem(32);
    color: v.$color-text;
  }
}
.pagination {
  margin-top: 73px;
  margin-bottom: 86px;
}
</style>
