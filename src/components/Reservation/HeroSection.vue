<template>
  <section class="hero">
    <div class="hero-background"></div>

    <div class="hero-content">
      <!-- ✅ 텍스트는 흰색 + 왼쪽 정렬 -->
      <h1 class="hero-title">국내 숙소부터 해외 인기 숙소까지<br />여정과 함께</h1>

      <div class="search-box">
        <div class="tab-buttons">
          <button
            :class="['tab', selectedTab === 'domestic' ? 'active' : '']"
            @click="selectedTab = 'domestic'"
          >
            국내 숙소
          </button>
          <button
            :class="['tab', selectedTab === 'overseas' ? 'active' : '']"
            @click="selectedTab = 'overseas'"
          >
            해외 숙소
          </button>
        </div>

        <div class="search-form">
          <input type="text" placeholder="여행지나 숙소를 검색해주세요." class="search-input" />
          <RangeDatePicker class="date-input" placeholder="YYYY-MM-DD" />
          <span class="date-separator">~</span>
          <RangeDatePicker class="date-input" placeholder="YYYY-MM-DD" />
          <BaseButton class="people-btn" size="lg">
            <template #icon>
              <img src="@/assets/icons/reservation/person.png" alt="인원" />
            </template>
            인원 2, 객실 1
          </BaseButton>
          <BaseButton class="search-btn" size="sm">검색</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import RangeDatePicker from '@/components/Base/RangeDatePicker.vue'

const selectedTab = ref('domestic')
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
}

.hero-background {
  width: 100%;
  position: absolute;
  inset: 0;
  background-image: url('@/assets/icons/reservation/hotelslide.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  height: 23.75rem;
}

.hero-image {
  width: 1440px;
  height: 240px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
}

.hero-content {
  padding: 2rem 2rem;
  justify-content: flex-start;
  gap: 0.75rem;
}

.hero-title {
  align-self: flex-start;
  color: white;
  font-size: 32px;
  font-weight: bold;
  padding-left: calc((100% - 960px) / 2);
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.search-box {
  width: 60rem;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.tab-buttons {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
}

.tab {
  background: none;
  border: none;
  padding: 0.5rem 1.25rem;
  font-weight: bold;
  font-size: 1rem;
  color: #999;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}

.search-form {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.search-input {
  width: 16.5rem;
  height: 2rem;
  padding: 0 0.75rem;
  font-size: 14px;
  background-color: var(--color-bg);
  box-sizing: border-box;
  border-radius: 1rem;
  border: none;
  outline: none;
}

.date-input {
  width: 7.5rem;
  height: 2rem;
}

.date-input::v-deep(input) {
  font-size: 12px;
  padding: 0 0.75rem;
  height: 2rem;
  line-height: 2rem;
}

.date-separator {
  font-size: 14px;
  color: #666;
}

.people-btn {
  width: 7.5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  white-space: nowrap;
  font-size: 12px;
  color: var(--color-primary);
}

.search-btn {
  width: 7.5rem;
  height: 2rem;
  background-color: var(--color-primary);
  color: var(--color-bg);
  font-weight: bold;
  border-radius: 1rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  background-image: url('@/assets/icons/reservation/hotelslide.png');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.search-input,
.date-input,
.people-btn {
  background-color: var(--color-bg);
}
</style>
