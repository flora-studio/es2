import cards from '/src/data/card.json'

export interface Card {
  id: string
  star: number
  name: string
  series: number
}

export type CardsByChara = { [key: string]: Card[] }

export default function useCards(): CardsByChara {
  return cards
}
