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

    <img
      src="@/assets/icons/companion/Polygon5.svg"
      alt="arrow"
      class="arrow"
      :class="{ up: open }"
    />

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

<style scoped>
.select{
  position:relative;
  width:100%;
  height:100%;
  padding-inline:var(--space-md);
  border-radius:var(--input-radius);
  display:flex;
  align-items:center;
  cursor:pointer;
  user-select:none;
}

.select .arrow{
  width:1rem;height:1rem;
  margin-left:auto;
  transition:transform .2s;
}
.select .arrow.up{ transform:rotate(180deg); }

.select .label{
  font-size:var(--fs-body);
  font-weight:var(--fw-medium);
}
.select .label._ph{ opacity:.7; }

.select .panel{
  position:absolute; top:calc(100% + var(--space-xs)); left:0;
  width:100%;
  margin:0; padding:var(--space-lg) 0;
  background:inherit; border-radius:inherit;
  list-style:none; display:flex; flex-direction:column;
  gap:var(--space-lg);
  z-index:100;
}
.select .panel li{
  text-align:center; font-size:var(--fs-body);
  cursor:pointer;
}

.select .panel li:hover:not(.selected){ opacity:.8; }

.fill{
  background:color-mix(in srgb,var(--color-surface) 45%, transparent);
  color:var(--color-primary);
}
.borderline{
  background:var(--color-bg);
  border:1px solid var(--color-primary);
  color:var(--color-primary);
}
.open.borderline{ border-color:var(--color-primary); }

.fade-slide-enter-active,
.fade-slide-leave-active{ transition:.18s ease; }
.fade-slide-enter-from,
.fade-slide-leave-to    { opacity:0; transform:translateY(-6px); }
</style>