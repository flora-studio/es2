import cards from '/src/data/card.json'

export interface Card {
  id: string
  star: number
  name: string
  series: number
}

export default function useCards(chara?: string): Card[] {
  if (chara) {
    return cards[chara] || []
  } else {
    // todo
    return []
  }
}
