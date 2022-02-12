import {Card, useCards} from '../../../composables/useCards'
import {Scout, ScoutType} from '../../../composables/useScouts'
import {computed, reactive, ref} from 'vue'

// 一次单抽或十连的记录
export interface Gacha {
  type: ScoutType
  series: number
  cardIds: string[]
}

// 抽卡历史
const history = reactive<Gacha[]>([])

// 水位
const waterLevel = ref(0)

// 当前选择的卡池
const currentScout = ref<Scout | null>(null)

const allCards = useCards()

// 当前可抽取的卡的范围
const cardRange = computed(() => {
  const scout = currentScout.value
  if (scout === null) return allCards
  switch (scout.type) {
    case 'normal':
      return allCards.filter(card => !['anniversary', 'limited'].includes(card.type))
    case 'event':
      return allCards.filter(card => {
        switch (card.type) {
          case 'normal':
            return true
          case 'event':
            return card.series === scout.series || scout.series - card.series >= 6
          case 'feature':
            return scout.series - card.series >= 6
          default:
            return false
        }
      })
    case 'feature':
      return allCards.filter(card => {
        switch (card.type) {
          case 'normal':
            return true
          case 'event':
            return scout.series - card.series > 6
          case 'feature':
            return card.series === scout.series || scout.series - card.series >= 6
          default:
            return false
        }
      })
    default:
      return allCards
  }
})

// 当前卡池 up 的卡
const upCards = computed(() => {
  const scout = currentScout.value
  if (scout === null) return [] as Card[]
  return allCards
    .filter(card => card.type === scout.type && card.series === scout.series)
    .sort((a, b) => b.series - a.series) // 高星级的放前面
})

// 当前卡池 up 卡的 id，便于判断
const upCardsIds = computed(() => upCards.value.map(card => card.id))

export {
  history,
  waterLevel,
  currentScout,
  cardRange,
  upCards,
  upCardsIds
}
