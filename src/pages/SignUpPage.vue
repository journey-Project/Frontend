<template>
  <div class="bg">
    <div class="overlay"></div>
    <div class="box">
      <div class="logo-row">
        <div class="logo">
          <img src="@/assets/main_logo.svg" class="logimg" alt="여정 로고" />
        </div>
        <div class="buttonBox">
          <BaseButton @click="handleSignUp" _type="button">회원가입</BaseButton>
        </div>
      </div>

      <RegisterForm
        v-model="id"
        _ph="아이디 입력 (6~20자)"
        subtitle="아이디"
        ok="사용 가능한 아이디입니다."
        no="한글 제외, 6~20자의 영문 또는 숫자만 사용 가능합니다."
        required="아이디: 필수 정보입니다."
        :validator="validateId"
      />

      <RegisterForm
        v-model="password"
        _type="password"
        _ph="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
        subtitle="비밀번호"
        ok="사용 가능한 비밀번호입니다."
        no="한글 제외, 특수문자 포함 8~20자로 입력해주세요."
        required="비밀번호: 필수 정보입니다."
        :validator="validatePassword"
      />

      <RegisterForm
        v-model="passwordConfirm"
        _type="password"
        _ph="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
        subtitle="비밀번호 확인"
        ok="비밀번호와 일치합니다."
        no="비밀번호를 다시 확인해주세요."
        :validator="validatePasswordConfirm"
      />

      <RegisterForm v-model="name" _ph="이름을 입력해주세요" subtitle="이름" />

      <RegisterForm
        v-model="email"
        _ph="journey_dev@gmail.com"
        subtitle="이메일"
        no="유효하지 않은 이메일 입니다."
        :validator="validateEmail"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import RegisterForm from '@/components/Auth/RegisterForm.vue'
import { signup } from '@/api/authApi'
import router from '@/router'

const id = ref('')
const password = ref('')
const passwordConfirm = ref('')
const name = ref('')
const email = ref('')

const validateId = (val) => {
  const hasValidLength = val.length >= 6 && val.length <= 20
  const hasNoKorean = !/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(val) // 한글 포함 여부 검사
  return hasValidLength && hasNoKorean
}

const validatePassword = (val) => {
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val)
  const hasLength = val.length >= 8 && val.length <= 20
  const hasNoKorean = !/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(val) // 한글 포함 여부 검사
  return hasSpecial && hasLength && hasNoKorean
}

const validatePasswordConfirm = (val) => {
  return val === password.value
}

const validateEmail = (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(val)
}

const handleSignUp = async () => {
  if (!id.value || !password.value || !passwordConfirm.value || !name.value || !email.value) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  if (!validateId(id.value)) {
    alert('아이디는 6자 이상 20자 이하로 입력해주세요.')
    return
  }

  if (!validatePassword(password.value)) {
    alert('비밀번호는 특수문자를 포함하고 8자 이상 20자 이하여야 합니다.')
    return
  }

  if (!validatePasswordConfirm(passwordConfirm.value)) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  if (!validateEmail(email.value)) {
    alert('유효한 이메일 형식을 입력해주세요.')
    return
  }

  const payload = {
    loginId: id.value,
    name: name.value,
    password: password.value,
    nickname: name.value,
    email: email.value,
  }

  try {
    const response = await signup(payload)
    //alert('회원가입이 완료되었습니다!')
    router.push('/login')
  } catch (error) {
    console.error('회원가입 실패 응답:', error.response?.data)
    //alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.')
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-row {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--space-3xl);
  margin-bottom: var(--space-xl);
}

.logo .logimg {
  width: 3.5rem;
  height: auto;
  display: block;
}

.buttonBox {
  position: absolute;
  right: 4rem;
  top: 0;
  display: flex;
  gap: 1rem;
}
</style>
