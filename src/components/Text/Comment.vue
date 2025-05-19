<template>
  <p class="comment-text">
    <slot></slot>
  </p>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

.comment-text {
  font-size: 1rem;
  color: #666666;
  line-height: 100%;
  letter-spacing: 0%;
}
</style>
