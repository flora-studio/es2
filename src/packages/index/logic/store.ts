import {Card, useCards} from '../../../composables/useCards'
import {Scout, ScoutType, useScoutStorage} from '../../../composables/useScouts'
import {computed, reactive, ref} from 'vue'

// 一次单抽或十连的记录
export interface Gacha {
  type: ScoutType
  series: number
  cardIds: string[]
}

// 抽卡历史
const history = reactive<Gacha[]>([])
const cardsCounter = reactive<{ [key: string]: number }>({}) // 抽到的卡片的计数器

// 水位
const waterLevel = ref(0)

// 当前选择的卡池
const allScouts = useScoutStorage()
const lastEventScout = ref<Scout | null>(allScouts.event[allScouts.event.length - 1]) // 用户上次选择的活动池
const lastFeatureScout = ref<Scout | null>(allScouts.feature[allScouts.feature.length - 1]) // 用户上次选择的个人池
const normalScout = computed(() => allScouts.normal[0]) // 常驻池
const currentScout = ref<Scout | null>(lastEventScout.value) // 初始选中第一个池子

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
    .sort((a, b) => b.star - a.star) // 高星级的放前面
})

// 当前卡池 up 卡的 id，便于判断
const upCardsIds = computed(() => upCards.value.map(card => card.id))

export {
  // gacha
  history,
  cardsCounter,
  waterLevel,
  // scout
  lastEventScout,
  lastFeatureScout,
  normalScout,
  currentScout,
  cardRange,
  // cards
  upCards,
  upCardsIds
}
