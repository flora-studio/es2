<template>
  <div class="container">
    <es-image :key="currentCg" :src="currentCg" img-class="cg" />
    <thumb-scouts />
    <statics-view />
    <gacha-button :single="true" @click="clickTake1" />
    <gacha-button :single="false" @click="clickTake10" />
    <div class="menu-btns">
      <scout-selector />
      <up-cards-display v-if="showUpCardsBtn" />
      <all-got-cards-view />
      <es-button @click="resetHistory">重置帐号</es-button>
    </div>
    <result-view v-if="gachaResult !== null" v-model:value="gachaResult" @again="clickAgain" />
  </div>
</template>
<script setup lang="ts">
import ThumbScouts from './ThumbScouts.vue'
import {computed, ref} from 'vue'
import GachaButton from './GachaButton.vue'
import {currentScout} from './logic/store'
import {take1, take10, resetHistory} from './logic/actions'
import ResultView from './ResultView.vue'
import {Card} from '../../composables/useCards'
import EsImage from './common/EsImage.vue'
import UpCardsDisplay from './UpCardsDisplay.vue'
import ScoutSelector from './ScoutSelector.vue'
import StaticsView from './StaticsView.vue'
import EsButton from './common/EsButton.vue'
import AllGotCardsView from './AllGotCardsView.vue'

const currentCg = computed(() => currentScout.value?.cg || '')
const showUpCardsBtn = computed(() => currentScout.value?.type !== 'normal' || false)

// 简单动画效果
const fadeTime = ref(0.4)
const fadeTimeCss = computed(() => fadeTime.value + 's')
const opacity = ref(1)

// 抽卡结果
const gachaResult = ref<Card[] | null>(null)
const gachaLoading = computed(() => opacity.value !== 1)

// 抽卡方法
const clickTake1 = () => {
  if (gachaLoading.value) return
  opacity.value = 0
  setTimeout(() => {
    gachaResult.value = [take1()]
    opacity.value = 1
  }, fadeTime.value * 1000)
}

const clickTake10 = () => {
  if (gachaLoading.value) return
  opacity.value = 0
  setTimeout(() => {
    gachaResult.value = take10()
    opacity.value = 1
  }, fadeTime.value * 1000)
}

const clickAgain = async (single: boolean) => {
  if (single) {
    clickTake1()
  } else {
    clickTake10()
  }
}
</script>
<style scoped>
.container {
  opacity: v-bind(opacity);
  transition: opacity v-bind(fadeTimeCss);
}

::v-deep .cg {
  position: absolute;
  width: 100rem;
  height: 50rem;
  object-fit: cover;
}

.menu-btns {
  position: absolute;
  top: 8rem;
  right: 1.5rem;
}

.menu-btns ::v-deep > .es-button {
  width: 12.5rem;
}

.menu-btns ::v-deep > .es-button + .es-button {
  margin-top: 2rem;
}
</style>
