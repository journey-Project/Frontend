<template>
  <div class="board-type-tab" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="['tab-btn', { active: modelValue === tab.value }]"
      role="tab"
      :aria-selected="modelValue === tab.value"
      @click="onTabClick(tab)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  modelValue: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])

const tabs = [  
  { label: '커뮤니티', value: 'communityboard', route: '/community-board' },
  { label: '동행자 모집', value: 'companion', route: '/companion-board' },
]

function onTabClick(tab) {
  emit('update:modelValue', tab.value)
  router.push(tab.route)
}
</script>

<style scoped>

.board-type-tab {
  display: flex;
  gap: 4rem;
}

.tab-btn {
  padding: 0.125rem 0.5rem;
  font-size: var(--fs-menu);
  font-weight: var(--fw-bold);
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 0.25rem solid transparent;
  transition: all 0.3s ease;
}

.tab-btn.active { 
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

</style>
