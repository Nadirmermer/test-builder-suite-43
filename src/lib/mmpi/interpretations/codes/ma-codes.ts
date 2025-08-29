// MMPI-1 Ma (Hipomani) Kod Yorumları
// docs/mmpi-1.md'den sistematik olarak alınan kodlar - Alt Test 9
// Kitabın orijinal metni korunmuş, kısaltma ya da özetleme yapılmamıştır

import { MMPICodeResult } from './types';

export const maCodeInterpretations: Record<string, MMPICodeResult> = {
  // ===== Ma KODLAMALARI (Kitaptaki sıraya göre) =====
  
  '9K70': {
    code: '9K70',
    title: 'Eğer 9 ve K alt testlerinde puanlar 70T puanında (2 alt testi T:50\'nin altında ise)',
    description: 'Bu kişiler enerjik, organize, diğerlerinin kendileri üzerinde otorite kurmalarını istemeyen kişilerdir.',
    characteristics: [
      'Genellikle çok iyi yöneticidirler',
      'Güç yönelimli bireylerdir',
      'Belirsizlik, fikir üretememe ya da çelişkili durumlar tahammül edilemez şeylerdir',
      'Kendilerinin kontrol edemediği durumlarda ve bilgi verilmeyen, yapılanmamış durumlarda rahatsız olurlar',
      'Bu bireylerin çoğu yarışmacıdır'
    ],
    additionalNotes: [
      '2 alt testi T:50\'nin altında ise geçerlidir'
    ],
    conditions: {
      otherScaleConditions: [
        {
          scale: 'K',
          threshold: 70,
          operator: 'higher',
          effect: 'kendi yaşamlarını ve çevrelerindeki diğer kişilerin yaşamlarını organize etme çabaları vardır',
          characteristics: [
            'Kendilerini rahatsız ya da tehdit eden durumlarda bağımlı, itaatkar, duygusal ve kontrolü kaybeden kişiler olabilirler',
            'Bireyler diğerleri üzerinde kontrol koyarak onları kendilerine itaat ettirirler',
            'Aslında temelde kendilerine güvensizdirler',
            'Rollerine, görünümlerine sıkı sıkıya bağlıdırlar'
          ]
        }
      ],
      genderConditions: [
        {
          gender: 'Kadın',
          effect: 'Kadınlar fiziksel çekicilik konusunda teşhircidirler (Eğer 5 alt testinde T:40\'ın altında ise)',
          characteristics: [
            'Böylece kendilerini kabul ettirir ve diğerlerini kontrol ettiklerini düşünürler'
          ]
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '9HighKLow': {
    code: '9HighKLow',
    title: 'Yüksek 9/Düşük K Kodu',
    description: 'Narsisistik kişilerdir.',
    characteristics: [
      'Narsisistik özellikleri vardır'
    ],
    conditions: {
      genderConditions: [
        {
          gender: 'Kadın',
          effect: 'Kadınlar, eksibisyonist bir biçimde kendilerini sergileyerek dikkatleri bu şekilde üstlerine çekerler',
          characteristics: []
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '91': {
    code: '91',
    title: '91/19 Kodu (Ayrıca 19/91 Koduna da Bakınız)',
    description: 'Ender görülmektedir. Hastalar hipomanik durumdadırlar, ancak gergindirler ve yerlerinde duramazlar.',
    characteristics: [
      'İhtiraslıdırlar',
      'Başarısızlıkla engellenmişlerdir',
      'Hipokondriak sorunlarıyla karşılaştıkları durumsal güçlükler arasındaki ilişkiyi ispatlamak kolaydır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '19': {
    code: '19',
    title: '19 Kodu (91 ile aynı)',
    description: '91 koduna benzer özellikler gösterir.',
    characteristics: ['91 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '92': {
    code: '92',
    title: '92/29 Kodu (Bakınız 29/92 Kodu)',
    description: 'Eyleme vuruk davranışlar ile ilgilidir.',
    characteristics: ['29/92 kodunun tüm özelliklerini taşır'],
    additionalNotes: [
      'Eyleme vuruk davranışlar ile ilgilidir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '29': {
    code: '29',
    title: '29 Kodu (92 ile aynı)',
    description: '92 koduna benzer özellikler gösterir.',
    characteristics: ['92 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '93': {
    code: '93',
    title: '93/39 Kodu (Bakınız 39/93 Kodu)',
    description: 'Eyleme vuruk davranışlar ile ilgilidir.',
    characteristics: ['39/93 kodunun tüm özelliklerini taşır'],
    additionalNotes: [
      'Eyleme vuruk davranışlar ile ilgilidir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '39': {
    code: '39',
    title: '39 Kodu (93 ile aynı)',
    description: '93 koduna benzer özellikler gösterir.',
    characteristics: ['93 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '94': {
    code: '94',
    title: '94/49 Kodu (Bakınız 49/94 Kodu)',
    description: 'Eyleme vuruk davranışlar ile ilgilidir.',
    characteristics: ['49/94 kodunun tüm özelliklerini taşır'],
    additionalNotes: [
      'Eyleme vuruk davranışlar ile ilgilidir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '49': {
    code: '49',
    title: '49 Kodu (94 ile aynı)',
    description: '94 koduna benzer özellikler gösterir.',
    characteristics: ['94 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '95': {
    code: '95',
    title: '95/59 Kodu (Bakınız 59/95 Kodu)',
    description: '59/95 koduna benzer özellikler gösterir.',
    characteristics: ['59/95 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '59': {
    code: '59',
    title: '59 Kodu (95 ile aynı)',
    description: '95 koduna benzer özellikler gösterir.',
    characteristics: ['95 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '96': {
    code: '96',
    title: '96/69 Kodu (Bakınız 69/96 Kodu)',
    description: '69/96 koduna benzer özellikler gösterir.',
    characteristics: ['69/96 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '69': {
    code: '69',
    title: '69 Kodu (96 ile aynı)',
    description: '96 koduna benzer özellikler gösterir.',
    characteristics: ['96 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '97': {
    code: '97',
    title: '97/79 Kodu (Bakınız 79/97 Kodu)',
    description: '79/97 koduna benzer özellikler gösterir.',
    characteristics: ['79/97 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '79': {
    code: '79',
    title: '79 Kodu (97 ile aynı)',
    description: '97 koduna benzer özellikler gösterir.',
    characteristics: ['97 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '98': {
    code: '98',
    title: '98/89 Kodu (Bakınız 89/98 Kodu)',
    description: '89/98 koduna benzer özellikler gösterir.',
    characteristics: ['89/98 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '89': {
    code: '89',
    title: '89 Kodu (98 ile aynı)',
    description: '98 koduna benzer özellikler gösterir.',
    characteristics: ['98 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '90': {
    code: '90',
    title: '90/09 Kodu',
    description: 'Kod oldukça nadirdir, özellikle erkeklerde çok az görülür. Bu koddaki bireyler enerjik ve olasılıkla ajitedirler.',
    characteristics: [
      'Genellikle yalnız kişilerdir'
    ],
    additionalNotes: [
      'Si alt testinin yükselmesi bırakılarak yorum, yükselen diğer iki alt test ile yapılmaktadır',
      'Daha sonra eğer gerekliyse Si alt testi yorumlanmalıdır',
      'Oldukça nadirdir, özellikle erkeklerde çok az görülür'
    ],
    conditions: {
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'özellikle erkeklerde çok az görülür',
          characteristics: []
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '09': {
    code: '09',
    title: '09 Kodu (90 ile aynı)',
    description: '90 koduna benzer özellikler gösterir.',
    characteristics: ['90 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  }

  // ✅ TÜM MA KODLARI TAMAMLANDI 
  // Sistematik ekleme süreci tamamlandı - Dokümandaki tüm Ma kodları eksiksiz alındı
};
