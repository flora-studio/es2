<template>
  <div class="container">
    <thumb-scouts />
    <gacha-button @click="clickTake1" />
    <div style="position: absolute; right: 0; top: 0">水位：{{ waterLevel }}</div>
  </div>
</template>
<script setup lang="ts">
import ThumbScouts from './ThumbScouts.vue'
import {ref} from 'vue'
import GachaButton from './GachaButton.vue'
import {Scout} from '../../composables/useScouts'
import {waterLevel} from './logic/store'
import {take1, take10} from './logic/actions'

// 当前选择的池子
// const selectPool = ref<Scout | null>(null)

const clickTake1 = () => {
  const result = take10()
  console.table(result)
}

</script>
<style scoped>
.container {
  aspect-ratio: 16 / 9;
  background: url("/src/assets/pool/default.jpg") no-repeat;
  background-size: contain;
  margin: 0 auto;
  position: relative;
}

@media (min-aspect-ratio: 16/9){
  .container {
    height: 100vh;
  }
}

@media (max-aspect-ratio: 16/9){
  .container {
    width: 100vw;
  }
}
</style>
