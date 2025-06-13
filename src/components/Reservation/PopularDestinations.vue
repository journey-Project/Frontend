<template>
  <section class="popular-destinations">
    <!-- 국내 인기 여행지 -->
    <div class="destination-section">
      <h2 class="section-title">국내 인기 여행지</h2>
      <div class="destination-grid">
        <div v-for="(item, index) in domesticPlaces" :key="index" class="destination-card">
          <img :src="item.image" :alt="item.label" class="destination-image" />
          <span class="destination-label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- 해외 인기 여행지 -->
    <div class="destination-section">
      <h2 class="section-title">해외 인기 여행지</h2>
      <div class="destination-grid">
        <div v-for="(item, index) in overseasPlaces" :key="index" class="destination-card">
          <img :src="item.image" :alt="item.label" class="destination-image" />
          <span class="destination-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import seoul from '@/assets/icons/reservation/seoul.png'
import jeju from '@/assets/icons/reservation/jeju.jpeg'
import busan from '@/assets/icons/reservation/busan.avif'
import gangneung from '@/assets/icons/reservation/gangneung.png'
import yeosu from '@/assets/icons/reservation/yeosu.png'

import osaka from '@/assets/icons/reservation/osaka.jpeg'
import tokyo from '@/assets/icons/reservation/tokyo.jpg'
import hongkong from '@/assets/icons/reservation/hongkong.webp'
import fukuoka from '@/assets/icons/reservation/fukuoka.png'
import guam from '@/assets/icons/reservation/guam.webp'


const domesticPlaces = [
  { image: seoul, label: '서울' },
  { image: jeju, label: '제주도' },
  { image: busan, label: '부산' },
  { image: gangneung, label: '강릉' },
  { image: yeosu, label: '여수' },
]

const overseasPlaces = [
  { image: osaka, label: '오사카' },
  { image: tokyo, label: '도쿄' },
  { image: hongkong, label: '홍콩' },
  { image: fukuoka, label: '후쿠오카' },
  { image: guam, label: '괌' },
]

</script>

<style scoped>
.popular-destinations {
  margin-top: var(--space-xl);
}

.destination-section + .destination-section {
  margin-top: var(--space-3xl);
}

.section-title {
  font-size: var(--fs-title);
  color: var(--color-dark);
  font-weight: var(--fw-semibold);
  margin-bottom: var(--space-lg);
}

.destination-grid {
  display: flex;
  gap: var(--space-lg);
}

.destination-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 10.75rem;
}

.destination-image {
  width: 11rem;
  height: 11rem;
  object-fit: cover;
  border-radius: var(--card-radius);
}

.destination-label {
  margin-top: var(--space-sm);
  font-size: var(--fs-body);
  font-weight: var(--fw-regular);
  color: var(--color-dark);
}
</style>
