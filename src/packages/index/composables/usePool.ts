import pools from '/src/data/pool.json'

export interface Pool {
  name: string
  series: number
  limited: boolean
}

export function usePools(): Pool[] {
  return pools
}

// 获取常驻池
export function useConstantPool(): Pool {
  return pools.find((p: Pool) => p.series === -1)
}
