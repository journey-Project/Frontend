<template>
  <div
    ref="root"
    class="select"
    :class="[props._style, { open }]"
    @click="open = !open"
    tabindex="0"
  >
    <span class="label" :class="{ _ph: !modelValue }">
      {{ current }}
    </span>

    <!-- ▼ / ▲ -->
    <img
      src="@/assets/icons/companion/Polygon5.png"
      alt="arrow"
      class="arrow"
      :class="{ up: open }"
    />

    <!-- 옵션 -->
    <transition name="fade-slide">
      <ul v-if="open" class="panel">
        <li
          v-for="opt in options"
          :key="opt.value"
          @click.stop="choose(opt.value)"
          :class="{ selected: String(opt.value) === String(modelValue) }"
        >
          {{ opt.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: { type: Array, required: true },
  _ph: { type: String, default: '선택' },
  _style: { type: String, default: 'fill' },
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const root = ref(null)

const current = computed(() => {
  const hit = props.options.find((o) => o.value === props.modelValue)
  return hit ? hit.label : props._ph
})

function outside(e) {
  if (root.value && !root.value.contains(e.target)) open.value = false
}
onMounted(() => document.addEventListener('mousedown', outside))
onBeforeUnmount(() => document.removeEventListener('mousedown', outside))

function choose(val) {
  emit('update:modelValue', val)
  open.value = false
}
</script>

<style scoped lang="scss">
@use '@/styles/mixins' as m;
@use '@/styles/variables' as v;

.select {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 m.rem(20);
  border-radius: m.rem(24);
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .arrow {
    width: m.rem(14);
    height: m.rem(14);
    margin-left: auto;
    transition: transform 0.2s;
    &.up {
      transform: rotate(180deg);
    }
  }

  .label {
    font-size: m.rem(16);
    font-weight: 600;
    &._ph {
      opacity: 0.55;
      text-decoration: underline;
    }
  }

  .panel {
    position: absolute;
    top: calc(100% + m.rem(8));
    left: 0;
    width: 100%;
    margin: 0;
    padding: m.rem(24) 0;
    background: inherit;
    border-radius: inherit;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: m.rem(24);
    z-index: 100;

    li {
      text-align: center;
      font-size: m.rem(16);
      cursor: pointer;
      &.selected {
        text-decoration: underline;
      }
      &:hover:not(.selected) {
        opacity: 0.8;
      }
    }
  }
}

.fill {
  background: rgba(#dbe2ef, 0.45);
  color: #3f72af;
}
.borderline {
  background: #fff;
  border: 1px solid v.$color-accent;
  color: v.$color-accent;
}
.open.borderline {
  border-color: v.$color-accent;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: 0.18s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
