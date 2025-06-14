<template>
  <div class="followstats">
    <div class="follow-box">
      <p class="bluefont">팔로우</p>
      <p class="darkfont">{{ followingCount }}</p>
    </div>
    <div class="following-box">
      <p class="bluefont">팔로잉</p>
      <p class="darkfont">{{ followerCount }}</p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  followingCount: Number,
  followerCount: Number,
})
</script>
<style scoped>
.followstats {
  display: flex;
  gap: 0.5rem;
}
.follow-box {
  width: 9rem;
  height: 5.5rem;
  background-color: white;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.following-box {
  width: 9rem;
  height: 5.5rem;
  background-color: white;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.bluefont {
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  margin-top: 1.05rem;
  margin-bottom: 1.125rem;
  line-height: 1;
}

.darkfont {
  color: var(--color-dark);
  font-weight: var(--fw-bold);
  margin-top: 1rem;
  margin-top: 0;
  line-height: 1;
}
</style>
