<template>
  <footer>
    <div class="logo">
      <img src="@/assets/main_logo.svg" class="logo-img" />
    </div>
    <div class="icons">
      <ul class="navbar-nav">
        <li class="nav-item li-center">
          <a class="nav-link" href="#"
            ><img src="@/assets/icons/facebook_icon.svg" class="icon"
          /></a>
        </li>
        <li class="nav-item li-center">
          <a class="nav-link" href="#"><img src="@/assets/icons/x_icon.svg" class="icon" /></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><img src="@/assets/icons/insta_icon.svg" class="icon" /></a>
        </li>
      </ul>
    </div>
    <hr />
  </footer>
</template>
<style>
footer {
  background-color: #dbe2ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3.5rem;
}
.logo {
  display: flex;
  align-items: center;
  margin-top: 2.4375rem;
}

.logo-img {
  height: 1.875rem;
  width: 3.4375rem;
}

.icons .navbar-nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 0;

  list-style: none;
}

.icons {
  margin-top: 2.3125rem;
}

.icon {
  width: 1.75rem;
}

hr {
  color: white;
  width: 95.94vw;
  max-width: 115.125rem;
  margin-top: 3.125rem;
}
</style>
