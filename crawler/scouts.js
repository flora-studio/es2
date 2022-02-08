const Crawler = require('crawler')
const fs = require('fs')

const BASE_URL = 'https://ensemble-stars.fandom.com'

const database = require('./scout.json')

const c = new Crawler({
  rateLimit: 1000,
})

// 获取所有卡池数据
// c.queue({
//   // html: '\n<tbody><tr>\n<td colspan="2" style="background:#9dd5fa; color:#444; padding:3px 10px;"><span class="mw-collapsible-toggle mw-collapsible-toggle-default mw-collapsible-toggle-expanded" role="button" tabindex="0"><a class="mw-collapsible-text">Collapse</a></span><span style="letter-spacing:2px;"><b>2022</b></span>\n</td></tr>\n<tr style="">\n<td><a href="/wiki/Category:Dance_of_the_White_Tiger" title="Category:Dance of the White Tiger"><img alt="Dance of the White Tiger Banner.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/5/56/Dance_of_the_White_Tiger_Banner.png/revision/latest/scale-to-width-down/220?cb=20220114201541" decoding="async" width="220" height="100" data-image-name="Dance of the White Tiger Banner.png" data-image-key="Dance_of_the_White_Tiger_Banner.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/5/56/Dance_of_the_White_Tiger_Banner.png/revision/latest/scale-to-width-down/220?cb=20220114201541" class=" lazyloaded"></a><br>\n<p>✫ <a href="/wiki/Category:Dance_of_the_White_Tiger" title="Category:Dance of the White Tiger">Dance of the White Tiger</a> ✫<br>01/14/2021 - 01/30/2022\n</p>\n</td>\n<td><a href="/wiki/(Tranquility_and_White_Tiger)_Rinne_Amagi" title="(Tranquility and White Tiger) Rinne Amagi"><img alt="(Tranquility and White Tiger) Rinne Amagi M.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/3/36/%28Tranquility_and_White_Tiger%29_Rinne_Amagi_M.png/revision/latest/scale-to-width-down/90?cb=20220114225300" decoding="async" width="90" height="113" data-image-name="(Tranquility and White Tiger) Rinne Amagi M.png" data-image-key="%28Tranquility_and_White_Tiger%29_Rinne_Amagi_M.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/3/36/%28Tranquility_and_White_Tiger%29_Rinne_Amagi_M.png/revision/latest/scale-to-width-down/90?cb=20220114225300" class=" lazyloaded"></a> <a href="/wiki/(Hope_and_White_Tiger)_Subaru_Akehoshi" title="(Hope and White Tiger) Subaru Akehoshi"><img alt="(Hope and White Tiger) Subaru Akehoshi M.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/4/43/%28Hope_and_White_Tiger%29_Subaru_Akehoshi_M.png/revision/latest/scale-to-width-down/90?cb=20220114225249" decoding="async" width="90" height="113" data-image-name="(Hope and White Tiger) Subaru Akehoshi M.png" data-image-key="%28Hope_and_White_Tiger%29_Subaru_Akehoshi_M.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/4/43/%28Hope_and_White_Tiger%29_Subaru_Akehoshi_M.png/revision/latest/scale-to-width-down/90?cb=20220114225249" class=" lazyloaded"></a> <a href="/wiki/(Clever_White_Tiger)_Koga_Oogami" title="(Clever White Tiger) Koga Oogami"><img alt="(Clever White Tiger) Koga Oogami M.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/c/c0/%28Clever_White_Tiger%29_Koga_Oogami_M.png/revision/latest/scale-to-width-down/90?cb=20220114225244" decoding="async" width="90" height="113" data-image-name="(Clever White Tiger) Koga Oogami M.png" data-image-key="%28Clever_White_Tiger%29_Koga_Oogami_M.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/c/c0/%28Clever_White_Tiger%29_Koga_Oogami_M.png/revision/latest/scale-to-width-down/90?cb=20220114225244" class=" lazyloaded"></a> <a href="/wiki/(Meticulous_White_Tiger)_Tsukasa_Suou" title="(Meticulous White Tiger) Tsukasa Suou"><img alt="(Meticulous White Tiger) Tsukasa Suou M.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/6/6d/%28Meticulous_White_Tiger%29_Tsukasa_Suou_M.png/revision/latest/scale-to-width-down/90?cb=20220114225254" decoding="async" width="90" height="113" data-image-name="(Meticulous White Tiger) Tsukasa Suou M.png" data-image-key="%28Meticulous_White_Tiger%29_Tsukasa_Suou_M.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/6/6d/%28Meticulous_White_Tiger%29_Tsukasa_Suou_M.png/revision/latest/scale-to-width-down/90?cb=20220114225254" class=" lazyloaded"></a>\n</td></tr>\n<tr style="">\n<td><a href="/wiki/Category:Tiger_of_the_Fifth_Earth_Star" title="Category:Tiger of the Fifth Earth Star"><img alt="Tiger of the Fifth Earth Star Banner.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/6/6c/Tiger_of_the_Fifth_Earth_Star_Banner.png/revision/latest/scale-to-width-down/220?cb=20211230191742" decoding="async" width="220" height="100" data-image-name="Tiger of the Fifth Earth Star Banner.png" data-image-key="Tiger_of_the_Fifth_Earth_Star_Banner.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/6/6c/Tiger_of_the_Fifth_Earth_Star_Banner.png/revision/latest/scale-to-width-down/220?cb=20211230191742" class=" lazyloaded"></a><br>\n<p>✫ <a href="/wiki/Category:Tiger_of_the_Fifth_Earth_Star" title="Category:Tiger of the Fifth Earth Star">Tiger of the Fifth Earth Star</a> ✫<br>12/30/2021 - 01/14/2022\n</p>\n</td>\n<td><a href="/wiki/(Free_Tiger)_Leo_Tsukinaga" title="(Free Tiger) Leo Tsukinaga"><img alt="(Free Tiger) Leo Tsukinaga M.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/7/72/%28Free_Tiger%29_Leo_Tsukinaga_M.png/revision/latest/scale-to-width-down/100?cb=20211231012140" decoding="async" width="100" height="125" data-image-name="(Free Tiger) Leo Tsukinaga M.png" data-image-key="%28Free_Tiger%29_Leo_Tsukinaga_M.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/7/72/%28Free_Tiger%29_Leo_Tsukinaga_M.png/revision/latest/scale-to-width-down/100?cb=20211231012140" class=" lazyloaded"></a> <a href="/wiki/(Foreknowing_Tiger)_Natsume_Sakasaki" title="(Foreknowing Tiger) Natsume Sakasaki"><img alt="(Foreknowing Tiger) Natsume Sakasaki M.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/b/b7/%28Foreknowing_Tiger%29_Natsume_Sakasaki_M.png/revision/latest/scale-to-width-down/100?cb=20211231012427" decoding="async" width="100" height="125" data-image-name="(Foreknowing Tiger) Natsume Sakasaki M.png" data-image-key="%28Foreknowing_Tiger%29_Natsume_Sakasaki_M.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/b/b7/%28Foreknowing_Tiger%29_Natsume_Sakasaki_M.png/revision/latest/scale-to-width-down/100?cb=20211231012427" class=" lazyloaded"></a> <a href="/wiki/(Alluding_Tiger)_Tetora_Nagumo" title="(Alluding Tiger) Tetora Nagumo"><img alt="(Alluding Tiger) Tetora Nagumo M.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/f/f7/%28Alluding_Tiger%29_Tetora_Nagumo_M.png/revision/latest/scale-to-width-down/100?cb=20211231013249" decoding="async" width="100" height="125" data-image-name="(Alluding Tiger) Tetora Nagumo M.png" data-image-key="%28Alluding_Tiger%29_Tetora_Nagumo_M.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/f/f7/%28Alluding_Tiger%29_Tetora_Nagumo_M.png/revision/latest/scale-to-width-down/100?cb=20211231013249" class=" lazyloaded"></a> <a href="/wiki/(Hesitant_Tiger)_Adonis_Otogari" title="(Hesitant Tiger) Adonis Otogari"><img alt="(Hesitant Tiger) Adonis Otogari M.png" src="https://static.wikia.nocookie.net/ensemble-stars/images/1/15/%28Hesitant_Tiger%29_Adonis_Otogari_M.png/revision/latest/scale-to-width-down/100?cb=20211231014834" decoding="async" width="100" height="125" data-image-name="(Hesitant Tiger) Adonis Otogari M.png" data-image-key="%28Hesitant_Tiger%29_Adonis_Otogari_M.png" data-src="https://static.wikia.nocookie.net/ensemble-stars/images/1/15/%28Hesitant_Tiger%29_Adonis_Otogari_M.png/revision/latest/scale-to-width-down/100?cb=20211231014834" class=" lazyloaded"></a>\n</td></tr></tbody>',
//   callback: (err, res, done) => {
//     const $ = res.$
//     $('tr').each((i, item) => {
//       if (i === 0) return
//       const scout = { type: 'anniversary' }
//       $(item).children('td').each((j, td) => {
//         if (j === 0) {
//           scout.url = $(td).children('a').first().attr('href')
//           scout.banner = $(td).find('a img').first().attr('data-src')
//           scout.name = $(td).find('p a').first().text()
//           const date0 = $(td).children('p').first().html().split('<br>')
//           const date1 = date0[date0.length - 1].split('-')
//           scout.start = date1[0].trim()
//           scout.end = date1[1].trim()
//         } else {
//           scout.upCardUrls = $(td).children('a').map((_, card) => $(card).attr('href')).get()
//         }
//       })
//       database.anniversary.push(scout)
//     })
//     done()
//   }
// })

// 获取卡池 cg 数据
database.feature.forEach((scout, i) => {
  const match = scout.upCardUrls[0].match(/\/wiki\/\((.+)\)_(.+)/)
  const card = match[1]
  const chara = match[2]
  console.log(card, chara)
  c.queue({
    uri: `${BASE_URL}/wiki/${chara}/Gallery`,
    callback: (error, res, done) => {
      if (error) {
        console.log(error)
      } else {
        const $ = res.$
        const allCg = $('.wds-tab__content.wds-is-current table img')
        // 过滤花前的
        scout.cg = allCg.filter(i => i % 2 === 0).map((_, img) => {
          return $(img).attr('data-src') || $(img).attr('src')
        }).get().find(url => url.indexOf(card) > 0)
        console.log(scout.cg) // todo 处理的时候把大小改一下
        done()
      }
    }
  })
})

c.on('drain', () => {
  fs.writeFileSync(`./scout.json`, JSON.stringify(database, null, 2))
})
