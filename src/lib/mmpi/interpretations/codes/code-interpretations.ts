// MMPI Kod Yorumları - docs/mmpi-1.md'den alınan yorumlar

import { MMPICodeResult } from './types';

export const codeInterpretations: Record<string, MMPICodeResult> = {
  // İKİLİ KODLAR
  '12': {
    code: '12',
    title: 'HİPOKONDRİAZİS-DEPRESYON KODU',
    diagnosis: 'Pasif-bağımlı Kişilik Bozukluğu - Somatizasyon Bozukluğu',
    description: 'Bu kodun en belirgin özelliği bedensel rahatsızlık ve ağrıdır. Bu kod tipini alan bireyler bedensel işlevleri ile çok fazla ilgilidirler. Genel olarak hipokondriyak yakınmaları, somatizasyon bozukluğu ya da psikofizyolojik reaksiyon şeklinde kendini gösterir, stres dönemlerinde daha da belirginleşir.',
    characteristics: [
      'Bedensel işlevleri ile aşırı ilgilidirler',
      'Hipokondriyak yakınmaları vardır',
      'Somatizasyon bozukluğu gösterebilirler',
      'Stres dönemlerinde semptomları belirginleşir',
      'Semptomlarının duygusal çatışmalarla ilgili olduğunu anlamak istemezler',
      'Psikolojik sorunlarından kaçmaya çalışırlar',
      'Yakınmaları belirsizdir ve medikal olarak ayrışması zordur'
    ],
    additionalNotes: [
      'Bu örüntüyü veren hastalar, yakınmalarını kullanma ve yaşam biçimi haline getirmeyi öğrendikleri için bunları tedavi etmek zordur',
      'Kısa süreli tedaviye cevap verebilirler, ancak semptomları geri dönebilir',
      'Bedensel semptomlarının psikolojik sorunlardan kaynaklandığını reddederler',
      'İç görüleri oldukça sınırlıdır',
      'Duygularını ifade etmeleri güçtür'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '21': {
    code: '21',
    title: 'DEPRESYON-HİPOKONDRİAZİS KODU',
    diagnosis: 'Pasif-bağımlı Kişilik Bozukluğu - Somatizasyon Bozukluğu',
    description: '1 ve 2 alt testleri arasında 5 T puanı kadar fark varsa 21\'e bakılır. Bu kişiler fiziksel semptom ve yakınmalarını özellikle gösterir ve bedensel işlevlerine aşırı ilgi gösterirler.',
    characteristics: [
      'Fiziksel semptom ve yakınmalarını özellikle gösterirler',
      'Bedensel işlevlerine aşırı ilgi gösterirler',
      'Belirgin organik patoloji yoktur, ancak var olan fiziksel sorunlarını abartırlar',
      'Çok sayıda somatik yakınma sunarlar',
      'Baş ağrısı, mide bulantısı ve sırt ağrısı gibi ağrılar',
      'Kardiyak yakınmalar',
      'Anoreksiya, bulantı, kusma ya da ülser gibi zorluklar',
      'Sinirlilik, huzursuzluk ve depresyonun eşlik ettiği yorgunluk, zayıflık ve baş dönmesi'
    ],
    additionalNotes: [
      'Geleneksel psikoterapiye yeterince cevap veremezler',
      'Davranışlarının sorumluluğunu alma zorluğu çektikleri için',
      'Özellikle öfke gibi olumsuz duyguların gösterileceği durumlarda kendilerini huzursuz hisseder',
      'Öfkeyi somatizasyonla gösterirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '123': {
    code: '123',
    title: 'HİPOKONDRİAZİS-DEPRESYON-HİSTERİ KODU',
    diagnosis: 'Belirgin somatizasyon bozukluğu ve hipokondriyak uğraşlar',
    description: 'Bu kişiler özellikle yorgunluk, güçsüzlük ve karın bölgesindeki organlarla ilgili bedensel yakınmalar gösterirler. Öykülerinde uzun süreli kronik hipokondriazis öyküsü vardır.',
    characteristics: [
      'Yorgunluk, güçsüzlık ve karın bölgesindeki organlarla ilgili bedensel yakınmalar',
      'Uzun süreli kronik hipokondriazis öyküsü',
      'Pasif bir bağımlılığın kanıtı olsa bile konfüzyon ve psikotik düşünce yok',
      'İntihar düşünceleri, obsesyonlar ve kompulsiyonlar yoktur',
      'Genel olarak ilgisiz, depresif, atılgan olmayan',
      'Risk alma konusunda tereddütlüdürler'
    ],
    additionalNotes: [
      'Alt test 4 düşük olduğu zaman bu örüntü heteroseksüel ilişki azlığı ve seksüel zorlukların olduğu bir pasifliği gösterir',
      'Düşük 9 ile birlikte olursa kişide enerji düzeyinde azalma, iş yapmama ve sürekli yatma isteği vardır',
      'Mf alt testinin düşmesi kadınlarda aşırı derecede sorumluluk almayı, uzun süreli sıkıntı çektiklerini gösterir',
      'L alt testi de yükselmişse bu kadınlarda evlilik sorunları, yorgunluk yakınmaları ve diğerleri tarafından anlaşılamama vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '213': {
    code: '213',
    title: 'DEPRESYON-HİPOKONDRİAZİS-HİSTERİ KODU',
    diagnosis: 'Belirgin somatizasyon bozukluğu ve hipokondriyak uğraşlar',
    description: '3 alt testi, 1\'den 5T puanı yüksekse 213/231 kodlarına bakınız. Ayrıca 1234 ve 1237\'ye de bakınız.',
    characteristics: [
      '123 koduna benzer özellikler gösterir',
      'Depresyon önplanda olduğu için daha fazla duygusal içerik',
      'Somatik yakınmalar devam eder'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '1234': {
    code: '1234',
    title: 'HİPOKONDRİAZİS-DEPRESYON-HİSTERİ-PSİKOPATİK SAPMA KODU',
    diagnosis: 'Pasif-agresif kişilik - Anksiyete ya da psikofizyolojik reaksiyon',
    description: 'Zayıf, korkak, stres ve sorumluluklar ile başa çıkmada yetersiz kişilerdir. Bağımlılık, bağımsızlık çatışması yaşarlar. Atılgan davranışlarla zayıflıklarını kapatma çabasına girerler.',
    characteristics: [
      'Zayıf, korkak, stres ve sorumluluklar ile başa çıkmada yetersiz',
      'Bağımlılık, bağımsızlık çatışması yaşarlar',
      'Atılgan davranışlarla zayıflıklarını kapatma çabası',
      'Rahatlama için alkole sığınırlar, ancak içtikleri zaman kavga ederler',
      'Erkeklerde kadınlara karşı düşmanlık duyguları (sıklıkla fiziksel şiddet)',
      'Güçlü bağımlılık gereksinimleri engellenmiştir'
    ],
    additionalNotes: [
      'Erkeklerde anneye bağımlılık özlemleri, anneleri tarafından reddedilme korkusu ile çatışma',
      'Kadınlarda karakter bozukluğu, pasif-agresif kişilik, kimseye güven duymama',
      'Duygularını ifade etme güçlüğü ya da nasıl ifade edebileceğini bilememe',
      'Psikoterapide savunucudurlar, motivasyonları düşüktür'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '2134': {
    code: '2134',
    title: 'DEPRESYON-HİPOKONDRİAZİS-HİSTERİ-PSİKOPATİK SAPMA KODU',
    diagnosis: 'Pasif-agresif kişilik - Anksiyete ya da psikofizyolojik reaksiyon',
    description: 'Eğer alt test 1 ve 2 diğerlerinden 5 T puanı yüksekse 2134\'e bakınız. 1234 koduna benzer özellikler gösterir ancak depresyon daha baskındır.',
    characteristics: [
      '1234 koduna benzer özellikler',
      'Depresyon daha baskın',
      'Pasif-agresif özellikler devam eder'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '1236': {
    code: '1236',
    title: 'HİPOKONDRİAZİS-DEPRESYON-HİSTERİ-PARANOYA KODU',
    description: 'Uzun süreli gerginlik, yetersizlik ve stres altında semptom geliştirme eğilimini gösterir. Semptomlar konversif niteliktedir.',
    characteristics: [
      'Uzun süreli gerginlik ve yetersizlik',
      'Stres altında semptom geliştirme eğilimi',
      'Semptomlar konversif niteliktedir',
      'Bastırma ve yansımayı kullanırlar',
      'Olumsuz duygularını psikosomatik semptomlarla gösterirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '1237': {
    code: '1237',
    title: 'HİPOKONDRİAZİS-DEPRESYON-HİSTERİ-PSİKASTENİ KODU',
    description: '123\'teki kod tipinin özelliklerine ek olarak bu grupta yer alanlarda anksiyete, gerilim, korku, atılgan olamama, yetersizlik duyguları ve kişilerarası ilişkilerde bağımlılıkta artma vardır.',
    characteristics: [
      '123 kodunun tüm özellikleri',
      'Anksiyete, gerilim, korku',
      'Atılgan olamama, yetersizlik duyguları',
      'Kişilerarası ilişkilerde bağımlılıkta artma',
      'Psikofizyolojik hastalıklar eklenir',
      'Sırt ve göğüs ağrıları ve epigastrik yakınmalar'
    ],
    additionalNotes: [
      'Özellikle K 50 T puanından düşükse bu kişiler günlük stres ve sorumluluklarla başa çıkamazlar',
      'Bu profili veren erkekler kendilerinden daha güçlü kadınlarla evlenirler',
      'Bağımlılık rolünü sürdürmeye çalışırlar',
      'Kronik işsizlik ve alkol bağımlılığı ortaya çıkabilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '1270': {
    code: '1270',
    title: 'HİPOKONDRİAZİS-DEPRESYON-SOSYAL İÇE DÖNÜKLÜK KODU',
    description: 'Sinirlilik, Anksiyete, depresyon, zayıflık, yorgunluk, ilgi kaybı gibi semptomlar gösterirler.',
    characteristics: [
      'Sinirlilik, Anksiyete, depresyon',
      'Zayıflık, yorgunluk, ilgi kaybı',
      'Kendilik değerlerinde düşme',
      'Sosyal ilişkilerinde geri çekilme',
      'İçe dönük tutum sergilerler',
      'Uykusuzluk, kardiyak semptomlar ve anoreksiya görülebilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '12378': {
    code: '12378',
    title: 'HİPOKONDRİAZİS-DEPRESYON-HİSTERİ-PSİKASTENİ-ŞİZOFRENİ KODU',
    description: 'Nevrotik bozuklukların daha şiddetli şeklidir. 7 ve 8\'deki yükselmeler, nevrotik bozukluğun daha abartılı olduğunun göstergesidir.',
    characteristics: [
      'Nevrotik bozuklukların şiddetli şekli',
      'Abartılı nevrotik bozukluk',
      'Psikotik özellikler eşlik edebilir',
      'Ciddi psikopatoloji göstergesi'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '128': {
    code: '128',
    title: 'HİPOKONDRİAZİS-DEPRESYON-ŞİZOFRENİ KODU',
    description: 'Sıklıkla bu profiller bedeninin üst kısmına ilişkin bizar yakınmalar getiren kişilerde görülür ve genel olarak buna yorgunluk, zayıflık, gerilim ve düşüncelerde bozulmalar eşlik eder.',
    characteristics: [
      'Bedenin üst kısmına ilişkin bizar yakınmalar',
      'Yorgunluk, zayıflık, gerilim',
      'Düşüncelerde bozulmalar',
      'Ruhsal bozukluk ve diğerlerinden yabancılaşma',
      'Akut prepsikotik ya da psikotik durum',
      'Somatik delüzyonlar ortaya çıkarabilirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '218': {
    code: '218',
    title: 'DEPRESYON-HİPOKONDRİAZİS-ŞİZOFRENİ KODU',
    description: '128 koduna benzer özellikler gösterir ancak depresyon daha baskındır.',
    characteristics: [
      '128 kodunun özelliklerini taşır',
      'Depresyon daha baskın',
      'Psikotik özellikler eşlik edebilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '129': {
    code: '129',
    title: 'HİPOKONDRİAZİS-DEPRESYON-HİPOMANİ KODU',
    description: 'Bu kişiler beden işlevleri ile aşırı ilgilenir ve hastalıklarının gerçekten acil olduğunu düşünürler.',
    characteristics: [
      'Beden işlevleri ile aşırı ilgilenirler',
      'Hastalıklarının gerçekten acil olduğunu düşünürler',
      'Akut klinik rahatsızlıklar, gerginlik, ajitasyon, huzursuzluk',
      'Baş ağrısı, uykusuzluk ve spastik bağırsak ağrıları yakınmaları',
      'Nörolojik etyoloji de dikkate alınmalı',
      'Organik beyin sendromlarında da benzer yakınmalar'
    ],
    additionalNotes: [
      'Çok az düzeyde de olsa depresyonu, çatışmayı ve/ya da hiprenatik tarzdaki pasif-bağımlı tavrı maskelemeyi ya da inkâr etmeyi isterler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '219': {
    code: '219',
    title: 'DEPRESYON-HİPOKONDRİAZİS-HİPOMANİ KODU',
    description: '129 koduna benzer özellikler gösterir.',
    characteristics: [
      '129 kodunun özelliklerini taşır',
      'Depresyon daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '120': {
    code: '120',
    title: 'HİPOKONDRİAZİS-DEPRESYON-SOSYAL İÇE DÖNÜKLÜK KODU',
    description: 'Depresyon, içe çekilme, kararsızlık, kişilerarası ilişkilerden kaçınma, yetersizlik ve suçluluk duygularına değişik somatik yakınmalar eşlik eder.',
    characteristics: [
      'Depresyon, içe çekilme, kararsızlık',
      'Kişilerarası ilişkilerden kaçınma',
      'Yetersizlik ve suçluluk duyguları',
      'Değişik somatik yakınmalar'
    ],
    additionalNotes: [
      '8 ve 6 birlikte yükselmişse uzak duruş, pasif ve insanlardan kaçan şizoid bir biçim gösterirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '210': {
    code: '210',
    title: 'DEPRESYON-HİPOKONDRİAZİS-SOSYAL İÇE DÖNÜKLÜK KODU',
    description: '120 koduna benzer özellikler gösterir.',
    characteristics: [
      '120 kodunun özelliklerini taşır',
      'Depresyon daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  }
};

// Kod yorumu alma fonksiyonu
export function getCodeInterpretation(code: string): MMPICodeResult | null {
  return codeInterpretations[code] || null;
}

// Mevcut kodları listeleme
export function getAvailableCodes(): string[] {
  return Object.keys(codeInterpretations);
}

// Kod tipine göre filtreleme
export function getCodesByType(type: 'spike' | 'two-point' | 'three-point' | 'four-point'): string[] {
  return Object.keys(codeInterpretations).filter(code => {
    switch (type) {
      case 'spike': return code.length === 1;
      case 'two-point': return code.length === 2;
      case 'three-point': return code.length === 3;
      case 'four-point': return code.length === 4;
      default: return false;
    }
  });
}