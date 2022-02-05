const modules = import.meta.globEager('/src/assets/cards/*.webp')

export default function useCardImg(cardId: string, ext = 'webp'): string {
  const module = modules[`/src/assets/cards/${cardId}.${ext}`]
  return module?.default || ''
}
