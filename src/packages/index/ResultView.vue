<template>
  <div class="result-view">
    <div class="grid">
      <div v-for="card in value" :key="card.id">
        <!-- todo 加载中样式 -->
        <img :src="card.img" :alt="card.name" :title="card.name" referrerpolicy="no-referrer" />
      </div>
    </div>
    <div class="actions">
      <div @click="$emit('update:value', null)">OK</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {Card} from '../../composables/useCards'

const props = defineProps<{ value: Card[] | null }>()
const emit = defineEmits<{
  (e: 'update:value', value: Card[] | null): void
}>()
</script>
<style scoped>
.result-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 1% 5%;
  background: rgba(255, 255, 255, 0.8);
}

.grid {
  height: 80%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(2, 50%);
}

.grid > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  display: block;
  width: 90%;
  background-color: darkgrey;
}
</style>
