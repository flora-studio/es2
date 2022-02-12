<template>
  <div ref="galleryRef" class="es-gallery">
    <slot />
  </div>
</template>
<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'

const galleryRef = ref<HTMLDivElement>()
const observer = new IntersectionObserver((entries) => {
  entries.forEach(img => {
    if (img.isIntersecting) {
      const element = img.target as HTMLImageElement
      element.src = element.dataset.src!
      observer.unobserve(img.target)
    }
  })
})

onMounted(() => {
  const images = galleryRef.value!.querySelectorAll('[data-src]')
  images.forEach(img => observer.observe(img))
})

onBeforeUnmount(() => {
  observer.disconnect()
})
</script>
<style scoped>
.es-gallery {
  height: 34rem;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(4, 20rem);
  grid-template-rows: 9.33rem;
  grid-gap: 1rem;
  padding: 0 1rem 1rem;
}

.es-gallery::-webkit-scrollbar {
  display: none;
}
</style>
