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

// 내 프로필 조회
export const getProfileById = (memberId) => {
  return api.get(`/members/${memberId}/profile`)
}

//내 프로필 수정
export const patchProfileById = (memberId, profileData) => {
  return api.patch(`/members/${memberId}/profile`, profileData)
}

//여행 일정 목록
export const getSchedulesById = (memberId) => {
  return api.get(`/members/${memberId}/plans`)
}

//여행 일정 추가
export const postSchedule = (memberId, payload) => {
  return api.post(`/members/${memberId}/plans`, payload)
}

//여행 일정 삭제
export const deleteSchedule = (planId) => {
  return api.delete(`/members/plans/${planId}`)
}

//프로필 이미지 업로드
export const postProfileImage = (memberId, file) => {
  const formData = new FormData()
  formData.append('image', file)

  return api.post(`/members/${memberId}/profile-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
