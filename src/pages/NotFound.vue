<template>
  <div class="not-found">
    <img src="@/assets/icons/main/404.svg" alt="404 이미지" class="full-bg-img" />
    <div class="overlay">
      <h1>404</h1>
      <p class="main-text">해당 페이지는 존재하지 않는 페이지입니다!</p>
      <router-link to="/" class="home-link">홈으로 돌아가기</router-link>
    </div>
  </div>
</template>

<script setup></script>
<style scoped>
.not-found {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.full-bg-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 1;
}

.overlay {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: white;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.35); /* 어두운 레이어 */
}

.overlay h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.main-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.home-link {
  background: var(--color-bg);
  color: var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: bold;
}
</style>