<!-- 좌측 메뉴바 (탭/라우팅용) -->

<template>
  <div class="side-menu-container">
    <div class="highlight" :style="highlightStyle"></div>
    <ul class="side-menu">
      <li v-for="(item, i) in menus" :key="item.path" ref="menuRefs">
        <RouterLink
          :to="item.path"
          class="menu-link"
          :class="{ active: currentPath === item.path }"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = ref(route.path)

watch(
  () => route.path,
  (newVal) => {
    currentPath.value = newVal
    updateHighlight()
  },
)

const menus = [
  { path: '/profile', label: '나의 프로필' },
  { path: '/profile/follow', label: '팔로우/팔로잉 관리' },
  { path: '/profile/story', label: '스토리 관리' },
  { path: '/profile/setting', label: '기본 설정' },
]

const menuRefs = ref([])
const highlightStyle = ref({})

const updateHighlight = async () => {
  await nextTick()
  const index = menus.findIndex((m) => m.path === currentPath.value)
  const el = menuRefs.value[index]?.$el || menuRefs.value[index]
  if (el) {
    const rect = el.getBoundingClientRect()
    const parentTop = el.parentElement.getBoundingClientRect().top
    highlightStyle.value = {
      transform: `translateY(${rect.top - parentTop}px)`,
      height: `${rect.height}px`,
    }
  }
}

onMounted(() => {
  updateHighlight()
})
</script>

<style scoped>
.side-menu-container {
  position: relative;
  /* width: 8rem; */
  display: inline-block;
  text-align: left;
}
.side-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu-link {
  text-decoration: none;
  display: block;
  padding: 0.75rem 1rem;
  color: #909090;
  font-size: var(--fs-menu);
  font-weight: var(--fw-medium);
  position: relative;
  z-index: 1;
  transition: color 0.3s;
}
.menu-link.active {
  color: #fff;
  font-weight: var(--fw-bold);
}
.highlight {
  position: absolute;
  left: 0;
  width: 100%;
  background-color: var(--color-primary);
  border-radius: 2rem;
  z-index: 0;
  transition:
    transform 0.3s ease,
    height 0.3s ease;
}
</style>
