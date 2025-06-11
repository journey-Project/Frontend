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
        :masks="{ input: 'YYYY-MM-DD', title: 'YYYY년 M월' }"
        :title-position="'in-header'"
        :show-title="true"
        :min-date="minDate"
        :max-date="maxDate"
        @update:model-value="onDateSelected"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  min: String,
  max: String,
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const wrapper = ref(null)

const minDate = computed(() => props.min || null)
const maxDate = computed(() => props.max || null)

function strToLocalDate(s){
  if(!s) return null
  const [y,m,d] = s.split('-').map(Number)
  return new Date(y, m-1, d) // 로컬 날짜 객체
}
const inner = ref(strToLocalDate(props.modelValue))

// local 'YYYY-MM-DD'
function fmtLocal(date){
  const pad = n => String(n).padStart(2,'0')
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`
}

function onDateSelected(date) {
  if (!date || isNaN(date.getTime?.())) return
  emit('update:modelValue', fmtLocal(date))
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
  width: 9rem;
  height: var(--btn-height);
  border-radius: var(--btn-radius);
  background: var(--color-surface);
  display: flex;
  align-items: center;
}

.date-icon {
  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.date-input {
  font-size: 0.75rem;
  color: var(--color-primary);
  background: transparent;
  border: none;
  width: 100%;
  padding-left: 1.5rem;
  padding-top: 0.2rem;
  text-align: center;
  flex: 1 1 auto;
}

.date-input::placeholder {
  color: var(--color-primary);
  font-weight: var(--fw-medium);
}

.journey-datepicker {
  position: absolute;
  top: calc(100% + var(--space-sm));
  left: 0;
  z-index: 9999;
  background: var(--color-surface);
  border-radius: var(--input-radius);
  padding: var(--space-lg);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  --vc-primary: var(--color-primary);
  --vc-accent-50: color-mix(in srgb, var(--color-primary) 12%, transparent);
  --vc-content: var(--color-primary);
}

.journey-datepicker ::v-deep(.vc-container) {
  background: transparent;
  border: none;
  box-shadow: none; 
}

.journey-datepicker ::v-deep(.vc-highlight) {
  background-color: var(--color-primary);
}

.journey-datepicker ::v-deep(.vc-nav) {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}


.journey-datepicker ::v-deep(.vc-title-button:hover){
  background-color:color-mix(in srgb,var(--color-primary) 10%, transparent);
}


.journey-datepicker ::v-deep(.vc-nav-title),
.journey-datepicker ::v-deep(.vc-title-button) {
  color: var(--color-primary) !important;
  background: color-mix(in srgb, var(--color-primary) 7%, transparent);
  background-color: var(--color-surface);
  font-weight: var(--fw-bold);
  font-size: 1rem;
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
  font-size: 1.125rem;
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

.journey-datepicker ::v-deep(.vc-header .vc-arrow){
  width:30px;
  height:30px;
  border:none;
  border-radius:50%;
  background:transparent center/18px 18px no-repeat;
  transition:background-color .15s;
}
.journey-datepicker ::v-deep(.vc-arrow.vc-next) {
  background-image: url('@/assets/icons/companion/calendarPolygon3.svg');
  transform: scaleX(-1);
}

.journey-datepicker ::v-deep(.vc-arrow.vc-prev) {
  background-image: url('@/assets/icons/companion/calendarPolygon3.svg');
}
.journey-datepicker ::v-deep(.vc-header .vc-arrow:hover){
  background-color:color-mix(in srgb,var(--color-primary) 10%, transparent);
}

.journey-datepicker ::v-deep(.vc-header .vc-arrow svg){ display:none; }

.journey-datepicker ::v-deep(.vc-header .vc-title){
  color:var(--color-primary);
  background-color:var(--color-surface);
  font-weight:var(--fw-bold);
  font-size:1.25rem;
  border-radius:6px;
  padding:0 var(--space-sm);
}
.journey-datepicker ::v-deep(.vc-header .vc-title:hover){
  background-color:color-mix(in srgb,var(--color-primary) 10%, transparent);
}

/* 월 클릭 했을 때 나오는 부분 스타일 */
.journey-datepicker ::v-deep(.vc-popover-content) {
  background-color: var(--color-surface);
}

.journey-datepicker ::v-deep(.vc-nav-header) {
  background-color: var(--color-surface);
}


.journey-datepicker ::v-deep(.vc-nav-item .vc-focus){
  background-color: var(--color-primary);
}

.journey-datepicker ::v-deep(.vc-nav-container .vc-focus){
  background-color: var(--color-surface);
}

.journey-datepicker ::v-deep(.vc-nav-item.is-current) {
  color: inherit;
}

.journey-datepicker ::v-deep(.vc-nav-item.is-active) {
  background-color: var(--color-primary);
  color: white;
  border-radius: 999px;
}

.journey-datepicker ::v-deep(.vc-nav-arrow){
  width:30px; height:30px;
  border:none; border-radius:50%;
  background:transparent center/18px 18px no-repeat;
  transition:background-color .15s;
}
.journey-datepicker ::v-deep(.vc-nav-arrow.is-left) {
  background-image: url('@/assets/icons/companion/calendarPolygon3.svg');
}

.journey-datepicker ::v-deep(.vc-nav-arrow.is-right) {
  background-image: url('@/assets/icons/companion/calendarPolygon3.svg');
  transform: scaleX(-1);
}
.journey-datepicker ::v-deep(.vc-nav-arrow:hover){
  background-color:color-mix(in srgb,var(--color-primary), transparent);
}
.journey-datepicker ::v-deep(.vc-nav-arrow svg){ display:none; }
.journey-datepicker ::v-deep(.vc-title-button){
  background-color:color-mix(in srgb,var(--color-primary) 7%, transparent);
  border:none;
}

</style>
