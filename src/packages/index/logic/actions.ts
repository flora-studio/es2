import {Card} from '../../../composables/useCards'
import {cardRange, currentScout, upCardsIds, waterLevel} from './store'
import {findLastIndex, shuffle} from 'lodash-es'

type ResultType = { up: boolean, star: number }

// 单抽
export function take1() {
  console.assert(currentScout.value !== null, 'must choose a scout')
  const resultType = (waterLevel.value === 49 ? randomResultType_Least5 : randomResultType_General)(currentScout.value!.type === 'normal')
  const result = randomCard(cardRangeByResultType(resultType))
  // 历史记录
  // todo
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
  const result: Card[] = []
  const isNormal = currentScout.value!.type === 'normal'
  // 计算 50 抽保底
  if (waterLevel.value >= 40) {
    const least5Result = randomCard(cardRangeByResultType(randomResultType_Least5(isNormal)))
    result.push(least5Result)
  }
  // 计算 10 连保底
  const least4Result = randomCard(cardRangeByResultType(randomResultType_Least4(isNormal)))
  result.push(least4Result)
  // 抽取剩余
  const restLength = 10 - result.length
  for (let i = 0; i < restLength; i++) {
    result.push(randomCard(cardRangeByResultType(randomResultType_General(isNormal))))
  }
  // 打乱
  const shuffled = shuffle(result)
  // 历史记录
  // todo
  // 水位处理
  const lastStar5Pos = findLastIndex(shuffled, card => card.star === 5)
  if (lastStar5Pos >= 0) {
    waterLevel.value = 9 - lastStar5Pos
  } else {
    waterLevel.value += 10
  }
  return shuffled
}

// 计算通用概率
function randomResultType_General(isNormal = false): ResultType {
  const r = Math.floor(Math.random() * 100)
  const ret = (() => {
    if (r === 0) {
      return { up: true, star: 5 }
    } else if (r > 0 && r <= 2) {
      return { up: false, star: 5 }
    } else if (r > 2 && r <= 4) {
      return { up: true, star: 4 }
    } else if (r > 4 && r <= 9) {
      return { up: false, star: 4 }
    } else if (r > 9 && r <= 29) {
      return { up: true, star: 3 }
    } else {
      return { up: false, star: 3 }
    }
  })()
  // 常驻池处理
  if (isNormal) {
    ret.up = false
  }
  return ret
}

// 计算保底 4 星概率
function randomResultType_Least4(isNormal = false): ResultType {
  const r = Math.floor(Math.random() * 100)
  const ret = (() => {
    if (r === 0) {
      return { up: true, star: 5 }
    } else if (r > 0 && r <= 2) {
      return { up: false, star: 5 }
    } else if (r > 2 && r <= 30) {
      return { up: true, star: 4 }
    } else {
      return { up: false, star: 4 }
    }
  })()
  // 常驻池处理
  if (isNormal) {
    ret.up = false
  }
  return ret
}

// 计算保底 5 星概率
function randomResultType_Least5(isNormal = false): ResultType {
  const r = Math.floor(Math.random() * 3)
  const ret = (() => {
    if (r === 0) {
      return { up: true, star: 5 }
    } else {
      return { up: false, star: 5 }
    }
  })()
  // 常驻池处理
  if (isNormal) {
    ret.up = false
  }
  return ret
}

// 根据 resultType 获取出货范围
function cardRangeByResultType(resultType: ResultType) {
  return cardRange.value.filter(card => {
    const isUpCard = upCardsIds.value.includes(card.id)
    return (resultType.up ? isUpCard : !isUpCard) && resultType.star === card.star
  })
}

// 从范围内随机选取一张卡
function randomCard(range: Card[]) {
  console.assert(range.length > 0, 'range cannot be empty')
  return range[Math.floor(Math.random() * range.length)]
}
