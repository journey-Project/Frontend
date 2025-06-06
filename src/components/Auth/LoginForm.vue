<template>
  <input
    v-if="_type === 'text'"
    type="text"
    class="form-control input-borderline"
    :value="modelValue"
    :placeholder="_ph"
    :style="{ width: _W, height: _H }"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    v-else-if="_type === 'password'"
    type="password"
    class="form-control input-borderline"
    :value="modelValue"
    :placeholder="_ph"
    :style="{ width: _W, height: _H }"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue'

const props = defineProps({
  _type: { type: String, required: true },
  _ph: { type: String, default: '' },
  modelValue: [String, Number],
  _W: { type: String, default: '20rem' }, // 기본 가로 길이
  _H: { type: String, default: '2.5rem' }, // 기본 세로 길이
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
input {
  border-radius: 1rem;
  margin: none;
}

.input-borderline::placeholder {
  color: #112d4e80; /* 50% 투명도 적용된 색상 */
  font-size: var(--fs-button-sm);
}
.input-borderline:focus::placeholder {
  color: transparent;
}
.input-borderline,
.input-borderline:focus {
  border: 0.0625rem #3f72af solid;
  box-shadow: none;
  background-color: transparent;
}
</style>
