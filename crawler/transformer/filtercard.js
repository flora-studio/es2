const fs = require('fs')
const cards = require('../../src/data/card.json')

// 过滤没有获取途径的卡片
const noUseCards = {}
Object.keys(cards).forEach(chara => {
  noUseCards[chara] = cards[chara].filter(item => !item.type)
})

console.log(noUseCards)
fs.writeFileSync('./noUseCards.json', JSON.stringify(noUseCards, null, 2))

// 输出 html
// const noUseCards = require('./noUseCards.json')
// let html = ''
// Object.keys(noUseCards).forEach(chara => {
//   noUseCards[chara].forEach(card => {
//     html += `<div><img width="100" src="${card.img}" referrerpolicy="no-referrer" /><span>${chara} ${card.id}</span></div>\n`
//   })
// })
//
// fs.writeFileSync('./noUseCards.html', html)


// 获取途径抓取
// const Crawler = require('crawler')
// const BASE_URL = 'https://ensemble-stars.fandom.com'
// const c = new Crawler({
//   rateLimit: 1000,
// })
//
// Object.keys(noUseCards).forEach(chara => {
//   noUseCards[chara].forEach(card => {
//     c.queue({
//       uri: `${BASE_URL}/wiki/(${card.id})_${chara}`,
//       callback: (error, res, done) => {
//         if (error) {
//           console.log(error)
//         } else {
//           console.log(card.id, chara)
//           const $ = res.$
//           card.acquire = $('td[data-source=Acquire]').first().text()
//           console.log(card.acquire)
//           done()
//         }
//       }
//     })
//   })
// })
//
// c.on('drain', () => {
//   fs.writeFileSync('./noUseCards.json', JSON.stringify(noUseCards, null, 2))
// })

// 过滤初始卡
// const noUseCards = require('./noUseCards.json')
// Object.keys(noUseCards).forEach(chara => {
//   noUseCards[chara].forEach(card => {
//     const realCard = findInCardDB(chara, card.id)
//     if (card.acquire.indexOf('starter card') >= 0) {
//       realCard.type = 'starter'
//     }
//   })
// })
//
// function findInCardDB(chara, id) {
//   return cards[chara].find(item => item.id === id)
// }
//
// fs.writeFileSync('../../src/data/card.json', JSON.stringify(cards, null, 2))

// 注：国服限定
// https://ensemble-stars.fandom.com/wiki/Other_Language_Version_Information/Cards#Enstars!!
