<template>
  <div class="community-write">
    <div class="top-row">
      <BaseSelector
        v-model="selectedBoard"
        :options="boardOptions"
        _ph="게시판 선택"
        _style="borderline"
        class="board-select"
      />
      <BaseButton size="md" @click="submitPost">등록</BaseButton>
    </div>

    <BaseText
      tag="h2"
      size="--fs-title"
      color="--color-primary"
      bold
      :style="{ opacity: 0.7, marginTop: '2rem' }"
    >
    </BaseText>

    <input v-model="title" type="text" class="title-input" placeholder="제목을 입력해주세요" />
    <div class="divider" />

    <div class="form-section">
      <div class="date-row">
        <BaseText tag="label" size="--fs-body" bold>여행 기간</BaseText>
        <div class="date-group">
          <BaseDatePicker
            v-model="startDate"
            class="ctl ctl--date"
            :max="endDate"
            placeholder="YYYY-MM-DD"
          />
          <span class="tilde">~</span>
          <BaseDatePicker
            v-model="endDate"
            class="ctl ctl--date"
            :min="startDate"
            placeholder="YYYY-MM-DD"
          />
        </div>
      </div>

      <div class="people-row">
        <BaseText tag="label" size="--fs-body" bold>희망 인원수</BaseText>
        <BaseSelector
          v-model="people"
          :options="peopleOptions"
          _ph="인원 선택"
          _style="fill"
          class="ctl ctl--select text-sm"
          style="margin-left: 1rem"
        />
      </div>

      <div class="location-row">
        <input
          v-model="location"
          type="text"
          class="location-input padded"
          placeholder="여행지 입력"
        />
        <div class="location-search-btn">
          <BaseButton size="lg" class="padded">여행지 검색</BaseButton>
        </div>
      </div>

      <div class="image-row">
        <BaseText tag="label" size="--fs-body" bold>커버 이미지</BaseText>
        <div class="img-btn">
          <BaseButton size="lg" class="padded">이미지 등록</BaseButton>
        </div>
      </div>
    </div>

    <PostEditor v-model="content" class="post-editor" />
  </div>
</template>

<script setup>
import BaseSelector from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseText from '@/components/Base/BaseText.vue'
import BaseDatePicker from '@/components/Base/BaseDatePicker.vue'
import PostEditor from '@/components/Common/Editor/PostEditor.vue'

import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const title = ref('')
const content = ref('')
const startDate = ref('')
const endDate = ref('')
const people = ref('')
const location = ref('')

const selectedBoard = ref(route.path.includes('/companion/write') ? 'companion' : 'community')

const boardOptions = [
  { label: '커뮤니티', value: 'community' },
  { label: '동행자 모집', value: 'companion' },
]

const peopleOptions = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}명`,
  value: `${i + 1}`,
}))

onMounted(() => {
  if (route.path.includes('/companion/write')) {
    selectedBoard.value = 'companion'
  } else if (route.path.includes('/community/write')) {
    selectedBoard.value = 'community'
  }
})

watch(selectedBoard, (newVal) => {
  if (newVal === 'companion' && router.currentRoute.value.path !== '/companion/write') {
    router.push('/companion/write')
  } else if (newVal === 'community' && router.currentRoute.value.path !== '/community/write') {
    router.push('/community/write')
  }
})

function submitPost() {
  console.log('게시판:', selectedBoard.value)
  console.log('제목:', title.value)
  console.log('여행 기간:', startDate.value, '~', endDate.value)
  console.log('인원수:', people.value)
  console.log('여행지:', location.value)
  console.log('내용:', content.value)
}
</script>

<style scoped>
.community-write {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding-top: 4rem;
  background: var(--color-bg);
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board-select {
  width: 144px;
  height: 32px;
  background-color: var(--color-surface);
}

.title-input {
  width: 100%;
  font-size: var(--fs-title);
  font-weight: var(--fw-bold);
  border: none;
  outline: none;
  color: var(--color-primary);
  opacity: 0.7;
  background: transparent;
}

.divider {
  height: 1px;
  background-color: var(--color-primary);
  opacity: 0.2;
  margin: var(--space-md) 0;
}

.post-editor {
  margin-bottom: 5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.date-row,
.people-row,
.location-row,
.image-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.date-row {
  margin-top: 1rem;
}

.date-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding-left: 2rem;
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
  margin-left: 0.5rem;
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

.location-input {
  width: 144px;
  height: 32px;
  padding: 0.5rem;
  border: 1px solid var(--color-surface);
  border-radius: 1rem;
  font-size: 0.875rem; /* ↓ 줄임 */
  background: var(--color-surface); /* white → 일관된 배경색 */
  color: var(--color-primary);
}

.location-input::placeholder {
  color: var(--color-primary);
  opacity: 0.6;
}

.padded {
  padding-left: 1rem;
}

.location-row {
  padding-left: 6.5rem;
}

.img-btn {
  padding-left: 1rem;
}

.text-sm::v-deep(.label) {
  font-size: var(--fs-button-sm);
}

.location-search-btn {
  padding-left: 1rem;
}
</style>
