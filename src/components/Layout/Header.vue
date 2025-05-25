<template>
  <header>
    <div class="header-inner">
      <!-- 로고 -->
      <router-link to="/" class="left">
        <img src="@/assets/main_logo.svg" class="logimg" />
      </router-link>

      <!-- 메뉴 -->
      <div class="center">
        <ul class="navbar-nav menu-nav">
          <!-- <li class="nav-item"><a class="nav-link" href="#">About</a></li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/community">커뮤니티</router-link>
          </li>
          <li class="nav-item"><a class="nav-link" href="#">동행자</a></li>
          <li class="nav-item"><a class="nav-link" href="#">예약</a></li>
          <li class="nav-item"><a class="nav-link" href="#">일정</a></li>
          <!-- <li class="nav-item"><a class="nav-link" href="#">공지사항</a></li> -->
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
<script setup></script>
<style scoped>
header {
  background-color: var(--color-surface);
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 60rem;
  padding: 0;
  box-sizing: border-box;
}

.left {
  width: 3.5rem;
}

.logimg {
  width: 100%;
  height: 100%;
}

.center {
  margin-left: 8rem;
  display: flex;
  align-items: center;
  height: 1.5rem;
  flex: 1;
  max-width: 32.5rem;
  margin-right: 8rem;
}

.menu-nav {
  display: flex;
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
  font-size: var(--fs-menu);
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
  gap: 2rem;
}

.nav-item.li-center {
  gap: 3rem;
}

.profile-user-div {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  /* border: 2px solid var(--color-primary); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img {
  width: 100%;
  height: auto;
  object-position: contain;
}

.notify_icon,
.info_icon {
  width: 1.25rem;
  height: auto;
}

.profile_button {
  width: 1rem;
  height: 0.7rem;
}

#notify_icon_a {
  margin-left: 2rem;
  margin-right: 2rem;
}
#profile_buton_a {
  margin-left: 2rem;
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
    margin-top: 12px;
    justify-content: flex-end;
    width: 100%;
    gap: 20px;
  }
}
</style>
