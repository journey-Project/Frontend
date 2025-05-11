<template>
  <div class="container">
    <div class="text" id="storyText">스토리</div>
    <div class="text2">내가 팔로우한 사람들과 현재를 공유해 보세요!</div>
    <div class="text" id="communitytext">국가별 커뮤니티</div>
    <CountrySelectBar :countryFlagMap="countryFlagMap" />
    <div class="text" id="companionText">동행자 모집</div>
    <div class="row1">
      <img src="@/assets/icons/hot_icon.svg" class="hot-icon" />
      <div class="text">오늘의 HOT 게시물</div>
      <img src="@/assets/icons/arrow.svg" class="arrow-icon" />
    </div>
    <HotPostList :posts="hotPosts" />
  </div>
</template>
<script setup>
import CountrySelectBar from '@/components/Community/CountrySelectBar.vue'
import HotPostList from '@/components/Community/HotPostList.vue'
import { ref } from 'vue'
const countryFlagMap = {
  국내: 'flag_Korea.svg',
  일본: 'flag_Japan.svg',
  중국: 'flag_China.svg',
  독일: 'flag_Germany.svg',
  프랑스: 'flag_France.svg',
  베트남: 'flag_Vietnam.svg',
  미국: 'flag_USA.svg',
}

// 임시 데이터
const hotPosts = ref([
  {
    country: '일본',
    title: '오사카 3박 4일 너무 즐거웠어요!',
    time: new Date('2025-05-08T12:30:00'),
  },
  {
    country: '미국',
    title: '다들 환전은 어떻게 해서 가시나요?',
    time: new Date('2025-05-08T14:15:00'),
  },
  {
    country: '프랑스',
    title: '날씨가 너무 좋아서 행복했어요...',
    time: new Date('2025-05-08T09:30:00'),
  },
])
</script>
<style scoped lang="scss">
@use '@/styles/_mixins' as m;
@use '@/styles/_variables' as v;

.text {
  padding: 0;
  margin: 0;
  font-size: v.$fs-title;
  font-weight: 900;
  color: v.$color-text;
  height: m.rem(29);
  line-height: m.rem(29); /* 글자 높이 맞추기 */
}
.text2 {
  color: #666666;
  font-size: 16px;
  padding: 0;
  height: m.rem(19);
  line-height: m.rem(19); /* 글자 높이 맞추기 */
}
.row1 {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: m.rem(16); /* hot_icon과 text 사이의 여백을 16px로 설정 */
}
#storyText {
  margin-top: m.rem(46);
  margin-bottom: m.rem(17);
}
#communitytext {
  margin-bottom: m.rem(30);
}
#companionText {
  margin-top: m.rem(67);
}
hr {
  border: 0;
  border-top: m.rem(3) solid v.$color-text;
}
.hot-icon {
  width: m.rem(21); /* 이미지 크기 설정 (필요한 크기로 변경) */
}
.arrow-icon {
  margin-left: auto; /* 오른쪽 끝으로 배치 */
  width: m.rem(16); /* 이미지 크기 설정 (필요한 크기로 변경) */
}
</style>
