import characters from '/src/data/chara.json'

export interface Chara {
  key: string,
  name: string
}

export function useCharas(): Chara[] {
  return characters
}

const charaMap = useCharas().reduce((ret, chara) => Object.assign(ret, { [chara.key]: chara.name }), {})
export function useCharaMap(): { [key: string]: string } {
  return charaMap
}
