const Crawler = require('crawler')

/**
 * 另一条线路（取不到 cg），目前先打出来，不写文件，看后续更新情况
 */

// TODO 每次记得替换
const ScoutUrl = 'https://ensemble-stars.info/scout-whiteblim/'
const ScoutSeries = 48
const ScoutType = 'event'

const scout = {
  type: ScoutType,
  banner: '',
  name: ScoutUrl.match(/\/scout-(.+)\//)[1],
  cg: '',
  series: ScoutSeries
}
const cards = {}

const c = new Crawler({
  rateLimit: 1000,
})

c.queue({
  uri: ScoutUrl,
  callback: (err, res, done) => {
    if (err) {
      console.log(err)
    } else {
      const $ = res.$
      // 卡池基础数据
      const banner = $($('div[itemprop=mainEntityOfPage] img')[0])
      scout.banner = banner.attr('data-src') || banner.attr('src')
      // 新卡的数据
      $('table tbody tr').each((i, elem) => {
        const a = $(elem).find('td a')
        if (a.length > 0) {
          const id = $(a[0]).attr('href').match(/\/cardlist-(.+)\//)[1]
          cards[id] = {
            id,
            star: 0, // 自己后面填吧，为了一个 star 再请求 n 次有点不值
            name: $(a[0]).text().match(/\[(.+)]/)[1],
            img: $(a[1]).attr('href'),
            series: scout.series,
            type: scout.type
          }
        }
      })
      done()
    }
  }
})

c.on('drain', () => {
  console.log('finished!\n卡池数据:')
  console.log(JSON.stringify(scout, null, 2))
  console.log('卡片数据:')
  console.log(JSON.stringify(cards, null, 2))
  console.log('注意核对卡池类型和期数，填写卡片 star')
})
