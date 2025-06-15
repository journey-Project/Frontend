<template>
  <div class="card">
    <div class="image">
      <img :src="card.image" alt="패키지" />
    </div>
    <div class="text">
      <div class="title">
        <BaseText size="--fs-title" bold>{{ card.title }}</BaseText>
      </div>

      <div class="price">
        <BaseText class="diagonal-line" size="--fs-menu" color="--color-text">
          {{ card.price_b }}
        </BaseText>
        <img src="@/assets/icons/main/Arrow.svg" alt="" />
        <BaseText size="--fs-title" bold>{{ card.price_n }}원 ~</BaseText>
      </div>

      <!-- 설명 -->
      <div class="desc-wrapper">
        <div class="desc">
          <BaseText
            v-for="(para, idx) in paragraphs"
            :key="idx"
            lineHeight="120%"
            color="--color-text"
            class="paragraph"
          >
            {{ para }}
          </BaseText>
        </div>
        <div class="fade-layer"></div>
      </div>

      <!-- 버튼 -->
      <div class="more_button">
        <BaseButton @click="onClick"> 자세히 보기 </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseText from '@/components/Base/BaseText.vue'
import BaseButton from '../Base/BaseButton.vue'
import { computed } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const paragraphs = computed(() => props.card.desc.split(/\n\s*\n/).map((p) => p.trim()))

function onClick() {
  // 나중에 페이지 이동 코드로 변경 예정
  console.log('자세히 보기 버튼 클릭됨')
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  background-color: transparent;
  border: none;
}

.image img {
  height: 368px;
  border-radius: var(--card-radius);
}

.text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  margin-top: var(--space-md);
}

.price {
  margin-top: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

.diagonal-line {
  position: relative;
  display: inline-block;
}

.diagonal-line::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-primary);
  transform: rotate(-15deg);
  transform-origin: bottom left;
  opacity: 1;
  pointer-events: none;
}

.desc-wrapper {
  position: relative;
  max-height: 9em;
  overflow: hidden;
  margin-top: var(--space-xl);
  background-color: var(--color-bg);
}

.desc {
  white-space: pre-line;
}

.paragraph {
  margin-bottom: var(--space-2xl);
  line-height: 1.4;
}

.fade-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5em; /*fade 효과 범위를 줄임 */
  background: linear-gradient(
    to top,
    rgba(249, 247, 247, 0.6),
    /* 좀 더 투명하게 */ rgba(249, 247, 247, 0)
  );
  pointer-events: none;
  z-index: 1;
}

.more_button {
  margin-top: 3rem;
}
</style>
