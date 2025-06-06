<!-- 댓글 입력창 -->
<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-header">
      <Avatar
        :profileImageUrl="props.profileImageUrl"
        :nickname="props.nickname"
        spanColor="var(--color-primary)"
        spanFontSize="16px"
        spanFontWeight="700"
        gap="16px"
      />
      <span v-if="props.isEditMode" class="cancel-btn" @click="$emit('cancelEdit')">취소</span>
    </div>
    <div class="input-area">
      <textarea v-model="content" placeholder="여러분의 소중한 댓글을 입력해주세요." />
      <div class="submit-wrapper">
        <BaseButton type="submit">등록</BaseButton>
      </div>
    </div>
  </form>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import Avatar from '@/components/Profile/Avatar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import { postComment } from '@/api/commentApi'
import { useRoute } from 'vue-router'
import { updateComment } from '@/api/commentApi'
const props = defineProps({
  nickname: String,
  profileImageUrl: String,
  memberId: Number,
  parentCommentId: {
    type: Number,
    default: null,
  },
  initialContent: {
    type: String,
    default: '',
  },
  commentId: {
    type: Number,
    default: null,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
})

const content = ref(props.initialContent)
const route = useRoute()

// 상위 컴포넌트에서 댓글 새로고침을 위한 emit
const emit = defineEmits(['commentPosted', 'cancelEdit'])

const handleSubmit = async () => {
  if (!content.value.trim()) return

  try {
    const postId = route.params.id
    if (props.commentId !== null) {
      await updateComment(props.commentId, { content: content.value })
    } else {
      await postComment(postId, {
        memberId: props.memberId,
        content: content.value,
        parentCommentId: props.parentCommentId,
      })
    }

    content.value = ''
    emit('commentPosted')
  } catch (err) {
    console.error('❌ 댓글 등록 실패:', err)
  }
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  gap: 0.8rem;
  align-items: flex-start;
  /* background-color: var(--color-surface); */
  border-radius: 0.9rem;
  width: 100%;
  height: 14rem;
}

textarea {
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  padding: var(--space-sm);
  font-size: var(--fs-body);
  height: 100%;
  scrollbar-width: thin;
  border: 1px solid #ccc;
}
.input-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--fs-button-lg);
  width: 100%;
  height: 100%;
  opacity: 90%;
}
.submit-wrapper {
  display: flex;
  justify-content: flex-end; /* 등록 버튼을 오른쪽 정렬 */
}
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.cancel-btn {
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--color-text);
  font-weight: 500;
  opacity: 50%;
}
</style>
