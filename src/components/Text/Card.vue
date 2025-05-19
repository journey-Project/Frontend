<template>
  <p class="card-text">
    <slot></slot>
  </p>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

.card-text {
  font-size: 0.875rem;
  color: #f9f7f7;
  line-height: 100%;
  letter-spacing: 0%;
}
</style>
