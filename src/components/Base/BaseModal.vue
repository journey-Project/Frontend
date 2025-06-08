<template>
  <Teleport to="body">
    <div class="overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <!-- slot 글자만 들어온다고 가정하고 스타일 고정 -->
        <div class="message">
          <slot>기본 메시지입니다.</slot>
        </div>
        <div class="button-group">
          <BaseButton @click="$emit('confirm')">예</BaseButton>
          <BaseButton @click="closeModal">아니오</BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import BaseButton from '@/components/Base/BaseButton.vue'
const emit = defineEmits(['confirm', 'close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal {
  /* 화면 중앙 정렬*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-surface);
  width: 22.5rem;
  height: 11.5rem;
  border-radius: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.message {
  color: black;
  font-size: var(--fs-body);
}

.button-group {
  margin-top: 1.75rem;
  display: flex;
  gap: 1rem; /* 버튼 사이 간격 */
}
</style>
