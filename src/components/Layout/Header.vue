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

<style scoped lang="scss">
@use '@/styles/_variables' as v;
@use '@/styles/_mixins' as m;
header {
  background-color: v.$color-primary;
  height: m.rem(111);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: m.rem(1181);
  padding: 0;
  box-sizing: border-box;
}

.left {
  width: m.rem(76);
  height: m.rem(38);
}

.logimg {
  width: 100%;
  height: 100%;
}

.center {
  margin-left: m.rem(124);
  display: flex;
  align-items: center;
  height: m.rem(24);
  flex: 1;
  max-width: m.rem(620);
  margin-right: m.rem(111);
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
  color: v.$color-text;
  font-weight: 700;
  font-size: m.rem(20);
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
  gap: m.rem(44); // info 아이콘과 bell 아이콘 사이의 간격
}

.nav-item.li-center {
  gap: m.rem(43); // bell 아이콘과 프로필 이미지 사이 간격
}

.profile-user-div {
  width: m.rem(49);
  height: m.rem(49);
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid v.$color-text;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notify_icon,
.info_icon {
  width: m.rem(28);
  height: auto;
}

.profile_button {
  width: m.rem(23);
  height: m.rem(11);
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
    margin-left: m.rem(40);
    margin-right: m.rem(40);
  }

  .nav-link {
    font-size: m.rem(18);
  }
}

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
}
</style>
