<template>
  <div class="container">
    <thumb-scouts />
    <gacha-button :single="true" @click="clickTake1" />
    <gacha-button :single="false" @click="clickTake10" />
    <div style="position: absolute; right: 0; top: 0">水位：{{ waterLevel }}</div>
    <result-view v-if="gachaResult !== null" v-model:value="gachaResult" />
  </div>
</template>
<script setup lang="ts">
import ThumbScouts from './ThumbScouts.vue'
import {ref} from 'vue'
import GachaButton from './GachaButton.vue'
import {waterLevel} from './logic/store'
import {take1, take10} from './logic/actions'
import ResultView from './ResultView.vue'
import {Card} from '../../composables/useCards'

const gachaResult = ref<Card[] | null>(null)

const clickTake1 = () => {
  gachaResult.value = [take1()]
}

const clickTake10 = () => {
  gachaResult.value = take10()
}

</script>
<style scoped>
.container {
  background: url("/src/assets/pool/default.jpg") no-repeat;
  background-size: cover;
}
</style>
