<template>
  <div>
    <div>选择人物：</div>
    <n-select v-model:value="currentChara" :options="options" filterable />
    <n-space style="margin: 12px 0 8px">
      <n-button type="primary">新增卡片</n-button>
      <n-button @click="exportJson(allCards, 'card.json')">导出全部</n-button>
    </n-space>
    <n-data-table :columns="columns" :data="currentCards" :row-key="row => row.id" striped max-height="calc(100vh - 240px)" />
  </div>
</template>
<script setup lang="tsx">
import { NSelect, NDataTable, NInput, NButton, NSpace, NInputNumber, NPopconfirm, NTooltip, NCheckbox } from "naive-ui"
import useCharas from "../../composables/useCharas"
import {Card} from "../../composables/useCards"
import useCardImg from "../../composables/useCardImg"
import {computed, ref, h} from "vue"
import useCardStorage from "./composables/useCardStorage"
import { exportJson } from "./utils"

// 人物选择
const allCharacters = useCharas()
const options = computed(() => allCharacters.map(item => ({ label: `${item.name}\u3000(${item.key})`, value: item.key })))
const currentChara = ref(options.value?.[0].value || '')

// 卡片数据
const allCards = useCardStorage()
const currentCards = computed(() => allCards[currentChara.value])
const columns = [
  {
    title: 'id',
    key: 'id',
    width: 72,
    render(row: Card) {
      return (
        <NTooltip trigger="hover">
          {{
            default: () => row.id,
            // @ts-ignore to directly use img from wiki
            trigger: () => <img width={60} src={row.img} alt={row.id} referrerpolicy="no-referrer" />
          }}
        </NTooltip>
      )
    }
  },
  {
    title: '卡面名称',
    key: 'name',
    render(row: Card, index: number) {
      return <NInput value={row.name} onUpdateValue={v => allCards[currentChara.value][index].name = v} />
    }
  },
  {
    title: '星级',
    key: 'star',
    width: 100,
    render(row: Card, index: number) {
      return <NInputNumber min={1} max={5} value={row.star} onUpdateValue={v => allCards[currentChara.value][index].star = v || 0} />
    },
  },
  {
    title: 'UP的卡池',
    key: 'series',
    width: 150,
    render(row: Card, index: number) {
      return <NInputNumber min={0} value={row.series} onUpdateValue={v => allCards[currentChara.value][index].series = v || 0} />
    }
  },
  {
    title: '是否限定',
    key: 'limited',
    width: 60,
    render(row: Card, index: number) {
      return <NCheckbox checked={row.limited} onUpdateChecked={v => allCards[currentChara.value][index].limited = v} />
    }
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    render(row: Card, index: number) {
      return (
        <NPopconfirm onPositiveClick={() => allCards[currentChara.value].splice(index, 1)}>
          {{
            default: () => '确认删除吗？',
            trigger: () => <NButton size="small" type="error" secondary>删除</NButton>
          }}
        </NPopconfirm>
      )
    }
  }
]
</script>
