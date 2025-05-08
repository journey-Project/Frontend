<template>
  <div class="pagination">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">＜</button>
    <span
      v-for="page in totalPages"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </span>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">＞</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
})

const emit = defineEmits(['change'])

function goToPage(page) {
  if (page >= 1 && page <= props.totalPages) {
    emit('change', page)
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/variables' as v;
@use '@/styles/mixins' as m;

.pagination {
  display: flex;
  justify-content: center;
  gap: m.rem(8);
  font-size: m.rem(17);

  button {
    all: unset; // 버튼 기본 스타일 제거
    color: v.$color-accent;
    font-size: m.rem(18);
    cursor: pointer;
    padding: 0 m.rem(4);
    transition: color 0.2s ease-in-out;

    &:hover:not(:disabled) {
      color: v.$color-dark; // v.$color-accent보다 조금 더 진한 색상
    }

    &:disabled {
      cursor: default;
    }
  }

  span {
    color: v.$color-accent;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &.active {
      font-weight: bold;
      color: v.$color-accent;
      text-decoration: underline;
    }

    &:hover:not(.active) {
      color: v.$color-dark;
    }
  }
}
</style>