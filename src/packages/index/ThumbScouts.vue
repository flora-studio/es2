<template>
  <div class="thumb-pools">
    <es-image
      v-for="scout in scouts"
      :key="scout.series"
      :src="scout.banner"
      :description="scout.name"
      img-class="img"
      :class="{ current: scoutEqual(currentScout, scout) }"
      :lazy="false"
      @click="currentScout = scout"
    />
  </div>
</template>
<script setup lang="ts">
import {Scout} from '../../composables/useScouts'
import {computed} from 'vue'
import {currentScout, lastEventScout, lastFeatureScout, normalScout} from './logic/store'
import EsImage from './common/EsImage.vue'

// 展示的池子
const scouts = computed(() => [lastEventScout.value, lastFeatureScout.value, normalScout.value])
console.log(scouts)

const scoutEqual = (a?: Scout | null, b?: Scout | null) => {
  if (!a || !b) return false
  return a.type === b.type && a.series === b.series
}
</script>
<style scoped>
.thumb-pools {
  width: 20rem;
  height: 50rem;
  padding-top: 5rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 2px 0 10px rgba(100, 100, 100, 0.5);
  transform: translateZ(0);
}

::v-deep .img {
  width: 20rem;
  height: 9.33rem;
  padding-top: 0.7rem;
  padding-left: 1rem;
  cursor: pointer;
}

.current {
  background-color: var(--color-primary);
}
</style>
