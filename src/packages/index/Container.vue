<template>
  <div class="container">
    <thumb-scouts />
    <gacha-button :single="true" @click="clickTake1" />
    <gacha-button :single="false" @click="clickTake10" />
    <div style="position: absolute; right: 0; top: 0">水位：{{ waterLevel }}</div>
    <result-view v-if="gachaResult !== null" v-model:value="gachaResult" @again="clickAgain" />
  </div>
</template>
<script setup lang="ts">
import ThumbScouts from './ThumbScouts.vue'
import {computed, ref} from 'vue'
import GachaButton from './GachaButton.vue'
import {waterLevel} from './logic/store'
import {take1, take10} from './logic/actions'
import ResultView from './ResultView.vue'
import {Card} from '../../composables/useCards'

// 简单动画效果
const fadeTime = ref(1)
const fadeTimeCss = computed(() => fadeTime.value + 's')
const opacity = ref(1)

// 抽卡结果
const gachaResult = ref<Card[] | null>(null)
const gachaLoading = computed(() => opacity.value !== 1)

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
  background: url("/src/assets/pool/default.jpg") no-repeat;
  background-size: cover;
  opacity: v-bind(opacity);
  transition: opacity v-bind(fadeTimeCss);
}
</style>
