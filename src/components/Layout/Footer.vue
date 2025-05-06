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
  
  <style lang="scss">
  @use '@/styles/_variables' as v;
  @use '@/styles/_mixins' as m;
  
  footer {
    background-color: v.$color-primary;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: m.rem(56);
  }
  
  .logo {
    display: flex;
    align-items: center;
    margin-top: m.rem(39);
  }
  
  .logo-img {
    width: m.rem(55);
    height: m.rem(30);
  }
  
  .icons {
    margin-top: m.rem(37);
  
    .icon-list {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: m.rem(20);
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
  
  .icon {
    width: m.rem(28);
  }
  
  hr {
    color: white;
    width: 95.94vw;
    max-width: m.rem(1842);
    margin-top: m.rem(50);
  }
  </style>
  