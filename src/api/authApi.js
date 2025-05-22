import api from './_instance'

// 로그인 함수: POST 요청으로 로그인 정보 전송
export const login = (data = {}) => {
  return api.post('/auth/login', data)
}
