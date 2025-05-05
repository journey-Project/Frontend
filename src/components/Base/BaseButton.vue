<template>
  <button
    v-if="isActive"
    type="button"
    :class="typeClass + ' ' + _mp"
    :style="styles"
    @click="$emit('click')"
  >
    {{ _text }}
  </button>
  <button v-else disabled type="button" class="btn" :class="_mp" :style="styles">
    {{ _text }}
  </button>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'

const props = defineProps({
  _isActive: { type: String, required: true },
  _text: { type: String, required: true },
  _textSize: { type: String, required: false },
  _w: { type: String, required: false },
  _h: { type: String, required: false },
  _style: { type: String, required: true },
  _mp: { type: String, required: false },
})

const emit = defineEmits(['click'])

const isActive = ref(true)
const styles = ref('')
const typeClass = ref('')

watchEffect(() => {
  if (props._isActive === 'false') {
    isActive.value = false
  } else {
    isActive.value = true
  }
})

watchEffect(() => {
  let _width = parseFloat(props._w)
  let _height = parseFloat(props._h)
  if (props._h < 2) {
    props._h = 2
  }

  let temp = parseFloat(props._textSize)
  let textSize = `${temp}rem`
  styles.value = `width:${_width}rem; height:${_height}rem; font-size:${textSize}`
})

watchEffect(() => {
  if (props._style == 'fill') {
    typeClass.value = 'btn-fill'
  } else if (props._style == 'borderline') {
    typeClass.value = 'btn-borderline'
  } else {
    typeClass.value = 'btn-fill'
  }
})
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
  padding: 0;
  margin: 0 1rem;
  border: none;
  border-radius: 1.25rem;
}

button[disabled] {
  background-color: ghostwhite;
  margin: 0 1rem;
  border: solid gray 0.001rem;
}

.btn-fill {
  color: white;
  background-color: #3f72af;
}

.btn-borderline {
  background-color: white;
  color: #3f72af;
  border: solid #3f72af 0.01rem;
}
</style>
