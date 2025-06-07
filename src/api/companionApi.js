import api from './_instance'

// 백엔드와 통일된 params로 요청
export const list = (params = {}) => {
  return api.get('/posts/searchPost', { params })
}

//랜덤으로 게시물 가져오기 - params: count-게시물 수
export const getRandomList = (params = {}) => {
  return api.get('/posts/random', { params })
}

//동행자 게시물 단건 조회
export const getCompanionPostByPostId = (post_id, params = {}) => {
  return api.get(`/posts/getIncrementView/${post_id}`, { params })
}

// 게시글 삭제
export const deletePostById = (post_id) => {
  return api.delete(`/posts/delete/${post_id}`)
}

export const getComments = (postId) => {
  return api.get(`/posts/${postId}/comments`)
}

//댓글/대댓글 작성
export const postComment = (postId, payload) => {
  return api.post(`/posts/${postId}/comments`, payload)
}

//댓글 삭제
export const deleteComment = (commentId) => {
  return api.delete(`/posts/comments/${commentId}`)
}

//댓글 수정
export const updateComment = (commentId, payload) => {
  return api.patch(`/posts/comments/${commentId}`, payload)
}
