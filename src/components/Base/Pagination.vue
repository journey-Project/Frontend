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
.pagination{
  display:flex;
  justify-content:center;
  gap:var(--space-md);
  font-size:1.0625rem;
  user-select:none;
}

.pagination > button{
  all:unset;
  font-size:1.125rem;
  color:var(--color-primary);
  cursor:pointer;
  padding-inline:4px;
  transition:color .2s ease-in-out;
}
.pagination > button:hover:not(:disabled){
  color:#112d4e;
}
.pagination > button:disabled{
  cursor:default; opacity:.4;
}

.pagination > span{
  color:var(--color-primary);
  cursor:pointer;
  transition:color .2s ease-in-out;
}
.pagination > span.active{
  font-weight:var(--fw-bold);
  text-decoration:underline;
}
.pagination > span:hover:not(.active){
  color:#112d4e;
}
</style>