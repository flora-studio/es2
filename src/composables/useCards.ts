import cards from '/src/data/card.json'

export interface Card {
  id: string
  star: number
  name: string
  img: string
  series: number   // 卡池的期数
  limited: boolean // 是否是限定（限定与否，出现在卡池的计算规则会不同）
}

export type CardsByChara = { [key: string]: Card[] }

export default function useCards(): CardsByChara {
  return cards
}
