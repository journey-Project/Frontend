<!-- 댓글 1개 항목 -->
<template>
  <div>
    <Avatar
      :profileImageUrl="comment.profile_image"
      :nickname="comment.user_id"
      spanColor="var(--color-primary)"
      spanFontSize="16px"
      spanFontWeight="700"
      gap="16px"
    />
    <div class="content-box">
      <div class="content">
        {{ comment.content }}
      </div>
      <BaseButton
        _w="6.3125"
        _h="2.625"
        _r:="1.25"
        _text="확인"
        _style="fill"
        _textSize="1"
      ></BaseButton>
    </div>
    <hr />
  </div>
</template>

<script setup>
import Avatar from '@/components/Profile/Avatar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
</script>
<style scoped>
.content-box {
  margin-left: 2.75rem;
}
.content {
  font-size: var(--fs-body);
  color: var(--color-text);
  margin-top: var(--space-md);
  margin-bottom: var(--space-md);
}
hr {
  color: var(--color-primary);
  opacity: 30%;
}
</style>
