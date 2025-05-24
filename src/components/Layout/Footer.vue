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
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  margin-top: var(--space-lg);
}

.logo-img {
  width: 3.375rem;
}

.icons {
  margin-top: 1.25rem;

  .icon-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }
}

.icon {
  width: 1.5rem;
}
</style>
