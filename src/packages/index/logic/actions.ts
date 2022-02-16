import {Card} from '../../../composables/useCards'
import {cardRange, cardsCounter, currentScout, Gacha, history, lastGachaScout, upCardsIds, waterLevel} from './store'
import {shuffle} from 'lodash-es'

type ResultType = { up: boolean, star: number }

// 单抽
export function take1() {
  console.assert(currentScout.value !== null, 'must choose a scout')
  const scout = currentScout.value!
  // 是否换卡池
  if (lastGachaScout.value !== scout) {
    waterLevel.value = 0
    lastGachaScout.value = scout
  }
  const gachaMethod = waterLevel.value === 49 ? randomResultType_Exact5 : randomResultType_General
  const resultType = gachaMethod(scout.type === 'normal')
  const result = randomCard(cardRangeByResultType(resultType))
  // 历史记录
  recordHistory({ type: scout.type, series: scout.series, cardIds: [result.id] })
  // 水位处理
  if (result.star === 5) {
    waterLevel.value = 0
  } else {
    waterLevel.value++
  }
  return result
}

// 10 连抽
export function take10() {
  console.assert(currentScout.value !== null, 'must choose a scout')
  const scout = currentScout.value!
  // 是否换卡池
  if (lastGachaScout.value !== scout) {
    waterLevel.value = 0
    lastGachaScout.value = scout
  }
  const batchResult: Card[] = []
  const isNormal = scout.type === 'normal'
  logD('【十连】当前水位', waterLevel.value)
  // 对十连抽的每个位置进行抽取
  for (let i = 0; i < 10; i++) {
    const gachaMethod = waterLevel.value === 49 ? randomResultType_Exact5 : randomResultType_General
    const resultType = gachaMethod(scout.type === 'normal')
    const result = randomCard(cardRangeByResultType(resultType))
    batchResult.push(result)
    // 水位处理
    if (result.star === 5) {
      waterLevel.value = 0
    } else {
      waterLevel.value++
    }
  }
  // 塞个保底四星
  const giftPos = Math.floor(Math.random() * 10)
  logD('保底四星 位置', giftPos)
  if (batchResult[giftPos].star < 4) {
    batchResult[giftPos] = randomCard(cardRangeByResultType(randomResultType_Exact4(isNormal)))
  }
  // 打乱并展示
  const shuffled = shuffle(batchResult)
  // 历史记录
  recordHistory({ type: scout.type, series: scout.series, cardIds: shuffled.map(card => card.id) })
  return shuffled
}

// 计算通用概率
function randomResultType_General(isNormal = false): ResultType {
  const r = Math.floor(Math.random() * 1000)
  const ret = (() => {
    if (r < 7) {
      return { up: true, star: 5 }
    } else if (r >= 7 && r < 21) {
      return { up: false, star: 5 }
    } else if (r >= 21 && r < 41) {
      return { up: true, star: 4 }
    } else if (r >= 41 && r < 91) {
      return { up: false, star: 4 }
    } else if (r >= 91 && r < 292) {
      return { up: true, star: 3 }
    } else {
      return { up: false, star: 3 }
    }
  })()
  // 常驻池处理
  if (isNormal) {
    ret.up = false
  }
  logD('通用抽取，rand', r, `= ${ret.up ? 'UP' : '非UP'}${ret.star}星`)
  return ret
}

// 计算保底 4 星概率
function randomResultType_Exact4(isNormal = false): ResultType {
  const r = Math.floor(Math.random() * 7)
  const ret = (() => {
    if (r < 2) {
      return { up: true, star: 4 }
    } else {
      return { up: false, star: 4 }
    }
  })()
  // 常驻池处理
  if (isNormal) {
    ret.up = false
  }
  logD('抽取保底四星，rand', r, `= ${ret.up ? 'UP' : '非UP'}${ret.star}星`)
  return ret
}

// 计算保底 5 星概率
function randomResultType_Exact5(isNormal = false): ResultType {
  const r = Math.floor(Math.random() * 3000)
  const ret = (() => {
    if (r < 1000) {
      return { up: true, star: 5 }
    } else {
      return { up: false, star: 5 }
    }
  })()
  // 常驻池处理
  if (isNormal) {
    ret.up = false
  }
  logD('抽取保底五星，rand', r, `= ${ret.up ? 'UP' : '非UP'}${ret.star}星`)
  return ret
}

// 根据 resultType 获取出货范围
function cardRangeByResultType(resultType: ResultType) {
  let range = cardRange.value.filter(card => {
    const isUpCard = upCardsIds.value.includes(card.id)
    return (resultType.up ? isUpCard : !isUpCard) && resultType.star === card.star
  })
  // bug: 部分卡池没有 up 的对应星级卡片
  // 例如有的卡池只 up 一四一五，这时候如果抽到了 up 3星，randomCard 就会报错，这时就把范围改成非 up 的
  if (range.length === 0) {
    range = cardRange.value.filter(card => resultType.star === card.star)
  }
  return range
}

// 从范围内随机选取一张卡
function randomCard(range: Card[]) {
  console.assert(range.length > 0, 'range cannot be empty')
  return range[Math.floor(Math.random() * range.length)]
}

// 记录抽卡历史
function recordHistory(gacha: Gacha) {
  history.push(gacha)
  gacha.cardIds.forEach(cardId => {
    if (cardsCounter[cardId]) {
      cardsCounter[cardId]++
    } else {
      cardsCounter[cardId] = 1
    }
  })
}

// 重置 state
export function resetHistory() {
  history.length = 0
  Object.keys(cardsCounter).forEach(key => delete cardsCounter[key])
  waterLevel.value = 0
}

// 调试日志
function logD(...s: any) {
  if (import.meta.env.DEV) {
    console.log(...s)
  }
}
