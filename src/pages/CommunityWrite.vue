<template>
  <div class="community-write">
    <div class="submit-btn">
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
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseText from '@/components/Base/BaseText.vue'
import PostEditor from '@/components/Common/Editor/PostEditor.vue'

import { ref, watch, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import axios from 'axios'

import { getPostByPostId } from '@/api/postApi'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const title = ref('')
const content = ref('')
// const selectedBoard = ref(route.path.includes('/companion/write') ? 'companion' : 'community')
const country = ref(decodeURIComponent(route.params.country || '국내'))
const postId = computed(() => route.params.id) // 존재하지 않으면 undefined
const isEditMode = computed(() => Number.isInteger(+postId.value))
const isLoading = ref(false)

onMounted(() => {
  if (isEditMode.value) fetchPost()
})

watch(
  () => route.params.id,
  () => {
    if (isEditMode.value) fetchPost()
  },
)

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const res = await getPostByPostId(postId.value)
      const data = res.data
      title.value = data.title
      content.value = data.content
      country.value = data.country
    } catch (e) {
      console.error('게시글 불러오기 실패:', e)
    }
  }
})

async function fetchPost() {
  isLoading.value = true
  try {
    const res = await getPostByPostId(postId.value)
    const data = res.data
    title.value = data.title
    content.value = data.content
    country.value = data.country
  } catch (e) {
    console.error('게시글 불러오기 실패:', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (isEditMode.value) {
    fetchPost()
  }
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchPost()
  },
)

async function submitPost() {
  if (!title.value.trim() || !content.value.trim()) {
    alert('제목과 내용을 입력해 주세요')
    return
  }

  const payload = isEditMode.value
  ? {                      // 수정 시
     title: title.value,
     content: content.value,
     country: country.value,
    }
  : {                      // 새글 작성 시
      memberId: auth.user.id,
      country: country.value,
      title: title.value,
      content: content.value,
    }

const fd = new FormData()
const json = new Blob([JSON.stringify(payload)], {
  type: 'application/json',
})

fd.append(isEditMode.value ? 'post' : 'data', json)
  try {
    if (isEditMode.value) {
      // 수정 API
      await axios.put(`https://journeysite.site/api/community/update/${postId.value}`, fd)
      alert('게시글이 수정되었습니다')
    } else {
      // 등록 API
      await axios.post('https://journeysite.site/api/community/save', fd)
      alert('게시글이 등록되었습니다')
    }
    const encoded = encodeURIComponent(country.value)
    if (route.path.startsWith('/companion')) {
      router.replace(`/companion-board/${encoded}`)
    } else {
      router.replace(`/community-board/${encoded}`)
    }
  } catch (e) {
    console.error(e)
    alert('저장 실패')
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

.submit-btn {
  float: right;
  margin-bottom: 1rem;
}
</style>
