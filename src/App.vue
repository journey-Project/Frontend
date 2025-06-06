<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

import BaseButton from './components/Base/BaseButton.vue'
import BaseInput from './components/Base/BaseInput.vue'
import BaseSelect from './components/Base/BaseSelect.vue'
import Footer from './components/Layout/Footer.vue'
import Header from './components/Layout/Header.vue'
import BoardFilter from './components/Common/Filter/BoardFilter.vue'
import BoardTypeTab from './components/Common/Tap/BoardTypeTab.vue'
import CompanionBoard from '@/pages/CompanionBoard.vue'
import Pagination from './components/Base/Pagination.vue'

const activeTab = ref('community')

const route = useRoute()
const hideLayout = computed(() => route.meta.hideLayout === true)
</script>

<template>
  <Header v-if="!hideLayout" />

  <main v-if="!hideLayout" class="main-content">
    <router-view />
  </main>
  <router-view v-else />

  <Footer v-if="!hideLayout" />
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  max-width: 990px;
  width: 100%;
  margin: 0 auto;
}
</style>
