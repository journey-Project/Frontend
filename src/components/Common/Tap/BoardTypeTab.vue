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

<style scoped>

.board-type-tab {
  display: flex;
  gap: 59px;
}

.tab-btn {
  padding: 8px 20px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;

  &.active {
    color: #3f72af;
    border-bottom-color: #3f72af;
  }
}
</style>
