// MMPI-1 Pa (Paranoya) Kod Yorumları
// docs/mmpi-1.md'den sistematik olarak alınan kodlar - Alt Test 6
// Kitabın orijinal metni korunmuş, kısaltma ya da özetleme yapılmamıştır

import { MMPICodeResult } from './types';

export const paCodeInterpretations: Record<string, MMPICodeResult> = {
  // ===== Pa KODLAMALARI (Kitaptaki sıraya göre) =====
  
  '16': {
    code: '16',
    title: '16/61 Kodu',
    description: 'Bu bireyler katı inatçı, eleştiriye açık, duyarlı ve diğerlerini suçlama eğiliminde olan kişilerdir.',
    characteristics: [
      'Her şeyi baştan savma eğilimindedirler',
      'Savunucudurlar ve duygusal ilişkiden endişe duyarlar',
      'Genel olarak öfkelerini, rasyonalizasyonu ve yansıtmayı kullanarak gösterirler',
      'Kontrollerinin çok fazla olmasına karşın şiddetli öfke patlamaları görülmektedir'
    ],
    additionalNotes: [
      'Alt test 8 de yükselmişse alışılmamış somatik uğraşların varlığı dikkate alınmalı, belki de somatik delüzyonların olabileceği düşünülmelidir',
      'Bazı bireyler bedensel uğraşlarıyla \'psikotik bir dönemden\' kurtulmaya gayret ederler',
      'Alt test 4\'ün T değeri 70\'den azsa: Olası tanı: Paranoid Şizofreni'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      ageConditions: [
        {
          ageRange: 'Ergen',
          effect: 'özellikle ergenlerde şiddetli öfke patlamaları görülmektedir',
          characteristics: ['Şiddetli öfke patlamaları']
        }
      ]
    }
  },

  '61': {
    code: '61',
    title: '61 Kodu (16 ile aynı)',
    description: '16 koduna benzer özellikler gösterir.',
    characteristics: ['16 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '17': {
    code: '17',
    title: '17/71 Kodu',
    description: 'Bu hastaların bedensel yakınmaları onların yaşadığı gerilim ve kaygıyı yansıtmaktadır.',
    characteristics: [
      'Yüksek enerji düzeyi ve ajitasyonla birlikte çoklu somatik semptomlar görülebilir',
      'Bireyde gerilimin yarattığı somatik yakınmaların yanı sıra anksiyete belirgindir',
      'Genel olarak bedensel işlevlerdeki bozuklukları ile obsesif bir biçimde uğraşırlar'
    ],
    additionalNotes: [
      'Bu kod erkeklerde kadınlardan daha fazladır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'erkeklerde kadınlardan daha fazla görülür',
          characteristics: ['Erkeklerde daha sık görülme']
        }
      ]
    }
  },

  '71': {
    code: '71',
    title: '71 Kodu (17 ile aynı)',
    description: '17 koduna benzer özellikler gösterir.',
    characteristics: ['17 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '18': {
    code: '18',
    title: '18/81 Kodu',
    description: 'Hastalarda düşmanlık ve saldırganlık duyguları vardır, ancak bu duygularını uygun bir biçimde ifade edemezler.',
    characteristics: [
      'Beden işlevleri ve bedensel hastalıklara ilişkin delüzyonel düşüncelerini açıkça gösterirler',
      'Genellikle bizar tabiatlı somatik yakınmaları vardır',
      'Somatik hezeyanları olabilir',
      'Somatik yakınmaları, gerçek psikotik yaşantının ortaya çıkmasına karşı savunmaları yansıtıyor olabilir',
      'Karşı cinsin üyelerine ilişkin hostilite vardır',
      'Diğerlerine karşı güvensizlik, kendini onlardan kopmuş gibi hissetme',
      'Uzaklaşma ve izolasyon ortaya çıkarabilir',
      'Öfke ve hostilite duyguları belirgindir, ancak bunu açıkça ifade edemezler'
    ],
    additionalNotes: [
      'Özellikle stres altında kişilerde şaşkınlık ve düşüncede konfüzyon olabilir',
      'Somatik uğraşları gerçek ile bağlantılarını koparabilir',
      'Tedavi sürecinde basit müdahaleler bu hastalara yetmez',
      'Kişilerarası ilişkilerinde de içgörü sağlamaya yönelik yaklaşımlarla da yarar sağlanamaz'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      ageConditions: [
        {
          ageRange: 'Ergen',
          effect: 'okul başarısı düşüktür, unutkanlık oldukça fazladır',
          characteristics: [
            'Okul başarısı düşük',
            'Unutkanlık fazla',
            'Baş ağrısı ve mide ağrısı gibi somatik yakınmalar',
            'Arkadaşları az',
            'Hem okulda, hem de sosyal alanlarda zorlanma'
          ]
        }
      ]
    }
  },

  '81': {
    code: '81',
    title: '81 Kodu (18 ile aynı)',
    description: '18 koduna benzer özellikler gösterir.',
    characteristics: ['18 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '26': {
    code: '26',
    title: '26/62 Kodu',
    description: 'Alıngan, depresif ve eleştiriye aşırı duyarlı kişilerdir.',
    characteristics: [
      'Bu bireylerde altta yatan güçlü bir kızgınlık duygusu vardır',
      'Sıklıkla süreğen kişiler arası ilişki güçlükleri vardır',
      'Genellikle paranoid eğilim gösterirler',
      'Nötr durumları kötü niyetli olarak değerlendirir',
      'Yetersiz veriye dayanarak sonuç çıkarırlar',
      'Küskünlük, ajitasyon, yorgunluk ve saldırganlık genellikle belirgindir',
      'Başkaları onları reddetmeden önce onları reddetme düşüncesi ile kavgaya hazırdırlar',
      'Bağımlı olmaktan kaçınma aracı olarak kavgaya hazırdırlar'
    ],
    additionalNotes: [
      'Pa alt testi belirgin bir biçimde yükseldiğinde ve/veya 4 ve 8 alt testi 70T puanının üzerinde ise, bireyin psikozun erken dönemlerinde olma olasılığı artar',
      'Bu tür hastalar, kızgın depresif kişilerdir',
      'Çok şiddetli kızgınlıklarını çevrelerine ve kendilerine karşı yöneltebilirler',
      'Kızgınlıklarını ifade edemeyen diğer deprese hastalara göre, bu hastalar açıkça hostil ve küskün olabilirler',
      'Olası Tanı: Psikozun erken dönemi'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '62': {
    code: '62',
    title: '62 Kodu (26 ile aynı)',
    description: '26 koduna benzer özellikler gösterir.',
    characteristics: ['26 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '27': {
    code: '27',
    title: '27/72 Kodu (Ayrıca 273/723, 247/724, erkekler için 275/725, kadınlar için 27/72 ve 278/728 kodlarına bakınız)',
    description: 'Bu kod için ayrı bir açıklama mevcut değildir, ilgili üçlü kodlara bakınız.',
    characteristics: [
      '273/723, 274/724, 275/725, 278/728 kod yorumlarıyla aynı özellikler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '72': {
    code: '72',
    title: '72 Kodu (27 ile aynı)',
    description: '27 koduna benzer özellikler gösterir.',
    characteristics: ['27 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '273': {
    code: '273',
    title: '273/723 Kodları',
    description: 'Bu hastalar pasiftir, kişiler arası ilişkilerinde bağımlı olduklarında kendilerini çok rahat hissederler.',
    characteristics: [
      'Korunduklarında ve başkalarının bakımı altına alındıklarında bu duruma çok kolay uyum sağlarlar',
      'Bireyler, çoğunlukla kendileri için çok yüksek standartlar belirleyerek stres yaşarlar',
      'Stresleri arttığında başkalarından yardım isterler',
      'Depresyon ve endişeleri içinde belirgin bir biçimde ve yapışırcasına bağımlı hale gelirler',
      'Bu görünen çaresizlik, uysallık ve kendini değersizleştirme düşünceleri başkalarını, onları kurtarma ve korumaya yöneltir'
    ],
    additionalNotes: [
      'Hs alt testi de yükselmişse bu bireyler kaygıyla bağlantılı somatik yakınmaların yanı sıra, kendine acıma, suçlama ve başkalarının onlara bakmasını istemelerine karşın sosyal geri çekilme gösterirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '723': {
    code: '723',
    title: '723 Kodu (273 ile aynı)',
    description: '273 koduna benzer özellikler gösterir.',
    characteristics: ['273 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '274': {
    code: '274',
    title: '274/724 Kodları (Eğer test 4 ve 7 birbirlerinin 5T puanı alanı içindeyse 247 ve 427 kod yorumlarına da bakınız)',
    description: 'Yoğun yetersizlik ve suçluluk duyguları vardır.',
    characteristics: [
      'Kendilerini küçülterek, kendi zayıflık ve yetersizlikleriyle sürekli uğraşırlar',
      'Diğer kişilere olan aşırı bağımlılıklarını kabul etmezler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '724': {
    code: '724',
    title: '724 Kodu (274 ile aynı)',
    description: '274 koduna benzer özellikler gösterir.',
    characteristics: ['274 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '275': {
    code: '275',
    title: '275/725 Kodu',
    description: 'Birey de endişe, depresyon ve aşırı düzeyde aynı şeyler üzerinde durmaya ek olarak, çekingenlik görülür.',
    characteristics: [
      'Kronik bir başarısızlık duygusu ya da kendilik değeri konusunda ambivalansları var gibidir',
      'Kendilerini yetersiz, zayıf, aşağılanmış, suçlu ve pasif olarak tanımlarlar',
      '4 alt testi düşük olduğunda daha belirgindir',
      'Sürekli olarak başkalarının onları küçümsediği ilişkiler arayarak depresyonları için bedel öderler',
      'Bu tür ilişkilerde çok rahat ederler',
      'Karşı cinsle ilişkilerde güçlükler vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '725': {
    code: '725',
    title: '725 Kodu (275 ile aynı)',
    description: '275 koduna benzer özellikler gösterir.',
    characteristics: ['275 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '278': {
    code: '278',
    title: '278/728 Kodu',
    description: 'Gergin, kaygılı, depresif, aşırı biçimde aynı şeyler üstünde duran ve kendilerine ilişkin kuşkularla dolu olan bu bireylerde intihar düşüncesi ya da girişimi olasılığı yüksektir.',
    characteristics: [
      'Obsesif düşünme, korkular ve fobiler çok görülür',
      'Kendi başarısızlıkları üzerinde yoğunlaşırlar',
      'Çok titiz ve mükemmeliyetçidir',
      'Kendileri ve başkaları için çok yüksek standartlar koyarlar',
      'Bu standartlara ulaşamadıklarında çok fazla suçluluk yaşarlar',
      'Aşırı bir biçimde kendilerini sorgulamaları ve kendi kendilerine baskı yapmaları sıklıkla belirli bir şeye odaklanma güçlüklerine ve performansta düşmeye yol açar',
      'Karşı cinsle, aşk ilişkileri gibi duygusal bağlantılar kurmada özel zorlukları vardır'
    ],
    additionalNotes: [
      'Bu kodda, özellikle alt testlerden K ve Hs, 50 T puanının altında olduğunda ve/veya Ma alt testi yükseldiğinde intihar olasılığı dikkatle değerlendirilmelidir',
      'Bu kodda Ma alt testinin yükselmesi, depresyonun ajite yönünü gösterir',
      'Eğer Si alt testi yükselmişse bireyin depresyonu daha çok kroniktir ve buna utangaçlık, içe çekilme ve fiziksel yetersizlik duyguları eşlik eder',
      'Alt testlerden Pd düşük olduğunda pasiflik ve çekingenlik ön plandadır, sıklıkla cinsel ilgilerde azalma ve cinsel yetersizlik buna eşlik eder'
    ],
    conditions: {
      genderConditions: [
        {
          gender: 'Kadin',
          effect: 'Kadınlarda 278/728 kodunda 5 alt testi düşmüşse bu kişiler, kendileri için bedel ödemeleri gerektiğini hissederler',
          characteristics: [
            'Mazohistik biçimde kendilerine kızarlar',
            'Baş ağrıları, sırt ağrıları ve cinsel güçlükleri içeren çok çeşitli fiziksel yakınmaları vardır',
            'Çoklu nevrotik semptomlar gösterirler',
            'Majör semptomlardan depresyon, sinirlilik ve obsesyonlar görülür',
            'Kararsızlık, şüphe ve kaygı karakterleridir',
            'Sosyal açıdan yetersizdirler'
          ]
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '728': {
    code: '728',
    title: '728 Kodu (278 ile aynı)',
    description: '278 koduna benzer özellikler gösterir.',
    characteristics: ['278 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '36': {
    code: '36',
    title: '36/63 Kodu',
    description: 'Yüzeyde, bu bireyler eleştiriye aşır duyarlı, kuşkulu, gergin ve hatta şüphecidirler.',
    characteristics: [
      'Sıklıkla baş ağrıları ya da gastrointestinal yakınmaları da vardır',
      'Sorunlar ortaya çıktığında başkalarını ya da durumları suçlarlar',
      'Yüzeydeki bu durumun altında, aile üyelerine karşı yaygın ve uzun süredir devam eden kızgınlık duyguları vardır',
      'Kızgınlık fark edildiğinde rasyonalize edilir',
      'Eleştiriye aşırı duyarlıdır, belirgin anksiyete ve gerginlikleri vardır',
      'Sıklıkla somatik yakınmaları getirirler',
      'Kendileri üzerinde odaklanırlar ve vücut pozisyonları sanki tetikte gibidir'
    ],
    additionalNotes: [
      'Bu ikili kod kadınlar arasında erkeklere oranla daha fazladır',
      'Alt test 6, 3\'ten 5 ya da daha fazla T puanı yüksek olduğunda, bu birey güç ve prestij kazanmak ister ve kızgın bir biçimde bencildir, hatta bu acımasız manipülasyonlar noktasına gidebilir',
      'Alt test 3, 6\'dan yüksekse, bu tür bireyler kızgınlıklarının farkında değildirler, ancak bu başkaları için çok açık olabilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '63': {
    code: '63',
    title: '63 Kodu (36 ile aynı)',
    description: '36 koduna benzer özellikler gösterir.',
    characteristics: ['36 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '46': {
    code: '46',
    title: '46/64 Kodu',
    description: 'Temel özellikler kızgınlık, küskünlük, güvensizlik, somurtkanlık, sinirlilik, eleştiriye ve başkaların isteklerine karşı aşırı duyarlılık ve suçun başkaları üzerine yansıtılmasıdır.',
    characteristics: [
      'Bu bireyler kendilerini çok çabuk reddedilmiş hissederler',
      'Yetersiz veri ve çok az öngörü ile sonuçlara varırlar',
      'Düşünceleri, tipik olarak nasıl ihmal edildikleri, başkalarının nasıl hatalı olduğu ve kendilerini nasıl koruyabilecekleri üzerinde odaklanır',
      'Zor durumlar ya da sorunları yaratmada kendi rollerinin ne olduğu üzerinde düşünmezler',
      'Ciddi sosyal ilişki sorunları, çok az yakın ilişkiler ve sıklıkla ilaç kullanımı ya da alkolizm görülür',
      'Başkalarının kendiyle çok fazla ilgilenmesini isterler, ancak aynı davranış kendilerinden beklenildiğinde gücenip kızarlar'
    ],
    additionalNotes: [
      'Bu kod, yetişkin normaller arasında nadirdir, ancak ergenlik dönemine özgüdür',
      'Bu koddaki ergenlerin aileleriyle ve otorite figürleriyle sürekli çatışmaları vardır',
      'Onları kinci, düşman ve yalancı olarak görürler',
      'İmpulsların kendine zarar verici biçimde kontrol edilmemesi karakteristiktir'
    ],
    conditions: {
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'Yetişkin erkeklerde bu kod sıklıkla psikotik ya da pre-psikotik durumlar ile ya da borderline kişiliklerle bağlantılıdır',
          characteristics: [
            'Kuşkuculuk, güvensizlik ve aşırı genelleme ile paranoid özellikler vardır',
            'Alt test 4, test 6\'dan yüksek olduğunda, aile ve iş güçlükleri tipiktir',
            'Kızgınlıklarını genellikle kontrol ederler, ancak etrafındakileri şaşırtacak şekilde dönemsel patlamalar gösterebilirler'
          ]
        },
        {
          gender: 'Kadin',
          effect: 'Kadınlarda 46/64 kodu psikoz ya da prepsikozla ilişkili olabilir, ancak sıklıkla pasif-agresif kişilik biçimleri ile özellikle erkeklere kızgınlıkla bağlantılıdır',
          characteristics: []
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '64': {
    code: '64',
    title: '64 Kodu (46 ile aynı)',
    description: '46 koduna benzer özellikler gösterir.',
    characteristics: ['46 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '468': {
    code: '468',
    title: '468/648 Kodu',
    description: 'Eğer birey psikiyatride yatan bir hasta ise şiddetli ve olasılıkla kronik, duygusal bir rahatsızlığı, büyük olasılıkla paranoid şizofreniyi düşündürür.',
    characteristics: [
      'Kuşkucu, kızgın, aşırı duyarlı, suçlayıcıdırlar',
      'Eleştiriden kolayca yaralanırlar ve durumlara kötü niyetli anlamlar yükleme ve düşüncelerinde aşırı genelleme eğilimindedirler',
      'Kendilerine yapılan gerçek ya da hayali haksızlıklar üzerinde kızgın bir biçimde sürekli düşünme eğilimindedirler',
      'Delüzyonlar ya da referans fikirleri olabilir, büyüklük (grandiozite) elemanları, en azından benmerkezci tarzda olabilir',
      'Gerçekte kızgınlıklarını (ve diğer psikolojik problemleri) inkar ederler ve kızgınlığı başkalarına yüklerler',
      'Yansıtmayı şeffaf bir biçimde kullanarak yaparlar',
      'Kızgınlıklarını fark ettiklerinde, bunu kafalarında iyi bir şekilde rasyonalize eder ve kendilerini haklı çıkarırlar'
    ],
    additionalNotes: [
      'Kızgınlığa sıklıkla yargılamanın kötü olması, içgörü eksikliği ve impülsivite eşlik eder',
      'Saldırı, ilaç kötü kullanımı ya da bağımlılığı ve intihar girişimlerinin hepsi olabilir',
      'Kişiler arası evlilik ve cinsel uyum sorunları tipiktir',
      'K testi 50 T puanının altında, test 5,4 ve 6\'nın 5T puanı alanı içinde ve/veya alt test 9 ve 2 de 70 T puanının üzerinde olduğu durumlarda impuls kontrolünde azalma vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '648': {
    code: '648',
    title: '648 Kodu (468 ile aynı)',
    description: '468 koduna benzer özellikler gösterir.',
    characteristics: ['468 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '65': {
    code: '65',
    title: '65/56 Kodu',
    description: 'Bu kod tipindeki bireyler hakkında çok az bilgi vardır.',
    characteristics: [
      'Genel olarak duygularının incinmesi konusunda aşırı duyarlıdırlar',
      'Başkaları ile duygusal ilişkiye girmede kendilerine güvenmezler, bundan korkarlar',
      'Eğer başkaları onlardan bir şey isterlerse sinirlenirler',
      'Çoğunluğunun eğitim düzeyi yüksektir ve kariyer sahibi kişilerdir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '56': {
    code: '56',
    title: '56 Kodu (65 ile aynı)',
    description: '65 koduna benzer özellikler gösterir.',
    characteristics: ['65 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '67': {
    code: '67',
    title: '67/76 Kodu',
    description: 'Oldukça nadir görülür. Bireyler gergin, kaygılı, aşırı duyarlı ve sıklıkla çabuk küsen kişilerdir.',
    characteristics: [
      'Başkalarının kendilerine haksızlık ettiğini düşünerek ilişkilerini bozarlar',
      'Aşağılık ve/veya suçluluk duyguları vardır ve bunu diğerlerine yansıtırlar'
    ],
    additionalNotes: [
      'Eğer 6 alt testi 7\'den daha yüksekse ya da ikisi aynı düzeydeyse, obsesif-kompulsif bozukluktan psikotik döneme bir geçiş olabileceği dikkate alınmalıdır',
      'Alt test 6, 7\'den daha yüksek ya da aynı düzeyde ise obsesif kompulsif bozukluktan şizofreniye geçiş olasıdır',
      'Olası Tanı: Dekompanse obsesif kompulsif bozukluk'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '76': {
    code: '76',
    title: '76 Kodu (67 ile aynı)',
    description: '67 koduna benzer özellikler gösterir.',
    characteristics: ['67 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '678': {
    code: '678',
    title: '678/876 Kodu',
    description: '6 ve 8, 7\'den yüksek ise bu psikotik vadiyi oluşturur. Ciddi psikopatolojileri vardır.',
    characteristics: [
      'Şizofrenik bozukluklardan paranoid tip tanısı konulabilir',
      'Halüsinasyonlar, delüzyonlar ve aşırı şüphelerle birlikte görülür',
      'Affektleri donuktur',
      'Ürkek, içedönük, sosyal ilişkilerde çekingen ama alkol aldıklarında agresif olan kişilerdir',
      'Bellek ve konsantre olmada sorunları olabilir',
      'Fantezi ve hayal aleminde yaşarlar',
      'Geçmiş ya da hayali hatalar üzerinde ruminatif biçimde düşünürler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '876': {
    code: '876',
    title: '876 Kodu (678 ile aynı)',
    description: '678 koduna benzer özellikler gösterir.',
    characteristics: ['678 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '679': {
    code: '679',
    title: '679 Kodu',
    description: 'Aşırı duyarlı ve katıdırlar.',
    characteristics: [
      'Sosyal ve iş yaşamlarında, kendilerini bastırılmış hissederler',
      'Şüphecidirler ve güvensizlik duyarlar',
      'Çabuk gücenirler ve öfke patlamaları vardır',
      'İmpulsif dönemlerini, dönemsel suçluluk ve kendine yönelme izlemektedir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '68': {
    code: '68',
    title: '68/86 Kodu (Ayrıca 468/648, 486/846, 489/849 kodlarına bakınız)',
    description: 'Bu kodu alan kişilerde yoğun aşağılık duyguları dikkati çeker.',
    characteristics: [
      'Kendilerine güvenleri ve saygıları yoktur',
      'Mutsuz, sinirli, negativist olarak tanımlanır',
      'Hem ergenlerde hem de yetişkinlerde ciddi psikopatolojiyi gösterir',
      'F alt testi de yükselmiştir, birey kabul edilmeyen yaşantılar getirir',
      'Düşünce sürecindeki bozukluklar aşırı genellemeler, yanlış yorumlamalar ve delüzyonlarla kendini gösterir',
      'Duygusal uygunsuzluk, aşırı idealleştirme, şüphe, güvensizlik, konsantre olmada güçlük vardır',
      'Gerçek ile bağlantı kopukluğu ve bozuk kişiler arası ilişkiler vardır'
    ],
    additionalNotes: [
      'Paranoid vadinin olduğu durumlarda paranoid şizofreni düşünülmelidir',
      'Bunlara depresyon ya da korkular ve fobiler eşlik eder',
      'Cinselliğe ilişkin içsel çatışmalar vardır',
      'Tipik olarak sosyal açıdan içe çekilmiş ya da izoledirler (yetişkinlerin çoğu yalnızdır)',
      'Zamanlarının çoğunu kendi kurdukları fanteziler ile geçirirler',
      'Eğer evli iseler, eşleri duygusal açıdan içe çekilmiş ve yabancıdır',
      'Davranış açısından bu bireyler yordanamaz, 4\'ün yükseldiği durumlarda bu daha da zor olmaktadır',
      'Olası Tanı: Paranoid durum, Paranoid şizofreni (6 ve 8 alt testleri 75 T puanının üstünde ise), Şizoid kişilik'
    ],
    conditions: {
      ageConditions: [
        {
          ageRange: 'Yetişkin',
          effect: 'Yetişkinlerin çoğu işlerini devam ettirirler, bu da oldukça şaşırtıcıdır. Yalnız herhangi bir dış etkenle bağlantılı olmadan yorgunluk, yetersizlik ve konsantre olamama ile belirgin psikotik dönemler görülür',
          characteristics: []
        },
        {
          ageRange: 'Ergen',
          effect: 'Ergenlerde genellikle saldırganlık nöbetleri (eğer K 50 T puanının altında ise) kötü arkadaş ilişkileri vardır',
          characteristics: [
            'Zamanlarının çoğunu kavga etmekle geçirirler',
            'Derslerinde başarısızdırlar',
            'Aile içinde ciddi cezalandırmalar ve dayak vardır'
          ]
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '86': {
    code: '86',
    title: '86 Kodu (68 ile aynı)',
    description: '68 koduna benzer özellikler gösterir.',
    characteristics: ['68 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '680': {
    code: '680',
    title: '680/860 Kodu',
    description: 'Hastalarda paranoid şizofrenide görülen paranoid özellikler ve düşünce bozukluğu vardır.',
    characteristics: [
      'Sistemli hezeyanlar görülebilir',
      'Hastalar gerginlik, kaygı, depresyon yakınmaları ile kişisel sıkıntılarını ifade ederler',
      'Sosyal olarak izole ve çekiniktirler',
      'Sosyal ilişkilerde düşmanlık ve şüphe hakimdir',
      'Davranışlar genellikle sosyal açıdan uygun değildir ve önceden tahmin edilemez'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '860': {
    code: '860',
    title: '860 Kodu (680 ile aynı)',
    description: '680 koduna benzer özellikler gösterir.',
    characteristics: ['680 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '69': {
    code: '69',
    title: '69/96 Kodu (Ayrıca 698/968 kodlarına bakınız)',
    description: 'Hastalar gergin ve anksiyöz kişilerdir.',
    characteristics: [
      'Grandiözite ve egosantrik sezgiler içindedirler',
      'Heyecanlı ve enerjiktirler',
      'Belirgin olan kızgınlık ve hostilitelerini, sosyal açıdan kabul edilebilir bir biçimde dışsallaştırmada güçlükleri vardır',
      'Düşünce bozukluğunun varlığı halinde bunun manik ya da şizofrenik özellikler mi olduğu gözden geçirilmelidir'
    ],
    additionalNotes: [
      'Kod daha çok kadınlarda görülmektedir',
      'Bu koddaki kadınlar gergin, daldan dala atlayan, küçük durumlara aşırı tepki veren kişilerdir',
      'Durumları, kendileri için tehdit olarak alırlar',
      'Gürültücü, ilgi çekici, sinirli ve şüpheci olma eğilimi içindedirler',
      'Neyi, niçin yaptıklarını açıklama eğilimindedirler',
      'Aile öykülerinde aşırı koruyucu ve sevecen bir anne vardır, ancak çok sert disiplin verirler',
      'Baba genellikle karışmayan bir kişidir',
      'Kadınlar duygusal ilişkiye girmekten korkarlar, diğerleri ile aralarına mesafe koyarlar',
      'Eleştiriye aşırı duyarlıdırlar ve güvensizlikleri kroniktir',
      'Olası Tanı: Manik bozukluğun bazı tipleri, Akut psikotik epizod, Alt test F ve Sc yüksekse paranoid şizofreni'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '96': {
    code: '96',
    title: '96 Kodu (69 ile aynı)',
    description: '69 koduna benzer özellikler gösterir.',
    characteristics: ['69 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '694': {
    code: '694',
    title: '694/964 Kodu',
    description: 'Hastaların sosyal, aile ve iş yaşamları hostilitelerine, yargılamalarının bozukluğuna ve duygularını kontrol edememelerine bağlı olarak bozuktur.',
    characteristics: [
      'İçgörüleri yoktur ve suçu diğerlerinin üstüne atma tipiktir',
      'Saldırma, mücadele etme ve hatta cinayet potansiyeli değerlendirilmelidir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '964': {
    code: '964',
    title: '964 Kodu (694 ile aynı)',
    description: '694 koduna benzer özellikler gösterir.',
    characteristics: ['694 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '698': {
    code: '698',
    title: '698/968 Kodu',
    description: '69/96 kodunda tanımlanan birey tipine ek olarak bu bireylerde ruhsal karışıklık, konfüzyon, düşünce ve dikkat toplamada güçlük vardır.',
    characteristics: [
      'Delüzyonlar, paranoid şüphe ve halüsinasyon da vardır',
      'Eğer 8 alt testi, 6\'dan 5T puanı aşağıda ise 68/86 koduna bakın'
    ],
    additionalNotes: [
      'Olası Tanı: Şizofreni paranoid tip'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '968': {
    code: '968',
    title: '968 Kodu (698 ile aynı)',
    description: '698 koduna benzer özellikler gösterir.',
    characteristics: ['698 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '60': {
    code: '60',
    title: '60/06 Kodu',
    description: 'Erkeklerde çok az görülür, genç kadınlarda hemen hemen hiç görülmeyebilir. Kadınlarda özellikle 30 yaşından sonra rastlanır.',
    characteristics: [
      'Utangaç, içeçekilmiş, ve kişilerarası ilişkilerde huzursuzdurlar',
      'Diğerlerinin kendilerini sevmediğini ya da kabul etmediğini düşünürler',
      'Eleştiriye aşırı duyarlıdırlar',
      'Kendilerini aşağılanmış hissettikleri için reddedilmeyi kolaylıkla kabul ederler',
      'Duygularında oldukça mükemmeliyetçi ve aşırı kontrollüdür'
    ],
    conditions: {
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'Erkeklerde çok az görülür',
          characteristics: []
        },
        {
          gender: 'Kadin',
          effect: 'Genç kadınlarda hemen hemen hiç görülmeyebilir. Kadınlarda özellikle 30 yaşından sonra rastlanır',
          characteristics: []
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '06': {
    code: '06',
    title: '06 Kodu (60 ile aynı)',
    description: '60 koduna benzer özellikler gösterir.',
    characteristics: ['60 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '456': {
    code: '456',
    title: '456 Alt Testlerinin Örüntüsü',
    description: 'Genellikle kadınlarda görülen bir örüntüdür.',
    characteristics: [
      'Bu örüntüye alt test 3\'ün yükselmesi eşlik ediyorsa, bu tür kadınlarda, yüzeysel bir sosyallik, diğerlerine yönelik düşmanlık duygularının inkarı söz konusu olabilir',
      'Diğerlerini kontrol ve manipüle etme davranış kalıbını yansıtır',
      'Birey psikolojik yardıma dirençlidir'
    ],
    conditions: {
      genderConditions: [
        {
          gender: 'Kadin',
          effect: 'Genellikle kadınlarda görülen bir örüntüdür',
          characteristics: [
            'Yüzeysel bir sosyallik',
            'Diğerlerine yönelik düşmanlık duygularının inkarı',
            'Diğerlerini kontrol ve manipüle etme davranış kalıbı',
            'Psikolojik yardıma dirençlidir'
          ]
        }
      ]
    },
    ageGroup: 'Tüm',
    gender: 'Kadin'
  }

  // ✅ TÜM PA KODLARI TAMAMLANDI 
  // Sistematik ekleme süreci tamamlandı - Dokümandaki tüm Pa kodları eksiksiz alındı
};
