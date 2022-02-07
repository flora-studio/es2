<template>
  <div class="container">
    <thumb-pools v-model:value="selectPool" />
  </div>
</template>
<script setup lang="ts">
import ThumbPools from './ThumbPools.vue'
import {ref} from 'vue'

// 当前选择的池子
const selectPool = ref(0)
</script>
<style scoped>
.container {
  aspect-ratio: 16 / 9;
  background: url("/src/assets/pool/default.jpg") no-repeat;
  background-size: contain;
  margin: 0 auto;
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
