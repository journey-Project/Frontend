<template>
  <button
    v-if="isActive"
    type="button"
    :class="typeClass + ' ' + _mp"
    :style="styles"
    @click="$emit('click')"
  >
    {{ _text }}
    <!-- 아이콘 슬롯 추가 -->
    <slot name="icon" />
  </button>
  <button v-else disabled type="button" class="btn" :class="_mp" :style="styles">
    {{ _text }}
    <!-- 아이콘 슬롯 추가 -->
    <slot name="icon" />
  </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
//import { rem } from '@/styles/mixins'

const props = defineProps({
  _isActive: { type: String, required: true },
  _text: { type: String, required: true },
  _textSize: { type: String, required: false, default: '1.8' }, // default 1.8rem
  _w: { type: String, required: false, default: '10' }, // default 10rem
  _h: { type: String, required: false, default: '4' }, // default 4rem
  _style: { type: String, required: true },
  _mp: { type: String, required: false, default: '' },
})

const emit = defineEmits(['click'])

const isActive = ref(true)
const styles = ref('')
const typeClass = ref('')

watchEffect(() => {
  isActive.value = props._isActive !== 'false'
})

watchEffect(() => {
  const _width = `${parseFloat(props._w)}rem`
  const _height = `${Math.max(parseFloat(props._h), 2)}rem`
  const _fontSize = `${parseFloat(props._textSize)}rem`

  styles.value = `width:${_width}; height:${_height}; font-size:${_fontSize}`
})

watchEffect(() => {
  if (props._style === 'fill') {
    typeClass.value = 'btn-fill'
  } else if (props._style === 'borderline') {
    typeClass.value = 'btn-borderline'
  } else {
    typeClass.value = 'btn-fill'
  }
})
</script>

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  margin: 0 m.rem(10);
  border: none;
  border-radius: m.rem(12.5);
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button[disabled] {
  background-color: #f0f0f0;
  color: gray;
  border: solid gray m.rem(0.1);
  cursor: not-allowed;
}

.btn-fill {
  color: white;
  background-color: v.$color-accent;
}

.btn-borderline {
  background-color: white;
  color: v.$color-accent;
  border: m.rem(1) solid v.$color-accent;
}
</style>
