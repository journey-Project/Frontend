import api from './_instance'
import axios from 'axios'

// hot 게시물 가져오기
export const list = (params = {}) => {
  return api.get('/community/hot-posts', { params })
}

/**
 * 커뮤니티 게시글 검색
 * @param {Object} params 쿼리 파라미터
 * @returns {Promise<{ communityList: Array, pagination: Object }>}
 */
export async function searchPosts(params) {
  return axios.get('/api/community/search', { params }) // 이 경로가 정확한지 확인
}