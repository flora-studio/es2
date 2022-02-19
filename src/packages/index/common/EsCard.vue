<template>
  <div class="es-card" style="position: relative">
    <es-image :src="card.img" :description="description" img-class="img" :lazy="lazy" />
    <div v-if="isNew" class="new">新！</div>
    <div v-else-if="count > 0" class="badge">第<span>{{ count > 6 ? 6 : count }}</span>张</div>
  </div>
</template>
<script setup lang="ts">
import EsImage from './EsImage.vue'
import {Card} from '../../../composables/useCards'
import {useCharaMap} from '../../../composables/useCharas'
import {computed} from 'vue'

const props = defineProps<{ card: Card, count: number, isNew: boolean, lazy: boolean }>()

const charaMap = useCharaMap()
const description = computed(() => {
  const chara = charaMap[props.card.id.split('/')[0]]
  return `[${chara}]${props.card.name}`

})
</script>
<style scoped>
:deep(.img) {
  width: 13rem;
  height: 16.25rem;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.8rem;
  padding: 0 0.2rem;
  background-color: var(--color-secondary);
  box-shadow: 2px 0 10px rgba(100, 100, 100, 0.5);
}

.badge span {
  color: var(--color-primary);
  font-size: 1.4rem;
  padding: 0 0.1rem;
}

.new {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  font-size: 1.4rem;
  font-weight: bold;
  font-style: italic;
  text-shadow: 1px 1px 1px white, 1px -1px 1px white, -1px 1px 1px white, -1px -1px 1px white;
}
</style>
