<template>
  <p class="paragraph-text">
    <slot></slot>
  </p>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

.paragraph-text {
  font-size: 1rem;
  color: v.$color-accent;
  line-height: 100%;
  letter-spacing: 0%;
}
</style>
