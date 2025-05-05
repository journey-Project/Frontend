<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BaseButton from './components/base/BaseButton.vue'
import BaseInput from './components/base/BaseInput.vue'
</script>

<template>
  <RouterView />
  <BaseButton
    _w="6.3125"
    _h="2.625"
    _r:="1.25"
    _text="확인"
    _style="fill"
    _textSize="1"
  ></BaseButton>
  <BaseButton
    _w="6.3125"
    _h="2.625"
    _r:="1.25"
    _text="확인"
    _style="borderline"
    _textSize="1"
  ></BaseButton
  ><BaseButton
    _w="6.3125"
    _h="2.625"
    _r:="1.25"
    _text="확인"
    _style="borderline"
    _textSize="1"
    _isActive="false"
  ></BaseButton>

  <br />
  <BaseInput _type="text" _ph="입력하세요" _w="10" _style="fill"></BaseInput>
  <BaseInput _type="text" _ph="입력하세요" _w="10" _style="borderline"></BaseInput>
  <BaseInput _type="text" _ph="입력하세요" _w="10" _style="halfline"></BaseInput>

  <BaseInput _type="text" _ph="입력하세요" _w="10"></BaseInput>

  <BaseInput _type="date" _ph="입력하세요" _w="10"></BaseInput>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
