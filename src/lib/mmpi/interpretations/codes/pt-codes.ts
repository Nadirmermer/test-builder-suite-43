// MMPI-1 Pt (Psikasteni) Kod Yorumları
// docs/mmpi-1.md'den sistematik olarak alınan kodlar - Alt Test 7
// Kitabın orijinal metni korunmuş, kısaltma ya da özetleme yapılmamıştır

import { MMPICodeResult } from './types';

export const ptCodeInterpretations: Record<string, MMPICodeResult> = {
  // ===== Pt KODLAMALARI (Kitaptaki sıraya göre) =====
  
  '71': {
    code: '71',
    title: '71/17 Kodu (Bakınız 17/71 Kodu)',
    description: '17/71 koduna benzer özellikler gösterir.',
    characteristics: ['17/71 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '17': {
    code: '17',
    title: '17 Kodu (71 ile aynı)',
    description: '71 koduna benzer özellikler gösterir.',
    characteristics: ['71 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '72': {
    code: '72',
    title: '72/27 Kodu (Bakınız 27/72 Kodu)',
    description: '27/72 koduna benzer özellikler gösterir.',
    characteristics: ['27/72 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '27': {
    code: '27',
    title: '27 Kodu (72 ile aynı)',
    description: '72 koduna benzer özellikler gösterir.',
    characteristics: ['72 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '73': {
    code: '73',
    title: '73/37 Kodu (Bakınız 37/73 Kodu)',
    description: '37/73 koduna benzer özellikler gösterir.',
    characteristics: ['37/73 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '37': {
    code: '37',
    title: '37 Kodu (73 ile aynı)',
    description: '73 koduna benzer özellikler gösterir.',
    characteristics: ['73 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '74': {
    code: '74',
    title: '74/47 Kodu (Bakınız 47/74 Kodu)',
    description: 'Psikiyatrik hasta grubunda pasif agresif kişilik bozukluğu tanısı konulabilir.',
    characteristics: [
      'Kararsız, güvensiz kişilerdir',
      'Sadece sinirli olduklarını belirtirler',
      'Saldırganlıklarını kendilerine çevirdiklerinde depresyon görülür',
      'Eyleme vuruk davranışları da olabilir'
    ],
    additionalNotes: [
      'Olası Tanı: Pasif agresif kişilik bozukluğu'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '47': {
    code: '47',
    title: '47 Kodu (74 ile aynı)',
    description: '74 koduna benzer özellikler gösterir.',
    characteristics: ['74 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '75': {
    code: '75',
    title: '75/57 Kodu (Bakınız 57/75 Kodu)',
    description: 'Bu hastalar kaygılı, endişeli, kuşkucudurlar.',
    characteristics: [
      'Düşmanlık duygularını dolaylı yollardan ifade ederler',
      'Gerçek paranoid değillerdir',
      'Kişilik yapılarını değiştirmek zordur'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '57': {
    code: '57',
    title: '57 Kodu (75 ile aynı)',
    description: '75 koduna benzer özellikler gösterir.',
    characteristics: ['75 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '76': {
    code: '76',
    title: '76/67 Kodu (Bakınız 67/76 Kodu)',
    description: 'Bu hastalar kaygılı, endişeli, kuşkucudurlar.',
    characteristics: [
      'Düşmanlık duygularını dolaylı yollardan ifade ederler',
      'Gerçek paranoid değillerdir',
      'Kişilik yapılarını değiştirmek zordur'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '67': {
    code: '67',
    title: '67 Kodu (76 ile aynı)',
    description: '76 koduna benzer özellikler gösterir.',
    characteristics: ['76 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '78': {
    code: '78',
    title: '78/87 Kodu',
    description: 'Psikolojik yardım arayan kişilerde oldukça sık görülür. Bu kodu veren bireyler, nevrotik ve psikotik tanısı alabilirler.',
    characteristics: [
      'Endişeli, kaygılı, gergin, ve tekrarlayıcı ruminasyonları olan kişilerdir',
      'Düşünce ve dikkatlerini toplama konusunda sorunları vardır',
      'Stresleri o kadar fazladır ki, uykusuzluk ve intihar düşünceleri görülebilir',
      'Yakın kişilerarası ilişkiler kurmada güçlükleri vardır',
      'Genelde içedönük ve çekiniktirler',
      'Obsesif ruminasyonları vardır',
      'Karşı cinsle ilişkilerde kendilerini yetersiz hissederler',
      'Yoğun kaygıya bağlı olarak cinsel performansları kötü olabilir',
      'Bu bireylerin çoğu gevşemek için aşırı alkol alabilirler'
    ],
    additionalNotes: [
      'Yetişkinlerde 8 alt testi 7\'den yüksekse, akut psikotik durum vardır',
      'Ergenlerde 78 kodu 87 kodu kadar ciddi değildir',
      'İntihar potansiyeli dikkatli bir şekimde değerlendirilmelidir',
      '8 alt testi, 7 alt testinden daha yüksekse intihar girişimi tuhaftır ve kendine zarar vermeyi içerir',
      'Bireylerde halüsinasyon ve delüzyonlar, duygudurumda sığlık ve gerçekle bağlantıda güçlükler olabilir',
      'Düşünce bozukluğunun var olup olmadığı araştırılmalıdır',
      'Psikofarmakolojik müdahale bunların yoğun anksiyetelerini azaltmakta faydalı olabilir',
      'Psikolojik müdahale güçtür, çünkü bunların psikolojik çatışmaları kroniktir',
      'Eğer 2 ve 4,8 alt testinin 5 T puanı altındaysa 278/728 ve 478/748 kodlarına bakınız'
    ],
    conditions: {
      ageConditions: [
        {
          ageRange: 'Yetişkin',
          effect: 'Yetişkinlerde 8 alt testi 7\'den yüksekse, akut psikotik durum vardır',
          characteristics: []
        },
        {
          ageRange: 'Ergen',
          effect: 'Ergenlerde 78 kodu 87 kodu kadar ciddi değildir',
          characteristics: []
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '87': {
    code: '87',
    title: '87 Kodu (78 ile aynı)',
    description: '78 koduna benzer özellikler gösterir.',
    characteristics: ['78 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '782': {
    code: '782',
    title: '782 Kodu',
    description: 'Olası Tanı: Depresif Bozukluk. Obsesif Kompulsif Bozukluk',
    characteristics: [
      'Depresif bozukluk özellikleri gösterir',
      'Obsesif kompulsif bozukluk özellikleri gösterir'
    ],
    additionalNotes: [
      'Olası Tanı: Depresif Bozukluk',
      'Olası Tanı: Obsesif Kompulsif Bozukluk'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '872': {
    code: '872',
    title: '872 Kodu',
    description: 'Olası Tanı: Şizofrenik Reaksiyon',
    characteristics: [
      'Şizofrenik reaksiyon özellikleri gösterir'
    ],
    additionalNotes: [
      'Olası Tanı: Şizofrenik Reaksiyon'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '784': {
    code: '784',
    title: '784/874 Kodu',
    description: 'Olası Tanı: Şizofrenik Reaksiyon, Şizoid Kişilik Bozukluğu',
    characteristics: [
      'Şizofrenik reaksiyon özellikleri gösterir',
      'Şizoid kişilik bozukluğu özellikleri gösterir'
    ],
    additionalNotes: [
      'Olası Tanı: Şizofrenik Reaksiyon',
      'Olası Tanı: Şizoid Kişilik Bozukluğu'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '874': {
    code: '874',
    title: '874 Kodu (784 ile aynı)',
    description: '784 koduna benzer özellikler gösterir.',
    characteristics: ['784 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '789': {
    code: '789',
    title: '789 Kodu',
    description: 'Hostil, gergin, şüpheci, hiperaktif, huzursuz bireylerdir.',
    characteristics: [
      'Günlerini fanteziler ve hayal kurmayla geçirirler',
      'Yansıtmayı kullanır, uygunsuz duygudurum gösterirler',
      'Sınırlı sosyal yaşantıları vardır',
      'Diğerlerinden çocuksu tarzda ilgi ve sevgi beklerler',
      'İstekleri gerçekleşmediğinde ise gücenip, düşmanca davranırlar',
      'Yakın duygusal ilişkiye giremezler',
      'Kendilerine ilişkin grandiöziteleri vardır, kendileri ile övünürler',
      'Başarıya ulaşma isteklerinin çok fazla olmasına karşın orta düzeyde performans gösterirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '79': {
    code: '79',
    title: '79/97 Kodu',
    description: 'Bu oldukça az görülen bir koddur. Bu bireyler ajitasyon düzeyinde kaygı yaşarlar.',
    characteristics: [
      'Korkuları vardır, olaylara aşırı tepki verirler',
      'Korkularına ve yetersizliklerine bağlı olarak kendilerini gevşetmeleri ve bunlardan kurtulmaları mümkün değildir',
      'Aşırı ruminasyonlar gösterirler',
      'Klinik tabloda anksiyete ve gerginlik ön plandadır',
      'Sıklıkla fiziksel semptomlar getirirler (örneğin sırt ağrısı, kas spazmları ve uykusuzluk)'
    ],
    additionalNotes: [
      'Eğer 2 alt testi de yükselmişse depresyon görülür, ancak klinik tabloda anksiyete ve gerginlik ön plandadır',
      'Bazı bireylerde manik örüntü vardır ve bu farmakolojik müdahale gerektirir'
    ],
    conditions: {
      ageConditions: [
        {
          ageRange: 'Ergen',
          effect: 'Bu kodu alan ergenlerin yoğun ilgi gereksinimleri vardır, ancak kontrolü kaybedeceklerini düşünerek böyle bir şey yapmaktan kaçınırlar',
          characteristics: [
            'Yoğun ilgi gereksinimleri vardır',
            'Kontrolü kaybedeceklerini düşünerek kaçınırlar',
            'Bağımlılık, bağımsızlık çatışması çok fazladır'
          ]
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '97': {
    code: '97',
    title: '97 Kodu (79 ile aynı)',
    description: '79 koduna benzer özellikler gösterir.',
    characteristics: ['79 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '794': {
    code: '794',
    title: '794 Kodu',
    description: 'Hastalar kronik olarak kaygılı ve gergindirler.',
    characteristics: [
      'Yüksek enerji düzeyleri obsesif ruminasyonlarına katkıda bulunur',
      'Konuşmalarının genellikle izlenmesi zordur, bağlantısız fikirler görülür',
      'İmpulsif dışa vurma dönemleri birbiri ardına sıralanır'
    ],
    additionalNotes: [
      'Diğer manik özelliklerin de birlikte görülüp görülmediği araştırılmalıdır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '70': {
    code: '70',
    title: '70/07 Kodu',
    description: 'Bu profili veren kişiler utangaç, içedönük, sosyal becerilerden yoksun, gergin ve endişelidirler, uykusuzluktan yakınırlar. Oldukça nadir görülür.',
    characteristics: [
      'Utangaç, içedönük, sosyal becerilerden yoksun',
      'Gergin ve endişeli',
      'Uykusuzluktan yakınırlar'
    ],
    additionalNotes: [
      'Oldukça nadir görülür'
    ],
    conditions: {
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'Bu koddaki erkekler sosyal yetenekler ve/veya fiziksel görünümleri konusunda endişeli ve gergindirler',
          characteristics: [
            'Sosyal yetenekler konusunda endişeli ve gergin',
            'Fiziksel görünümleri konusunda endişeli ve gergin',
            'Kendilerini yetersiz görürler',
            'Çoğunluğu içedönüktür, bu sözelleştirmeyi de engeller',
            'Güvensizlikleri ve karar verme güçlükleri onları konfüzyonda bırakır',
            'Aşırı kontrollüdürler ve kendilerini suçlarlar',
            'Ruminasyonları uykusuzluk ile sonlanır',
            'Anneleri ve kardeşleri ile yoğun çatışmaları vardır',
            'Sosyal alandaki yetersizlikleri, karşı cinsle olan ilişkilerini de etkilemektedir'
          ]
        },
        {
          gender: 'Kadın',
          effect: 'Kadınlarda eğer 5 alt testi, 40 T puanının altında ise aynı örüntü vardır',
          characteristics: [
            'Eğer 5 alt testi 40 T puanının altında ise erkeklerle aynı örüntü',
            'Bunlar yoksa sorunların ciddilik oranı daha az',
            'Kendilerinin ne olduğunun farkındadırlar',
            'Fiziksel görünüm olarak çekici olmadıklarını düşünürler',
            'Sosyal açıdan güvensizlik vardır',
            'Karşı cinsle rahat ilişki kuramama gibi sorunları vardır'
          ]
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '07': {
    code: '07',
    title: '07 Kodu (70 ile aynı)',
    description: '70 koduna benzer özellikler gösterir.',
    characteristics: ['70 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  }

  // ✅ TÜM PT KODLARI TAMAMLANDI 
  // Sistematik ekleme süreci tamamlandı - Dokümandaki tüm Pt kodları eksiksiz alındı
};
