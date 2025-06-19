<!-- 댓글 1개 항목 -->
<template>
  <div>
    <template v-if="comment.active">
      <div v-if="!isEditing" :style="{ marginLeft: `${depth * 3}rem` }">
        <div class="header-row">
          <!-- 아바타 + 날짜 -->
          <div class="info-row">
            <Avatar
              :profileImageUrl="comment.profileImage"
              :nickname="comment.displayName"
              spanColor="var(--color-primary)"
              spanFontSize="16px"
              spanFontWeight="700"
              gap="16px"
            />
            <span class="date">{{ formattedDate }}</span>
          </div>

          <!-- 수정/삭제 메뉴 -->
          <div class="menu-container" v-if="comment.mine">
            <div ref="menuRef" style="position: relative">
              <img
                src="@/assets/icons/seemore_icon.svg"
                @click.stop="toggleMenu"
                class="seemore-icon"
              />
              <CommentActionMenu
                v-if="menuVisible"
                class="action-menu"
                :commentId="comment.commentId"
                @show-delete-modal="onShowDeleteModal"
                @comment-deleted="handleCommentDeleted"
                @close-menu="menuVisible = false"
                @start-edit="startEdit"
                style="
                  position: absolute;
                  top: 100%;
                  left: 50%;
                  transform: translateX(-100%);
                  z-index: 1000;
                "
              />
            </div>
          </div>

          <!-- 댓글 삭제시 모달 -->
          <BaseModal
            v-if="showDeleteModal"
            @confirm="handleDeleteConfirm"
            @close="handleModalClose"
          >
            이 댓글을 삭제하시겠습니까?<br />
            삭제시 복구 불가능
          </BaseModal>
        </div>
      </div>

      <!-- 댓글 수정 폼-->
      <div class="content-box" :style="{ marginLeft: `${2.75 + depth * 3}rem` }">
        <div v-if="isEditing">
          <CommentForm
            :nickname="currentUser.nickname"
            :profileImageUrl="currentUser.profileImage"
            :memberId="currentUser.id"
            :initialContent="props.comment.content"
            :commentId="props.comment.commentId"
            :isEditMode="true"
            :updateCommentApi="props.updateCommentApi"
            :postCommentApi="props.postCommentApi"
            @commentPosted="handleEditFinished"
            @cancelEdit="emit('toggle-edit', null)"
          />
        </div>

        <div v-else class="content">
          {{ comment.content }}
        </div>

        <div v-if="depth === 0 && !isEditing" class="reply-btn-wrapper">
          <!-- <BaseButton @click="$emit('toggle-reply', comment.commentId)">답글</BaseButton> -->
          <BaseButton @click="handleReplyClick">답글</BaseButton>
        </div>

        <BaseModal v-if="showLoginModal" @confirm="goToLogin" @close="showLoginModal = false">
          로그인이 필요한 서비스입니다.<br />
          로그인 하시겠습니까?
        </BaseModal>
      </div>
    </template>

    <!-- ❌ 삭제된 댓글: 단순 문구만 표시 -->
    <template v-else>
      <div class="deleted-comment-box" :style="{ marginLeft: `${depth * 3}rem` }">
        <div class="deleted-comment">삭제된 댓글입니다.</div>
      </div>
    </template>

    <hr />

    <!-- 답글 폼-->
    <div v-if="showReplyForm" style="margin-top: 1rem">
      <CommentForm
        :nickname="currentUser.nickname"
        :profileImageUrl="currentUser.profileImage"
        :memberId="currentUser.id"
        :parentCommentId="props.comment.commentId"
        :updateCommentApi="props.updateCommentApi"
        :postCommentApi="props.postCommentApi"
        @commentPosted="handleEditFinished"
      />
      <hr />
    </div>

    <!-- 재귀 렌더링: 대댓글 표시 -->
    <CommentItem
      v-for="reply in comment.replies"
      :key="reply.commentId"
      :comment="reply"
      :depth="depth + 1"
      :openedMenuId="props.openedMenuId"
      :openedEditingId="props.openedEditingId"
      :openedReplyingId="props.openedReplyingId"
      :updateCommentApi="props.updateCommentApi"
      :postCommentApi="props.postCommentApi"
      :deleteCommentApi="props.deleteCommentApi"
      @toggle-menu="emit('toggle-menu', $event)"
      @toggle-edit="emit('toggle-edit', $event)"
      @toggle-reply="emit('toggle-reply', $event)"
      @comment-deleted="emit('comment-deleted', $event)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

import dayjs from 'dayjs'

import Avatar from '@/components/Profile/Avatar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import CommentActionMenu from './CommentActionMenu.vue'
import CommentForm from './CommentForm.vue'
import BaseModal from '@/components/Base/BaseModal.vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
  openedMenuId: Number, //전달받은 openedMenuId
  openedEditingId: Number,
  openedReplyingId: Number,
  deleteCommentApi: Function,
  postCommentApi: Function,
  updateCommentApi: Function,
})

const showLoginModal = ref(false)
const router = useRouter()

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

//수정/삭제 버튼
const menuRef = ref(null)

//삭제 모달
const showDeleteModal = ref(false)

//답글 폼
//const showReplyForm = ref(false)

//답글 폼
const showReplyForm = computed(() => props.openedReplyingId === props.comment.commentId)
//수정/삭제 버튼
const menuVisible = computed(() => props.openedMenuId === props.comment.commentId)
//댓글 수정폼
const isEditing = computed(() => props.openedEditingId === props.comment.commentId)
const editedContent = ref(props.comment.content)

const emit = defineEmits(['comment-deleted', 'toggle-menu'])

const goToLogin = () => {
  const currentPath = router.currentRoute.value.fullPath
  router.push({ path: '/login', query: { redirect: currentPath } }) //로그인 후 원래 페이지 돌아오기 위함
}

//수정/삭제 메뉴 토글
const toggleMenu = () => {
  emit('toggle-menu', props.comment.commentId)
}

//수정/삭제 외부 클릭시 -  외부 클릭 감지 함수
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    emit('toggle-menu', null)
  }
}

//삭제 메뉴 클릭시 모달창 띄우기기
function onShowDeleteModal() {
  showDeleteModal.value = true
}

//댓글 수정시
//수정폼 보이기 + 수정 폼의 초기값을 원래 내용으로 전달
const startEdit = () => {
  emit('toggle-edit', props.comment.commentId)
  editedContent.value = props.comment.content
}

//댓글 삭제
const handleDeleteConfirm = async () => {
  try {
    await props.deleteCommentApi(props.comment.commentId)
    emit('comment-deleted', props.comment.commentId)
    showDeleteModal.value = false
  } catch (e) {
    alert('댓글 삭제 실패')
  }
}

//삭제 모달창 닫기
const handleModalClose = () => {
  showDeleteModal.value = false
}

//수정 끝났으면 수정 폼 닫기 + 상위 컴포넌트에게 전달
const handleEditFinished = () => {
  emit('toggle-edit', null)
  emit('toggle-reply', null)
  emit('comment-deleted') // 상위에서 다시 fetchComments 실행
}

//답글 버튼 클릭 이벤트
const handleReplyClick = () => {
  if (!currentUser.value.id) {
    showLoginModal.value = true
  } else {
    emit('toggle-reply', props.comment.commentId)
  }
}

//액션 메뉴 바깥 영역 클릭시 닫기 처리
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const formattedDate = dayjs(props.comment.createdAt).format('YYYY.MM.DD HH:mm')
</script>

<style scoped>
.content {
  font-size: var(--fs-body);
  color: var(--color-text);
  margin-top: var(--space-md);
  margin-bottom: var(--space-xl);
}
hr {
  color: var(--color-primary);
  opacity: 30%;
}
.reply-btn-wrapper {
  display: flex;
  justify-content: flex-start;
}
.edit-btn-wrapper {
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.date {
  font-size: var(--fs-body);
  color: var(--color-text);
  opacity: 0.6;
}

.deleted-comment {
  /* display: flex;
  align-items: center; */
  color: var(--color-text);
  opacity: 0.6;
  height: 5rem;
}
</style>
