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
        <img src="/src/assets/icons/plus_icon_sm.svg" />
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
  width: 22.5rem;
  height: 23.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.travel-header {
  margin-top: 1.5rem;
  margin-left: 9rem;
  display: flex;
  align-items: center;
  /* gap: 6rem; */
}

p {
  font-size: var(--fs-menu);
  font-weight: var(--fw-bold);
  margin: 0;
}

.cards {
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 1rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 0.5rem;
}

/* 각 ScheduleCard의 기본 높이를 고정하고 축소 방지 */
.cards > * {
  flex-shrink: 0;
  height: 5.8rem; /* 원하는 높이로 고정 */
}

/* 스크롤바 스타일 */
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
  margin-left: 6rem;
}

.add-schedule {
  background-color: var(--color-bg);
  border-radius: 1rem;
  width: 18.5rem;
  height: 5.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.edit-cancel {
  cursor: pointer;
  margin-left: 5.5rem;
  color: var(--color-text);
  font-size: var(--fs-button-sm);
  font-weight: var(--fw-semibold);
}
</style>
