<!-- 댓글 1개 항목 -->
<template>
  <div>
    <div>
      <div class="header-row">
        <Avatar
          :profileImageUrl="comment.profile_image"
          :nickname="comment.user_id"
          spanColor="var(--color-primary)"
          spanFontSize="16px"
          spanFontWeight="700"
          gap="16px"
        />
        <div class="menu-container">
          <img src="@/assets/icons/seemore_icon.svg" @click="toggleMenu" class="seemore-icon" />
          <CommentActionMenu v-if="menuVisible" class="action-menu" />
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="content">
        {{ comment.content }}
      </div>
      <div class="reply-btn-wrapper">
        <BaseButton>답글</BaseButton>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Avatar from '@/components/Profile/Avatar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import CommentActionMenu from './CommentActionMenu.vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})

const menuVisible = ref(false)

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value
}
</script>
<style scoped>
.content-box {
  margin-left: 2.75rem;
}
.content {
  font-size: var(--fs-body);
  color: var(--color-text);
  margin-top: var(--space-md);
  margin-bottom: var(--space-md);
}
hr {
  color: var(--color-primary);
  opacity: 30%;
}

.reply-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.seemore-icon {
  cursor: pointer;
}

.menu-container {
  position: relative; /* 기준점 */
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 메뉴를 오른쪽에 붙이기 위함 */
}
</style>
