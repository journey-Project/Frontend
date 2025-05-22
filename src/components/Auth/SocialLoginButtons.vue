<template>
  <button type="button" class="social-button" :style="buttonStyle" @click="$emit('click')">
    <slot name="icon"></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  _bgColor: { type: String, default: '#ffffff' },
})

const buttonStyle = computed(() => ({
  backgroundColor: props._bgColor,
  width: '32px',
  height: '32px',
  borderRadius: '50%',
}))
</script>

<style scoped>
.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  padding: 0;
}

.social-button:hover {
  opacity: 0.9;
}

.social-button ::v-deep(img.icon) {
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
}
</style>
