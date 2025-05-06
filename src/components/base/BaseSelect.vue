<template>
  <select
    class="select-box"
    :class="styleClass"
    :style="styles"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-if="_ph" disabled value="">{{ _ph }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: { type: Array, required: true }, // [{ label: 'Option A', value: 'a' }]
  _textSize: { type: String, required: false, default: '1.125' }, // default 1.8rem
  _ph: { type: String, default: '' },
  _style: { type: String, default: 'fill' },
  _w: { type: String, default: '10' }, // rem 기준
  _h: { type: String, default: '1' },
})

const emit = defineEmits(['update:modelValue'])

const styleClass = ref('')
const styles = ref('')

watchEffect(() => {
  const _width = `${parseFloat(props._w)}rem`
  const _height = `${Math.max(parseFloat(props._h), 2)}rem`
  const _fontSize = `${parseFloat(props._textSize)}rem`

  styles.value = `width:${_width}; height:${_height}; font-size:${_fontSize}`
})

watchEffect(() => {
  if (props._style === 'fill') {
    styleClass.value = 'select-fill'
  } else if (props._style === 'borderline') {
    styleClass.value = 'select-borderline'
  } else {
    styleClass.value = 'select-fill'
  }
})
</script>

<style scoped lang="scss">
@use '@/styles/variables' as v;
@use '@/styles/mixins' as m;

.select-box {
  padding: 0 1rem;
  border-radius: 1.25rem;
  background-color: white;
}

.select-fill {
  background-color: #dbe2ef;
  color: #112d4e;
  border: none;
}

.select-borderline {
  background-color: white;
  border: 0.0625rem solid v.$color-accent;
  color: v.$color-accent;
}

.select-fill:focus,
.select-borderline:focus {
  outline: none;
  box-shadow: none;
}
</style>
