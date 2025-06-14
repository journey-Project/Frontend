<template>
  <div class="btn-wrapper">
    <button class="custom-button">팔로잉/팔로우 관리</button>
    <div class="button-row">
      <button class="half-button">프로필</button>
      <button class="half-button" @click="handleLogout">로그아웃</button>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/useAuthStore'

const auth = useAuthStore()

const handleLogout = async () => {
  await auth.logout()

  console.log('로그아웃 후 상태:', auth.user)
  window.location.href = '/'
}
</script>
<style scoped>
.btn-wrapper {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
}
.custom-button {
  width: 10.5rem;
  height: 2rem;
  border-radius: 999px; /* pill shape */
  background-color: white;
  color: var(--color-primary); /* 파란색 */
  font-weight: var(--fw-bold);
  font-size: var(--fs-button-sm);
  border: none;
  text-align: center;
  cursor: pointer;
  border: 2px solid #dbe2ef;
}
.button-row {
  display: flex;
  gap: 0.25rem;
  height: 2rem;
  margin-top: 2rem;
}

.half-button {
  border: 1px solid white;
  background-color: white;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 0;
  border: 2px solid #dbe2ef;
  width: 6.625rem;
}

/* 왼쪽 버튼: 왼쪽 둥글게 */
.half-button:first-child {
  border-right: none;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}

/* 오른쪽 버튼: 오른쪽 둥글게 */
.half-button:last-child {
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
</style>
