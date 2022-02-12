<template>
  <div class="statics">
    <span class="item">本次卡池累计抽数：<span class="num">{{ allCardsInCurrentScout.length }}</span></span>
    <span class="item">累计五星：<span class="num">{{ allStar5.length }}</span></span>
    <span class="item">UP五星：<span class="num">{{ upStar5.length }}</span></span>
  </div>
</template>
<script setup lang="ts">
import {currentScout, history, upCardsIds} from './logic/store'
import {computed} from 'vue'
import {useCardsMap} from '../../composables/useCards'

const allGachaInCurrentScout = computed(() => {
  const scout = currentScout.value
  return scout ? history.filter(gacha => gacha.type === scout.type && gacha.series === scout.series) : []
})

const allCardsInCurrentScout = computed(() => allGachaInCurrentScout.value.map(gacha => gacha.cardIds).flat())
const cardsDb = useCardsMap()
const allStar5 = computed(() => allCardsInCurrentScout.value.filter(cardId => cardsDb[cardId].star === 5))
const upStar5 = computed(() => allStar5.value.filter(cardId => upCardsIds.value.includes(cardId)))
</script>
<style scoped>
.statics {
  position: absolute;
  top: 2rem;
  right: 1.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 1.6rem;
  line-height: 1.6rem;
  padding: 0.5rem;
  text-shadow: 1px 1px 1px var(--color-secondary), 1px -1px 1px var(--color-secondary), -1px 1px 1px var(--color-secondary), -1px -1px 1px var(--color-secondary);
  border-radius: 0.5rem;
}

.statics .item + .item {
  padding-left: 4rem;
}

.num {
  color: var(--color-primary);
}
</style>
