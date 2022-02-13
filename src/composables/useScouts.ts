import scouts from '/src/data/scout.json'

export type ScoutType = 'event' | 'feature' | 'anniversary' | 'limited' | 'normal'

export interface Scout {
  type: ScoutType
  name: string
  banner: string
  cg: string
  series: number
}

export type ScoutByType = { [key in ScoutType]: Scout[] }

export function useScoutStorage(): ScoutByType {
  return scouts
}
