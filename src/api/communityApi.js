import api from './_instance'

// hot 게시물 가져오기
export const list = (params = {}) => {
  return api.get('/community/hot-posts', { params })
}
