// 게시글 등록, 목록, 상세 API 포함
import api from './_instance'

// postId로 게시글 상세 가져오기
export const getPostByPostId = (communityPostId, params = {}) => {
  return api.get(`/community/getPostByPostId/${communityPostId}`, { params })
}
