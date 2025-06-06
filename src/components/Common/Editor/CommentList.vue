<!-- 댓글 목록 -->
<template>
  <div class="comment-list">
    <div class="commentcount">댓글 ({{ totalCommentCount }})</div>
    <div class="comment">
      <CommentItem
        v-for="comment in comments"
        :key="comment.commentId"
        :comment="comment"
        :depth="comment.depth"
        :openedMenuId="menuCommentId"
        :openedEditingId="editingCommentId"
        :openedReplyingId="replyingCommentId"
        @toggle-reply="handleToggleReplyingForm"
        @toggle-edit="handleToggleEditingForm"
        @toggle-menu="handleToggleMenu"
        @comment-deleted="(deletedId) => emit('comment-deleted', deletedId)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CommentItem from './CommentItem.vue'

const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['comment-deleted'])

//액션메뉴, 댓글수정폼, 답글 입력폼이 각각 하나씩만 열리도록 제어
//현재 포커스 된 commentId를 부모에서 관리한다.
const menuCommentId = ref(null)
const editingCommentId = ref(null)
const replyingCommentId = ref(null)

const handleToggleMenu = (commentId) => {
  menuCommentId.value =
    commentId === null ? null : menuCommentId.value === commentId ? null : commentId
  console.log('mecuCommentId' + menuCommentId.value)
}

const handleToggleEditingForm = (commentId) => {
  editingCommentId.value =
    commentId === null ? null : editingCommentId.value === commentId ? null : commentId
  console.log('editingCommentId' + editingCommentId.value)
}

const handleToggleReplyingForm = (commentId) => {
  replyingCommentId.value =
    commentId === null ? null : replyingCommentId.value === commentId ? null : commentId
}
// 모든 댓글 수를 재귀적으로 세는 함수
function countAllComments(comments) {
  let total = 0
  for (const comment of comments) {
    total += 1 // 현재 댓글
    if (comment.replies && comment.replies.length > 0) {
      total += countAllComments(comment.replies) // 대댓글 재귀
    }
  }
  return total
}

const totalCommentCount = computed(() => countAllComments(props.comments))
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
