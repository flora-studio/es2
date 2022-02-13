// import pools from '/src/data/poolconf.json'

export interface PoolConf {
  _id: number
  name: string
  series: number
  limited: boolean
  _upIds: string[]
  _comment: string
}

export default function usePoolConf(): PoolConf[] {
  return [] // useless stub
}
