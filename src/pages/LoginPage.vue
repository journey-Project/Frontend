<!-- 로그인 메인 페이지 -->
<template>
  <div class="bg">
    <div class="overlay"></div>
    <div class="box">
      <div class="title">
        <BaseText color="--color-dark" size=" --fs-title">여행 커뮤니티</BaseText>
      </div>
      <div class="logo">
        <img src="@/assets/main_logo.svg" class="logimg" alt="여정 로고" />
      </div>
      <div class="login-form-wrapper">
        <LoginForm _type="text" _ph="아이디를 입력하세요." />
      </div>
      <div class="login-form-wrapper">
        <LoginForm _type="password" _ph="비밀번호를 입력하세요." />
      </div>
      <div><BaseButton size="xl">로그인</BaseButton></div>
      <div class="buttonBox">
        <SocialLoginButtons _bgColor="#2DB400">
          <template #icon>
            <img src="@/assets/icons/login/naver-logo.png" alt="Naver" class="icon" />
          </template>
        </SocialLoginButtons>
        <SocialLoginButtons _bgColor="#FEE500">
          <template #icon>
            <img src="@/assets/icons/login/kakao-logo.png" alt="Kakao" class="icon" />
          </template>
        </SocialLoginButtons>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/Base/BaseButton.vue'
import SocialLoginButtons from '@/components/Auth/SocialLoginButtons.vue'
import BaseText from '@/components/Base/BaseText.vue'
import LoginForm from '@/components/Auth/LoginForm.vue'
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
  border: solid 3px var(--color-primary);
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

.socialButton {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  margin: var(--space-lg) auto; /* 상하 간격 조정 */
}
</style>
