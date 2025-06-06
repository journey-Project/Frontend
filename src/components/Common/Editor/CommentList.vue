<!-- 댓글 목록 -->
<template>
  <div class="comment-list">
    <div class="commentcount">댓글 ({{ comments.length }})</div>
    <div class="comment">
      <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>
  </div>
</template>

<script setup>
import CommentItem from './CommentItem.vue'

const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.comment-list {
  margin-top: var(--space-md);
}
.commentcount {
  color: var(--color-primary);
  font-weight: var(--fw-bold);
  font-size: var(--fs-body);
}
.comment {
  margin-top: 1.25rem;
}
</style>
