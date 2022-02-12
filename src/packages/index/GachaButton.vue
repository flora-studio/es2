<template>
  <div class="btn">
    <div class="top">
      <span v-if="single">招募</span>
      <template v-else><span class="large">10</span><span class="small">连招募</span></template>
    </div>
    <div class="bottom">{{ '💎\u3000' + (single ? 35 : 350) }}</div>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{ single: boolean }>()
const right = computed(() => props.single ? '15.5rem' : '1.5rem')
</script>
<style scoped>
.btn {
  width: 12.5rem;
  position: absolute;
  right: v-bind(right);
  bottom: 3rem;
  cursor: pointer;
}

.top {
  height: 6.5rem;
  line-height: 6.5rem;
  text-align: center;
  font-weight: bold;
  font-size: 2.1rem;
  color: white;
  text-shadow: 1px 1px 1px var(--color-secondary), 1px -1px 1px var(--color-secondary), -1px 1px 1px var(--color-secondary), -1px -1px 1px var(--color-secondary);
  background: linear-gradient(135deg, white 5%, var(--color-primary));
  border: 0.25rem solid var(--color-secondary);
  border-bottom: none;
  border-top-left-radius: 1rem;
  border-top-right-radius: 2px;
}

.bottom {
  height: 2.7rem;
  line-height: 2.7rem;
  color: white;
  padding-left: 2.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: rgb(62, 67, 73);
  border: 0.25rem solid var(--color-secondary);
  border-top: none;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 2px;
}

.large {
  font-size: 3.2rem;
  letter-spacing: -2px;
  padding-right: 2px;
}

.small {
  font-size: 1.8rem;
}
</style>
