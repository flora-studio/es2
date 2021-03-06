import cards from '/src/data/card.json'
import type {ScoutType} from './useScouts'

export interface Card {
  id: string
  star: number
  name: string
  img: string
  series: number
  type: ScoutType
}

export type CardsByChara = { [key: string]: Card[] }

// Do not use
export function useCardStorage(): CardsByChara {
  return cards
}

const cardsArray = Object.entries(useCardStorage())
  .map(([chara, cards]) => cards.map(card => ({
    ...card,
    id: `${chara}/${card.id}`
  })))
  .flat()
export function useCards(): Card[] {
  return cardsArray
}

const cardsMap = useCards().reduce((ret, card) => Object.assign(ret, { [card.id]: card }), {})
export function useCardsMap(): { [key: string]: Card } {
  return cardsMap
}
