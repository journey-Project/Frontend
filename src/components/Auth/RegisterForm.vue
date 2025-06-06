<template>
  <div class="formbox">
    <BaseText bold>{{ subtitle }}</BaseText>
    <div class="gap"></div>
    <LoginForm v-model="modelValue" _type="text" :_ph="_ph" _W="30rem" _H="3rem" />
    <div class="validation" :class="{ valid: isValid, invalid: !isValid }">
      {{ validationMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseText from '../Base/BaseText.vue'
import LoginForm from './LoginForm.vue'

//v-model을 받을 변수
const modelValue = defineModel()

const props = defineProps({
  _ph: { type: String, default: '' },
  subtitle: { type: String },
  ok: { type: String },
  no: { type: String },
  required: { type: String },
  validator: { type: Function, default: null },
})

// ✅ 유효성 검사
const isEmpty = computed(() => !modelValue.value)
const isValid = computed(() => {
  if (isEmpty.value) return false
  if (props.validator) {
    return props.validator(modelValue.value)
  }
  // 기본 유효성 (예: 영숫자 6~20자)
  return /^[a-zA-Z0-9]{6,20}$/.test(modelValue.value)
})

const validationMessage = computed(() => {
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
