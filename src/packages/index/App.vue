<template>
  <container id="es-container" />
  <div class="direction-tip">推荐使用横屏以获得更好体验</div>
</template>
<script setup lang="ts">
import Container from './Container.vue'
</script>
<style scoped>
.direction-tip {
  color: white;
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
<style>
* {
  box-sizing: border-box;
}

html {
  background-color: black;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
}

#es-container {
  margin: 0 auto;
  position: relative;
}

@media (min-aspect-ratio: 18/9) {
  #es-container {
    width: 200vh;
    height: 100vh;
  }

  html {
    font-size: 2vh;
  }
}

@media (max-aspect-ratio: 18/9) {
  #es-container {
    width: 100vw;
    height: 50vw;
  }

  html {
    font-size: 1vw;
  }
}
</style>
