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
  text-shadow: 1px 1px 1px #2D3636, 1px -1px 1px #2D3636, -1px 1px 1px #2D3636, -1px -1px 1px #2D3636;
  background: linear-gradient(135deg, white 5%, yellow);
  border: 2px solid rgba(52, 40, 16, 0.8);
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
  font-size: 12px;
  background-color: #3d444a;
  border: 2px solid rgba(52, 40, 16, 0.8);
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
