<template>
  <div class="date-wrapper" ref="wrapper" @click="open = true" tabindex="0">
    <img src="@/assets/icons/companion/date_icon.svg" class="date-icon" alt="calendar" />

    <input
      class="date-input"
      :placeholder="placeholder || 'YYYY-MM-DD'"
      :value="modelValue"
      readonly
      aria-label="날짜 선택"
    />

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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* ───────── props / emits ───────── */
const props = defineProps({
  modelValue: { type: String, default: '' }, // 'YYYY-MM-DD'
  placeholder: { type: String, default: '' },
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
  if (wrapper.value && !wrapper.value.contains(e.target)) open.value = false
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
  width: var(--btn-md);
  height: var(--btn-height);
  border-radius: var(--btn-radius);
  background: var(--color-surface);
}

.date-icon {
  width: 1rem;
  height: 1rem;
  margin-left: var(--space-sm);
}

/* 값/placeholder */
.date-input {
  flex: 1;
  height: 100%;
  padding-left: 0.5rem;
  border: none;
  background: transparent;
  font-size: var(--fs-body);
  color: var(--color-primary);
}
.date-input::placeholder {
  color: var(--color-primary);
  font-weight: var(--fw-medium);
}

/* ───────── popover ───────── */
.journey-datepicker {
  position: absolute;
  top: calc(100% + var(--space-sm)); /* 아래 여백 8px */
  left: 0;
  z-index: 9999;
  background: var(--color-surface);
  border-radius: var(--input-radius);
  padding: var(--space-lg); /* 24px */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  /* v-calendar theme 토큰 덮어쓰기 */
  --vc-primary: var(--color-primary);
  --vc-accent-50: color-mix(in srgb, var(--color-primary) 12%, transparent);
  --vc-content: var(--color-primary);
}

/* v-calendar override */
.journey-datepicker ::v-deep(.vc-container) {
  background: transparent;
  border: none;
  box-shadow: none;
}
.journey-datepicker ::v-deep(.vc-nav) {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}
.journey-datepicker ::v-deep(.vc-nav-arrow) {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-primary) 7%, transparent) center/18px 18px no-repeat;
}
.journey-datepicker ::v-deep(.vc-nav-arrow:hover) {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent) center/18px 18px no-repeat;
}
.journey-datepicker ::v-deep(.vc-nav-arrow svg) {
  display: none;
}
.journey-datepicker ::v-deep(.vc-nav-arrow.is-prev) {
  background-image: url('@/assets/icons/companion/calendarPolygon3.svg');
}
.journey-datepicker ::v-deep(.vc-nav-arrow.is-next) {
  background-image: url('@/assets/icons/companion/calendarPolygon3.svg');
  transform: scaleX(-1);
}
.journey-datepicker ::v-deep(.vc-nav-title),
.journey-datepicker ::v-deep(.vc-title-button) {
  color: var(--color-primary) !important;
  background: color-mix(in srgb, var(--color-primary) 7%, transparent);
  font-weight: var(--fw-bold);
  font-size: 1.25rem;
  border-radius: 6px;
  padding: 0 var(--space-sm);
}
.journey-datepicker ::v-deep(.vc-weekday) {
  text-align: center;
  font-weight: var(--fw-semibold);
  font-size: 0.9375rem;
  color: var(--color-primary);
}
.journey-datepicker ::v-deep(.vc-day) {
  width: 40px;
  height: 40px;
  font-size: 1rem;
  color: var(--color-primary);
  line-height: 40px;
}
.journey-datepicker ::v-deep(.vc-day:hover:not(.is-disabled)) {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}
.journey-datepicker ::v-deep(.vc-day.is-not-current-month) {
  color: color-mix(in srgb, var(--color-primary) 35%, transparent);
}
.journey-datepicker ::v-deep(.vc-day.is-selected .vc-day-content) {
  background: var(--color-primary);
  color: #fff;
  border-radius: 50%;
}
</style>
