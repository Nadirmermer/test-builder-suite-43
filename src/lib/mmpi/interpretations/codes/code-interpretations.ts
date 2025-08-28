// MMPI Kod Yorumları - Kitap Bazlı
// Her kod için detaylı yorumlar

import { MMPICodeInterpretation } from './types';

// Kod yorumları veritabanı
const CODE_INTERPRETATIONS: Record<string, MMPICodeInterpretation> = {
  // 2'li Kodlar
  '12': {
    code: '12',
    diagnosis: ['Pasif-bağımlı Kişilik Bozukluğu', 'Somatizasyon Bozukluğu'],
    description: 'Bu kodun en belirgin özelliği bedensel rahatsızlık ve ağrıdır. Bu kod tipini alan bireyler bedensel işlevleri ile çok fazla ilgilidirler. Genel olarak hipokondriyak yakınmaları, somatizasyon bozukluğu ya da psikofizyolojik reaksiyon şeklinde kendini gösterir, stres dönemlerinde daha da belirginleşir.',
    characteristics: [
      'Bedensel işlevleriyle aşırı ilgili',
      'Hipokondriyak yakınmalar',
      'Somatizasyon bozukluğu',
      'Psikofizyolojik reaksiyonlar',
      'Stres dönemlerinde semptomlar belirginleşir',
      'Yakınmaları belirsiz ve medikal ayrışması zor'
    ],
    warnings: [
      'Semptomlarının duygusal çatışmalarla ilgili olduğunu anlamak istemezler',
      'Psikolojik sorunlarından kaçmaya çalışırlar',
      'Geleneksel psikoterapiye yeterince cevap veremezler',
      'Bedensel semptomlarının psikolojik kökenini reddederler'
    ],
    ageFactors: [
      'Lise öğrencileri: utangaç, gergin, içedönük, mutsuz, endişeli',
      'Karşı cins ile ilişkilerinde oldukça çekingen',
      'Üniversite öncesi ergenler: obsesyonlar ya da sosyal izolasyon',
      'Bağımlılık ve karamsarlık belirgin, arkadaşlık az'
    ],
    therapeuticImplications: [
      'Tedavi etmek zordur',
      'Kısa süreli tedaviye cevap verebilir ancak semptomlar geri dönebilir',
      'İç görüleri oldukça sınırlı',
      'Duygularını ifade etmeleri güç',
      'Öfkeyi somatizasyonla gösterirler'
    ]
  },

  '21': {
    code: '21',
    diagnosis: ['Pasif-bağımlı Kişilik Bozukluğu', 'Somatizasyon Bozukluğu'],
    description: '1 ve 2 alt testleri arasında 5 T puanı kadar fark varsa bu koda bakılır. Bu kişiler fiziksel semptom ve yakınmalarını özellikle gösterir ve bedensel işlevlerine aşırı ilgi gösterirler.',
    characteristics: [
      'Fiziksel semptomları abartma eğilimi',
      'Çok sayıda somatik yakınma',
      'Baş ağrısı, mide bulantısı, sırt ağrısı',
      'Kardiyak yakınmalar',
      'Anoreksiya, bulantı, kusma, ülser',
      'Sinirlilik, huzursuzluk, depresyon',
      'Yorgunluk, zayıflık, baş dönmesi'
    ],
    warnings: [
      'Genel olarak belirgin organik patoloji yok',
      'Var olan fiziksel sorunları abartma eğilimi',
      'Yakınmalarını yaşam biçimi haline getirmiş',
      'Davranış sorumluluğu alma zorluğu'
    ]
  },

  // 3'lü Kodlar
  '123': {
    code: '123',
    diagnosis: ['Belirgin somatizasyon bozukluğu', 'Hipokondriyak uğraşlar'],
    description: 'Bu kişiler özellikle yorgunluk, güçsüzlük ve karın bölgesindeki organlarla ilgili bedensel yakınmalar gösterirler. Öykülerinde uzun süreli kronik hipokondriazis öyküsü vardır.',
    characteristics: [
      'Yorgunluk ve güçsüzlük',
      'Karın bölgesi yakınmaları',
      'Uzun süreli kronik hipokondriazis',
      'İlgisiz, depresif, atılgan olmayan',
      'Risk alma konusunda tereddütlü'
    ],
    warnings: [
      'Konfüzyon ve psikotik düşünce yok',
      'İntihar düşünceleri yok',
      'Obsesyon ve kompulsiyon yok',
      'Alt test 4 düşükse heteroseksüel ilişki azlığı',
      'Düşük 9 ile enerji azalması, sürekli yatma isteği'
    ]
  },

  '213': {
    code: '213',
    diagnosis: ['Belirgin somatizasyon bozukluğu', 'Hipokondriyak uğraşlar'],
    description: '3 alt testi, 1\'den 5T puanı yüksekse bu koda bakılır. 123 kodu özelliklerinin benzeri.',
    characteristics: [
      'Yorgunluk ve güçsüzlük',
      'Karın bölgesi yakınmaları', 
      'Pasif bağımlılık',
      'Depresif özellikler'
    ]
  },

  // 4'lü Kodlar
  '1234': {
    code: '1234',
    diagnosis: ['Pasif-agresif kişilik', 'Anksiyete', 'Psikofizyolojik reaksiyon'],
    description: 'Zayıf, korkak, stres ve sorumluluklar ile başa çıkmada yetersiz kişilerdir. Bağımlılık, bağımsızlık çatışması yaşarlar.',
    characteristics: [
      'Zayıf ve korkak',
      'Stres ve sorumlulukla başa çıkamama',
      'Bağımlılık-bağımsızlık çatışması',
      'Atılgan davranışlarla zayıflık kapatma',
      'Alkole sığınma, içtiklerinde kavga'
    ],
    genderFactors: [
      'Erkekler: kadınlara karşı düşmanlık, fiziksel şiddet',
      'Güçlü bağımlılık gereksinimleri engellenmiş',
      'Anneye bağımlılık özlemi, reddedilme korkusu',
      'Kadınlar: karakter bozukluğu, güven duymama',
      'Duygularını ifade etme güçlüğü'
    ],
    therapeuticImplications: [
      'Psikoterapide savunucu',
      'Motivasyon düşük'
    ]
  },

  '2134': {
    code: '2134', 
    diagnosis: ['Pasif-agresif kişilik', 'Anksiyete', 'Psikofizyolojik reaksiyon'],
    description: 'Alt test 1 ve 2 diğerlerinden 5 T puanı yüksekse bu koda bakılır. 1234 kodu özelliklerinin benzeri.',
    characteristics: [
      'Pasif-agresif özellikler',
      'Anksiyete belirgin',
      'Sorumluluk almada zorluk'
    ]
  },

  '1236': {
    code: '1236',
    diagnosis: ['Konversiv bozukluk', 'Uzun süreli gerginlik'],
    description: 'Uzun süreli gerginlik, yetersizlik ve stres altında semptom geliştirme eğilimini gösterir. Semptomlar konversif niteliktedir.',
    characteristics: [
      'Uzun süreli gerginlik',
      'Yetersizlik duyguları',
      'Stres altında semptom geliştirme',
      'Konversif semptomlar',
      'Bastırma ve yansıtma kullanımı',
      'Olumsuz duyguları psikosomatik gösterim'
    ]
  },

  '1237': {
    code: '1237',
    diagnosis: ['Psikofizyolojik hastalık', 'Anksiyete bozukluğu'],
    description: '123 kod tipinin özelliklerine ek olarak bu grupta anksiyete, gerilim, korku, atılgan olamama, yetersizlik duyguları ve kişilerarası ilişkilerde bağımlılıkta artma vardır.',
    characteristics: [
      'Anksiyete, gerilim, korku',
      'Atılgan olamama',
      'Yetersizlik duyguları',
      'Kişilerarası bağımlılık artışı',
      'Sırt ve göğüs ağrıları',
      'Epigastrik yakınmalar'
    ],
    warnings: [
      'K 50 T puanından düşükse günlük stresle başa çıkamaz',
      'Erkekler kendilerinden güçlü kadınlarla evlenir',
      'Kronik işsizlik riski',
      'Alkol bağımlılığı riski'
    ]
  },

  '1270': {
    code: '1270',
    diagnosis: ['Depresif bozukluk', 'Sosyal geri çekilme'],
    description: 'Sinirlilik, anksiyete, depresyon, zayıflık, yorgunluk, ilgi kaybı gibi semptomlar gösterirler.',
    characteristics: [
      'Sinirlilik ve anksiyete',
      'Depresyon',
      'Zayıflık ve yorgunluk', 
      'İlgi kaybı',
      'Kendilik değerinde düşme',
      'Sosyal geri çekilme',
      'İçe dönük tutum',
      'Uykusuzluk',
      'Kardiyak semptomlar',
      'Anoreksiya'
    ]
  },

  // 5'li Kodlar
  '12378': {
    code: '12378',
    diagnosis: ['Şiddetli nevrotik bozukluk'],
    description: 'Nevrotik bozuklukların daha şiddetli şeklidir. 7 ve 8\'deki yükselmeler, nevrotik bozukluğun daha abartılı olduğunun göstergesidir.',
    characteristics: [
      'Şiddetli nevrotik bozukluk',
      'Abartılı nevrotik özellikler',
      'Kompleks semptom yapısı'
    ]
  },

  // Özel Kodlar
  '128': {
    code: '128',
    diagnosis: ['Prepsikotik durum', 'Psikotik bozukluk'],
    description: 'Sıklıkla bedenin üst kısmına ilişkin bizar yakınmalar getiren kişilerde görülür ve genel olarak yorgunluk, zayıflık, gerilim ve düşüncelerde bozulmalar eşlik eder.',
    characteristics: [
      'Bedenin üst kısmında bizar yakınmalar',
      'Yorgunluk ve zayıflık',
      'Gerilim',
      'Düşüncelerde bozulma',
      'Ruhsal bozukluk',
      'Diğerlerinden yabancılaşma'
    ],
    warnings: [
      'Akut prepsikotik durum',
      'Psikotik özellikler',
      'Somatik delüzyonlar'
    ]
  },

  '218': {
    code: '218',
    diagnosis: ['Prepsikotik durum', 'Psikotik bozukluk'],
    description: '128 kodunun benzeri özellikler gösterir.',
    characteristics: [
      'Bizar bedensel yakınmalar',
      'Ruhsal bozukluk belirtileri',
      'Yabancılaşma'
    ]
  },

  '129': {
    code: '129',
    diagnosis: ['Akut klinik rahatsızlık', 'Organik beyin sendromu riski'],
    description: 'Bu kişiler beden işlevleri ile aşırı ilgilenir ve hastalıklarının gerçekten acil olduğunu düşünürler.',
    characteristics: [
      'Beden işlevleriyle aşırı ilgi',
      'Hastalıkları acil görme',
      'Akut klinik rahatsızlık',
      'Gerginlik ve ajitasyon',
      'Huzursuzluk',
      'Baş ağrısı, uykusuzluk',
      'Spastik bağırsak ağrıları'
    ],
    warnings: [
      'Nörolojik etyoloji dikkate alınmalı',
      'Organik beyin sendromu benzeri yakınmalar',
      'Depresyon, çatışma maskeleme',
      'Hipoaktif pasif-bağımlı tavır inkârı'
    ]
  },

  '219': {
    code: '219',
    diagnosis: ['Akut klinik rahatsızlık', 'Organik beyin sendromu riski'],
    description: '129 kodunun benzeri özellikler.',
    characteristics: [
      'Aşırı bedensel ilgi',
      'Akut rahatsızlık hissi',
      'Ajitasyon ve gerginlik'
    ]
  },

  '120': {
    code: '120',
    diagnosis: ['Depresif bozukluk', 'Sosyal kaçınma'],
    description: 'Depresyon, içe çekilme, kararsızlık, kişilerarası ilişkilerden kaçınma, yetersizlik ve suçluluk duygularına değişik somatik yakınmalar eşlik eder.',
    characteristics: [
      'Depresyon ve içe çekilme',
      'Kararsızlık',
      'Kişilerarası ilişkilerden kaçınma',
      'Yetersizlik duyguları',
      'Suçluluk duyguları',
      'Somatik yakınmalar'
    ],
    warnings: [
      '8 ve 6 birlikte yüksekse şizoid biçim',
      'Uzak duruş, pasif',
      'İnsanlardan kaçan davranış'
    ]
  },

  '210': {
    code: '210',
    diagnosis: ['Depresif bozukluk', 'Sosyal kaçınma'], 
    description: '120 kodunun benzeri özellikler.',
    characteristics: [
      'Depresif özellikler',
      'Sosyal geri çekilme',
      'Somatik yakınmalar'
    ]
  }
};

/**
 * Verilen kod için yorumlama getirir
 */
export function getCodeInterpretation(code: string): MMPICodeInterpretation | null {
  return CODE_INTERPRETATIONS[code] || null;
}

/**
 * Tüm mevcut kodları getirir
 */
export function getAllAvailableCodes(): string[] {
  return Object.keys(CODE_INTERPRETATIONS);
}

/**
 * Kod arama fonksiyonu
 */
export function searchCodes(query: string): MMPICodeInterpretation[] {
  const results: MMPICodeInterpretation[] = [];
  
  Object.values(CODE_INTERPRETATIONS).forEach(interpretation => {
    if (
      interpretation.code.includes(query) ||
      interpretation.description.toLowerCase().includes(query.toLowerCase()) ||
      interpretation.diagnosis.some(d => d.toLowerCase().includes(query.toLowerCase()))
    ) {
      results.push(interpretation);
    }
  });
  
  return results;
}