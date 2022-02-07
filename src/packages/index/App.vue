<template>
  <div class="root">
    <container />
    <div class="direction-tip">推荐使用横屏以获得更好体验</div>
  </div>
</template>
<script setup lang="ts">
import Container from './Container.vue'
</script>
<style scoped>
.root {
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.direction-tip {
  color: white;
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
