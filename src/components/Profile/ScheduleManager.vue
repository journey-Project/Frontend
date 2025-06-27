<template>
  <div class="travel-manager-box">
    <div class="travel-header">
      <p>여행일정</p>
      <img
        v-if="!editMode"
        class="edit-mode-img"
        src="/src/assets/icons/writer_icon.svg"
        @click="editMode = true"
      />
      <span v-if="editMode" class="edit-cancel" @click="editMode = false">취소</span>
    </div>
    <div class="cards">
      <div v-if="editMode" class="add-schedule" @click="showAddModal = true">
        <img class="add-icon" src="@/assets/icons/mytrips/plusImage.png" />
        <div class="add-text">
          <p class="add-title">여행일정 만들기</p>
          <p class="add-subtitle">새로운 일정을 만들어 보세요</p>
        </div>
      </div>
      <ScheduleCard
        v-for="item in schedules"
        :key="item.id"
        :schedule="item"
        :edit-mode="editMode"
        @delete="confirmDelete(item.id)"
      />
    </div>
    <AddScheduleModal
      v-if="showAddModal"
      @close="showAddModal = false"
      @refresh="emit('refresh')"
    />
    <BaseModal v-if="showDeleteModal" @close="showDeleteModal = false" @confirm="deleteSchedule">
      일정을 삭제하시겠습니까?
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddScheduleModal from './AddScheduleModal.vue'
import ScheduleCard from './ScheduleCard.vue'
import BaseModal from '../Base/BaseModal.vue'
import { deleteSchedule as apiDeleteSchedule } from '@/api/profileApi'

defineProps(['schedules'])
const emit = defineEmits(['refresh']) // 부모로부터 새로고침용 이벤트

const editMode = ref(false)
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const selectedPlanId = ref(null)

const confirmDelete = (id) => {
  selectedPlanId.value = id
  showDeleteModal.value = true
}

const deleteSchedule = async () => {
  try {
    await apiDeleteSchedule(selectedPlanId.value)
    emit('refresh') // 삭제 후 목록 새로고침
  } catch (error) {
    console.error('여행 일정 삭제 실패:', error)
  } finally {
    showDeleteModal.value = false
  }
}
</script>
<style scoped>
.travel-manager-box {
  background-color: var(--color-surface);
  width: 584px; /* 수정됨 */
  height: 376px; /* 수정됨 */
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.travel-header {
  margin-top: 1.5rem;
  margin-left: 2rem;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 👉 아이콘 오른쪽 끝 */
}

p {
  font-size: var(--fs-menu);
  font-weight: var(--fw-bold);
  margin: 0;
}

.cards {
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 0.5rem;
}

/* 각 ScheduleCard 및 추가 버튼 고정 크기 */
.cards > * {
  flex-shrink: 0;
  width: 504px;
  height: 96px;
}

.cards::-webkit-scrollbar {
  width: 0.5rem;
}

.cards::-webkit-scrollbar-track {
  background: transparent;
}

.cards::-webkit-scrollbar-thumb {
  background-color: var(--color-on-primary);
  border-radius: 1rem;
}

.edit-mode-img {
  cursor: pointer;
}

.add-schedule {
  background-color: var(--color-bg);
  border-radius: 1rem;
  width: 504px;
  height: 96px;
  cursor: pointer;
}

.edit-cancel {
  cursor: pointer;
  color: var(--color-text);
  font-size: var(--fs-button-sm);
  font-weight: var(--fw-semibold);
}

.add-schedule {
  background-color: var(--color-bg);
  border-radius: 1rem;
  width: 504px;
  height: 96px;
  display: flex;
  align-items: flex-start;
  padding: 2rem;
  gap: 1rem;
  cursor: pointer;
}

.add-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.add-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 0.5rem;
  margin-top: -0.4rem;
}

.add-title {
  color: var(--color-primary);
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.add-subtitle {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #666666;
}

</style>
