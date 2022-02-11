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
import {onMounted} from 'vue'
import {currentScout} from './logic/store'

// 展示的池子：两个最新普池 + 常驻池
const scouts = useDisplayScouts()

const scoutEqual = (a?: Scout, b?: Scout) => {
  if (!a || !b) return false
  return a.type === b.type && a.series === b.series
}

// 初始选中第一个池子
onMounted(() => currentScout.value = scouts[0])
</script>
<style scoped>
.thumb-pools {
  width: 20rem;
  height: 100%;
  padding-top: 5rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 2px 0 10px rgba(100, 100, 100, 0.5);
}

img {
  display: block;
  width: 20rem;
  height: 9.33rem;
  padding-top: 0.7rem;
  padding-left: 1rem;
}

img.current {
  background-color: rgb(253, 241, 0);
}
</style>
