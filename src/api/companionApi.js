import api from './_instance'

// 백엔드와 통일된 params로 요청
export const list = (params = {}) => {
  return api.get('/posts/searchPost', { params })
}

//랜덤으로 게시물 가져오기 - params: count-게시물 수
export const getRandomList = (params = {}) => {
  return api.get('/posts/random', { params })
}
