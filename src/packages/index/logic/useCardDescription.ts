import {useCharaMap} from '../../../composables/useCharas'
import {Card} from '../../../composables/useCards'

const charaMap = useCharaMap()
export function useCardDescription(card: Card) {
  const chara = charaMap[card.id.split('/')[0]]
  return `[${chara}]${card.name}`
}
