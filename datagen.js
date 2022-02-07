const fs = require('fs')
const cards = require('./src/data/card.json')
const poolconf = require('./src/data/poolconf.json')

const pools = poolconf.map(item => ({
  name: item.name,
  series: item.series,
  limited: item.limited
}))

poolconf.forEach(pool => {
  pool._upIds.forEach(id => {
    const chara = id.replace(/_\d+$/, '')
    const card = cards[chara]?.find(c => c.id === id)
    if (!card) {
      console.warn(`can not find card with id ${id}`)
      return
    }

    card.series = pool.series
    card.limited = pool.limited
  })
})

fs.writeFileSync('./src/data/pool.json', JSON.stringify(pools, null, 2))
fs.writeFileSync('./src/data/card.json', JSON.stringify(cards, null, 2))
