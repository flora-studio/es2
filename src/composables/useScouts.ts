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

export function useScout(type: ScoutType) {
  return useScoutStorage()[type]
}

export function useLatestScout(type: ScoutType) {
  const all = useScout(type)
  let ret = all[0]
  for (let i = 1; i < all.length; i++) {
    if (ret.series < all[i].series) {
      ret = all[i]
    }
  }
  return ret
}
