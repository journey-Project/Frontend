<template>
  <div class="board-type-tab" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="['tab-btn', { active: modelValue === tab.value }]"
      role="tab"
      :aria-selected="modelValue === tab.value"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])

const tabs = [  
  { label: '커뮤니티', value: 'community' },
  { label: '동행자 모집', value: 'companion' },
]
</script>

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

.board-type-tab {
  display: flex;
  gap: m.rem(59);

  @include m.respond('mobile') {
    gap: m.rem(20);
  }
}

.tab-btn {
  padding: m.rem(8) m.rem(20);
  font-size: m.rem(18);
  font-weight: 700;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: m.rem(3) solid transparent;
  transition: all 0.3s ease;

  @include m.respond('mobile') {
    font-size: m.rem(16);
    padding: m.rem(6) m.rem(14);
  }

  &.active {
    color: v.$color-accent;
    border-bottom-color: v.$color-accent;
  }
}
</style>
