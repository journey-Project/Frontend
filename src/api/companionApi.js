import api from './_instance'

// 백엔드와 통일된 params로 요청
export const list = (params = {}) => {
  return api.get('/posts/searchPost', { params })
}