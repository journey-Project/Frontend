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
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const title = ref('')
const content = ref('')
const country = ref(decodeURIComponent(route.params.country || '국내'))
const selectedBoard = ref(route.path.includes('/companion/write') ? 'companion' : 'community')

const boardOptions = [
  { label: '커뮤니티', value: 'community' },
  { label: '동행자 모집', value: 'companion' },
]

watch(selectedBoard, (newVal) => {
  let currentCountry = '국내'

  if (location.value) {
    currentCountry = location.value.split(',')[0]?.trim()
  } else if (
    route.params.country &&
    route.params.country !== 'write' &&
    route.params.country !== 'undefined'
  ) {
    currentCountry = route.params.country
  }

  if (newVal === 'companion') {
    router.push(`/companion/write/${currentCountry}`)
  } else if (newVal === 'community') {
    router.push(`/community/write/${currentCountry}`)
  }
})

onMounted(() => {
  if (route.path.includes('/companion/write')) {
    selectedBoard.value = 'companion'
  } else if (route.path.includes('/community/write')) {
    selectedBoard.value = 'community'
  }
})

async function submitPost() {
  if (!title.value.trim() || !content.value.trim()) {
    alert('제목과 내용을 입력해 주세요')
    return
  }

  try {
    const payload = {
      memberId: auth.user.id,
      country: country.value,
      title: title.value,
      content: content.value,
    }

    const fd = new FormData()
    fd.append('data', JSON.stringify(payload))
    /* 이미지 파일은 이미 업로드돼 URL 로 본문에 포함됐으므로 fd.append('images', …) 생략 */

    await axios.post('https://journeysite.site/api/community/save', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    alert('게시글이 등록되었습니다')
    console.log('제출 직전 content:', content.value)
    router.push(
      selectedBoard.value === 'companion'
        ? `/companion-board/${encodeURIComponent(payload.country)}`
        : `/community-board/${encodeURIComponent(payload.country)}`,
    )
  } catch (e) {
    console.error(e)
    alert('등록 실패')
  }
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
