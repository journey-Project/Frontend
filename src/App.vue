<script setup>
import { RouterLink, RouterView } from 'vue-router'

import BaseButton from './components/Base/BaseButton.vue'
import BaseInput from './components/Base/BaseInput.vue'
import BaseSelect from './components/Base/BaseSelect.vue'
import Footer from './components/Layout/Footer.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
