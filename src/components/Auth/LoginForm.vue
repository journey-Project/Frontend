<!-- 일반 로그인 입력 폼 --><!-- 회원가입 입력 폼 -->
<template>
  <input
    v-if="_type == 'text'"
    type="text"
    class="form-control input-borderline"
    :value="modelValue"
    :placeholder="_ph"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    v-else-if="_type === 'password'"
    type="password"
    class="form-control input-borderline"
    :value="modelValue"
    :placeholder="_ph"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script setup>
import { ref, reactive, watchEffect } from 'vue'

const props = defineProps({
  _type: { type: String, required: true },
  _ph: { type: String, default: '' },
  modelValue: [String, Number],
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
input {
  border-radius: 1rem;
  width: 20rem; /* 320px */
  height: 2.5rem; /* 40px */
}

.input-borderline::placeholder {
  color: #112d4e 50%;
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
