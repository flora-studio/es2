<template>
  <div class="thumb-pools">
    <img
      v-for="pool in displayPools"
      :key="pool.series"
      :src="'/src/assets/pool/default.jpg'"
      :alt="pool.name"
      :title="pool.name"
      :class="{ current: value === pool.series }"
      @click="$emit('update:value', pool.series)"
    />
  </div>
</template>
<script setup lang="ts">
import {useConstantPool, usePools} from './composables/usePool'
import {onMounted, toRefs} from 'vue'

const pools = usePools().filter(p => p.series > 0 && !p.limited).sort((a, b) => b.series - a.series)
pools.length = Math.min(pools.length, 2)
const constantPool = useConstantPool()
// 展示的池子：两个最新普池 + 常驻池
const displayPools = [...pools, constantPool]

// 双向绑定当前选中的池子（期数）
const prop = defineProps<{ value: number }>()
const { value } = toRefs(prop)
const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>()

// 初始选中第一个池子
onMounted(() => emit('update:value', displayPools[0].series))
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
