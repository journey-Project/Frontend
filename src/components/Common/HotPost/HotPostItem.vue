<!-- HOT 게시글 1개 표시 -->
<template>
  <tr class="hot-post-row" @click="goToDetail(post.communityPostId)">
    <td id="countryText">
      [{{ post.country }}] <span id="titleText"> {{ post.title }}</span>
    </td>
    <td class="time-cell">{{ formatTime(post.time) }}</td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})
console.log(props.post)
const router = useRouter()

const goToDetail = (postId) => {
  router.push(`/community/${postId}`) // 나중에 게시글 상세 페이지와 연결 필요
}

const formatTime = (time) => {
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
</script>

<style scoped>
.hot-post-row {
  color: var(--color-primary);
  border-bottom: 1px solid rgba(63, 114, 175, 0.3);
  cursor: pointer;
  transition: background-color 0.2s;

  /* 호버시 색상 줄건지, 효과줄건지 상의 필요  */
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    /* 호버 시 배경색 */
  }
}

td {
  padding: 1rem 1.25rem;
  text-align: left;
  height: 3rem;
}

.time-cell {
  text-align: right;
  white-space: nowrap;
}

#countryText {
  font-size: 1.125rem;
  font-weight: 700;
}

.time-cell,
#titleText {
  font-size: 1.125rem;
  font-weight: 500;
}
</style>
