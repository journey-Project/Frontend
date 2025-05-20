<template>
  <footer>
    <div class="logo">
      <img src="@/assets/main_logo.svg" class="logo-img" />
    </div>
    <div class="icons">
      <ul class="icon-list">
        <li>
          <a href="#">
            <img src="@/assets/icons/facebook_icon.svg" class="icon" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="@/assets/icons/x_icon.svg" class="icon" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="@/assets/icons/insta_icon.svg" class="icon" />
          </a>
        </li>
      </ul>
    </div>
    <hr />
  </footer>
</template>

<style scoped>

footer {
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3.5rem;
}

.logo {
  display: flex;
  align-items: center;
  margin-top: 39px;
}

.logo-img {
  width: 55px;
  height: 30px;
}

.icons {
  margin-top: 37px;

  .icon-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
}

.icon {
  width: 28px;
}

hr {
  color: white;
  width: 95.94vw;
  max-width: 1842px;
  margin-top: 50px;
}
</style>
