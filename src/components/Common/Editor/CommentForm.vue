<!-- 댓글 입력창 -->
<template>
  <form>
    <div>
      <Avatar
        :profileImageUrl="props.profileImageUrl"
        :nickname="props.nickname"
        spanColor="var(--color-primary)"
        spanFontSize="16px"
        spanFontWeight="700"
        gap="16px"
      />
    </div>
    <div class="input-area">
      <textarea />
      <div class="submit-wrapper">
        <BaseButton>등록</BaseButton>
      </div>
    </div>
  </form>
</template>
<script setup>
import { defineProps } from 'vue'
import Avatar from '@/components/Profile/Avatar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
const props = defineProps({
  nickname: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: true,
  },
})
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  gap: 0.8rem;
  align-items: flex-start;
  background-color: var(--color-surface);
  border-radius: 0.9rem;
  width: 100%;
  height: 12rem;
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
}
.input-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--fs-button-lg);
  width: 100%;
  height: 100%;
}
.submit-wrapper {
  display: flex;
  justify-content: flex-end; /* 등록 버튼을 오른쪽 정렬 */
}
</style>
