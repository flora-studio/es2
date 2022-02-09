const fs = require('fs')
const cards = require('../../src/data/card.json')
const scouts = require('../scout.json')

scouts.feature.forEach((scout, i) => {
  scout.upCardUrls.forEach(url => {
    const match = url.match(/^\/wiki\/\((.+)\)_(.+)$/)
    const cardId = match[1]
    const chara = match[2]
    const card = cards[chara].find(item => item.id === cardId)
    if (!card) {
      console.warn('Error cannot find card:' + url)
      return
    }
    card.type = scout.type
    card.series = scout.series
  })
})

// Object.keys(cards).forEach(chara => {
//   const list = cards[chara]
//   const rawCards = require(`../cards/${chara}`)
//   list.forEach(card => {
//     const match = card.id.match(/^(.+)_(\d+)$/)
//     const index = Number(match[2])
//     const rawCard = rawCards.find(item => item.i === index)
//     card.id = rawCard.url.match(/^\/wiki\/\((.+)\)/)[1]
//     delete card.limited
//   })
// })

// console.log(cards)
fs.writeFileSync('../../src/data/card.json', JSON.stringify(cards, null, 2))
