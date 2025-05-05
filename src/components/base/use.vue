<template>
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
</template>
<script setup>
import BaseButton from './components/base/BaseButton.vue'
import BaseInput from './components/base/BaseInput.vue'
</script>
