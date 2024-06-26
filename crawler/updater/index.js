const Crawler = require('crawler')
const fs = require('fs')
const BASE_URL = 'https://ensemble-stars.fandom.com'

// https://ensemble-stars.fandom.com/wiki/Story/Global_Excl._Story_(!!)
// TODO 每次记得替换
// https://static.wikia.nocookie.net/ensemble-stars/images/d/df/%28One_Can_of_Gratitude%29_Ibara_Saegusa_M.png/revision/latest/scale-to-width-down/200?cb=20220502030112
const ScoutUrl = 'https://ensemble-stars.fandom.com/wiki/Category:Midori_Feature_Scout_2'
const ScoutSeries = 99
const ScoutType = ['feature', 'event', 'limited'][0]

const scout = {
  type: '',
  banner: '',
  name: '',
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
      const $ = res.$
      // 卡池基础数据
      scout.name = $('#firstHeading').text().trim()
      scout.type = ScoutType // scout.name.indexOf('Feature') > 0 ? 'feature' : 'event'
      const bannerUrl = $($('table img')[0]).attr('src')
      scout.banner = bannerUrl?.replace('scale-to-width-down/410', 'scale-to-width-down/220') || ''
      // 新卡的数据
      $('table tbody tr:nth-child(6) a').each((i, elem) => {
        const img = $($(elem).children().first())
        const url = $(elem).attr('href')
        const urlMatch = url.match(/\((.+)\)_(.+)/)
        fetchCard(url, {
          id: urlMatch[1],
          star: 0,
          name: urlMatch[2],
          img: (img.attr('data-src') || img.attr('src'))?.replace(/scale-to-width-down\/(144|150)/, 'scale-to-width-down/200') || '',
          series: scout.series,
          type: scout.type
        })
      })
      done()
    }
  }
})

function fetchCard(url, card) {
  cards[card.name] = card
  c.queue({
    uri: BASE_URL + url,
    callback: (err, res, done) => {
      if (err) {
        console.log(err)
      } else {
        console.log('fetch ' + url)
        const $ = res.$
        // 新卡好像详情页都是新的，就按新的来吧
        card.name = $($('[data-item-name=title_name]')[0]).text().match(/[［【\[](.+?)[］】\]]/)?.[1] || card.name
        card.star = $($('[data-item-name=card-rarity]')[0]).text().length
        if (card.star === 5) {
          // 五星卡取 cg 作为卡池 cg
          const cg = $($('#Card_CGs').parent().next().find('img')[1])
          scout.cg = (cg.attr('data-src') || cg.attr('src'))?.replace('scale-to-width-down/260', 'scale-to-width-down/1000') || ''
        }
        done()
      }
    }
  })
}

c.on('drain', () => {
  console.log('finished!\n卡池数据:')
  console.log(JSON.stringify(scout, null, 2))
  console.log('卡片数据:')
  console.log(JSON.stringify(cards, null, 2))
  console.log('注意核对卡池类型和期数')
  // 写文件
  const scoutsDb = require('../../src/data/scout.json')
  const existScout = scoutsDb[scout.type].find(item => item.series === scout.series)
  if (existScout) {
    Object.assign(existScout, scout)
  } else {
    scoutsDb[scout.type].unshift(scout)
  }
  fs.writeFileSync('../../src/data/scout.json', JSON.stringify(scoutsDb, null, 2))
  const cardsDb = require('../../src/data/card.json')
  Object.keys(cards).forEach(chara => {
    const card = cards[chara]
    // todo
    const existCard = cardsDb[chara].find(item => item.type === card.type && item.series === card.series)
    if (existCard) {
      Object.assign(existCard, card)
    } else {
      cardsDb[chara].push(cards[chara])
    }
  })
  fs.writeFileSync('../../src/data/card.json', JSON.stringify(cardsDb, null, 2))
})
