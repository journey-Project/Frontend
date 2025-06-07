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

    <PostEditor v-model="content" class="post-editor" />
  </div>
</template>

<script setup>
import BaseSelector from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseText from '@/components/Base/BaseText.vue'
import PostEditor from '@/components/Common/Editor/PostEditor.vue'

import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')

const selectedBoard = ref(route.path.includes('/companion/write') ? 'companion' : 'community')

const boardOptions = [
  { label: '커뮤니티', value: 'community' },
  { label: '동행자 모집', value: 'companion' },
]

watch(selectedBoard, (newVal) => {
  if (newVal === 'companion' && router.currentRoute.value.path !== '/companion/write') {
    router.push('/companion/write')
  } else if (newVal === 'community' && router.currentRoute.value.path !== '/community/write') {
    router.push('/community/write')
  }
})

onMounted(() => {
  if (route.path.includes('/companion/write')) {
    selectedBoard.value = 'companion'
  } else if (route.path.includes('/community/write')) {
    selectedBoard.value = 'community'
  }
})

function submitPost() {
  console.log('게시판:', selectedBoard.value)
  console.log('제목:', title.value)
  console.log('내용:', content.value)
  // 실제 제출 로직 추가 예정
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
  width: 9rem;
  height: 2rem;
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
  margin-bottom: var(--space-xl);
}

.post-editor {
  margin-bottom: 5rem;
}
</style>
