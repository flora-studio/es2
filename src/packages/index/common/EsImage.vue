<template>
  <n-spin class="es-image" :show="loading" stroke="var(--color-secondary)" :description="props.description" size="small">
    <img
      :src="props.src"
      :alt="props.description"
      :title="props.description"
      referrerpolicy="no-referrer"
      :class="props.imgClass"
      @load="loading = false"
      @error="loading = false"
    />
  </n-spin>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import {NSpin} from 'naive-ui'

const props = defineProps<{
  src: string
  description: string
  // width: string
  imgClass: string
}>()

const loading = ref(true)
</script>
<style scoped>
::v-deep .n-spin-description {
  color: var(--color-secondary);
}

img {
  display: block;
}
</style>
