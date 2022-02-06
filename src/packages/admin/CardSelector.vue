<template>
  <n-modal
      :show="show"
      preset="dialog"
      title="选择角色"
      style="width: 720px"
      @update:show="$emit('update:show', $event)"
  >
    <div>
      <div style="margin-bottom: 12px">已选：{{ selectedDisplay }}</div>
      <n-select v-model:value="currentChara" :options="options" filterable size="small" />
      <n-grid :x-gap="8" :y-gap="8" :cols="6" style="height: calc(100vh - 240px); overflow-y: auto; margin-top: 8px">
        <n-grid-item v-for="item in currentCards" :key="item.id">
          <img
              :width="100"
              :height="125"
              :src="item.img"
              :alt="item.name"
              :title="item.name"
              referrerpolicy="no-referrer"
              :style="`display: block; opacity: ${value.includes(item.id) ? 0.25 : 1}`"
              @click="toggleSelect(item.id)"
          />
        </n-grid-item>
      </n-grid>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { NModal, NSelect, NGrid, NGridItem } from 'naive-ui'
import {computed, ref} from 'vue'
import useCharas from '../../composables/useCharas'
import useCards from '../../composables/useCards'

const props = defineProps<{ show: boolean, value: string[] }>()
const emit = defineEmits<{
  (e: 'update:show', show: boolean): void,
  (e: 'update:value', value: string[]): void
}>()

const selectedDisplay = computed(() => props.value.join('，'))

// 人物选择
const allCharacters = useCharas()
const options = computed(() => allCharacters.map(item => ({ label: `${item.name}\u3000(${item.key})`, value: item.key })))
const currentChara = ref(options.value?.[0].value || '')

// 卡片选择
const allCards = useCards()
const currentCards = computed(() => allCards[currentChara.value])

// 选择
const toggleSelect = (card: string) => {
  const indexOfCard = props.value.indexOf(card)
  if (indexOfCard >= 0) {
    props.value.splice(indexOfCard, 1)
    emit('update:value', props.value)
  } else {
    emit('update:value', [...props.value, card])
  }
}
</script>
