const fs = require('fs')
const cards = require('../../src/data/card.json')
const scouts = require('../scout.json')

// scouts.feature.forEach((scout, i) => {
//   scout.upCardUrls.forEach(url => {
//     const match = url.match(/^\/wiki\/\((.+)\)_(.+)$/)
//     const cardId = match[1]
//     const chara = match[2]
//     const card = cards[chara].find(item => item.id === cardId)
//     if (!card) {
//       console.warn('Error cannot find card:' + url)
//       return
//     }
//     card.type = scout.type
//     card.series = scout.series
//   })
// })
//
// // console.log(cards)
// fs.writeFileSync('../../src/data/card.json', JSON.stringify(cards, null, 2))

Object.keys(scouts).forEach(type => {
  scouts[type].forEach(scout => {
    delete scout.url
    delete scout.start
    delete scout.end
    delete scout.upCardUrls
    scout.cg = scout.cg || ''
  })
})

fs.writeFileSync('../../src/data/scout.json', JSON.stringify(scouts, null, 2))
