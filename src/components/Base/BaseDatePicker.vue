<template>
  <div class="date-wrapper" ref="wrapper" @click="open = true" tabindex="0">
    <!-- 아이콘 -->
    <img src="@/assets/icons/companion/date_icon.svg" class="date-icon" alt="calendar" />

    <input
      class="date-input"
      :placeholder="_ph || 'YYYY-MM-DD'"
      :value="modelValue"
      readonly
      aria-label="날짜 선택"
    />

    <!-- 달력 -->
    <div v-if="open" class="journey-datepicker" @click.stop>
      <VDatePicker
        v-model="inner"
        locale="ko"
        :masks="{ input: 'YYYY-MM-DD', title: 'M月' }"
        :title-position="'in-header'"
        :show-title="true"
        :nav-prev-icon="false"
        :nav-next-icon="false"
        :min-date="minDate"
        :max-date="maxDate"
        @update:model-value="onDateSelected"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import calendarArrow from '@/assets/icons/companion/calendarPolygon3.svg?url'

const props = defineProps({
  modelValue: { type: String, default: '' }, // 'YYYY-MM-DD'
  _ph: { type: String, default: '' },
  min: String,
  max: String,
})

const emit = defineEmits(['update:modelValue'])

const inner = ref(props.modelValue ? new Date(props.modelValue) : null)
const open = ref(false)
const wrapper = ref(null)

const minDate = computed(() => props.min || null)
const maxDate = computed(() => props.max || null)

function onDateSelected(date) {
  if (!date || isNaN(date.getTime?.())) return
  emit('update:modelValue', date.toISOString().slice(0, 10))
  open.value = false
}

function handleClickOutside(e) {
  if (wrapper.value && !wrapper.value.contains(e.target)) {
    open.value = false
  }
}
onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style scoped>
input:focus {
  outline: none;
}

.date-wrapper {
  position: relative;
  width: 10rem;
  height: 3rem;
  border-radius: 1.5rem;
  background: rgba(219, 226, 239, 0.35);
  display: flex;
  align-items: center;
  cursor: pointer;
}

.date-wrapper .date-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.75rem;
}

.date-wrapper .date-input {
  flex: 1;
  height: 100%;
  padding-left: 0.5rem;
  border: none;
  background: transparent;
  font-size: 13px;
  color: #3f72af;
}

.date-wrapper .date-input::placeholder {
  color: #3f72af;
  opacity: 0.6;
}

.journey-datepicker {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 9999;
  border-radius: 1.5rem;
  background-color: #dbe2ef;
  padding: 1.5rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);

  /* v-calendar theme variables */
  --vc-primary: #3f72af;
  --vc-accent-50: rgba(63, 114, 175, 0.12);
  --vc-content: #3f72af;

  :deep(.vc-container) {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  :deep(.vc-nav) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  :deep(.vc-nav-arrow) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(63, 114, 175, 0.07) center/18px 18px no-repeat;
  }

  :deep(.vc-nav-arrow:hover) {
    background: rgba(63, 114, 175, 0.1) center/18px 18px no-repeat;
  }

  :deep(.vc-nav-arrow svg) {
    display: none;
  }

  :deep(.vc-nav-arrow.is-prev) {
    background-image: url('@/assets/icons/companion/calendarPolygon3.svg');
  }

  :deep(.vc-nav-arrow.is-next) {
    background-image: url('@/assets/icons/companion/calendarPolygon3.svg');
    transform: scaleX(-1);
  }

  :deep(.vc-nav-title),
  :deep(.vc-title-button) {
    color: #3f72af !important;
    background-color: rgba(63, 114, 175, 0.07);
    font-weight: 700;
    font-size: 20px;
    border-radius: 6px;
    padding: 0 0.75rem;
  }

  :deep(.vc-weekdays) {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 6px;
  }

  :deep(.vc-weekday) {
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    color: #3f72af;
  }

  :deep(.vc-day) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    color: #3f72af;
    line-height: 40px;
  }

  :deep(.vc-day):hover:not(.is-disabled) {
    background: rgba(63, 114, 175, 0.1);
  }

  :deep(.vc-day.is-not-current-month) {
    color: rgba(63, 114, 175, 0.35);
  }

  :deep(.vc-day.is-selected .vc-day-content) {
    background: #3f72af;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
