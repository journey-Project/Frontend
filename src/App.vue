<script setup>
import { RouterLink, RouterView } from 'vue-router'

import BaseButton from './components/base/BaseButton.vue'
import BaseInput from './components/base/BaseInput.vue'
</script>

<template>
  <!-- <header>
    <Header></Header>
  </header> -->
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

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
<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Footer from './components/layout/Footer.vue'
</script>
<style scoped></style>
