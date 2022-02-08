const Crawler = require('crawler')
const fs = require('fs')

const BASE_URL = 'https://ensemble-stars.fandom.com'

// 手动跑 jq 出来的
const names = [
  'Eichi_Tenshouin',
  'Wataru_Hibiki',
  'Tori_Himemiya',
  'Yuzuru_Fushimi',
  'Hokuto_Hidaka',
  'Subaru_Akehoshi',
  'Makoto_Yuuki',
  'Mao_Isara',
  'Chiaki_Morisawa',
  'Kanata_Shinkai',
  'Tetora_Nagumo',
  'Midori_Takamine',
  'Shinobu_Sengoku',
  'Hiiro_Amagi',
  'Aira_Shiratori',
  'Mayoi_Ayase',
  'Tatsumi_Kazehaya',
  'Nagisa_Ran',
  'Hiyori_Tomoe',
  'Ibara_Saegusa',
  'Jun_Sazanami',
  'Shu_Itsuki',
  'Mika_Kagehira',
  'Hinata_Aoi',
  'Yuta_Aoi',
  'Rinne_Amagi',
  'HiMERU',
  'Kohaku_Oukawa',
  'Niki_Shiina',
  'Rei_Sakuma',
  'Kaoru_Hakaze',
  'Koga_Oogami',
  'Adonis_Otogari',
  'Tomoya_Mashiro',
  'Nazuna_Nito',
  'Mitsuru_Tenma',
  'Hajime_Shino',
  'Keito_Hasumi',
  'Kuro_Kiryu',
  'Souma_Kanzaki',
  'Tsukasa_Suou',
  'Leo_Tsukinaga',
  'Izumi_Sena',
  'Ritsu_Sakuma',
  'Arashi_Narukami',
  'Natsume_Sakasaki',
  'Tsumugi_Aoba',
  'Sora_Harukawa',
  'Madara_Mikejima',
  'Kohaku_Oukawa',

  // 'Jin_Sagami',
  // 'Akiomi_Kunugi',
  // 'Seiya_Hidaka',
  // 'Anzu',
  // 'Gatekeeper'
]

const c = new Crawler({
  rateLimit: 1000,
})

const ret = names.map(name => ({ key: name }))

ret.forEach(ret => {
  c.queue({
    uri: `${BASE_URL}/wiki/${ret.key}`,
    callback: (error, res, done) => {
      if (error) {
        console.log(error)
      } else {
        const $ = res.$
        ret.name = $($('.infobox-char-name')[0]).text().replace(/\w+/g, '').trim()
        console.log(`[Chara]${ret.key} ${ret.name}`)
        done()
      }
    }
  })
})

c.on('drain', () => {
  console.log(ret)
  fs.writeFileSync(`./chara.json`, JSON.stringify(ret, null, 2))
})

