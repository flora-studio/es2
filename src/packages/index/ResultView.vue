<template>
  <div class="result-view">
    <div :class="single ? 'single' : 'grid'">
      <div v-for="(card, i) in value" :key="card.id + i" style="position: relative"><!-- 同一张卡可能抽到两次，所以 +i -->
        <es-card :card="card" :count="realCounts[i]" :is-new="realCounts[i] === 1" :lazy="false" />
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
import EsButton from './common/EsButton.vue'
import {computed, toRefs} from 'vue'
import EsCard from './common/EsCard.vue'
import {cardsCounter} from './logic/store'

const props = defineProps<{ value: Card[] | null }>()
const emit = defineEmits<{
  (e: 'update:value', value: Card[] | null): void
  (e: 'again', single: boolean): void
}>()

// 是否是单抽
const { value } = toRefs(props)
const single = computed(() => value.value!.length === 1)

// 计算抽到的次数。注意同一张卡抽到多次的情况
const totalCounts = computed(() => value.value!.map(card => cardsCounter[card.id] || 0))
// 同一张卡抽到多次情况：看这张卡的后面有没有同一张卡，如有，则减小计数
const repeatedCounts = computed(() => value.value!.map((card, index) =>
    value.value!.filter((that, i) => i > index && that.id === card.id).length))
const realCounts = computed(() => totalCounts.value!.map((count, i) => count - repeatedCounts.value[i]))
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
</style>
