<template>
  <section class="event-section">
    <div class="event-header">
      <h2 class="event-title">이벤트</h2>
      <a href="#" class="event-more">더보기</a>
    </div>

    <div class="event-cards">
      <div class="event-card">
        <div class="card-text">
          <p>매일 오전 10시!</p>
          <p>최대 5만원 쿠폰 증정</p>
        </div>
        <img src="@/assets/icons/reservation/event1.png" alt="쿠폰" class="card-image" />
      </div>

      <div class="event-card">
        <div class="card-text">
          <p>베트남 숙소<br />리얼 후기</p>
          <p>여기서 확인하세요!</p>
        </div>
        <img src="@/assets/icons/reservation/event2.png" alt="베트남" class="card-image" />
      </div>

      <div class="event-card">
        <div class="card-text">
          <p>제니가 다녀온 <br> 프랑스 숙소!</p>
          <p>선착순 이벤트!</p>
        </div>
        <img src="@/assets/icons/reservation/event3.png" alt="프랑스" class="card-image" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.event-section {
  margin-top: var(--space-xl);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.event-title {
  font-size: var(--fs-title);
  color: var(--color-dark);
  font-weight: var(--fw-bold);
}

.event-more {
  font-size: var(--fs-button-sm);
  color: var(--color-dark);
  opacity: 0.4;
  text-decoration: none;
  padding-right: 2rem;
}

.event-cards {
  display: flex;
  gap: var(--card-gap);
}

.event-card {
  width: 18rem;
  height: 9rem;
  background-color: rgba(219, 226, 239, 0.4);
  border-radius: var(--card-radius);
  padding: var(--space-md);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.card-text {
  margin-top: 1rem;
  margin-left: 1rem;
  font-size: var(--fs-body);
  color: var(--color-dark);
  line-height: 1.4;
  font-weight: var(--fw-semibold);
}

.card-image {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  margin-left: var(--space-md);
}
</style>
