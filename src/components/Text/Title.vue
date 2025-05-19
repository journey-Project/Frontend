<template>
  <p class="title-text">
    <slot></slot>
  </p>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

.title-text {
  font-size: 1.5rem;
  color: v.$color-accent;
  font-weight: bold;
  line-height: 100%;
  letter-spacing: 0%;
}
</style>
