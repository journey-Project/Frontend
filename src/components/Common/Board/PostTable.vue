<template>
  <table class="post-table">
    <colgroup>
      <col style="width: 64px" />
      <col style="width: 60%" />
      <col style="width: 15%" />
      <col style="width: 128px" />
    </colgroup>
    <thead>
      <tr>
        <th class="num">번호</th>
        <th class="title">제목</th>
        <th class="author">작성자</th>
        <th class="date">등록일</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="!posts.length" class="empty">
        <td colspan="4">게시글이 없습니다.</td>
      </tr>

      <tr
        v-for="(p, i) in posts"
        :key="p.communityPostId"
        class="row"
        @click="$emit('open', p.communityPostId)"
      >
        <td class="num">{{ total - ((page - 1) * size + i) }}</td>
        <td class="title">{{ p.title }}</td>
        <td class="author">{{ p.nickname }}</td>
        <td class="date">{{ formatDate(p.createdAt) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
/* props ------------------------------------------------------------------ */
const { posts, page, size, total } = defineProps({
  posts: { type: Array, default: () => [] },
  page: { type: Number, default: 1 },
  size: { type: Number, default: 10 },
  total: { type: Number, default: 0 },
})

/* emits ------------------------------------------------------------------ */
const emit = defineEmits(['open'])

/* util ------------------------------------------------------------------- */
function formatDate(date) {
  const d = new Date(date)
  return d.toISOString().slice(0, 10).replace(/-/g, '.')
}

console.log(posts)
</script>

<style scoped>
.post-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem; /* 14px 정도 */
  table-layout: fixed;     /* colgroup을 쓴다면 주석 해제 */
}

th,
td {
  padding: var(--space-md) var(--space-sm); /* 16px 상하 여백, 8px 좌우 여백 */
  font-size: var(--fs-body);                /* 16px (기본 본문 폰트) */
  font-weight: var(--fw-medium);
  color: var(--color-primary);
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

thead th {
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
}

thead tr {
  border-bottom: 2px solid #4b79c9; /* 파란 구분선 */
}

tbody .row {
  cursor: pointer;
  border-bottom: 1px solid #e4e8f0;
  transition: background 0.15s;
  display: table-row;
}
tbody .row:hover {
  background: #f6f9ff;
}

.empty td {
  text-align: center;
  padding: 2rem 0;
  color: #888;
}

/* 칼럼별 정렬 & (선택) 너비 */
.num {
  padding-left: 1rem;
  text-align: center;
}

.title {
  padding-left: 3rem;
  width: 50%;
}

.author {
  width: 15%;
  text-align: center;
}

.date {
  width: 20%;
  text-align: center;
}
</style>
