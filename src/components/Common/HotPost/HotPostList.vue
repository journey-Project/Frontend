<!-- HOT 게시물 리스트 테이블 -->
<template>
  <div class="hot-post-list">
    <table>
      <tbody>
        <HotPostItem v-for="(post, index) in posts" :key="index" :post="post" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import HotPostItem from './HotPostItem.vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.hot-post-list {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}
</style>
