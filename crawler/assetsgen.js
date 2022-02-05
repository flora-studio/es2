const fs = require('fs')

const name = 'Shinobu_Sengoku' // 角色名

const database = require('../src/data/card.json')

const usedCards = database[name]

usedCards.forEach(card => {
  const arr = card.id.split('_')
  const id = arr[arr.length - 1]
  fs.copyFileSync(`./cards/${name}/100_${id}.webp`, `../src/assets/cards/${name}_${id}.webp`, fs.constants.COPYFILE_FICLONE)
})
