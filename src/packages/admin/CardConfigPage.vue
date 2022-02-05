<template>
  <div>
    <div>选择人物：</div>
    <n-select v-model:value="currentChara" :options="options" />
    <div style="margin-top: 12px">该人物的所有卡片：</div>
    <n-data-table :columns="columns" :data="cards" :row-key="row => row.id" striped />
  </div>
</template>
<script setup>
import { NSelect, NDataTable, NInput } from "naive-ui"
import useCharas from "../../composables/useCharas"
import useCards from "../../composables/useCards"
import {computed, ref} from "vue"

// 人物选择
const currentChara = ref('')
const allCharacters = useCharas()
const options = computed(() => allCharacters.map(item => ({ label: item.name, value: item.key })))

// 卡片数据
const cards = computed(() => useCards(currentChara.value))
const columns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '卡面名称',
    key: 'name',
  },
  {
    title: '星级',
    key: 'star',
  },
  {
    title: '加入的卡池',
    key: 'series'
  }
]

</script>
<style scoped>

</style>
