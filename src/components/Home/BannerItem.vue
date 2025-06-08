<template>
  <div class="banner-item">
    <img :src="banner.image" alt="배너 이미지" class="banner-image" />
  </div>
</template>

<script setup>
defineProps({
  banner: Object,
})
</script>

<style scoped>
.banner-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
