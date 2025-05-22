<template>
  <input
    class="base-input"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :style="{ width: w, height: h }"
    @input="(e) => $emit('update:modelValue', e.target.value)"
    @keyup.enter="$emit('enter')"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  w: { type: String, default: '14rem' },
  h: { type: String, default: '2rem' },
})
</script>

<style scoped>
.base-input {
  border-radius: var(--input-radius);
  background: var(--input-bg);
  color: var(--input-color);
  border: none;
  padding-inline: var(--space-md);
  font-size: var(--fs-body);
  font-weight: var(--fw-medium);
  outline: none;
}

.base-input::placeholder {
  color: var(--input-color);
  opacity: 0.7;
}
</style>
