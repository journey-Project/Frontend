<template>
  <div class="formbox">
    <BaseText bold>{{ subtitle }}</BaseText>
    <div class="gap"></div>
    <LoginForm v-model="modelValue" :_type="_type" :_ph="_ph" _W="30rem" _H="3rem" />
    <div class="validation" :class="{ valid: isValid, invalid: !isValid }">
      {{ validationMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BaseText from '../Base/BaseText.vue'
import LoginForm from './LoginForm.vue'

const modelValue = defineModel()

const props = defineProps({
  _ph: { type: String, default: '' },
  subtitle: { type: String },
  ok: { type: String },
  no: { type: String },
  required: { type: String },
  validator: { type: Function, default: null },
  _type: { type: String, default: 'text' },
})

// 👉 사용자가 입력을 시작했는지 여부
const isTouched = ref(false)

watch(modelValue, (newVal) => {
  if (newVal !== '') {
    isTouched.value = true
  }
})

const isEmpty = computed(() => !modelValue.value)
const isValid = computed(() => {
  if (isEmpty.value) return false
  if (props.validator) {
    return props.validator(modelValue.value)
  }
  return /^[a-zA-Z0-9]{6,20}$/.test(modelValue.value)
})

const validationMessage = computed(() => {
  if (!isTouched.value) return '' // 입력 전에는 아무 메시지도 표시하지 않음
  if (isEmpty.value) return props.required
  return isValid.value ? props.ok : props.no
})
</script>

<style scoped>
.formbox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: var(--space-md);
}

.gap {
  height: var(--space-md);
}

.validation {
  font-size: var(--fs-button-sm);
  height: var(--fs-button-sm);
  margin-top: var(--space-sm);
}

.valid {
  color: #18bf02;
}

.invalid {
  color: #f53434;
}
</style>
