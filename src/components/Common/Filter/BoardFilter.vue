<template>
  <div class="filter-bar">
    <!-- 시작일 -->
    <BaseDatePicker
      class="flex-item"
      _type="date"
      _w="9.875"
      _style="borderline"
      _ph="YYYY-MM-DD"
      v-model="local.startDate"
      :max="local.endDate"
      @update:modelValue="(v) => emitFilter('startDate', v)"
    />

    <span class="tilde">~</span>

    <!-- 종료일 -->
    <BaseDatePicker
      class="flex-item"
      _type="date"
      _w="9.875"
      _style="borderline"
      _ph="YYYY-MM-DD"
      v-model="local.endDate"
      :min="local.startDate"
      @update:modelValue="(v) => emitFilter('endDate', v)"
    />

    <!-- 분류 -->
    <BaseSelect
      class="flex-item"
      v-model="local.category"
      :options="[
        { label: '제목', value: 'title' },
        { label: '작성자', value: 'author' },
        { label: '번호', value: 'id' },
      ]"
      _ph="분류"
      _style="fill"
    />

    <!-- 검색 -->
    <div class="search-wrapper">
      <BaseInput
        _type="text"
        _w="16.5"
        _style="fill"
        v-model="local.title"
        @keyup.enter="onSearch"
      />
      <img
        class="search-icon"
        src="@/assets/icons/companion/search_icon.svg"
        alt="search"
        @click="onSearch"
      />
    </div>

    <!-- 게시물 등록 버튼 -->
    <BaseButton>게시물 등록
      <template #icon>
        <img src="@/assets/icons/companion/Vector.svg" alt="edit" style="width: 1.4375rem" />
      </template>
    </BaseButton>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseDatePicker from '@/components/Base/BaseDatePicker.vue'

const emit = defineEmits(['filter-change', 'search', 'create'])
const local = reactive({ startDate: '', endDate: '', title: '', category: '' })

const categories = [
  { label: '모집', value: '모집' },
  { label: '완료', value: '완료' },
]

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
  gap: 13px;
  height: 46px;
  padding-left: 24.7vw;
  padding-right: 18.8vw;

  .flex-item {
    flex: 1 1 clamp(120px, 14vw, 160px);
    min-width: 0;
    background-color: #dbe2ef;
    color: #3f72af;

    :deep(.form-control),
    :deep(.base-button) {
      width: 100% !important;
      background-color: #dbe2ef !important;
      color: #3f72af !important;
    }

    :deep(input[type='date']) {
      color: #3f72af !important;
    }
  }

  .search-wrapper {
    flex: 2 1 clamp(240px, 30vw, 350px); 
    max-width: 100%;
    position: relative;
    width: 100%;

    :deep(.form-control) {
      height: 3rem;
      font-size: 1rem;
      padding-right: 40px;
    }
  }
}

:deep(.base-button.accent) {
  background-color:#3f72af !important;
  color: #fff !important;
}

.tilde {
  font-size: 21px;
  line-height: 1;
}

.search-wrapper {
  position: relative;
  flex: 1 1 clamp(120px, 14vw, 160px);
  min-width: 0;
  :deep(.form-control),
  :deep(.base-button) {
    width: 100% !important;
  }
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}
</style>
