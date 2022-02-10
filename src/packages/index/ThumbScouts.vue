<template>
  <div class="thumb-pools">
    <img
      v-for="scout in scouts"
      :key="scout.series"
      :src="scout.banner"
      :alt="scout.name"
      :title="scout.name"
      :class="{ current: scoutEqual(currentScout, scout) }"
      referrerpolicy="no-referrer"
      @click="currentScout = scout"
    />
  </div>
</template>
<script setup lang="ts">
import {Scout, useDisplayScouts} from '../../composables/useScouts'
import {onMounted, toRefs} from 'vue'
import {currentScout} from './logic/store'

// 展示的池子：两个最新普池 + 常驻池
const scouts = useDisplayScouts()

// 双向绑定当前选中的池子（期数）
// const prop = defineProps<{ value: Scout }>()
// const { value } = toRefs(prop)
// const emit = defineEmits<{
//   (e: 'update:value', value: Scout): void
// }>()

const scoutEqual = (a?: Scout, b?: Scout) => {
  if (!a || !b) return false
  return a.type === b.type && a.series === b.series
}

// 初始选中第一个池子
onMounted(() => currentScout.value = scouts[0])
</script>
<style scoped>
.thumb-pools {
  width: 25%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

img {
  display: block;
  width: 100%;
  border: 12px solid transparent;
  box-sizing: border-box;
}

img.current {
  border-color: yellow;
}
</style>
