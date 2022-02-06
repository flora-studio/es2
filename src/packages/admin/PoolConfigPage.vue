<template>
  <div>
    <n-space style="margin: 0 0 8px">
      <n-button type="primary" @click="addPool">新增卡池</n-button>
      <n-button @click="exportJson(allPools, 'poolconf.json')">导出全部</n-button>
    </n-space>
    <n-data-table :columns="columns" :data="allPools" :row-key="row => row._id" striped max-height="calc(100vh - 200px)" />
    <card-selector :show="selectPool !== null" :value="selectUpCards" @update:show="selectPool = null" @update:value="updateUpCards" />
  </div>
</template>
<script setup lang="tsx">
import { NSelect, NDataTable, NInput, NButton, NSpace, NInputNumber, NPopconfirm, NTooltip, NCheckbox } from "naive-ui"
import CardSelector from './CardSelector.vue'
import {computed, reactive, ref} from 'vue'
import usePoolConf, {PoolConf} from './composables/usePoolConf'
import { exportJson } from "./utils"

// 卡池数据
const allPools = reactive(usePoolConf())
let poolIdCounter = Math.max(...allPools.map(item => item._id))
const columns = [
  {
    title: '卡池名',
    key: 'name',
    render(row: PoolConf, index: number) {
      return <NInput value={row.name} onUpdateValue={v => allPools[index].name = v} />
    }
  },
  {
    title: '期数（个人池奇数，活动池偶数，常驻和限定论外）',
    key: 'series',
    width: 120,
    render(row: PoolConf, index: number) {
      return <NInputNumber min={-2} value={row.series} onUpdateValue={v => allPools[index].series = v || 0} />
    }
  },
  {
    title: '是否限定',
    key: 'limited',
    width: 60,
    render(row: PoolConf, index: number) {
      return <NCheckbox checked={row.limited} onUpdateChecked={v => allPools[index].limited = v} />
    }
  },
  {
    title: 'UP的卡（点击编辑）',
    key: '_upIds',
    render(row: PoolConf, index: number) {
      return <div onClick={() => selectPool.value = row}>{ row._upIds.join(', ') || '无' }</div>
    }
  },
  {
    title: '备注',
    key: '_comment',
    render(row: PoolConf, index: number) {
      return <NInput value={row._comment} onUpdateValue={v => allPools[index]._comment = v} />
    }
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    render(row: PoolConf, index: number) {
      return (
          <NPopconfirm onPositiveClick={() => allPools.splice(index, 1)}>
            {{
              default: () => '确认删除吗？',
              trigger: () => <NButton size="small" type="error" secondary>删除</NButton>
            }}
          </NPopconfirm>
      )
    }
  }
]

// up卡片选择器相关逻辑
const selectPool = ref<PoolConf | null>(null)
const selectUpCards = computed(() => selectPool.value?._upIds || [])
const updateUpCards = (value: string[]) => {
  selectPool.value && (selectPool.value._upIds = value)
}

// 新增卡池
const addPool = () => allPools.unshift({ _id: ++poolIdCounter, name: '', series: 0, limited: false, _upIds: [], _comment: '' })
</script>
