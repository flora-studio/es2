const Crawler = require('crawler')
const fs = require('fs')

// TODO 每次记得替换
const ScoutUrl = 'https://gamerch.com/ensemble-star-music/entry/357632'
const ScoutSeries = 53
const ScoutType = 'feature'
const ScoutName = 'Nazuna Feature Scout 2'

const scout = {
  type: ScoutType,
  banner: '',
  name: ScoutName,
  cg: '',
  series: ScoutSeries
}
const cards = {}

const c = new Crawler({
  rateLimit: 1000,
})

console.log('start')
c.queue({
  uri: ScoutUrl,
  callback: (err, res, done) => {
    if (err) {
      console.log(err)
    } else {
      // 403 fuck
      const $ = res.$
      // 卡池基础数据
      scout.banner = $($('.mu__table--row1 .mu__table--col1 .mu__img img')[0]).attr('src')
      console.log($('.mu__table--row1 .mu__table--col1 .mu__img img'))
      // 新卡的数据
      // const table = $('.mu__h-large').next('.mu__table').first()
      console.log($('.mu__h-large'))
      // table.find('th').each((i, elem) => {
      //   if (i <= 1) return
      //   const a = $($(elem).children().first())
      //   const url = a.attr('href')
      //   const name = a.text()
      //   console.log(url, name)
      //   // const urlMatch = url.match(/\((.+)\)_(.+)/)
      //   // fetchCard(url, {
      //   //   id: urlMatch[1],
      //   //   star: 0,
      //   //   name: urlMatch[2],
      //   //   img: (img.attr('data-src') || img.attr('src'))?.replace('scale-to-width-down/144', 'scale-to-width-down/200') || '',
      //   //   series: scout.series,
      //   //   type: scout.type
      //   // })
      // })
      done()
    }
  }
})
