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

<style scoped lang="scss">
@use '@/styles/variables' as v;
@use '@/styles/mixins' as m;

// 테두리 삭제
input:focus {
  outline: none;
}

.date-wrapper {
  position: relative;
  width: m.rem(158);
  height: m.rem(46);
  border-radius: m.rem(23);
  background: rgba(v.$color-primary, 0.35);
  display: flex;
  align-items: center;
  cursor: pointer;

  .date-icon {
    width: m.rem(18);
    height: m.rem(18);
    margin-left: m.rem(12);
  }

  .date-input {
    flex: 1;
    height: 100%;
    padding-left: m.rem(8);
    border: none;
    background: transparent;
    font-size: m.rem(13);
    color: v.$color-text;

    &::placeholder {
      color: v.$color-text;
      opacity: 0.6;
    }
  }
}

// 달력
.journey-datepicker {
  position: absolute;
  top: calc(100% + m.rem(8));
  left: 0;
  z-index: 9999;
  border-radius: m.rem(24);
  background-color: v.$color-primary;
  padding: m.rem(24);
  box-shadow: 0 0 m.rem(10) rgba(0, 0, 0, 0.1);

  /* v-calendar theme variables */
  --vc-primary: v.$color-accent;
  --vc-accent-50: rgba(v.$color-accent, 0.12);
  --vc-content: v.$color-accent;

  :deep(.vc-container) {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  :deep(.vc-nav) {
    display: flex;
    justify-content: space-between;
    margin-bottom: m.rem(16);
  }

  :deep(.vc-nav-arrow) {
    width: m.rem(30);
    height: m.rem(30);
    border-radius: 50%;
    background: rgba(v.$color-accent, 0.07) center/18px 18px no-repeat;

    &:hover {
      background: rgba(v.$color-accent, 0.15) center/18px 18px no-repeat;
    }

    svg {
      display: none;
    }
  }

  :deep(.vc-nav-arrow.is-prev) {
    background-image: url(v-bind(calendarArrow));
  }

  :deep(.vc-nav-arrow.is-next) {
    background-image: url(v-bind(calendarArrow));
    transform: scaleX(-1);
  }

  :deep(.vc-nav-title),
  :deep(.vc-title-button) {
    color: v.$color-accent !important;
    background-color: rgba(v.$color-accent, 0.07);
    font-weight: 700;
    font-size: m.rem(20);
    border-radius: m.rem(6);
    padding: 0 m.rem(12);
  }

  :deep(.vc-weekdays) {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: m.rem(6);
  }

  :deep(.vc-weekday) {
    text-align: center;
    font-weight: 600;
    font-size: m.rem(15);
    color: v.$color-accent;
  }

  :deep(.vc-day) {
    width: m.rem(40);
    height: m.rem(40);
    font-size: m.rem(16);
    color: v.$color-accent;
    line-height: m.rem(40);

    &:hover:not(.is-disabled) {
      background: rgba(v.$color-accent, 0.1);
    }

    &.is-not-current-month {
      color: rgba(v.$color-accent, 0.35);
    }

    &.is-selected .vc-day-content {
      background: v.$color-accent;
      color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
