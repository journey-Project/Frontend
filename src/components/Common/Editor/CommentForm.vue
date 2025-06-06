<!-- 댓글 입력창 -->
<template>
  <form>
    <Avatar
      :profileImageUrl="props.profileImageUrl"
      :nickname="props.nickname"
      spanColor="var(--color-primary)"
      spanFontSize="16px"
      spanFontWeight="700"
      gap="16px"
    />

    <textarea />
  </form>
</template>
<script setup>
import { defineProps } from 'vue'
import Avatar from '@/components/Profile/Avatar.vue'
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
  padding: var(--space-md);
  gap: var(--space-2xl);
  align-items: flex-start;
  background-color: var(--color-surface);
  border-radius: 0.9rem;
  width: 100%;
  height: 7.5rem;
}

textarea {
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  padding: var(--space-sm);
  border-radius: 0.8rem;
  font-size: var(--fs-body);
  height: 100%;
  scrollbar-width: thin;
}
</style>
