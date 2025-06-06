<!-- 아이디 찾기 비밀번호 찾기... -->
<template>
  <button class="underline-button" :class="{ 'with-divider': showDivider }">
    <span class="underline-text">{{ text }}</span>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  showDivider: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.underline-button {
  position: relative;
  background: none;
  border: none;
  color: var(--color-dark);
  cursor: pointer;
  font: inherit;

  font-size: 0.75rem; /* 12px */
  height: 0.8125rem; /* 13px */
  line-height: 1;
  padding: 0 0.3rem; /* 좌우 padding: 8px */
}

/* 글자에만 밑줄 */
.underline-text {
  position: relative;
  display: inline-block;
}

.underline-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.125rem; /* -2px */
  width: 100%;
  height: 0.0625rem; /* 1px */
  background-color: currentColor;
  opacity: 0.8;
}

/* 오른쪽 구분선 */
.underline-button.with-divider::before {
  margin: 0 -0.3rem; /* 좌우 padding: 8px */
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0.0625rem; /* 1px */
  height: 100%;
  background-color: black;
}
</style>
