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

export function useDisplayScouts(): Scout[] {
  const scouts = useScoutStorage()
  const latestEvent = scouts.event.sort((a, b) => b.series - a.series)[0]
  const latestFeature = scouts.feature.sort((a, b) => b.series - a.series)[0]
  const normal = scouts.normal[0]
  return [latestEvent, latestFeature, normal].filter(item => !!item)
}
