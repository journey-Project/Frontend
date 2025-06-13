<template>
  <section class="popular-hotels">
    <h2 class="title">인기 추천 숙소</h2>
    <div class="filter-buttons">
      <button
        v-for="(label, idx) in filters"
        :key="idx"
        class="filter-btn"
        :class="{ active: idx === 0 }"
      >
        {{ label }}
      </button>
    </div>

    <div class="hotel-list">
      <div class="hotel-card" v-for="(hotel, i) in hotels" :key="i">
        <img :src="hotel.image" :alt="hotel.name" class="hotel-image" />
        <span class="hotel-type">{{ hotel.type }}</span>
        <span class="hotel-name">{{ hotel.name }}</span>
        <span class="hotel-location">{{ hotel.location }}</span>

        <div class="rating-row">
          <div class="rating-box">
            <img src="@/assets/icons/reservation/star-yellow.png" alt="★" class="star-icon" />
            {{ hotel.rating }}
          </div>
          <span class="rating-count">{{ hotel.reviews }}</span>
        </div>

        <span class="coupon-text">쿠폰 적용시</span>

        <div class="price-row">
          <span class="current-price">{{ hotel.price }}원</span>
          <span class="original-price">{{ hotel.originalPrice }}원</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import hotel1 from '@/assets/icons/reservation/hotel1.webp'
import hotel2 from '@/assets/icons/reservation/hotel2.jpeg'
import hotel3 from '@/assets/icons/reservation/hotel3.jpeg'
import hotel4 from '@/assets/icons/reservation/hotel4.jpeg'

const filters = ['전체', '모텔', '호텔', '펜션', '캠핑', '게하']

const hotels = [
{
    image: hotel1,
    type: '호텔',
    name: '웨스틴 조선 서울',
    location: '서울 중구',
    rating: '9.6',
    reviews: '80000명 평가',
    price: '300,000',
    originalPrice: '380,000',
  },
  {
    image: hotel2,
    type: '호텔',
    name: '신라 호텔',
    location: '서울 중구',
    rating: '9.7',
    reviews: '12000명 평가',
    price: '350,000',
    originalPrice: '430,000',
  },
  {
    image: hotel3,
    type: '호텔',
    name: '시그니엘',
    location: '잠실역 위치',
    rating: '9.8',
    reviews: '90000명 평가',
    price: '890,000',
    originalPrice: '1,050,000',
  },
  {
    image: hotel4,
    type: '호텔',
    name: '신라호텔 제주',
    location: '제주 서귀포시',
    rating: '9.8',
    reviews: '35000명 평가',
    price: '450,000',
    originalPrice: '720,000',
  },
]
</script>

<style scoped>
.popular-hotels {
  margin-top: var(--space-xl);
}

.title {
  font-size: var(--fs-title);
  color: var(--color-dark);
  font-weight: var(--fw-semibold);
  margin-bottom: var(--space-lg);
}

.filter-buttons {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
}

.filter-btn {
  width: 5.5rem;
  height: 2rem;
  border-radius: var(--btn-radius);
  border: none;
  background-color: var(--color-surface);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-button-sm);
  color: var(--color-dark);
  opacity: 0.4;
}

.filter-btn.active {
  background-color: var(--color-primary);
  color: var(--btn-text);
  opacity: 1;
}

.hotel-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
}

.hotel-card {
  width: 222px;
  display: flex;
  flex-direction: column;
}

.hotel-image {
  width: 222px;
  height: 148px;
  border-radius: var(--card-radius);
  object-fit: cover;
}

.hotel-type {
  font-size: 12px;
  font-weight: var(--fw-semibold);
  color: var(--color-dark);
  opacity: 0.6;
  margin-top: var(--space-sm);
}

.hotel-name {
  font-size: var(--fs-body);
  font-weight: var(--fw-semibold);
  margin-top: 0.25rem;
}

.hotel-location {
  font-size: 10px;
  font-weight: var(--fw-semibold);
  color: var(--color-dark);
  opacity: 0.6;
  margin-top: 0.25rem;
}

.rating-row {
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
}

.rating-box {
  width: 32px;
  height: 12px;
  font-size: 8px;
  font-weight: var(--fw-semibold);
  background-color: #ffc107;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--btn-gap);
}

.star-icon {
  width: 10px;
  height: 10px;
}

.rating-count {
  font-size: 12px;
  font-weight: var(--fw-semibold);
  margin-left: 0.5rem;
}

.coupon-text {
  font-size: 12px;
  font-weight: var(--fw-semibold);
  color: var(--color-dark);
  opacity: 0.6;
  margin-top: 0.25rem;
}

.price-row {
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
}

.current-price {
  font-size: var(--fs-body);
  font-weight: var(--fw-semibold);
}

.original-price {
  font-size: 6px;
  font-weight: var(--fw-semibold);
  text-decoration: line-through;
  margin-left: 0.5rem;
}

</style>
