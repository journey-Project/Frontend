<template>
  <div class="filter-bar">
    <div class="date-group">
      <RangeDatePicker
        v-model="local.startDate"
        :max="local.endDate"
        placeholder="YYYY-MM-DD"
        class="ctl ctl--date"
        @update:modelValue="(v) => emitFilter('startDate', v)"
      />

      <span class="tilde">~</span>

      <RangeDatePicker
        v-model="local.endDate"
        :min="local.startDate"
        placeholder="YYYY-MM-DD"
        class="ctl ctl--date"
        @update:modelValue="(v) => emitFilter('endDate', v)"
      />
    </div>

    <BaseSelect v-model="local.category" :options="options" _ph="분류" class="ctl ctl--select" />

    <div class="search-wrapper">
      <BaseInput v-model="local.search" placeholder="게시물 검색" w="14rem" @enter="handleSearch" />
    </div>

    <BaseButton class="post-btn" @click="handleCreatePost">
      게시물 등록
      <template #icon>
        <img src="@/assets/icons/companion/Vector.svg" alt="edit" />
      </template>
    </BaseButton>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import RangeDatePicker from '@/components/Base/RangeDatePicker.vue'

const route = useRoute()
const router = useRouter()
const country = route.params.country

const emit = defineEmits(['filter-change', 'search'])

const local = reactive({
  startDate: '',
  endDate: '',
  category: 'title',
  search: '',
})

const options = [
  { label: '제목', value: 'title' },
  { label: '작성자', value: 'nickname' },
  // { label: '내용', value: 'content' },
]

function handleCreatePost() {
  const encodedCountry = encodeURIComponent(route.params.country || '국내')

  if (route.path.includes('community')) {
    router.push(`/community/write/${encodedCountry}`)
  } else if (route.path.includes('companion')) {
    router.push(`/companion/write/${encodedCountry}`)
  } else {
    console.warn('등록 버튼 클릭: 알 수 없는 게시판 경로입니다.')
  }
}

const emitFilter = (k, v) => emit('filter-change', k, v)
const onSearch = () => {
  emitFilter('title', local.title)
  emit('search')
}
function handleSearch() {
  const type = local.category
  const keyword = local.search?.trim()

  if (!keyword) return

  const query = {}
  query[type] = keyword

  emit('filter-change', 'search', query)
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-md);
  width: 100%;
  max-width: var(--layout-max-width);
  margin-left: auto;
}

.date-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.tilde {
  font-size: 1.125rem;
  line-height: 1;
  color: var(--color-text);
}

.ctl {
  flex: 0 0 9rem;
  height: var(--btn-height);
  border-radius: var(--btn-radius);
  background: var(--color-surface);
  color: var(--color-primary);
  min-width: 0;
}
.ctl--select {
  flex-basis: 140px;
}
.ctl--date {
  text-align: center;
}

.search-wrapper {
  position: relative;
  flex: none;
  width: 14rem;
  max-width: 14rem;
}

.post-btn {
  background: var(--color-primary);
  color: var(--color-on-primary);
  gap: var(--btn-gap);
}
</style>
