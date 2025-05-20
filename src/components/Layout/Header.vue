<template>
  <header>
    <div class="header-inner">
      <!-- 로고 -->
      <div class="left">
        <img src="@/assets/main_logo.svg" class="logimg" />
      </div>

      <!-- 메뉴 -->
      <div class="center">
        <ul class="navbar-nav menu-nav">
          <li class="nav-item"><a class="nav-link" href="#">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#">커뮤니티</a></li>
          <li class="nav-item"><a class="nav-link" href="#">예약</a></li>
          <li class="nav-item"><a class="nav-link" href="#">일정</a></li>
          <li class="nav-item"><a class="nav-link" href="#">공지사항</a></li>
        </ul>
      </div>

      <!-- 오른쪽 아이콘 + 프로필 -->
      <a class="nav-link" href="#">
        <img src="@/assets/icons/_info_icon.svg" class="info_icon" />
      </a>
      <a class="nav-link" href="#" id="notify_icon_a">
        <img src="@/assets/icons/notify_icon.svg" class="notify_icon" />
      </a>
      <a class="nav-link" href="#">
        <div class="profile-user-div">
          <img src="@/assets/profile.jpg" alt="프로필 이미지" class="profile-img" />
        </div>
      </a>
      <a class="nav-link" href="#" id="profile_buton_a">
        <img src="@/assets/icons/profile_button.svg" class="profile_button" />
      </a>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: var(--color-surface);
  height: 111px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1181px;
  padding: 0;
  box-sizing: border-box;
}

.left {
  width: 76px;
  height: 38px;
}

.logimg {
  width: 100%;
  height: 100%;
}

.center {
  margin-left: 124px;
  display: flex;
  align-items: center;
  height: 24px;
  flex: 1;
  max-width: 620px;
  margin-right: 111px;
}

.menu-nav {
  justify-content: space-between;
  width: 100%;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-link {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
}

/* 공통 정렬 */
.left,
.center,
.right,
.li-center {
  display: flex;
  align-items: center;
}

.right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-item.li-center {
  gap: 43px;
}

.profile-user-div {
  width: 49px;
  height: 49px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--color-primary);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notify_icon,
.info_icon {
  width: 28px;
  height: auto;
}

.profile_button {
  width: 23px;
  height: 11px
}
#notify_icon_a {
  height: 28px;
  margin-left: 44px;
  margin-right: 43px;
}
#profile_buton_a {
  margin-left: 34px;
}

/* 반응형 설정 */
@media (max-width: 1024px) {
  .center {
    margin-left: 40px;
    margin-right: 40px;
  }

  .nav-link {
    font-size: 18px;
  }
}
/* 
@media (max-width: 768px) {
  .menu-nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .header-inner {
    flex-wrap: wrap;
  }

  .center {
    justify-content: space-between;
  }

  .right {
    margin-top: m.rem(12);
    justify-content: flex-end;
    width: 100%;
    gap: m.rem(20);
  }
} */
</style>
