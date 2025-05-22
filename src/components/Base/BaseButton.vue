<template>
  <button
    :class="['base-btn', sizeClass, { disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v) },
  disabled: { type: Boolean, default: false },
})

const sizeClass = computed(
  () =>
    ({
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
      xl: 'btn-xl',
    })[props.size],
)
</script>

<style scoped>
.base-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--btn-gap);
  width: max-content;
  height: var(--btn-height);
  padding-inline: var(--space-md);
  background: var(--btn-bg);
  color: var(--btn-text);
  border: none;
  font-weight:var(--fw-semibold);
  border-radius: var(--btn-radius);
  cursor: pointer;
  transition: opacity 0.2s;
}

.base-btn.disabled,
.base-btn:disabled {
  background: var(--btn-bg-disabled);
  color: var(--btn-text-disabled);
  cursor: not-allowed;
}

.btn-sm {
  width: var(--btn-sm);
  font-size: var(--fs-button-sm);
}
.btn-md {
  width: var(--btn-md);
  font-size: var(--fs-button-sm);
}
.btn-lg {
  width: var(--btn-lg);
  font-size: var(--fs-button-lg);
}
.btn-xl {
  width: var(--btn-xl);
  font-size: var(--fs-button-xl);
  height: var(--btn-height-xl);
}

</style>
