import {Card, useCards} from '../../../composables/useCards'
import {Scout, ScoutType, useLatestScout, useScoutStorage} from '../../../composables/useScouts'
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
const lastEventScout = ref(useLatestScout('event')) // 用户上次选择的活动池
const lastFeatureScout = ref(useLatestScout('feature')) // 用户上次选择的个人池
const lastLimitedScout = ref(useLatestScout('limited')) // 用户上次选择的限定池
const normalScout = computed(() => useLatestScout('normal')) // 常驻池
const currentScout = ref(lastEventScout.value) // 初始选中第一个池子

// 上次抽的卡池
const lastGachaScout = ref<Scout | null>(null)

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
    case 'limited':
      return allCards.filter(card => {
        switch (card.type) {
          case 'normal':
            return true
          case 'event':
          case 'feature':
            // 限定池期数 = 开限定池时，国服最接近的活动池的期数（大多数限定池是在活动池之后开，不严谨但也无伤大雅）
            // 因此计算卡池范围时和活动池的计算方法一致
            return scout.series - card.series >= 6
          case 'limited':
            // 限定池只能抽到当前限定卡
            return scout.series === card.series
          default:
            return false
        }
      })
    case 'anniversary':
      return allCards.filter(card => {
        switch (card.type) {
          case 'normal':
            return true
          case 'event':
          case 'feature':
            // 周年限定规则同国服限定。不过实际发现可能和国服日服开卡池时间不同有关，并不精确
            return scout.series - card.series >= 6
          case 'anniversary':
            // 只能抽到档期周年限定卡
            return scout.series === card.series
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
  lastLimitedScout,
  normalScout,
  currentScout,
  lastGachaScout,
  // cards
  cardRange,
  upCards,
  upCardsIds
}
