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

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 17px;

  button {
    all: unset;
    color: #3f72af;
    font-size: 18px;
    cursor: pointer;
    padding: 0 4px;
    transition: color 0.2s ease-in-out;

    &:hover:not(:disabled) {
      color: #112d4e;
    }

    &:disabled {
      cursor: default;
    }
  }

  span {
    color: #3f72af;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &.active {
      font-weight: bold;
      color: #3f72af;
      text-decoration: underline;
    }

    &:hover:not(.active) {
      color: #112d4e;
    }
  }
}
</style>