import api from './_instance'

// 팔로잉 목록 조회
export const getFollowingList = (memberId) => {
  return api.get(`/follow/following`, {
    params: { memberId },
  })
}

// 팔로워 목록 조회
export const getFollwerList = (memberId) => {
  return api.get(`/follow/followers`, {
    params: { memberId },
  })
}
