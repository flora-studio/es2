import characters from '/src/data/chara.json'

export interface Chara {
  key: string,
  name: string
}

export default function useCharas(): Chara[] {
  return characters
}
