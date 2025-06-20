<!-- 동행자 모집 상세 페이지 -->
<template>
  <div class="container">
    <PostInfo
      v-if="post"
      :title="post.title"
      :nickname="post.nickname"
      :createdAt="post.created_at"
      :viewCount="post.view_count"
      :profileImageUrl="post.profileImageUrl"
      :isMine="post.mine"
      @edit="goToEditPage"
      @delete="openDeleteModal"
    />
    <TravelInfoBox
      v-if="post"
      :start_date="post.start_date"
      :end_date="post.end_date"
      :destination="post.destination"
      :max_participants="post.max_participants"
    />

    <PostContent v-if="post" :content="post.content" />

    <!-- 댓글 목록 -->
    <CommentList
      :comments="comments"
      :deleteCommentApi="deleteComment"
      :postCommentApi="postComment"
      :updateCommentApi="updateComment"
      @comment-deleted="fetchComments"
    />

    <!-- 댓글 입력 -->
    <CommentForm
      v-if="currentUser.id"
      :nickname="currentUser.nickname"
      :profileImageUrl="currentUser.profileImage"
      :memberId="currentUser.id"
      :postCommentApi="postComment"
      @commentPosted="fetchComments"
    />

    <BaseModal v-if="showDeleteModal" @confirm="deletePost" @close="closeDeleteModal">
      이 글을 삭제하시겠습니까?<br />
      삭제시 복구 불가능
    </BaseModal>
  </div>
</template>
<script setup>
import { getCompanionPostByPostId } from '@/api/companionApi'
import TravelInfoBox from '@/components/Companion/TravelInfoBox.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getComments } from '@/api/companionApi'
import PostInfo from '@/components/Common/Detail/PostInfo.vue'
import PostContent from '@/components/Common/Detail/PostContent.vue'
import CommentList from '@/components/Common/Editor/CommentList.vue'
import CommentForm from '@/components/Common/Editor/CommentForm.vue'
import BaseModal from '@/components/Base/BaseModal.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { deletePostById } from '@/api/companionApi'
import { updateComment } from '@/api/companionApi'
import { postComment } from '@/api/companionApi'
import { deleteComment } from '@/api/companionApi'

const router = useRouter()
const route = useRoute()

const post = ref(null)
const comments = ref([])
const showDeleteModal = ref(false)

//로그인 유저 정보 가져오기
const authStore = useAuthStore()
const currentUser = computed(() => authStore.user) // 👉 currentUser로 사용

const fetchComments = async () => {
  const postId = route.params.id
  const res = await getComments(postId)
  comments.value = res.data
}

onMounted(async () => {
  const postId = route.params.id
  const country = route.params.country
  try {
    const res = await getCompanionPostByPostId(postId)
    post.value = res.data

    await fetchComments()
  } catch (error) {
    console.error('게시글 정보를 불러오는 데 실패했습니다.', error)
  }
})

// 수정 버튼 → 수정 페이지로 이동
const goToEditPage = () => {
  router.push(`/companion/write/${route.params.id}`)
}

const openDeleteModal = () => {
  showDeleteModal.value = true
}
const closeDeleteModal = () => {
  showDeleteModal.value = false
}

// 게시글 삭제 요청
const deletePost = async () => {
  try {
    await deletePostById(route.params.id)
    router.push('/community') // 삭제 후 목록 페이지로 이동 - 추후 작업
  } catch (error) {
    console.error('게시글 삭제 실패:', error)
  }
}
</script>
<style scoped>
.container {
  margin-top: 4rem;
  margin-bottom: 27rem;
}
</style>
