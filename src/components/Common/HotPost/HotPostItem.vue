<!-- HOT 게시글 1개 표시 -->
<template>
  <tr class="hot-post-row">
    <td id="countryText">
      [{{ post.country }}] <span id="titleText"> {{ post.title }}</span>
    </td>
    <td class="time-cell">{{ formatTime(post.time) }}</td>
  </tr>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const formatTime = (time) => {
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
</script>

<style scoped lang="scss">
@use '@/styles/_mixins' as m;
@use '@/styles/_variables' as v;

.hot-post-row {
  color: v.$color-text;
  border-bottom: 1px solid rgba(63, 114, 175, 0.3);
}

td {
  padding: 12px 16px;
  text-align: left;
  height: m.rem(70);
}

.time-cell {
  text-align: right;
  white-space: nowrap;
}

#countryText {
  font-size: v.$fs-menu;
  font-weight: 700;
}

.time-cell,
#titleText {
  font-size: v.$fs-menu;
  font-weight: 500;
}
</style>
