<!-- 프로필 이미지, 기본 정보, 해시태그, 자기소개 -->
<template>
  <div v-if="profile" class="introduce-box">
    <div class="profile-user-wrapper">
      <div class="profile-user-div">
        <img
          :src="isDefaultImage ? defaultProfileImage : editableProfile.profileImage"
          class="profile-img"
        />

        <!-- 파일 선택 -->
        <input v-if="editMode" type="file" ref="fileInputRef" @change="onFileChange" />
      </div>
      <!-- X 아이콘 -->
      <div v-if="editMode && !isDefaultImage" class="remove-image-icon" @click="removeProfileImage">
        ✕
      </div>
    </div>
    <div class="box-left">
      <div class="edit-header">
        <span v-if="!editMode" class="name">{{ profile.nickname }}</span>
        <input
          v-else
          v-model="editableProfile.nickname"
          type="text"
          class="underline-input"
          placeholder="닉네임"
        />

        <img
          v-if="!editMode"
          class="edit-mode-img"
          src="/src/assets/icons/writer_icon.svg"
          @click="editMode = true"
        />
        <span v-if="editMode" class="edit-cancel" @click="cancelEdit">취소</span>
        <button v-if="editMode" class="save-button" @click="saveProfile">저장</button>
      </div>

      <hr />

      <div class="info-grid">
        <div class="label">나이</div>
        <div class="value">
          <span v-if="!editMode">{{ profile.age }}</span>
          <input
            v-else
            v-model="editableProfile.age"
            type="number"
            class="underline-input"
            min="0"
            max="150"
          />
        </div>

        <div class="label">지역</div>
        <div class="value">
          <span v-if="!editMode">{{ profile.region }}</span>
          <input v-else v-model="editableProfile.region" type="text" class="underline-input" />
        </div>

        <div class="label">성별</div>
        <div class="value">
          <span v-if="!editMode">{{ profile.gender === 'FEMALE' ? '여성' : '남성' }}</span>
          <select v-else v-model="editableProfile.gender" class="underline-input">
            <option value="FEMALE">여성</option>
            <option value="MALE">남성</option>
          </select>
        </div>

        <div class="label">링크</div>
        <div class="value">
          <span v-if="!editMode">{{ profile.homepage }}</span>
          <input v-else v-model="editableProfile.homepage" type="text" class="underline-input" />
        </div>
      </div>

      <!-- <div class="hashtag-block">
        <div class="hashtag">#일본어가능</div>
        <div class="plus">
          <img src="/src/assets/icons/hashtag_plus_icon.svg" />
        </div>
      </div> -->
      <hr />

      <div class="intro-row">
        <div class="intro-title">자기소개</div>
        <div class="intro-content">
          <span v-if="!editMode">{{ profile.bio }}</span>
          <textarea
            v-else
            v-model="editableProfile.bio"
            class="underline-input textarea-input"
            rows="4"
            placeholder="자기소개를 입력하세요."
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { ref, reactive, watch, computed } from 'vue'
import { patchProfileById } from '@/api/profileApi'
import { postProfileImage } from '@/api/profileApi'
import { useAuthStore } from '@/stores/useAuthStore'

const defaultProfileImage = new URL('@/assets/default_profile.png', import.meta.url).href
const DEFAULT_S3_IMAGE_URL =
  'https://journeybucket0.s3.ap-northeast-2.amazonaws.com/USER/5c380987-c103-4ed5-ae55-0baef59574b7.jpeg'
const emit = defineEmits(['refresh'])
const defaultImg = '/default_profile.png'
const auth = useAuthStore()

const props = defineProps({
  profile: Object,
})

const editMode = ref(false)

const fileInputRef = ref(null) // 파일 인풋 접근용 ref

function removeProfileImage() {
  editableProfile.profileImage = ''
  editableProfile.profileImageFile = null

  // 파일 선택 input도 초기화
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const isDefaultImage = computed(() => {
  const clean = (url) => (typeof url === 'string' ? url.split('?')[0] : '')
  return clean(editableProfile.profileImage) === DEFAULT_S3_IMAGE_URL
})

// 수정 모드일 때 편집할 데이터를 로컬 상태로 복사
const editableProfile = reactive({
  nickname: '',
  age: '',
  region: '',
  gender: '',
  homepage: '',
  bio: '',
  profileImage: '',
  profileImageFile: null,
})

watch(
  () => props.profile,
  (newProfile) => {
    console.log('[DEBUG] profile:', newProfile)
    if (newProfile) {
      editableProfile.nickname = newProfile.nickname || ''
      editableProfile.age = newProfile.age || ''
      editableProfile.region = newProfile.region || ''
      editableProfile.gender = newProfile.gender || ''
      editableProfile.homepage = newProfile.homepage || ''
      editableProfile.bio = newProfile.bio || ''
      editableProfile.profileImage = newProfile.profileImage || ''
    }
  },
  { immediate: true },
)

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  editableProfile.profileImageFile = file

  // 미리보기용 URL만 생성
  editableProfile.profileImage = URL.createObjectURL(file)
}

function cancelEdit() {
  editMode.value = false
  // 원래 프로필로 복원
  editableProfile.nickname = props.profile.nickname || ''
  editableProfile.age = props.profile.age || ''
  editableProfile.region = props.profile.region || ''
  editableProfile.gender = props.profile.gender || ''
  editableProfile.homepage = props.profile.homepage || ''
  editableProfile.bio = props.profile.bio || ''
  editableProfile.profileImage = props.profile.profileImage || ''
}

function cleanUrl(url) {
  return typeof url === 'string' ? url.split('?')[0] : ''
}

function sanitizePayload(payload) {
  const cleanPayload = {}
  Object.keys(payload).forEach((key) => {
    cleanPayload[key] = payload[key] === '' ? null : payload[key]
  })
  return cleanPayload
}

async function saveProfile() {
  try {
    let imageUrl = ''

    if (editableProfile.profileImageFile) {
      const { data } = await postProfileImage(
        props.profile.memberId,
        editableProfile.profileImageFile,
      )
      imageUrl = cleanUrl(typeof data === 'string' ? data : data.profileImage)
      editableProfile.profileImageFile = null
    } else if (editableProfile.profileImage === '') {
      imageUrl = '' // 백엔드가 기본 이미지로 치환
    } else {
      imageUrl = cleanUrl(props.profile.profileImage)
    }

    const rawPayload = {
      nickname: editableProfile.nickname,
      age: editableProfile.age,
      region: editableProfile.region,
      gender: editableProfile.gender,
      homepage: editableProfile.homepage,
      bio: editableProfile.bio,
      profileImage: imageUrl,
    }

    const payload = sanitizePayload(rawPayload)

    const { data: updated } = await patchProfileById(props.profile.memberId, payload)

    auth.updateUserProfile(updated)
    editMode.value = false
    emit('refresh')
  } catch (err) {
    console.error('프로필 저장 실패', err)
  }
} 
</script>
<style scoped>
.introduce-box {
  background-color: var(--color-surface);
  width: 46rem;
  /* height: 23.5rem; */
  border-radius: 1rem;
  display: flex;
  gap: 1.75rem;
  margin-bottom: 1rem;
}
.profile-user-wrapper {
  position: relative;
  width: 9.5rem;
  height: 9.5rem;
  margin-top: 2rem;
  margin-left: 2rem;
}

.profile-user-div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  /* border: 1px solid white; */
  position: relative;
}
.profile-user-div input[type='file'] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  width: 9.5rem;
  height: 9.5rem;
  cursor: pointer;
  z-index: 2;
}

.edit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 0.5rem;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.box-left {
  margin-top: 2rem;
  width: 31.25rem;
}

.name {
  color: black;
  font-size: 1.625rem;
  font-weight: var(--fw-bold);
  margin-left: 1.25rem;
}

hr {
  color: var(--color-primary);
  opacity: 80%;
  margin-top: 1rem;
  margin-bottom: 0;
  border: none;
  height: 1px;
  background-color: var(--color-primary);
}

.info-grid {
  margin-left: 1.25rem;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: max-content 0.7fr max-content 1fr;
  column-gap: 1.8rem;
  row-gap: 0.8rem;
  font-size: 1.125rem;
}

.label {
  color: var(--color-primary);
  font-weight: var(--fw-bold);
}

.value {
  color: var(--color-text);
}
.hashtag-block {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}
.hashtag {
  background-color: var(--color-primary);
  color: white;
  width: 6.5rem;
  height: 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--fw-bold);
  font-size: var(--fs-button-sm);
}

.plus {
  border: 3px solid var(--color-primary);
  width: 6.5rem;
  height: 2rem;
  border-radius: 2rem;
  text-align: center;
  cursor: pointer;
}
.intro-row {
  margin-top: 1rem;
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.intro-title {
  color: var(--color-primary); /* 진한 파란색 */
  font-size: 1.125rem;
  font-weight: 700;
  margin-left: 1.25rem;
}

.intro-content {
  color: var(--color-text);
  font-size: 1.125rem;
  line-height: 1.6;
  font-weight: 400;
}

.underline-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--color-primary);
  background: transparent;
  outline: none;
  font-size: 1.125rem;
  padding: 0.2rem 0;
  color: var(--color-text);
  font-weight: 500;
}

.textarea-input {
  resize: vertical;
  font-family: inherit;
  width: 24rem;
}

.edit-mode-img {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

.edit-cancel {
  cursor: pointer;
  color: var(--color-primary);
  margin-left: 10rem;
  font-weight: 600;
  white-space: nowrap;
  margin-right: 1rem;
}

.save-button {
  background-color: var(--color-primary);
  border: none;
  color: white;
  padding: 0.4rem 1rem;
  /* font-weight: 700; */
  border-radius: 2rem;
  cursor: pointer;
  white-space: nowrap;
}

.remove-image-icon {
  position: absolute;
  top: 0.4rem;
  right: 0.6rem;
  background-color: #6666669e;
  color: white;
  font-weight: bold;
  font-size: 0.75rem; /* 폰트 크기 줄이기 */
  width: 1.6rem; /* 버튼 크기 줄이기 */
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
}
</style>
