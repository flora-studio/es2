<template>
  <n-modal :show="show" @update:show="emit('update:show', $event)">
    <div class="dialog">
      <div class="title"><span style="cursor: pointer" @click="emit('update:show', false)">╳</span></div>
      <slot />
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import {NModal} from 'naive-ui'
import {toRefs} from 'vue'

const props = defineProps<{ show: boolean, top: string }>()
const emit = defineEmits<{
  (e: 'update:show', show: boolean): void,
}>()

const { show, top } = toRefs(props)
</script>
<style scoped>
.dialog {
  background: white;
  position: absolute;
  top: v-bind(top);
  left: 50%;
  transform: translateX(-50%);
}

.title {
  text-align: right;
  color: white;
  background-color: var(--color-secondary);
  font-size: 2rem;
  font-weight: bold;
  padding: 0 1rem;
  height: 3rem;
  line-height: 3rem;
}
</style>
