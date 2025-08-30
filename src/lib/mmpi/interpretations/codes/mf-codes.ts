// MMPI-1 Mf (Erkeklik/Kadınlık) Kod Yorumları
// docs/mmpi-1.md'den sistematik olarak alınan kodlar - Alt Test 5
// Kitabın orijinal metni korunmuş, kısaltma ya da özetleme yapılmamıştır

import { MMPICodeResult } from './types';

export const mfCodeInterpretations: Record<string, MMPICodeResult> = {
  // ===== Mf KODLAMALARI (Kitaptaki sıraya göre) =====
  
  '51': {
    code: '51',
    title: '51/15 Kodu',
    description: 'Bu kod için ayrı bir açıklama mevcut değildir, 15/51 koduna bakınız.',
    characteristics: [
      '15/51 kod yorumlarıyla aynı özellikler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '15': {
    code: '15',
    title: '15/51 Kodu',
    description: 'Bu kod depresyon ve düşük kendilik değeri ile karakterizedir.',
    characteristics: [
      'Depresif özellikler gösterir',
      'Düşük kendilik değeri vardır',
      'Cinsiyet kimliği konularında çatışma yaşayabilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '52': {
    code: '52',
    title: '52/25 Kodu',
    description: 'Bu kod için ayrı bir açıklama mevcut değildir, 25/52 koduna bakınız.',
    characteristics: [
      '25/52 kod yorumlarıyla aynı özellikler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '25': {
    code: '25',
    title: '25/52 Kodu',
    description: 'Bu kodda ergenler, genellikle kardeşleri ya da arkadaşları ile ilişkilerinin kötü olması, utangaçlık, aşırı negativizm ya da aşırı duyarlık nedenleri ile başvururlar.',
    characteristics: [
      'Kişilerarası ilişkilerde utangaç, pasif ve çekingen',
      'Mükemmeliyetçilik ve titizlik',
      'Aşırı entellektüalizasyon',
      'Kaygı, suçluluk, aşırı duyarlık',
      'Kendini suçlama, depresyon',
      'Sosyal beceriksizlik'
    ],
    additionalNotes: [
      '25/52 koddaki kadınlar, depresiftirler ve kendilerine yönelmişlerdir, ancak başkalarına dayanmak yerine kendi kendilerine yetmeye çalışırlar',
      'Sıklıkla bu kodda erkeklerde 7,3,4 ya da 0 alt testleri de birlikte yükselir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      genderConditions: [{
        gender: 'Kadin',
        effect: 'depresiftirler ve kendilerine yönelmişlerdir, ancak başkalarına dayanmak yerine kendi kendilerine yetmeye çalışırlar',
        characteristics: ['Depresif özellikler', 'Kendine yönelme', 'Bağımsızlık çabası']
      }],
      otherScaleConditions: [
        {
          scale: '7',
          threshold: 65,
          operator: 'higher',
          effect: 'erkeklerde birlikte yükselir',
          characteristics: ['Endişe belirginleşir']
        },
        {
          scale: '3',
          threshold: 65,
          operator: 'higher',
          effect: 'erkeklerde birlikte yükselir',
          characteristics: ['Histeri özellikleri']
        },
        {
          scale: '4',
          threshold: 65,
          operator: 'higher',
          effect: 'erkeklerde birlikte yükselir',
          characteristics: ['Antisosyal özellikler']
        },
        {
          scale: '0',
          threshold: 65,
          operator: 'higher',
          effect: 'erkeklerde birlikte yükselir',
          characteristics: ['Sosyal içedönüklük']
        }
      ]
    }
  },

  '53': {
    code: '53',
    title: '53/35 Kodu',
    description: 'Bu kod için ayrı bir açıklama mevcut değildir, 35/53 koduna bakınız.',
    characteristics: [
      '35/53 kod yorumlarıyla aynı özellikler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '35': {
    code: '35',
    title: '35/53 Kodu',
    description: 'Bu kod histeri ve cinsiyet kimliği çatışmalarını gösterir.',
    characteristics: [
      'Histerik özellikler',
      'Cinsiyet kimliği çatışmaları',
      'Somatik yakınmalar',
      'Duygusal labilite'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '54': {
    code: '54',
    title: '54/45 Kodu',
    description: 'Bu kod için ayrı bir açıklama mevcut değildir, 45/54 koduna bakınız.',
    characteristics: [
      '45/54 kod yorumlarıyla aynı özellikler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '45': {
    code: '45',
    title: '45/54 Kodu',
    description: 'Ergenler için bu kod, öfke patlamalarının olduğunu gösterir. Kuralları ve otoriteyi sevmezler ve sıklıkla okuldan kaçma, okula ara verme ve sınıfta kalma öyküleri vardır.',
    characteristics: [
      'Öfke patlamaları',
      'Kuralları ve otoriteyi sevmeme',
      'Öfkelerini kontrol etmede büyük zorluk',
      'İlaç kullanımı, hırsızlık veya anti-sosyal davranışlar olabilir',
      'Girişken (insan canlısı), dışa dönük',
      'Genellikle akranları tarafından sevilen kişiler'
    ],
    additionalNotes: [
      'Özellikle 4 alt testi, 5 alt testinden daha yüksek olduğunda bu daha belirgindir',
      'Bu ergenler girişken, dışa dönük ve genellikle akranları tarafından sevilen kişilerdir ve prognoz iyidir'
    ],
    diagnosis: 'Pasif agresif kişilik bozukluğu, pasif tip',
    ageGroup: 'Ergen',
    gender: 'Tüm',
    conditions: {
      tScoreConditions: [{
        condition: '4 alt testi, 5 alt testinden daha yüksek olduğunda',
        result: 'bu daha belirgindir',
        scaleComparison: {
          scale1: '4',
          scale2: '5',
          operator: 'higher'
        }
      }],
      ageConditions: [{
        ageRange: 'Yetişkin',
        effect: 'liseden daha az eğitimi olan kişilerdir ve sıklıkla olgunlaşmamış ve narsisistiktir',
        characteristics: ['Olgunlaşmamış', 'Narsisistik', 'Sosyal kurallara meydan okuma']
      }],
      educationConditions: [{
        educationLevel: 'Lise',
        effect: 'ya da daha yüksek eğitimi olan yetişkin erkeklerin narsisistik biçimde uyumsuz olma olasılığı daha azdır',
        characteristics: ['İdealist', 'Fikirlerini açık ve etkin bir biçimde iletebilecek yetenek']
      }],
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'erkeksi bir protesto ve/veya lezbiyen bir ilişkide erkek rolünün kabul edilmesi',
          characteristics: ['5 yüksektir']
        },
        {
          gender: 'Kadin',
          effect: 'pasifliği, kadınsı rol ve kendilikle birleştirirler',
          characteristics: ['5 düşüktür', 'Geleneksel olarak kadınsı olmayan yaşam biçimi']
        }
      ]
    }
  },

  '56': {
    code: '56',
    title: '56/65 Kodu',
    description: 'Bu kod tipindeki bireyler hakkında çok az bilgi vardır. Genel olarak duygularının incinmesi konusunda aşırı duyarlıdırlar ve başkaları ile duygusal ilişkiye girmede kendilerine güvenmezler, bundan korkarlar.',
    characteristics: [
      'Duygularının incinmesi konusunda aşırı duyarlı',
      'Başkaları ile duygusal ilişkiye girmede kendilerine güvenmeme',
      'Başkalarından bir şey istendiğinde sinirlenme',
      'Yüksek eğitim düzeyi',
      'Kariyer sahibi'
    ],
    additionalNotes: [
      'Eğer başkaları onlardan bir şey isterlerse sinirlenirler',
      'Çoğunluğunun eğitim düzeyi yüksektir ve kariyer sahibi kişilerdir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '65': {
    code: '65',
    title: '65/56 Kodu',
    description: 'Bu kod 56/65 koduna benzer özellikler gösterir.',
    characteristics: [
      '56/65 kod yorumlarıyla aynı özellikler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '57': {
    code: '57',
    title: '57/75 Kodu',
    description: 'Kararsız, endişeli, içedönük, gergin, mutsuz ve sürekli onay bekleyen erkeklerdir.',
    characteristics: [
      'Kararsız, endişeli, içedönük',
      'Gergin, mutsuz',
      'Sürekli onay bekleyen',
      'Karşı cinsle ilişkilerinde kendilerini yetersiz hissederler'
    ],
    additionalNotes: [
      'Eğitim düzeyi düşük olan erkeklerde, kendi yetersizlikleri ile obsesif ruminasyonlar, anksiyete ve depresif dönemler vardır',
      'Kadınlarda bu çok daha azdır, 5 testinde görüldüğünden çok daha az agresif ve daha çok kendilerini analiz eden kişilerdir',
      'Entellektüel olarak yarışmacıdırlar'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      genderConditions: [{
        gender: 'Kadin',
        effect: 'çok daha az agresif ve daha çok kendilerini analiz eden kişilerdir',
        characteristics: ['Az agresif', 'Kendini analiz etme', 'Entellektüel yarışmacılık']
      }],
      educationConditions: [{
        educationLevel: 'İlköğretim',
        effect: 'eğitim düzeyi düşük olan erkeklerde yetersizlik obsesyonları',
        characteristics: ['Obsesif ruminasyonlar', 'Anksiyete', 'Depresif dönemler']
      }]
    }
  },

  '75': {
    code: '75',
    title: '75/57 Kodu',
    description: '57/75 kodunun tersine çevrilmiş halidir.',
    characteristics: [
      '57/75 kodunun tüm özelliklerini taşır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '58': {
    code: '58',
    title: '58/85 Kodu',
    description: 'Bu koddaki erkekler içe dönüktür ve zamanlarının çoğunu düşünme ile geçirirler.',
    characteristics: [
      'İçe dönük',
      'Zamanlarının çoğunu düşünme ile geçirme',
      'Konfüzyon, mutsuzluk',
      'Diğerlerine yabancılaşmış olma duygusu',
      'Ev çatışmaları'
    ],
    additionalNotes: [
      'Genellikle konfüzyonda, mutsuz ve diğerlerine yabancılaşmış oldukları duygusunu yaşarlar ve ev çatışmaları vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek'
  },

  '85': {
    code: '85',
    title: '85/58 Kodu',
    description: '58/85 kodunun tersine çevrilmiş halidir.',
    characteristics: [
      '58/85 kodunun tüm özelliklerini taşır'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek'
  },

  '59': {
    code: '59',
    title: '59/95 Kodu',
    description: 'Erkeklerde 5\'in yükselmesi açık eyleme vuruk davranışların azaldığını gösterir, burada entellektüalizasyon, inkarın, rasyonalizasyon aşırı kullanımı vardır.',
    characteristics: [
      'Açık eyleme vuruk davranışların azalması',
      'Entellektüalizasyon aşırı kullanımı',
      'İnkar ve rasyonalizasyon aşırı kullanımı',
      'Akademik olarak başarılı',
      'Duygusal bağımlılık (anne bağımlılığı)',
      'Benlik atılganlığının olmaması'
    ],
    additionalNotes: [
      'Aslında bu koddaki erkeklerin çoğu akademik olarak başarılıdır',
      'Duygusal bağımlılık (anne bağımlılığı) ve benlik atılganlığının olmaması sorun alanlarıdır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'açık eyleme vuruk davranışların azaldığını gösterir',
          characteristics: ['Entellektüalizasyon', 'İnkar', 'Rasyonalizasyon', 'Akademik başarı']
        },
        {
          gender: 'Kadin',
          effect: 'saldırganlığın açığa çıkmasını gösterir',
          characteristics: ['Saldırganlık (sözel veya davranışsal)', 'Enerjik ve yarışmacı', 'Kendine güvenli', 'Maceracı']
        }
      ]
    }
  },

  '95': {
    code: '95',
    title: '95/59 Kodu',
    description: 'Kadınlarda 5 alt testinin yükselmesi saldırganlığın açığa çıkmasını gösterir, bu saldırganlık duruma bağlı sözel veya davranışsaldır.',
    characteristics: [
      'Saldırganlığın açığa çıkması (sözel veya davranışsal)',
      'Enerjik ve yarışmacı (erkeklerle yarışır)',
      'Kendilerine güvenli, engellenmemiş ve maceracı',
      'İstekleri sorgulanır ya da engellenmek istenirse sinirli ya da kendine dönük olma'
    ],
    additionalNotes: [
      'Bu kadınlar enerjik ve yarışmacıdırlar (erkeklerle yarışırlar), kendilerine güvenirler, engellenmemiş ve maceracıdır',
      'Eğer onların istekleri sorgulanır ya da engellenmek istenirse sinirli ya da kendine dönük olurlar'
    ],
    ageGroup: 'Tüm',
    gender: 'Kadin'
  },

  '50': {
    code: '50',
    title: '50/05 Kodu',
    description: 'Bu koddaki erkekler içe dönüktür ve genellikle kişisel ve entellektüel izolasyon yaşarlar, diğerlerine ulaşmak istemezler.',
    characteristics: [
      'İçe dönük',
      'Kişisel ve entellektüel izolasyon',
      'Diğerleri ile ilişkilerinde temkinli, engellenmiş, içe çekilmiş ve kaygılı',
      'Aşırı kontrollü ve her şeyi aşırı idealize etme',
      'Sosyal açıdan beceriksilik',
      'Atılgan olma konusunda sorunlar',
      'Kendi yeterlilikleri konusunda sorgulama',
      'Karşı cinsle ilişkilerinde sorunlar ve rahatsızlıklar'
    ],
    additionalNotes: [
      'Diğerleri ile ilişkilerinde temkinli, engellenmiş, içe çekilmiş ve kaygılıdırlar',
      'Aşırı kontrollüdürler ve her şeyi aşırı idealize ederler',
      'Sosyal açıdan beceriksizdirler, atılgan olma konusunda sorunları vardır',
      'Kendi yeterlilikleri konusunda hep sorgulama içindedirler',
      'Karşı cinsle ilişkilerinde sorunlar ve rahatsızlıklar vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      genderConditions: [{
        gender: 'Kadin',
        effect: 'daha az kendine güvenen, spontan ve güçlü, beklenenenden daha atılgan',
        characteristics: ['Az kendine güvenli', 'Az spontan', 'Daha atılgan', 'Düşük eğitim düzeyi', 'Alt sosyo-ekonomik düzey']
      }]
    }
  },

  '05': {
    code: '05',
    title: '05/50 Kodu',
    description: '50/05 kodunun tersine çevrilmiş halidir.',
    characteristics: [
      '50/05 kodunun tüm özelliklerini taşır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  // ===== Yüksek 4/Düşük 5 ÖZEL KODU =====
  'yuksek4_dusuk5': {
    code: 'Yüksek 4/Düşük 5',
    title: 'Yüksek 4/Düşük 5 Kodu (Ayrıca Mf alt testinin düşüklüğüne de bakınız)',
    description: 'Erkeklerde düşük 5, bireyin kendini erkeksi, hatta aşırı erkeksi gösterme çabasını yansıtır.',
    characteristics: [
      'Kaba ve geleneksel maskülin ilgiler',
      'Yetersizlik duygularını güçlü bir biçimde kapatma çabası',
      'Kendi egolarını desteklemek için kadınları aşağılama',
      'Kendilerine güç ve kontrolü kanıtlama çabası'
    ],
    additionalNotes: [
      'Kaba ve geleneksel maskülin ilgileri olanlar da, bu grubun geleneksel değerlerini yansıtabilir',
      'Orta ya da üst sınıftan ve yüksekokul eğitimi olan erkeklerde bu örüntü, yetersizlik duygularını, özellikle kadınlara karşı, güçlü bir biçimde kapatma çabasını düşündürür',
      'Sıklıkla kendi egolarını desteklemek ve kendi kendilerine güç ve kontrolü kanıtlamak için kadınları aşağılarlar'
    ],
    diagnosis: 'Ergenlerde açık suçluluk ile bağlantılıdır',
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      ageConditions: [{
        ageRange: 'Ergen',
        effect: 'açık suçluluk ile bağlantılıdır',
        characteristics: ['Suç davranışları']
      }],
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'kendini erkeksi, hatta aşırı erkeksi gösterme çabası',
          characteristics: ['Aşırı maskülin davranış', 'Kadınları aşağılama', 'Güç ve kontrol kanıtlama']
        },
        {
          gender: 'Kadin',
          effect: 'kızgındır, ancak duygularını doğrudan ifade edemez',
          characteristics: ['Erkeklere yönelik kızgınlık', 'Heteroseksüel sorunlar', 'Yüzeysel ilişkiler', 'Pasif-agresif davranış']
        }
      ]
    }
  }
};