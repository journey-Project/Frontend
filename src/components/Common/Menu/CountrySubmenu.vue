<template>
  <div class="submenu">
    <router-link
      v-for="country in countries"
      :key="country"
      :to="`${basePath}/${country}`"
      @click="handleSubmenuItemClick"
      class="submenu-item"
    >
      {{ country }}
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  countries: Array,
  basePath: String,
})

const emit = defineEmits(['item-clicked'])

const handleSubmenuItemClick = () => {
  emit('item-clicked')
}
</script>

<style scoped>
.submenu {
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100%;
  background-color: var(--color-surface);
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 0;
  z-index: 999;
  border-top: 1px solid white;
}

.submenu-item {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
}

.submenu-item:hover {
  font-weight: bold;
}

.router-link-active {
  font-weight: 800;
}

.submenu.mobile-submenu {
  /* .submenu와 .mobile-submenu가 동시에 적용될 때 */
  position: static; /* 부모 요소 흐름에 따라 배치 */
  top: auto;
  left: auto;
  width: 100%;
  box-shadow: none;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0;
  padding: 0;
  border-top: none;
}

.submenu.mobile-submenu .submenu-item {
  padding: 0.5rem 0 0.5rem 1rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-dark);
}
</style>
