<template>
  <div class="location-popup">
    <div class="popup-header">
      <span class="popup-title">여행지 검색</span>
      <button class="close-button" @click="$emit('close')">&#x2715;</button>
    </div>
    <hr class="divider" />

    <input v-model="query" class="search-input" type="text" placeholder="도시 또는 국가 입력" />

    <div class="result-list">
      <div class="result-list">
        <template v-if="filteredLocations.length">
          <div class="result-item" v-for="item in filteredLocations" :key="item.label">
            <img :src="item.flag" alt="flag" class="flag-icon" />
            <span class="label">{{ item.label }}</span>
            <BaseButton size="sm" @click="$emit('select', item.label)">선택</BaseButton>
          </div>
        </template>
        <div v-else class="no-result">검색된 여행지가 존재하지 않습니다.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import flagJapan from '@/assets/icons/country_flag/flag_Japan.svg'
import flagUSA from '@/assets/icons/country_flag/flag_USA.svg'
import flagFrance from '@/assets/icons/country_flag/flag_France.svg'
import flagGermany from '@/assets/icons/country_flag/flag_Germany.svg'
import flagChina from '@/assets/icons/country_flag/flag_China.svg'
import flagVietnam from '@/assets/icons/country_flag/flag_Vietnam.svg'
import flagKorea from '@/assets/icons/country_flag/flag_Korea.svg'

const query = ref('')

const locations = [
  // 국내
  { label: '국내, 서울', flag: flagKorea },
  { label: '국내, 제주', flag: flagKorea },
  { label: '국내, 부산', flag: flagKorea },
  { label: '국내, 강릉', flag: flagKorea },
  { label: '국내, 속초', flag: flagKorea },
  { label: '국내, 인천', flag: flagKorea },
  { label: '국내, 대구', flag: flagKorea },
  { label: '국내, 광주', flag: flagKorea },
  { label: '국내, 전주', flag: flagKorea },
  { label: '국내, 여수', flag: flagKorea },
  { label: '국내, 대전', flag: flagKorea },
  { label: '국내, 울산', flag: flagKorea },

  // 일본
  { label: '일본, 도쿄', flag: flagJapan },
  { label: '일본, 오사카', flag: flagJapan },
  { label: '일본, 교토', flag: flagJapan },
  { label: '일본, 삿포로', flag: flagJapan },
  { label: '일본, 후쿠오카', flag: flagJapan },

  // 미국
  { label: '미국, 뉴욕', flag: flagUSA },
  { label: '미국, LA', flag: flagUSA },
  { label: '미국, 시카고', flag: flagUSA },
  { label: '미국, 샌프란시스코', flag: flagUSA },
  { label: '미국, 라스베이거스', flag: flagUSA },

  // 프랑스
  { label: '프랑스, 파리', flag: flagFrance },
  { label: '프랑스, 리옹', flag: flagFrance },
  { label: '프랑스, 마르세유', flag: flagFrance },
  { label: '프랑스, 니스', flag: flagFrance },

  // 독일
  { label: '독일, 베를린', flag: flagGermany },
  { label: '독일, 뮌헨', flag: flagGermany },
  { label: '독일, 프랑크푸르트', flag: flagGermany },
  { label: '독일, 함부르크', flag: flagGermany },

  // 중국
  { label: '중국, 상하이', flag: flagChina },
  { label: '중국, 베이징', flag: flagChina },
  { label: '중국, 광저우', flag: flagChina },
  { label: '중국, 선전', flag: flagChina },

  // 베트남
  { label: '베트남, 하노이', flag: flagVietnam },
  { label: '베트남, 호치민', flag: flagVietnam },
  { label: '베트남, 다낭', flag: flagVietnam },
  { label: '베트남, 나트랑', flag: flagVietnam },
]

const filteredLocations = computed(() => {
  return locations.filter((loc) => loc.label.toLowerCase().includes(query.value.toLowerCase()))
})
</script>

<style scoped>
.location-popup {
  width: 36rem;
  background-color: var(--color-surface);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-primary);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.divider {
  margin: 1rem 0;
  border: none;
  height: 1px;
  background-color: var(--color-primary);
}

.search-input {
  width: 32rem;
  height: 3rem;
  padding: 0 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  background-color: var(--color-bg);
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 20rem;
  font-weight: var(--fw-semibold);
  overflow-y: auto;
  background: var(--color-surface);
}

.result-item {
  width: 100%;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border: 1px solid #eaeaea;
  border-radius: 0.75rem;
  background-color: var(--color-bg);
}

.no-result {
  height: 32rem;
  margin-top: 6rem;
  text-align: center;
  padding: 2rem 1rem;
  color: var(--color-dark);
  font-size: 1rem;
}

.flag-icon {
  width: 2.5rem;
  height: 2rem;
  margin-right: 1rem;
}

.label {
  flex: 1;
  color: var(--color-primary);
  font-size: 1rem;
}
</style>
