<!-- 댓글 수정하기/삭제하기 ActionMenu -->
<template>
  <div class="menu">
    <button @click="onEdit">수정하기</button>
    <button @click="onDelete">삭제하기</button>
  </div>
</template>
<script setup>
const props = defineProps({
  commentId: { type: Number, required: true },
})

const onEdit = () => {
  emit('start-edit') // 수정 모드 진입 알림
}
const emit = defineEmits(['show-delete-modal', 'start-edit'])

const onDelete = () => {
  emit('show-delete-modal')
}
</script>
<style scoped>
.menu {
  width: 7.5rem;
  height: 4rem;
  background-color: var(--color-surface);
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem; /* 버튼 간 간격 */
}

button {
  border: none;
  background: none; /* ← 올바른 문법 */
  color: var(--color-primary);
  font-weight: bold;
  font-size: 0.75rem;
  cursor: pointer;
}
</style>
