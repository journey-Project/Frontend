<template>
  <div class="community-write">
    <div class="top-row">
      <BaseSelector
        v-model="selectedBoard"
        :options="boardOptions"
        _ph="게시판 선택"
        _style="borderline"
        class="board-select"
      />
      <BaseButton size="md" @click="submitPost">등록</BaseButton>
    </div>

    <BaseText
      tag="h2"
      size="--fs-title"
      color="--color-primary"
      bold
      :style="{ opacity: 0.7, marginTop: '2rem' }"
    >
    </BaseText>

    <input v-model="title" type="text" class="title-input" placeholder="제목을 입력해주세요" />
    <div class="divider" />

    <div class="form-section">
      <div class="date-row">
        <BaseText tag="label" size="--fs-body" bold>여행 기간</BaseText>
        <div class="date-group">
          <BaseDatePicker
            v-model="startDate"
            class="ctl ctl--date"
            :max="endDate"
            placeholder="YYYY-MM-DD"
          />
          <span class="tilde">~</span>
          <BaseDatePicker
            v-model="endDate"
            class="ctl ctl--date"
            :min="startDate"
            placeholder="YYYY-MM-DD"
          />
        </div>
      </div>

      <div class="people-row">
        <BaseText tag="label" size="--fs-body" bold>희망 인원수</BaseText>
        <BaseSelector
          v-model="people"
          :options="peopleOptions"
          _ph="인원 선택"
          _style="fill"
          class="ctl ctl--select text-sm"
          style="margin-left: 1rem"
        />
      </div>

      <div class="location-row">
        <BaseText tag="label" size="--fs-body" bold class="location-label">여행지</BaseText>

        <div class="location-field">
          <div class="input-button-wrapper">
            <input
              v-model="location"
              type="text"
              class="location-input"
              placeholder="여행지 입력"
              readonly
            />
            <BaseButton size="lg" @click="showLocationPopup = !showLocationPopup"
              >여행지 검색</BaseButton
            >
          </div>
          <div v-if="showLocationPopup" class="location-popup-wrapper">
            <LocationSearchPopup
              @select="handleLocationSelect"
              @close="showLocationPopup = false"
            />
          </div>
        </div>
      </div>

      <div class="image-row">
        <BaseText tag="label" size="--fs-body" bold>커버 이미지</BaseText>
        <input
          ref="coverInput"
          type="file"
          accept="image/*"
          class="file-hidden"
          @change="onCoverChange"
        />
        <BaseButton size="lg" style="margin-left: 1rem" @click="coverInput.click()">
          이미지 선택
        </BaseButton>
        <span v-if="coverFile" class="file-ok"> ✔ {{ coverFile.name }} 선택됨 </span>
      </div>
    </div>

    <PostEditor v-model="content" class="post-editor" />
  </div>
</template>

<script setup>
import BaseSelector from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseText from '@/components/Base/BaseText.vue'
import BaseDatePicker from '@/components/Base/RangeDatePicker.vue'
import PostEditor from '@/components/Common/Editor/PostEditor.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import axios from 'axios'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const title = ref('')
const content = ref('')
const startDate = ref(null)
const endDate = ref(null)
const people = ref('')
const location = ref('')
const auth = useAuthStore()
const coverInput = ref(null)
const coverFile = ref(null)

const selectedBoard = ref(route.path.includes('/companion/write') ? 'companion' : 'community')
import LocationSearchPopup from '@/components/Common/Popup/LocationSearchPopup.vue'

const showLocationPopup = ref(false)

const handleLocationSelect = (selected) => {
  location.value = selected
  showLocationPopup.value = false
}

const boardOptions = [
  { label: '커뮤니티', value: 'community' },
  { label: '동행자 모집', value: 'companion' },
]

const peopleOptions = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}명`,
  value: `${i + 1}`,
}))

onMounted(() => {
  if (route.path.includes('/companion/write')) {
    selectedBoard.value = 'companion'
  } else if (route.path.includes('/community/write')) {
    selectedBoard.value = 'community'
  }
})

watch(selectedBoard, (newVal) => {
  let currentCountry = '국내'

  if (location.value) {
    currentCountry = location.value.split(',')[0]?.trim()
  } else if (
    route.params.country &&
    route.params.country !== 'write' &&
    route.params.country !== 'undefined'
  ) {
    currentCountry = route.params.country
  }

  if (newVal === 'companion') {
    router.push(`/companion/write/${currentCountry}`)
  } else if (newVal === 'community') {
    router.push(`/community/write/${currentCountry}`)
  }
})

const submitPost = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert('제목과 내용을 입력해 주세요')
    return
  }

  const countryFromLocation = location.value?.split(',')[0].trim() || '국내'

  const common = {
    memberId: auth.user.id,
    country: countryFromLocation,
    title: title.value,
    content: content.value,
    startDate: startDate.value,
    endDate: endDate.value,
  }
  console.log('📦  to-server =', common)

  const fd = new FormData()
  let url = ''

  if (selectedBoard.value === 'community') {
    fd.append('data', JSON.stringify(common))
    url = 'https://journeysite.site/api/community/save'
  } else {
    fd.append(
      'post',
      JSON.stringify({
        ...common,
        participants: Number(people.value),
        destination: location.value,
      }),
    )

    if (!coverFile.value) {
      alert('커버 이미지를 선택해 주세요')
      return
    }
    fd.append('coverImage', coverFile.value)
    url = 'https://journeysite.site/api/posts/save'
  }

  try {
    await axios.post(url, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    alert('게시글이 등록되었습니다')
    const countryFromLocation = location.value?.split(',')[0].trim() || '국내'

    router.push(
      selectedBoard.value === 'companion'
        ? `/companion-board/${countryFromLocation}`
        : '/community-board',
    )
  } catch (e) {
    console.error(e.response?.data || e)
    alert('등록 실패: ' + (e.response?.data?.message || '서버 오류'))
  }
}

function onCoverChange(e) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  coverFile.value = file
}
</script>

<style scoped>
.community-write {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding-top: 4rem;
  background: var(--color-bg);
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board-select {
  width: 144px;
  height: 32px;
  background-color: var(--color-surface);
}

.title-input {
  width: 100%;
  font-size: var(--fs-title);
  font-weight: var(--fw-bold);
  border: none;
  outline: none;
  color: var(--color-primary);
  opacity: 0.7;
  background: transparent;
}

.divider {
  height: 1px;
  background-color: var(--color-primary);
  opacity: 0.2;
  margin: var(--space-md) 0;
}

.post-editor {
  margin-bottom: 5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.date-row,
.people-row,
.location-row,
.image-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.date-row {
  margin-top: 1rem;
}

.date-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding-left: 2rem;
}

.tilde {
  font-size: 1.125rem;
  line-height: 1;
  color: var(--color-text);
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

.location-input {
  width: 144px;
  height: 32px;
  padding: 0.5rem;
  border: 1px solid var(--color-surface);
  border-radius: 1rem;
  font-size: 0.875rem;
  background: var(--color-surface);
  color: var(--color-primary);
}

.location-input::placeholder {
  color: var(--color-primary);
  opacity: 0.6;
}

.padded {
  padding-left: 1rem;
}

.img-btn {
  padding-left: 1rem;
}

.text-sm::v-deep(.label) {
  font-size: var(--fs-button-sm);
}

.location-search-btn {
  padding-left: 1rem;
}
.location-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.location-label {
  width: 4rem;
  white-space: nowrap;
}

.location-field {
  position: relative;
  flex: 1;
}

.input-button-wrapper {
  display: flex;
  gap: 1rem;
  margin-left: 1.5rem;
}

.location-input {
  height: 2rem;
  padding: 0 1rem;
  border: 1px solid var(--color-surface);
  border-radius: 1rem;
  font-size: 0.75rem;
  background: var(--color-surface);
  color: var(--color-primary);
}

.location-popup-wrapper {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 20000;
}

.file-hidden {
  display: none;
}

.image-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.file-ok {
  font-size: 0.875rem;
  margin-left: 0.75rem;
  color: var(--color-primary);
  white-space: nowrap;
}
</style>
