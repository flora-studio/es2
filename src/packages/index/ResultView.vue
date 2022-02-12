<template>
  <div class="result-view">
    <div :class="single ? 'single' : 'grid'">
      <div v-for="(card, i) in value" :key="card.id + i"><!-- 同一张卡可能抽到两次，所以 +i -->
        <es-image :src="card.img" :description="cardDesc(card)" img-class="img" />
      </div>
    </div>
    <div class="actions">
      <es-button v-if="single" @click="$emit('again', true)">再进行1次招募</es-button>
      <es-button v-else style="font-size: 1rem; line-height: 1.4rem" @click="$emit('again', false)">再进行1次<br />10连招募</es-button>
      <es-button type="primary" @click="$emit('update:value', null)">OK</es-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {Card} from '../../composables/useCards'
import EsButton from './EsButton.vue'
import {computed, toRefs} from 'vue'
import EsImage from './EsImage.vue'
import {useCharaMap} from '../../composables/useCharas'

const props = defineProps<{ value: Card[] | null }>()
const emit = defineEmits<{
  (e: 'update:value', value: Card[] | null): void
  (e: 'again', single: boolean): void
}>()

// 是否是单抽
const { value } = toRefs(props)
const single = computed(() => value.value!.length === 1)

// 获得人物名
const charaMap = useCharaMap()
const cardDesc = (card: Card) => {
  const chara = charaMap[card.id.split('/')[0]]
  return `[${chara}]${card.name}`
}
</script>
<style scoped>
.result-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 2rem 10rem;
  backdrop-filter: blur(0.8rem);
  -webkit-backdrop-filter: blur(0.8rem);
}

.grid {
  height: 85%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(2, 50%);
  padding: 2rem;
  background: rgba(255, 255, 255, 0.5);
}

.grid > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.single {
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.5);
}

.actions {
  padding: 2rem 3rem 0;
  display: flex;
  justify-content: space-between;
}

.actions .es-button {
  width: 15rem;
}

::v-deep .img {
  width: 13rem;
}
</style>
