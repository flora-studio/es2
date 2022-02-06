const Crawler = require('crawler')
const fs = require('fs')

const BASE_URL = 'https://ensemble-stars.fandom.com'

const names = [
  // 'Eichi_Tenshouin',
  // 'Wataru_Hibiki',
  // 'Tori_Himemiya',
  // 'Yuzuru_Fushimi',
  // 'Hokuto_Hidaka',
  // 'Subaru_Akehoshi',
  // 'Makoto_Yuuki',
  // 'Mao_Isara',
  // 'Chiaki_Morisawa',
  // 'Kanata_Shinkai',
  // 'Tetora_Nagumo',
  // 'Midori_Takamine',
  // 'Shinobu_Sengoku',
  // 'Hiiro_Amagi',
  // 'Aira_Shiratori',
  // 'Mayoi_Ayase',
  // 'Tatsumi_Kazehaya',
  // 'Nagisa_Ran',
  // 'Hiyori_Tomoe',
  // 'Ibara_Saegusa',
  // 'Jun_Sazanami',
  // 'Shu_Itsuki',
  // 'Mika_Kagehira',
  // 'Hinata_Aoi',
  // 'Yuta_Aoi',
  // 'Rinne_Amagi',
  // 'HiMERU',
  // 'Kohaku_Oukawa',
  // 'Niki_Shiina',
  // 'Rei_Sakuma',
  // 'Kaoru_Hakaze',
  // 'Koga_Oogami',
  // 'Adonis_Otogari',
  // 'Tomoya_Mashiro',
  // 'Nazuna_Nito',
  // 'Mitsuru_Tenma',
  // 'Hajime_Shino',
  // 'Keito_Hasumi',
  // 'Kuro_Kiryu',
  // 'Souma_Kanzaki',
  // 'Tsukasa_Suou',
  // 'Leo_Tsukinaga',
  // 'Izumi_Sena',
  // 'Ritsu_Sakuma',
  // 'Arashi_Narukami',
  // 'Natsume_Sakasaki',
  // 'Tsumugi_Aoba',
  // 'Sora_Harukawa',
  // 'Madara_Mikejima',
  // 'Kohaku_Oukawa',
]

const name = names[0] // 角色名
const database = {} // 角色名 => 卡的数组

const c = new Crawler({
  rateLimit: 1000,
})

// Queue just one URL, with default callback
c.queue({
  uri: `${BASE_URL}/wiki/${name}/Cards`,
  callback: (error, res, done) => {
    if (error) {
      console.log(error)
    } else {
      console.log(`[Chara]${name}`)
      const $ = res.$
      const allcards = $('.cardlist a').map((i, item) => {
        const imgElem = $(item).children().first()
        return {
          i: i,
          title: $(item).attr('title'),
          url: $(item).attr('href'),
          img: imgElem.attr('data-src') || imgElem.attr('src') // lazyload 的要读 data-src
        }
      })
      const arr = allcards.filter(i => i % 2 === 0).get() // 过滤掉 bloom 的图片，只保留初始状态的

      database[name] = arr // 存储
      // 获取详细信息：星级、卡片名
      arr.forEach((item, i) => {
        c.queue({
          uri: `${BASE_URL}${item.url}`,
          callback: (error, res, done) => {
            if (error) {
              console.log(error)
            } else {
              console.log(`  [Card]${item.title}`)
              const $ = res.$
              // 网页布局分为两种，因此分别处理
              // 精确的名字后面再清洗，这里先都提取出来
              item.name = $($('[data-source=Name]')[0]).text()
              if (!item.name) {
                item.name = $($('[data-item-name=title_name]')[0]).text()
              }
              item.star = $('img[alt=Star\\.png]').length / 2  // 网页上会出现两次
              if (!item.star) {
                item.star = $($('[data-item-name=card-rarity]')[0]).text().length
              }
              done()
            }
          }
        })
      })
    }
    done();
  }
})

c.on('drain', () => {
  // console.log(database)
  if (!fs.existsSync(`./cards/${name}/`)) {
    fs.mkdirSync(`./cards/${name}/`)
  }
  fs.writeFileSync(`./cards/${name}/index.json`, JSON.stringify(database[name], null, 2))
})
