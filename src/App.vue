<script setup>
import { RouterLink, RouterView } from 'vue-router'

import BaseButton from './components/base/BaseButton.vue'
import BaseInput from './components/base/BaseInput.vue'
import BaseSelect from './components/base/BaseSelect.vue'
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
  <BaseInput _type="date" _w="10"></BaseInput>

  <BaseSelect
    v-model="selectedValue"
    :options="[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]"
    _ph="선택하세요"
    _style="borderline"
    _w="10"
    _h="2.5"
  />
  <BaseSelect
    v-model="selectedValue"
    :options="[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]"
    _ph="선택하세요"
    _style="fill"
    _w="10"
    _h="2.5"
  />
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Footer from './components/layout/Footer.vue'
</script>
<style scoped></style>
