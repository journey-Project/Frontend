<template>
  <div class="community-write">
    <div class="submit-btn">
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
        <span v-if="coverFile || coverImageUrl" class="file-ok">
          ✔
          {{ coverFile ? coverFile.name : coverImageUrl.split('/').pop() }}
          선택됨
        </span>
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
import LocationSearchPopup from '@/components/Common/Popup/LocationSearchPopup.vue'

import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

import axios from 'axios'
import { getCompanionPostByPostId } from '@/api/companionApi'

/* ───── 상태 ───── */
const router = useRouter()
const route  = useRoute()
const auth   = useAuthStore()

const title     = ref('')
const content   = ref('')
const startDate = ref(null)
const endDate   = ref(null)
const people    = ref('')
const location  = ref('')

const coverInput   = ref(null)
const coverFile    = ref(null)
const coverImageUrl= ref('')

const showLocationPopup = ref(false)

/* ───── 수정 모드 판별 ───── */
const postId      = computed(() => route.params.id)
const isEditMode  = computed(() => Number.isInteger(+postId.value))

/* ───── 옵션 ───── */
const peopleOptions = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}명`, value: `${i + 1}`,
}))

/* ───── 초기 데이터 로드 (수정 모드) ───── */
onMounted(async () => {
  if (!isEditMode.value) return
  try {
    const { data } = await getCompanionPostByPostId(postId.value)
    title.value       = data.title
    content.value     = data.content
    startDate.value   = data.start_date
    endDate.value     = data.end_date
    people.value      = String(data.max_participants)
    location.value    = data.destination
    coverImageUrl.value = data.coverImageUrl || ''
  } catch (err) {
    console.error('게시글 불러오기 실패:', err)
  }
})

/* ───── 여행지 팝업 선택 ───── */
const handleLocationSelect = (selected) => {
  location.value = selected
  showLocationPopup.value = false
}

/* ───── 커버 이미지 선택 ───── */
function onCoverChange (e) {
  const [file] = e.target.files || []
  if (file) {
    coverFile.value     = file
    coverImageUrl.value = ''
  }
}

/* ───── 제출 ───── */
async function submitPost () {
  /* 1. 프런트 검증 */
  if (!title.value.trim() || !content.value.trim()) {
    alert('제목과 내용을 입력해 주세요')
    return
  }
  if (!startDate.value || !endDate.value) {
    alert('여행 기간을 선택해 주세요')
    return
  }
  if (!people.value) {
    alert('희망 인원수를 선택해 주세요')
    return
  }
  if (!location.value) {
    alert('여행지를 입력/선택해 주세요')
    return
  }
  if (!isEditMode.value && !coverFile.value) {
    alert('커버 이미지를 선택해 주세요')
    return
  }

  /* 2. payload 구성 */
  const countryFromLocation = location.value.split(',')[0]?.trim() || '국내'

  const basePayload = {
    country       : countryFromLocation,
    title         : title.value,
    content       : content.value,
    startDate     : startDate.value,
    endDate       : endDate.value,
    participants  : Number(people.value),
    destination   : location.value,
  }

  const fd  = new FormData()
  let   url = ''

  if (isEditMode.value) {
    const payload = {
    ...basePayload,
    coverImageUrl: coverImageUrl.value || '',
  }
    /* ---- 수정 (PUT) ---- */
    fd.append('post', JSON.stringify(payload))
    if (coverFile.value) fd.append('newCoverImage', coverFile.value)
    url = `https://journeysite.site/api/posts/update/${postId.value}`
  } else {
    /* ---- 새 글 (POST) ---- */
    fd.append('post', JSON.stringify({ ...basePayload, memberId: auth.user.id }))
    fd.append('coverImage', coverFile.value)
    url = 'https://journeysite.site/api/posts/save'
  }

  /* 3. 전송 */
  try {
    if (isEditMode.value) {
      await axios.put(url, fd)           // boundary 자동
      alert('게시글이 수정되었습니다')
    } else {
      await axios.post(url, fd)
      alert('게시글이 등록되었습니다')
    }

    /* 4. 완료 후 리다이렉트 */
    router.replace(`/companion-board/${countryFromLocation}`)
  } catch (err) {
    console.error(err.response?.data || err)
    alert('저장 실패: ' + (err.response?.data?.message || '서버 오류'))
  }
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

.submit-btn {
  float: right;
  margin-bottom: 1rem;
}
</style>
