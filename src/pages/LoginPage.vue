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
      <div class="login-form-wrapper">
        <LoginForm v-model="userId" _type="text" _ph="아이디를 입력하세요." />
      </div>
      <div class="login-form-wrapper">
        <LoginForm v-model="password" _type="password" _ph="비밀번호를 입력하세요." />
      </div>
      <div class="loginButton"><BaseButton @click="handleLogin" size="xl">로그인</BaseButton></div>
      <div class="buttonBox">
        <IDPasswordButton :showDivider="true" text="회원가입"></IDPasswordButton>
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

const userId = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!userId.value || !password.value) {
    alert('아이디와 비밀번호를 입력해주세요.')
    return
  }

  isLoading.value = true

  try {
    const response = await login({
      loginId: userId.value,
      password: password.value,
    })
    console.log('로그인 성공:', response.data)
    alert('로그인 완료!')
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message)
    alert('로그인에 실패했습니다.')
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

  // 가로 정렬용
  text-align: center;
}

.buttonBox {
  margin-top: 1.68rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap; // 화면이 작을 때 줄바꿈 허용 (옵션)
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
    margin: 0 auto; // 가로 중앙 정렬
  }
}
.login-form-wrapper {
  margin-top: 2rem;
  display: flex;
  justify-content: center; /* 가로 가운데 */
}
.loginButton {
  margin-top: 2rem;
}

.socialButton {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  margin: var(--space-lg) auto; /* 상하 간격 조정 */
}
.icon {
  padding: 0.2rem;
}
.icon2 {
  padding: 0.1.5rem;
}
</style>
