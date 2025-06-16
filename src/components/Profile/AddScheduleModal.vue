<template>
  <Teleport to="body">
    <div class="overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="header">
          <span class="text">일정추가</span>
          <button class="close-btn" @click="closeModal">
            <img src="/src/assets/icons/cancel_icon.svg" />
          </button>
        </div>
        <hr />

        <div class="location-row">
          <span class="text">여행지</span>
          <input
            v-model="location"
            type="text"
            class="location-input padded"
            placeholder="여행지 입력"
            readonly
          />
          <div class="location-search-btn">
            <BaseButton size="lg" @click="toggleLocationPopup">여행지 검색</BaseButton>
          </div>
          <Teleport to="body">
            <div v-if="showLocationPopup" class="location-popup-wrapper" :style="popupStyle">
              <LocationSearchPopup
                @select="handleLocationSelect"
                @close="showLocationPopup = false"
              />
            </div>
          </Teleport>
        </div>

        <div class="date-row">
          <span class="text">여행 기간 </span>
          <div class="date-group">
            <RangeDatePicker
              v-model="startDate"
              class="ctl ctl--date"
              :max="endDate"
              placeholder="YYYY-MM-DD"
            />
            <span class="tilde">~</span>
            <RangeDatePicker
              v-model="endDate"
              class="ctl ctl--date"
              :min="startDate"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>

        <div class="button-row">
          <BaseButton size="lg" @click="addSchedule">일정 추가</BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import RangeDatePicker from '../Base/RangeDatePicker.vue'
import BaseButton from '../Base/BaseButton.vue'
import LocationSearchPopup from '@/components/Common/Popup/LocationSearchPopup.vue'
import { postSchedule } from '@/api/profileApi'
import { useAuthStore } from '@/stores/useAuthStore'

const emit = defineEmits(['close', 'refresh'])

const closeModal = () => emit('close')

const auth = useAuthStore()

const location = ref('')
const showLocationPopup = ref(false)
const startDate = ref(null)
const endDate = ref(null)

const handleLocationSelect = (selected) => {
  location.value = selected
  showLocationPopup.value = false
}

const addSchedule = async () => {
  if (!location.value || !startDate.value || !endDate.value) {
    alert('모든 정보를 입력해주세요.')
    return
  }

  const [country, city] = location.value.split(',').map((s) => s.trim())
  const payload = {
    country: country || '',
    city: city || '',
    startDate: startDate.value,
    endDate: endDate.value,
  }

  try {
    await postSchedule(auth.user.id, payload)
    emit('refresh')

    closeModal()
  } catch (err) {
    console.error('일정 추가 실패:', err)
    alert('일정 추가에 실패했습니다.')
  }
}

const popupStyle = ref({})

const toggleLocationPopup = (event) => {
  showLocationPopup.value = !showLocationPopup.value

  if (showLocationPopup.value) {
    const rect = event.target.getBoundingClientRect()
    popupStyle.value = {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY + 10}px`,
      left: `${rect.left + window.scrollX - 52.5}px`,
      zIndex: 10000,
    }
  }
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
  overflow: visible;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  width: 35.25rem;
  height: 23.8rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: space-between;
  padding-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.text {
  font-size: 1.125rem;
  font-weight: var(--fw-bold);
  color: var(--color-dark);
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
}

hr {
  margin: 0 auto;
  color: #7e7e7e;
  opacity: 100%;
  margin-top: 0.7rem;
  width: 90%;
}

.location-row,
.date-row {
  display: flex;
  align-items: center;
  /* gap: var(--space-md); */
  margin-left: 4rem;
}

.location-row {
  margin-top: 3.5rem;
}
.date-row {
  margin-top: 2.5rem;
}
.date-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding-left: 2.75rem;
}

.ctl {
  flex: 0 0 9rem;
  height: var(--btn-height);
  border-radius: var(--btn-radius);
  background: var(--color-surface);
  color: var(--color-primary);
  min-width: 0;
  text-align: center;
}

.ctl--date ::v-deep(.date-wrapper) {
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: calc(var(--space-sm) + 1.5rem);
  font-size: 0.75rem;
  line-height: 1;
  display: flex;
  align-items: center;
}

.ctl--date ::v-deep(.date-icon) {
  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  opacity: 0.6;
  margin-left: 0.5rem;
}

.ctl--date ::v-deep(.date-input) {
  font-size: 0.75rem;
  color: var(--color-primary);
  background: transparent;
  border: none;
  width: 100%;
  padding-left: 1.5rem;
  text-align: center;
}

.tilde {
  font-size: 1.125rem;
  line-height: 1;
  color: var(--color-primary);
}

.location-input {
  width: 144px;
  height: 32px;
  padding: 0.5rem;
  border: 1px solid var(--color-surface);
  border-radius: 1rem;
  font-size: 0.875rem; /* ↓ 줄임 */
  background: var(--color-surface); /* white → 일관된 배경색 */
  color: var(--color-primary);
  margin-left: 4rem;
}

.location-input::placeholder {
  color: var(--color-primary);
  opacity: 0.6;
}

.padded {
  padding-left: 1rem;
}
.location-search-btn {
  padding-left: 1rem;
}

.location-popup-wrapper {
  position: fixed;
  top: 49%;
  left: 51%;
  transform: translateX(-50%);
  z-index: 10000;
}

.button-row {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}
</style>
