<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

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
</script>

<template>
  <div class="layout-wrapper">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
