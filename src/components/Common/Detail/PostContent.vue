<!-- 게시글 상세 본문-->
<template>
  <div class="content" v-html="content" />
  <hr />
</template>
<script setup>
defineProps({
  content: String,
})
</script>
<style scoped>
.content {
  min-height: 23rem;
  margin-top: var(--space-xl);
  font-size: 1.125rem;

  color: var(--color-primary);
}
hr {
  margin: 0;
  margin-top: 1.75rem;
  opacity: 80%;
  color: var(--color-primary);
}
</style>
