<!-- 커뮤니티 게시글 상세 페이지 -->
<template>
  <div class="container">
    <PostInfo
      v-if="post"
      :title="post.title"
      :nickname="post.nickname"
      :userId="post.loginId"
      :createdAt="post.created_at"
      :viewCount="post.view_count"
      :profileImageUrl="post.profileImage"
    />
    <PostContent v-if="post" :content="post.content" />
    <CommentList :comments="comments" />
    <CommentForm :nickname="currentUser.nickname" :profileImageUrl="currentUser.profileImageUrl" />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPostByPostId } from '@/api/postApi'
import PostInfo from '@/components/Common/Detail/PostInfo.vue'
import PostContent from '@/components/Common/Detail/PostContent.vue'
import CommentList from '@/components/Common/Editor/CommentList.vue'
import profileImage from '@/assets/profile.jpg' //임시 프로필 사진
import CommentForm from '@/components/Common/Editor/CommentForm.vue'
const route = useRoute()
const post = ref(null)

const currentUser = {
  nickname: '구름',
  profileImageUrl: profileImage,
}

//댓글 임시 데이터
const comments = ref([
  {
    id: 1,
    user_id: '커비',
    profile_image:
      'https://i.namu.wiki/i/wXGU6DZbHowc6IB0GYPJpcmdDkLO3TW3MHzjg63jcTJvIzaBKhYqR0l9toBMHTv2OSU4eFKfPOlfrSQpymDJlA.webp', // 임시 이미지
    content:
      '전 코트 입고 갔는데 괜찮았어요! 어차피 서울에서도 차로 이동해서 괜찮을 거 같더라고요ㅎㅎ',
  },
  {
    id: 2,
    user_id: 'helloWorld',
    profile_image: 'https://via.placeholder.com/40',
    content: '동의합니다. 많은 도움이 되었어요.',
  },
  {
    id: 3,
    user_id: 'vueDev',
    profile_image: 'https://via.placeholder.com/40',
    content: '질문이 있는데 댓글로 남겨도 될까요?',
  },
])

onMounted(async () => {
  const postId = route.params.id
  try {
    const res = await getPostByPostId(postId)
    post.value = res.data
  } catch (error) {
    console.error('게시글 정보를 불러오는 데 실패했습니다.', error)
  }
})
</script>
<style scoped>
.container {
  margin-top: 4rem;
  margin-bottom: 12.5rem;
}
</style>
