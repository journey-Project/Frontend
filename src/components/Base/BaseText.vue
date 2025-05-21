<template>
  <component :is="tag" :class="['dynamic-text', { bold }]" :style="textStyle">
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: { type: String, default: 'p' },
  color: { type: String, default: '--color-primary' },
  size: { type: String, default: '--fs-body' },
  bold: { type: Boolean, default: false },
  lineHeight: { type: String, default: '100%' },
  letterSpacing: { type: String, default: '0%' },
})

const textStyle = computed(() => ({
  color: `var(${props.color})`,
  fontSize: `var(${props.size})`,
  fontWeight: props.bold ? 'var(--fw-bold)' : 'var(--fw-regular)',
  lineHeight: props.lineHeight,
  letterSpacing: props.letterSpacing,
  fontFamily: 'var(--font-family)',
}))
</script>

<style scoped>
.dynamic-text {
  margin: 0;
}
</style>
