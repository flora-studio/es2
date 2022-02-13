<template>
  <container id="es-container" />
</template>
<script setup lang="ts">
import Container from './Container.vue'
</script>
<style>
* {
  box-sizing: border-box;
}

html {
  background-color: black;
  --color-primary: rgb(253, 241, 0);
  --color-secondary: rgb(12, 27, 94);
}

#app {
  width: 100vw;
  height: 100vh;
}

#es-container {
  margin: 0 auto;
  position: relative;
}

.n-modal-mask,
.n-modal-body-wrapper {
  width: 100rem;
  height: 50rem;
}

@media (max-aspect-ratio: 9/18) {
  #es-container {
    width: 200vw;
    height: 100vw;
  }

  html {
    font-size: 2vw;
  }
}

@media (min-aspect-ratio: 9/18) and (max-aspect-ratio: 1/1) {
  #es-container {
    width: 100vh;
    height: 50vh;
  }

  html {
    font-size: 1vh;
  }
}

@media (min-aspect-ratio: 1/1) and (max-aspect-ratio: 18/9) {
  #es-container {
    width: 100vw;
    height: 50vw;
  }

  html {
    font-size: 1vw;
  }
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

@media (max-aspect-ratio: 1/1) {
  body {
    transform: rotate(90deg);
    transform-origin: 50vw 50vw;
  }
}
</style>
