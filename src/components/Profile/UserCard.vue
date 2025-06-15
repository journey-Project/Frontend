<!-- 프로필 이미지, 기본 정보, 해시태그, 자기소개 -->
<template>
  <div v-if="profile" class="introduce-box">
    <div class="profile-user-div">
      <img :src="profile.profileImage" alt="프로필 이미지" class="profile-img" />
    </div>

    <div class="box-left">
      <span class="name">{{ profile.nickname }}</span>
      <hr />
      <div class="info-grid">
        <div class="label">나이</div>
        <div class="value">{{ profile.age }}</div>
        <div class="label">지역</div>
        <div class="value">{{ profile.region }}</div>
        <div class="label">성별</div>
        <div class="value">{{ profile.gender === 'FEMALE' ? '여성' : '남성' }}</div>
        <div class="label">링크</div>
        <div class="value">{{ profile.homepage }}</div>
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
          {{ profile.bio }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  profile: Object,
})
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

.profile-user-div {
  margin-top: 2rem;
  margin-left: 2rem;
  width: 9.5rem;
  height: 9.5rem;
  border-radius: 50%;
  overflow: hidden;
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
</style>
