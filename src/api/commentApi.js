// 댓글 관련 API 모듈 추가 (GET/POST 등)
import api from './_instance'

//댓글 목록 조회
export const getComments = (communityId) => {
  return api.get(`/community/${communityId}/comments`)
}

//댓글/대댓글 작성
export const postComment = (communityId, payload) => {
  return api.post(`/community/${communityId}/comments`, payload)
}

//댓글 삭제
export const deleteComment = (commentId) => {
  return api.delete(`/community/comments/${commentId}`)
}

//댓글 수정
export const updateComment = (commentId, payload) => {
  return api.patch(`/community/comments/${commentId}`, payload)
}
