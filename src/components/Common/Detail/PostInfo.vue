<!-- 게시글 상세 페이지 정보 박스(제목, 작성자, 작성시간, 조회수, 수정/삭제 버튼 ) -->
<template>
  <div>
    <div class="title">{{ title }}</div>
    <Avatar
      :profileImageUrl="profileImageUrl"
      :nickname="nickname"
      spanColor="var(--color-primary)"
      spanFontSize="18px"
      spanFontWeight="500"
      gap="16px"
    />

    <div class="infoBox">
      <div class="info-left">{{ formattedDate }} · 조회수 {{ viewCount }}</div>
      <div class="info-right" v-if="isOwner">
        <button class="action-button" @click="$emit('edit')">수정하기</button>
        <span class="divider"> | </span>
        <button class="action-button" @click="$emit('delete')">삭제하기</button>
      </div>
    </div>
    <hr />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import Avatar from '@/components/Profile/Avatar.vue'
import dayjs from 'dayjs'

const props = defineProps({
  title: String,
  nickname: String,
  createdAt: String,
  viewCount: Number,
  profileImageUrl: String,
  userId: String,
  isMine: Boolean,
})

const isOwner = computed(() => props.isMine)

//날짜 포맷
const formattedDate = dayjs(props.createdAt).format('YYYY.MM.DD HH:mm')
</script>
<style scoped>
.title {
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--fs-title);
  margin-bottom: var(--space-lg);
  padding-left: 0 !important;
  width: auto !important;
}
.infoBox {
  margin-top: var(--space-lg);
  color: var(--color-text);
  opacity: 60%;

  font-size: var(--fs-button-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.action-button {
  background: none;
  border: none;
  padding: 0;
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
}
hr {
  margin: 0;
  margin-top: 1.75rem;
  opacity: 80%;
  color: var(--color-primary);
}
</style>
