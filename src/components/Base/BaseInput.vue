<template>
  <input
    v-if="_type == 'text'"
    type="text"
    class="form-control"
    :class="typeClass"
    :placeholder="_ph"
    :style="styles"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    v-else-if="_type === 'password'"
    type="password"
    class="form-control"
    :class="typeClass"
    :placeholder="_ph"
    :style="styles"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <!-- date type 삭제, BaseDatePicker로 분리-->
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue'

const props = defineProps({
  _type: { type: String, required: true },
  _ph: { type: String, default: '' },
  _w: { type: String, default: '100' },
  _style: { type: String },
  modelValue: [String, Number],
})

const emit = defineEmits(['update:modelValue'])

const styles = ref('')
const typeClass = ref('')

watchEffect(() => {
  const temp = parseInt(props._w)
  styles.value = `width: ${temp}rem`
})

watchEffect(() => {
  if (props._style == 'fill') {
    typeClass.value = 'input-fill'
  } else if (props._style == 'borderline') {
    typeClass.value = 'input-borderline'
  } else if (props._style == 'halfline') {
    typeClass.value = 'input-half-borderline'
  } else {
    typeClass.value = 'input-fill'
  }
})
</script>

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

input {
  margin: 1rem;
  border-radius: 1.25rem;
}

.input-fill::placeholder {
  color: v.$color-dark 50%;
}

.input-borderline::placeholder {
  color: v.$color-dark 50%;
}

.input-half-borderline::placeholder {
  color: v.$color-dark 50%;
}

.input-fill:focus::placeholder,
.input-borderline:focus::placeholder,
.input-half-borderline:focus::placeholder {
  color: transparent;
}

/* .input-fill {
    background-color: #dbe2ef;
  }
  
  .input-borderline {
    border: 0.0625rem #3f72af solid;
  }
  
  .input-half-borderline {
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 0.0625rem #3f72af solid;
  } */

.input-fill,
.input-fill:focus {
  background-color: v.$color-primary;
  border: none;
  box-shadow: none;
}

.input-borderline,
.input-borderline:focus {
  border: 0.0625rem v.$color-accent solid;
  box-shadow: none;
  background-color: white;
}

.input-half-borderline,
.input-half-borderline:focus {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 0.0625rem v.$color-accent solid;
  box-shadow: none;
  background-color: white;
  border-radius: 0;
}
</style>
