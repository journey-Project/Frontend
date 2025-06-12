<!-- 로그인 메인 페이지 -->
<template>
  <div class="bg">
    <div class="overlay"></div>
    <div class="box">
      <div class="title">
        <BaseText color="--color-dark" size="--fs-title">여행 커뮤니티</BaseText>
      </div>

      <div class="logo">
        <img src="@/assets/main_logo.svg" class="logimg" alt="여정 로고" />
      </div>

      <!-- 🔴 에러 메시지 영역 -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div class="login-form-wrapper">
        <LoginForm v-model="userId" _type="text" _ph="아이디를 입력하세요." />
      </div>
      <div class="login-form-wrapper">
        <LoginForm v-model="password" _type="password" _ph="비밀번호를 입력하세요." />
      </div>

      <div class="loginButton">
        <BaseButton @click="handleLogin" size="xl">로그인</BaseButton>
      </div>

      <div class="buttonBox">
        <IDPasswordButton
          :showDivider="true"
          text="회원가입"
          @click="goToSignup"
        ></IDPasswordButton>
        <IDPasswordButton :showDivider="true" text="아이디 찾기"></IDPasswordButton>
        <IDPasswordButton text="비밀번호 찾기"></IDPasswordButton>
      </div>

      <div class="buttonBox">
        <SocialLoginButtons _bgColor="#FEE500" @click="doKakaoLogin">
          <template #icon>
            <img src="@/assets/icons/login/kakao-logo.svg" alt="Kakao" class="icon2" />
          </template>
        </SocialLoginButtons>
        <SocialLoginButtons _bgColor="#03C75A" @click="doNaverLogin">
          <template #icon>
            <img src="@/assets/icons/login/naver-logo.svg" alt="Naver" class="icon" />
          </template>
        </SocialLoginButtons>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import SocialLoginButtons from '@/components/Auth/SocialLoginButtons.vue'
import BaseText from '@/components/Base/BaseText.vue'
import LoginForm from '@/components/Auth/LoginForm.vue'
import IDPasswordButton from '@/components/Auth/IDPasswordButton.vue'
import { login } from '@/api/authApi'
import router from '@/router'

const userId = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('') // 🔴 에러 메시지 상태 추가

const handleLogin = async () => {
  if (!userId.value || !password.value) {
    errorMessage.value = '아이디와 비밀번호를 모두 입력해주세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = '' // 🔁 로그인 시도 전에 초기화

  try {
    const response = await login({
      loginId: userId.value,
      password: password.value,
    })
    console.log('로그인 성공:', response.data)
    router.push('/')
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message)
    errorMessage.value = '아이디 또는 비밀번호가 올바르지 않습니다.' // 🔴 에러 메시지 설정
  } finally {
    isLoading.value = false
  }
}

function doKakaoLogin() {
  const base = 'https://kauth.kakao.com/oauth/authorize'
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    response_type: 'code',
  })

  window.location.href = `${base}?${params.toString()}`
}

function doNaverLogin() {
  const base = 'https://nid.naver.com/oauth2.0/authorize'
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_NAVER_REST_API_KEY,
    redirect_uri: import.meta.env.VITE_NAVER_REDIRECT_URI,
    response_type: 'code',
  })

  window.location.href = `${base}?${params.toString()}`
}

const goToSignup = () => {
  router.push('/signup') // 원하는 경로로 변경 가능
}
</script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/icons/login/loginBGimg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 0;
}

.box {
  margin: 7.5rem 15rem;
  border: solid 4px var(--color-primary);
  width: var(--layout-max-width);
  height: 720px;
  border-radius: 1.25rem;
  position: relative;
  z-index: 1;
  background-color: transparent;
  text-align: center;
}

.title {
  margin-top: 9.5rem;
}

.logo {
  margin-top: var(--space-xs);

  .logimg {
    width: 6.375rem;
    height: auto;
    display: block;
    margin: 0 auto;
  }
}

.login-form-wrapper {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.loginButton {
  margin-top: 2rem;
}

.buttonBox {
  margin-top: 1.68rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.socialButton {
  display: flex;
  justify-content: center;
  margin: var(--space-lg) auto;
}

.icon {
  padding: 0.2rem;
}
.icon2 {
  padding: 0.1.5rem;
}

/* 🔴 에러 메시지 스타일 */
.error-message {
  color: red;
  margin-top: 1rem;
  font-size: 0.7rem;
}
</style>
