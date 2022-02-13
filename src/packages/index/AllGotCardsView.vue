<template>
  <es-button @click="show = true">帐号卡片</es-button>
  <teleport v-if="show" to="#es-container">
    <div class="view">
      <es-gallery class="gallery">
        <es-card v-for="item in gotCards" :key="item.card.id" :card="item.card" :count="item.count" lazy :is-new="false"/>
      </es-gallery>
      <es-button class="back" @click="show = false">←</es-button>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import {cardsCounter} from './logic/store'
import {useCardsMap} from '../../composables/useCards'
import {computed, ref} from 'vue'
import EsButton from './common/EsButton.vue'
import EsGallery from './common/EsGallery.vue'
import EsCard from './common/EsCard.vue'

const show = ref(false)

const cardsMap = useCardsMap()

// 计算所有抽到的卡片及计数，排序 稀有度 > 数量
const gotCards = computed(() => {
  return Object.keys(cardsCounter)
      .map(cardId => ({
        card: cardsMap[cardId],
        count: cardsCounter[cardId]
      }))
      .sort((a, b) => {
        const starDiff = b.card.star - a.card.star
        if (starDiff !== 0) return starDiff
        return b.count - a.count
      })
})
</script>
<style scoped>
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100rem;
  height: 50rem;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(0.8rem);
  -webkit-backdrop-filter: blur(0.8rem);
}

.gallery {
  width: fit-content;
  height: 50rem;
  margin: 0 auto;
  padding-top: 2rem;
  grid-template-columns: repeat(5, 13rem);
  grid-template-rows: 16.25rem;
}

.back {
  position: absolute;
  left: 5rem;
  top: 2rem;
  width: 4rem;
}
</style>
