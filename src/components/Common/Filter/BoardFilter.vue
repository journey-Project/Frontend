<template>
  <div class="filter-bar">
    <div class="date-group">
      <BaseDatePicker
        v-model="local.startDate"
        :max="local.endDate"
        placeholder="YYYY-MM-DD"
        class="ctl ctl--date"
        @update:modelValue="(v) => emitFilter('startDate', v)"
      />

      <span class="tilde">~</span>

      <BaseDatePicker
        v-model="local.endDate"
        :min="local.startDate"
        placeholder="YYYY-MM-DD"
        class="ctl ctl--date"
        @update:modelValue="(v) => emitFilter('endDate', v)"
      />
    </div>

    <BaseSelect v-model="local.category" :options="options" _ph="분류" class="ctl ctl--select" />

    <div class="search-wrapper">
      <BaseInput v-model="search" placeholder="게시물 검색" w="14rem" @enter="handleSearch" />
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
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseDatePicker from '@/components/Base/RangeDatePicker.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const country = route.params.country

const emit = defineEmits(['filter-change', 'search'])

const local = reactive({
  startDate: '',
  endDate: '',
  title: '',
  category: '',
})

const options = [
  { label: '제목', value: 'title' },
  { label: '작성자', value: 'author' },
  { label: '내용', value: 'content' },
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

.ctl--date ::v-deep(.date-wrapper) {
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: calc(var(--space-sm) + 1.5rem);
  font-size: 0.75rem;
  line-height: 1;
  display: flex;
  align-items: center;
}

.ctl--date ::v-deep(.date-icon) {
  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  opacity: 0.6;
}

.ctl--date ::v-deep(.date-input) {
  font-size: 0.75rem;
  color: var(--color-primary);
  background: transparent;
  border: none;
  width: 100%;
  padding-left: 1.5rem;
  text-align: center;
}

.search-wrapper {
  position: relative;
  flex: none;
  width: 14rem;
  max-width: 14rem;
}

.search-wrapper ::v-deep(input) {
  width: 100%;
  height: var(--btn-height);
  border: none;
  background: var(--color-surface);
  border-radius: var(--btn-radius);
  padding-inline: var(--space-sm) calc(var(--space-sm) + 24px);
  font-size: var(--fs-body);
  color: var(--color-primary);
  padding-left: 1rem;
}

.post-btn {
  background: var(--color-primary);
  color: var(--color-on-primary);
  gap: var(--btn-gap);
}
</style>
