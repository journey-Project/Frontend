<template>
  <section class="travel-location-filter">
    <!-- 국내 여행지 -->
    <div class="section">
      <h2 class="region-title">국내 여행지</h2>
      <div class="toggle-buttons">
        <button class="toggle-btn active">지역</button>
        <button class="toggle-btn">도시</button>
      </div>

      <div class="location-grid">
        <span v-for="item in domesticPlaces" :key="item" class="location-item">
          {{ item }}
        </span>
      </div>
    </div>

    <!-- 해외 여행지 -->
    <div class="section">
      <h2 class="region-title">해외 여행지</h2>
      <div class="toggle-buttons">
        <button class="toggle-btn active">나라</button>
        <button class="toggle-btn">도시</button>
      </div>

      <div class="location-grid">
        <span v-for="item in overseasPlaces" :key="item" class="location-item">
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const domesticPlaces = [
  '경기',
  '서울',
  '부산',
  '강릉',
  '여수',
  '제주',
  '인천',
  '대구',
  '광주',
  '목포',
  '대전',
  '속초',
  '강원',
  '경북',
  '전남',
  '충북',
  '세종',
]

const overseasPlaces = ['일본', '중국', '베트남', '미국', '독일', '프랑스']
</script>

<style scoped>
.travel-location-filter {
  margin-top: var(--space-xl);
}

.section + .section {
  margin-top: var(--space-2xl);
}

.region-title {
  font-size: var(--fs-title);
  font-weight: var(--fw-bold);
  color: var(--color-dark);
  margin-bottom: var(--space-lg);
}

.toggle-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: var(--space-lg);
}

.toggle-btn {
  width: 5.5rem;
  height: 2rem;
  border: none;
  border-radius: var(--btn-radius);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-button-sm);
  background-color: var(--color-surface);
  color: var(--color-dark);
  opacity: 0.4;
  cursor: pointer;
}

.toggle-btn.active {
  background-color: var(--btn-bg);
  color: var(--btn-text);
  opacity: 1;
}

.location-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 8.25rem;
}

.location-item {
  font-size: var(--fs-body);
  color: var(--color-text);
  font-weight: var(--fw-medium);
}
</style>
