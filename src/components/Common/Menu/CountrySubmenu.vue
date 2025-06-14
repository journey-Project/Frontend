<template>
  <div class="submenu">
    <router-link
      v-for="country in countries"
      :key="country"
      :to="`${basePath}/${country}`"
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
</script>

<style scoped>
.submenu {
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100%;
  background-color: #dbe2efb5;
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
</style>
