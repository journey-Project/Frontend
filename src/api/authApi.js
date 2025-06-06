import api from './_instance'

// 로그인 함수: POST 요청으로 로그인 정보 전송
export const login = (data = {}) => {
  return api.post('/auth/login', data)
}

export const callbackkakao = (code) => {
  return api.post(`/oauth2/kakao?code=${code}`, null, { withCredentials: true })
}

export const callbacknaver = (code) => {
  return api.post(`/oauth2/naver?code=${code}`, null, { withCredentials: true })
}

export const signup = (data = {}) => {
  return api.post('/members/signup', data)
}
