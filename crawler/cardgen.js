const fs = require('fs')
const database = require("../src/data/card.json");

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

names.forEach(name => {
  // const name = 'Tomoya_Mashiro' // 角色名

  const data = require(`./cards/${name}/index.json`)

  // console.log(data)

  database[name] = data
    .filter(item => item.star >= 3)
    .map(item => ({
      id: `${name}_${item.i}`,
      star: item.star,
      name: item.name.match(/[［【\[](.+?)[］】\]]/)?.[1] || item.name,
      img: item.img,
      series: 0,
      limited: false
    }))

})


fs.writeFileSync('../src/data/card.json', JSON.stringify(database, null, 2))
