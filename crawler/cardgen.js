const fs = require('fs')

const name = 'Tomoya_Mashiro' // 角色名

const database = require('../src/data/card.json')
const data = require(`./cards/${name}/index.json`)

console.log(data)

database[name] = data
  .filter(item => item.star >= 3)
  .map(item => ({
    id: `${name}_${item.i}`,
    star: item.star,
    name: item.name.match(/[［【\[](.+?)[］】\]]/)?.[1] || item.name,
    series: 0
  }))

fs.writeFileSync('../src/data/card.json', JSON.stringify(database, null, 2))

// todo 根据 id 复制图片到 assets 文件夹下，后面再说？
