<template>
  <div class="es-card" style="position: relative">
    <es-image :src="card.img" :description="description" img-class="img" :lazy="lazy" />
    <div v-if="count > 0" class="badge">{{ count }}</div>
  </div>
</template>
<script setup lang="ts">
import EsImage from './EsImage.vue'
import {Card} from '../../../composables/useCards'
import {useCharaMap} from '../../../composables/useCharas'
import {computed} from 'vue'

const props = defineProps<{ card: Card, count: number, lazy: boolean }>()

const charaMap = useCharaMap()
const description = computed(() => {
  const chara = charaMap[props.card.id.split('/')[0]]
  return `[${chara}]${props.card.name}`

})
</script>
<style scoped>
::v-deep .img {
  width: 13rem;
  height: 16.25rem;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
