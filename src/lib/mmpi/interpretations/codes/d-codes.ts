// MMPI-1 D (Depresyon) Kod Yorumları
// docs/mmpi-1.md'den sistematik olarak alınan kodlar - Alt Test 2
// Kitabın orijinal metni korunmuş, kısaltma ya da özetleme yapılmamıştır

import { MMPICodeResult } from './types';

export const dCodeInterpretations: Record<string, MMPICodeResult> = {
  // ===== D KODLAMALARI =====
  
  '21_d': {
    code: '21',
    title: '21/12 Kodu (D Perspektifinden)',
    description: 'Depresyon, gerginlik-kaygının daha ön planda olması dışında 12 koduna benzerdir. Depresyon genellikle apatiktir.12 kodlarında olduğu gibi dışavurma görülmez (1234/ kodları hariç)Bu bireylerin psikoterapiden yarar sağlamaları güçtür.',
    characteristics: [
      'Bu kod, yaş arttıkça daha sıklıkla görülür ve erkeklerde kadınlardan daha fazladır',
      'Sıklıkla test 3 ve 7, üçüncü en yüksek testlerdir',
      'Depresyon genellikle apatiktir',
      'Dışavurma görülmez (1234 kodları hariç)',
      'Psikoterapiden yarar sağlamaları güçtür'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek' // erkeklerde kadınlardan daha fazla
  },

  '23': {
    code: '23',
    title: '23 Kodu',
    description: 'Bireyler kendilerini sıklıkla (özellikle düşük 9) zayıf, yorgun ya da tükenmiş hissederler ve bunların depresyonu genellikle uzun sürelidir. Mutsuzluğu tolere ederler ve görevlere başlayamadıkları başladıklarında tamamlayamadıkları için düşük bir etkinlik düzeyinde fonksiyon gösterirler.',
    characteristics: [
      'Kod, histeroid savunmaların yetersiz kullanılışı sonucu ortaya çıkar',
      'Hastalar azalmış aktivite düzeyi, apati ve çaresizlik içeren depresyon gösterirler',
      'Bu depresif semptomatoloji, histeroid mekanizma ve savunmaların yetersiz kullanımı sonucu ortaya çıkmış olabilir',
      'Hastalar kişilik özellikleri olarak immatür, yetersiz ve bağımlı olarak tanımlanırlar',
      'Kronik sorunlarına alışmışlardır ve yıllar boyunca bu azalmış etkinlik düzeyinde işlevlerini sürdürürler',
      'Bedensel yakınmalar, sıklıkla histerik niteliktedir ve değişkendir',
      'Bu hastalar psikoterapiye dirençlidir, çünkü kronik sorunlarına nasıl uyum yapacaklarını öğrenmişlerdir ve en düşük etkinlik düzeyinde yaşamlarını devam ettirirler',
      'Değişime ilişkin motivasyonları düşüktür'
    ],
    additionalNotes: [
      '23 kodlu erkekler görünüşte çok fazla başarı yönelimlidir ancak sıklıkla işlerinde fark edilmezler',
      'Aşırı kompülsif ve obsesiftirler, detaylara takılırlar ve çok zor karar verirler',
      'Çok çalışmalarına rağmen üretken değillerdir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '213_231_d': {
    code: '213/231',
    title: '213/231 Kodları (D Perspektifinden)',
    description: 'Eğer uygunsa 213/231 kodlarına bakınız.Eğer alt test 3, alt test 2\'nin 5 T puanı alanı içinde ise 32 kodlarına bakınız.',
    characteristics: [
      '213 ve 231 kodlarının özelliklerini taşır',
      'Alt test 3, alt test 2\'nin 5 T puanı alanı içindeyse 32 kodlarına da bakılmalı'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '24': {
    code: '24',
    title: '24/42 Kodu',
    description: 'Bu tür profil veren hasta immatür, bağımlı ve benmerkezcidir. Dürtülerini kontrol etmekte zorluk çekmektedir, ancak şu anda depresyon, pişmanlık ve suçluluk yaşamamaktadır.',
    characteristics: [
      'Sosyal olarak kabul edilmeyen bir biçimde eyleme vurma davranışından sonra, rahatsızlık yaşar',
      'Görünen suçluluk duygusu şiddetli olsa da ( hatta olayla orantılı olmayacak kadar fazla) eyleme vuruk davranışlar, gelecekte döngüsel bir biçimde tekrarlanır',
      'Aile ile ilişki sorunları, iş kaybı öyküsü bu örüntüye eşlik eder',
      'İçki içme, madde kötüye kullanımı ya da alkolizm ve yasal sorunlar sıktır',
      'Çoğunlukla 3,7 ya da 8 üçüncü yükselen testtir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '42': {
    code: '42',
    title: '42 Kodu (24 ile aynı)',
    description: '24 koduna benzer özellikler gösterir.',
    characteristics: ['24 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '25': {
    code: '25',
    title: '25/52 Kodu',
    description: 'Bu koddaki erkekler, içe dönük, pasif, kararsız, depresif ancak idealist bireylerdir.',
    characteristics: [
      'Kaygılı ve geri çekilmişlerdir, somatik yakınma öyküsü verirler ve açık bir biçimde düşünememekten yakınabilirler',
      'Nadiren flört ederler ve genellikle heteroseksüel uyumları göreceli olarak kötüdür',
      'Sıklıkla bu kodda erkeklerde 7,3,4 ya da 0 alt testleri de birlikte yükselir'
    ],
    additionalNotes: [
      'Bu kodda ergenler, genellikle kardeşleri ya da arkadaşları ile ilişkilerinin kötü olması, utangaçlık, aşırı negativizm ya da aşırı duyarlık nedenleri ile başvururlar',
      'Kişilerarası ilişkilerde utangaç, pasif ve çekingen olan bu ergenler sıklıkla mükemmeliyetçilik ve titizlikle birlikte aşırı entellektüalizasyon gösterirler',
      'Genellikle kaygı, suçluluk, aşırı duyarlık, kendini suçlama, depresyon ve sosyal beceriksizlik vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek', // "Bu koddaki erkekler"
    conditions: {
      genderConditions: [{
        gender: 'Kadın',
        effect: 'depresiftirler ve kendilerine yönelmişlerdir, ancak başkalarına dayanmak yerine kendi kendilerine yetmeye çalışırlar',
        characteristics: ['Depresif', 'Kendi kendine yetme çabası', 'Bağımsızlık isteği']
      }]
    }
  },

  '52': {
    code: '52',
    title: '52 Kodu (25 ile aynı)',
    description: '25 koduna benzer özellikler gösterir.',
    characteristics: ['25 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '26': {
    code: '26',
    title: '26/62 Kodu',
    description: 'Alıngan, depresif ve eleştiriye aşırı duyarlı kişilerdir.',
    characteristics: [
      'Bu bireylerde altta yatan güçlü bir kızgınlık duygusu ve sıklıkla süreğen kişiler arası ilişki güçlükleri vardır',
      'Genellikle paranoid eğilim gösterirler',
      'Nötr durumları kötü niyetli olarak değerlendirir ve yetersiz veriye dayanarak sonuç çıkarırlar',
      'Küskünlük, ajitasyon, yorgunluk ve saldırganlık genellikle belirgindir',
      'Sıklıkla bu bireyler, başkaları onları reddetmeden önce onları reddetme düşüncesi ile ya da bağımlı olmaktan kaçınma aracı olarak kavgaya hazırdırlar'
    ],
    additionalNotes: [
      'Pa alt testi belirgin bir biçimde yükseldiğinde ve/veya 4 ve 8 alt testi70T puanının üzerinde ise, bireyin psikozun gelişmesi açısından risk altında olduğu düşünülmelidir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      otherScaleConditions: [
        {
          scale: 'Pa',
          threshold: 65,
          operator: 'higher',
          effect: 'psikozun gelişmesi açısından risk altında',
          characteristics: ['Psikotik risk']
        },
        {
          scale: '4ve8',
          threshold: 70,
          operator: 'higher',
          effect: 'psikozun gelişmesi açısından risk altında',
          characteristics: ['Yüksek psikotik risk']
        }
      ]
    }
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
    description: 'Bu hastalar pasiftir, kişiler arası ilişkilerinde bağımlı olduklarında kendilerini çok rahat hissederler.',
    characteristics: [
      'Korunduklarında ve başkalarının bakımı altına alındıklarında bu duruma çok kolay uyum sağlarlar'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '273': {
    code: '273',
    title: '273/723 Kodları',
    description: 'Bu hastalar pasiftir, kişiler arası ilişkilerinde bağımlı olduklarında kendilerini çok rahat hissederler.',
    characteristics: [
      'Korunduklarında ve başkalarının bakımı altına alındıklarında bu duruma çok kolay uyum sağlarlar'
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

  '274': {
    code: '274',
    title: '274/724 Kodları',
    description: 'Yoğun yetersizlik ve suçluluk duyguları vardır. Kendilerini küçülterek, kendi zayıflık ve yetersizlikleriyle sürekli uğraşırlar.',
    characteristics: [
      'Diğer kişilere olan aşırı bağımlılıklarını kabul etmezler',
      'Çoklu nevrotik belirtilerin gerçek bir düşünce bozukluğunu maskelemesi ihtimali dikkatle incelenmelidir',
      'İntihar düşünceleri, niyeti ve planı sıklıkla görülür',
      'Bu açıdan değerlendirilmelidir',
      'Hastaların olası klinik tanısı depresif reaksiyon olmakla birlikte, kişilik yapıları oldukça kalıcıdır',
      'Temel anksiyetelerini ve davranış biçimlerini değiştirmek zordur'
    ],
    additionalNotes: [
      'Bu koddaki erkekler çoğunlukla annelerine bağımlıdır ve kendileri için de bağımlı ilişki ararlarsa da genellikle buna eşlik eden kontrolü istemez ve ilişkiyi sonlandırırlar',
      'Alt test 3 yükseldiğinde kronik alkolizm olasılığı fazladır, alkol kaygıyı azaltmak ve depresyonla başa çıkmak amacıyla kullanılmaktadır',
      'Bu profildeki kadınlar sıklıkla babaları tarafından ilgi ve övünme nesnesi olmuşlardır',
      'Genellikle, kendilerini izole ederler, zayıf ve çekingen görünmeye çalışırlar (özellikle alt test 5 düşükse)',
      'Diğerleri ile ilişkilerinde güçlükler yaşasalar da evli erkeklerle uzun süreli ilişkileri olabilir'
    ],
    diagnosis: 'Depresif reaksiyon',
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      otherScaleConditions: [{
        scale: '3',
        threshold: 65,
        operator: 'higher',
        effect: 'kronik alkolizm olasılığı fazladır',
        characteristics: ['Kronik alkolizm riski']
      }],
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'çoğunlukla annelerine bağımlıdır',
          characteristics: ['Anne bağımlılığı', 'Bağımlı ilişki arayışı', 'Kontrol istememe']
        },
        {
          gender: 'Kadın',
          effect: 'sıklıkla babaları tarafından ilgi ve övünme nesnesi olmuşlardır',
          characteristics: ['Baba övünme nesnesi', 'Kendini izole etme', 'Zayıf görünme çabası']
        }
      ]
    }
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
    title: '275/725 Kodları',
    description: 'Birey de endişe, depresyon ve aşırı düzeyde aynı şeyler üzerinde durmaya ek olarak, çekingenlik görülür.',
    characteristics: [
      'Kronik bir başarısızlık duygusu ya da kendilik değeri konusunda ambivalansları var gibidir',
      'Kendilerini yetersiz, zayıf, aşağılanmış, suçlu ve pasif olarak tanımlarlar',
      '4 alt testi düşük olduğunda daha belirgindir',
      'Bireyler sürekli olarak başkalarının onları küçümsediği ilişkiler arayarak depresyonları için bedel öderler ve bu tür ilişkilerde çok rahat ederler',
      'Karşı cinsle ilişkilerde güçlükler vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      otherScaleConditions: [{
        scale: '4',
        threshold: 65,
        operator: 'lower',
        effect: 'pasiflik ve çekingenlik daha belirgin',
        characteristics: ['Belirgin pasiflik', 'Çekingenlik']
      }]
    }
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
    title: '278/728 Kodları',
    description: 'Gergin, kaygılı, depresif, aşırı biçimde aynı şeyler üstünde duran ve kendilerine ilişkin kuşkularla dolu olan bu bireylerde intihar düşüncesi ya da girişimi olasılığı yüksektir.',
    characteristics: [
      'Obsesif düşünme, korkular ve fobiler çok görülür, bunların yanı sıra kendi başarısızlıkları üzerinde yoğunlaşırlar',
      'Bu insanlar çoğunlukla çok titiz ve mükemmeliyetçidir, kendileri ve başkaları için çok yüksek standartlar koyarlar ve bu standartlara ulaşamadıklarında çok fazla suçluluk yaşarlar',
      'Aşırı bir biçimde kendilerini sorgulamaları ve kendi kendilerine baskı yapmaları sıklıkla belirli bir şeye odaklanma güçlüklerine ve performansta düşmeye yol açar ve bu da onların depresyon ve kaygısını arttırır',
      'Karşı cinsle, aşk ilişkileri gibi duygusal bağlantılar kurmada özel zorlukları vardır',
      'Sıklıkla bu tür ilişkilerin çok ufak ayrıntıları üzerinde odaklanır ve olması gerekenden daha fazla dikkat eder ve endişelenirler',
      'Kontrol, eleştiri, kabul edilme ve kızgınlığın ifadesi gibi durumlar sorun alanlarıdır'
    ],
    additionalNotes: [
      'Bu kodda, özellikle alt testlerden K ve Hs, 50 T puanının altında olduğunda ve/veya Ma alt testi yükseldiğinde intihar olasılığı dikkatle değerlendirilmelidir',
      'Bu kodda Ma alt testinin yükselmesi, depresyonun ajite yönünü gösterir',
      'Eğer Si alt testi yükselmişse bireyin depresyonu daha çok kroniktir ve buna utangaçlık, içe çekilme ve fiziksel yetersizlik duyguları eşlik eder',
      'Alt testlerden Pd düşük olduğunda pasiflik ve çekingenlik ön plandadır, sıklıkla cinsel ilgilerde azalma ve cinsel yetersizlik buna eşlik eder'
    ],
    diagnosis: 'Obsesif kompulsif bozukluk, Depresif bozukluk',
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      otherScaleConditions: [
        {
          scale: 'K',
          threshold: 50,
          operator: 'lower',
          effect: 'intihar olasılığı dikkatle değerlendirilmeli',
          characteristics: ['İntihar riski yüksek']
        },
        {
          scale: 'Hs',
          threshold: 50,
          operator: 'lower',
          effect: 'intihar olasılığı dikkatle değerlendirilmeli',
          characteristics: ['İntihar riski yüksek']
        },
        {
          scale: 'Ma',
          threshold: 65,
          operator: 'higher',
          effect: 'depresyonun ajite yönünü gösterir ve intihar riski artar',
          characteristics: ['Ajite depresyon', 'İntihar riski yüksek']
        },
        {
          scale: 'Si',
          threshold: 65,
          operator: 'higher',
          effect: 'depresyon daha kronik, utangaçlık ve içe çekilme eşlik eder',
          characteristics: ['Kronik depresyon', 'Utangaçlık', 'İçe çekilme']
        },
        {
          scale: 'Pd',
          threshold: 65,
          operator: 'lower',
          effect: 'pasiflik ve çekingenlik ön planda, cinsel yetersizlik eşlik eder',
          characteristics: ['Pasiflik', 'Çekingenlik', 'Cinsel yetersizlik']
        }
      ],
      genderConditions: [{
        gender: 'Kadın',
        effect: '5 alt testi düşmüşse kendilerine bedel ödeme hissi ve mazohistik kızgınlık',
        characteristics: ['Kendine bedel ödeme', 'Mazohistik davranış', 'Çoklu nevrotik semptomlar']
      }]
    }
  },

  '728': {
    code: '728',
    title: '728 Kodu (278 ile aynı)',
    description: '278 koduna benzer özellikler gösterir.',
    characteristics: ['278 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '270': {
    code: '270',
    title: '270 Kodu',
    description: 'Gergin, depresif, sinirli, kendini aşağılayan, suçluluk duyguları olan kişilerdir.',
    characteristics: [
      'Devamlı aynı konu üzerinde düşünürler; yetersizlik, güvensizlik duyguları vardır',
      'Aşırı kontrollü olmaya çalışırlar, duygularını açığa vurmada zorluk çekerler',
      'Kişiler arası ilişkilerde bağımlıdırlar, kendilerini ortaya koymaktan kaçınırlar',
      'İçe dönük tutumları kronik düzeydedir'
    ],
    diagnosis: 'Şizoid kişilik bozukluğu',
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '28': {
    code: '28',
    title: '28/82 Kodu',
    description: 'Bu kod tipindeki kişiler anksiyete ve ajitasyonla birlikte şiddetli depresyon yaşayan hastalardır.',
    characteristics: [
      'Depresyon ve ajitasyon, genellikle dikkat ve konsantrasyonda azalma, unutkanlık ve konfüzyon hali ortaya çıkabilir',
      'Sıklıkla obsesif ruminasyonlar sergilerler',
      'Düşünce bozukluğu, yorgunluk gibi somatik yakınmalar sık görülür',
      'Kişiler arası ilişkilerden ve aktivitelerden kendilerini izole edip çekilme eğilimleri vardır',
      'İntihar girişimleri olabilir. Dikkat edilmesi gerekir',
      'Bu nedenle prognoz itibariyle hastanın değişmesi ihtimali zayıftır',
      'Bu özelliklerin yanı sıra şizofrenik özellikler de gösterebilirler',
      'İşitsel ve görsel halüsinasyonlar ve sistemli hezeyanlar olabilir',
      'Düşünce bozukluğu değerlendirilmelidir',
      'Garip karakterde somatik semptomlar görülebilir',
      'Deprese, izole ve çekiniktirler',
      'Bu kronik uyum örüntüsü genellikle hastaneye yatmayla son bulur'
    ],
    additionalNotes: [
      'Bu hastalara en sık konulan tanı manik depresif psikoz, melankoli ve şizoaffektif bozukluktur',
      'Özellikle ergenler başkaları ile duygusal bağlar kurmaktan korkarlar, duygusal bağımlılıkları ve cinsellik konusunda çatışmaları vardır',
      'Sıklıkla çocukluk döneminde tekrarlanan incinme öyküsü anlatırlar',
      'Karşı cinsle ilişkileri genellikle çok azdır, üstelik sorunlar yada sapkın davranışlar içerir',
      'Ergenler duygularını uygun olmayan biçimlerde gösterirler, okuldan kaçarlar ve madde kötüye kullanım öyküleri vardır',
      'Bu bireylerde terapötik ilişki kurmak zordur, psikoterapi prognozu kötüdür',
      'Psikofarmakoloji en azından başlangıçta yararlı olabilir'
    ],
    diagnosis: 'Manik depresif psikoz, melankoli, şizoaffektif bozukluk',
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '82': {
    code: '82',
    title: '82 Kodu (28 ile aynı)',
    description: '28 koduna benzer özellikler gösterir.',
    characteristics: ['28 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '281': {
    code: '281',
    title: '281/821 Kodları',
    description: '28/82 kodu ile bağlantılı genel özelliklere ek olarak, bu bireylerin çok çeşitli somatik yakınmaları vardır.',
    characteristics: [
      'Genellikle bunlar belirsiz ya da medikal yönden atipiktir ve titremeler, düşünme güçlükleri ya da hatta somatik delüzyonlar içerebilir',
      'Bu örüntü psikotik bir epizoddan önce gelen kendi üzerinde yoğunlaşmayı temsil ediyor olabilir ve genellikle açık bir gerginlik ve entelektüel konfüzyon ile bağlantılıdır',
      'Diğer bireylerde, özellikle test 3 de yükselmişse, bu somatik yakınmalar ve bunlarla bağlantılı davranışlar, terapisti kurtarma davranışlarında bulunmaya teşvik edebilir, ancak birey bu yardımı reddeder'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '821': {
    code: '821',
    title: '821 Kodu (281 ile aynı)',
    description: '281 koduna benzer özellikler gösterir.',
    characteristics: ['281 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '284': {
    code: '284',
    title: '284/824 Kodları',
    description: 'Yetişkinlerde bu kod sıklıkla şizoid ya da şizofrenik durumlarla bağlantılıdır ve F alt testi de yükselmiştir.',
    characteristics: [
      '28/82\'nin özelliklerine ek olarak kızgınlık, isyankarlık, başkalarından uzak ve soğuk olma duyguları güçlü bileşenlerdir',
      'Dürtü kontrolünü kaybetme korkuları çoktur (özellikle Pd alt testi 80\'in üzerinde ise) ve eyleme vuruk davranışlar, garip ve tuhaf şekillerde olur',
      'Sosyal alanlarda ve evlilikte uyumsuzluk olasıdır'
    ],
    additionalNotes: [
      'Ergenlerde bu kod, yetişkinlerde belirtilen devamlı bir patolojiyi temsil etmiyor olabilir',
      'Bunun yerine, bu kod daha çok birçok ergende bulunan isyankarlığı ve sosyal gruptan uzaklaşmayı yansıtır',
      'Dürtü kontrolünde zayıflık vardır ve bunun yanı sıra doğal olmayan davranışlar ve duygularda kısıtlılık görülür, ancak altta yatan patoloji daha az şiddetlidir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      otherScaleConditions: [{
        scale: 'Pd',
        threshold: 80,
        operator: 'higher',
        effect: 'dürtü kontrolünü kaybetme korkuları çok fazla',
        characteristics: ['Dürtü kontrol kaybı korkusu', 'Garip eyleme vuruk davranışlar']
      }]
    }
  },

  '824': {
    code: '824',
    title: '824 Kodu (284 ile aynı)',
    description: '284 koduna benzer özellikler gösterir.',
    characteristics: ['284 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '287': {
    code: '287',
    title: '287/827 Kodları',
    description: 'Bu koddaki bireyler depresyon, kaygı ve tanjansiyel düşünce süreçleri gösterirler, kendilerini insanlardan uzak hissederler, eleştiriye çok fazla duyarlıdırlar ve genelde insanlara güvenmezler.',
    characteristics: [
      'Bunlar çoğu zaman belirli bir şeye odaklanamama, dönmesi epizodları, mental konfüzyon, uykusuzluk, görev ve sorumlulukları yerine getirme yeteneğinin azalması gibi önemli mental güçlükler gösterirler',
      'Ayrıca, değişken ya da uygunsuz duygular, hatta halüsinasyonlar ya da açık düşünce bozuklukları vardır',
      'Tipik olarak bu bireyler, genellikle bağımlılık korkularına bağlı olarak yakın ilişkilerden kaçınırlar ve duygusal bağlanmadan korkarlar',
      'Sıklıkla cinsellik ve kendini ifade etme konularında çatışmaları vardır',
      'İntihar düşünceleri, zihnin sürekli bir şeyle meşgul olması ve tehditler çok olasıdır'
    ],
    additionalNotes: [
      'Eğer K alt testi 50 T puanının altında ise ve Ma alt testi 70 T puanının üzerinde ise bunlar dikkatle değerlendirilmelidir',
      'İntihar çoğunlukla garip biçimlerde gerçekleştirilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      otherScaleConditions: [
        {
          scale: 'K',
          threshold: 50,
          operator: 'lower',
          effect: 'intihar riski yüksek',
          characteristics: ['Yüksek intihar riski']
        },
        {
          scale: 'Ma',
          threshold: 70,
          operator: 'higher',
          effect: 'intihar riski yüksek',
          characteristics: ['Yüksek intihar riski']
        }
      ]
    }
  },

  '827': {
    code: '827',
    title: '827 Kodu (287 ile aynı)',
    description: '287 koduna benzer özellikler gösterir.',
    characteristics: ['287 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '29': {
    code: '29',
    title: '29/92 Kodu',
    description: 'Bu gruptaki kişiler benmerkezci ve narsisistik olma eğilimindedirler. Kendi değerlerini abartırlar.',
    characteristics: [
      'Bu bireyler yüksek bir enerji düzeyine sahiptir, ancak bu depresyon ve kaygı ile bağlantılıdır',
      'Yüksek enerji düzeyi ya da başa çıkmayı ya da bir kontrol kaybını telafi etme girişimini temsil eder'
    ],
    additionalNotes: [
      'Genellikle üç tip birey bu kodu elde eder:',
      '1. Ajite depresyonu olan bireyler: Bireyde ağlama, feryat etme, depresif ruminasyonlar belirgindir. Çocuklar gibi ilgi çekmek için çok fazla duygusal olabilirler.',
      '2. Alttaki depresyonlarıyla manik savunmalar kullanarak başa çıkmaya çalışan bireyler: Bazı bireylerde büyüklük düşünceleri ve inkar, depresyonu maskelemede yeterli olabilir. Ancak çoğunlukla bu savunmalar uzun süre etkili değildir. Bireyde daha sonra çok fazla içki içme davranışı ortaya çıkar.',
      '3. Organik beyin sendromu olan, işlevsellik ve yeteneklerindeki azalmanın farkında ama bunu inkar etmeye ve başkalarından saklamaya çalışan bireyler: Bu bireyler daha önce kolaylıkla yaptıkları şeyleri yapmamanın eksikliğine bağlı ajitasyon göstereceklerdir.'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

    '92': {
    code: '92',
    title: '92 Kodu (29 ile aynı)',
    description: '29 koduna benzer özellikler gösterir.',
    characteristics: ['29 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '243': {
    code: '243',
    title: '243/432 Kodları',
    description: '24/42 kodundaki yorumlarda tanımlanan özelliklere ek olarak bu bireyler kızgınlığı bastırma ve inkar yoluyla duygusal kontrol etmeye çalışırlar.',
    characteristics: [
      'Kızgınlıklarını pasif-agresif biçimlerde ya da (eğer açıksa) öfke patlamaları biçiminde ifade ederler',
      'İmmatürite, bencillik ve başkalarının onları nasıl gördüğüne ilişkin içgörü eksikliği vardır',
      'Eyleme vuruk davranışları olan uçlardaki bireylerle ilişki kurarlar',
      'Bu nedenle de kendi antisosyal eğilimlerini başkası aracılığıyla tatmin ederler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '432': {
    code: '432',
    title: '432 Kodu (243 ile aynı)',
    description: '243 koduna benzer özellikler gösterir.',
    characteristics: ['243 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '247': {
    code: '247',
    title: '247/427/472 ve 742 Kodları (Ayrıca 274 koduna da bakınız)',
    description: 'Bireyin öfkesinden kaynaklanan aile ve evlilik sorunları vardır ancak birey bunu ifade edemez ve sonuçta suçluluk duyguları açığa çıkar.',
    characteristics: [
      'Gergin, endişeli ve sosyal açıdan yetersiz, depresyonu vardır',
      'Depresyonlarını ortadan kaldırma çabası içinde aşırı alkol kullanımı ya da epizodik alkol alımları vardır',
      'Bu bireyler genelde başarısızdırlar',
      'Olası başarısızlık nedeniyle herhangi bir şeyi denemekten korkuyor gibidirler',
      'Sorunlarının açıkça görülmesine karşın bunları kabul etmekte güçlük çekerler'
    ],
    additionalNotes: [
      'Ayrıca 274 koduna da bakınız'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '427': {
    code: '427',
    title: '427 Kodu (247 ile aynı)',
    description: '247 koduna benzer özellikler gösterir.',
    characteristics: ['247 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '472': {
    code: '472',
    title: '472 Kodu (247 ile aynı)',
    description: '247 koduna benzer özellikler gösterir.',
    characteristics: ['247 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '742': {
    code: '742',
    title: '742 Kodu (247 ile aynı)',
    description: '247 koduna benzer özellikler gösterir.',
    characteristics: ['247 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '248': {
    code: '248',
    title: '248 Kodu',
    description: 'Depresyon, küskünlük, aile ve evlilik sorunları çok da olsa, bu tür bireyler 24/42 kod tiplerinden daha az açık kızgınlık biçiminde eyleme vurma davranışı gösterirler.',
    characteristics: [
      'Kızgınlık içeren fanteziler kurarlar',
      'Başkalarına karşı kendilerini güvensiz, uzak ve bağları kopmuş gibi hissederler',
      'Dürtüleri üzerindeki kontrolü kaybetmekten korkarlar',
      'Doğal olmayan, rahatsız edici düşünceler üzerinde çok fazla dururlar',
      'Sıklıkla başkaları tarafından huysuz ve nasıl davranacakları belli olmayan kişiler olarak görülürler',
      'Çeşitli cinsel sorunlar vardır',
      'İntihar düşünceleri ve çok sayıda intihar girişimleri vardır'
    ],
    additionalNotes: [
      'Temel şizofrenik konfigürasyon (Yüksek F ile birlikte)'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '248HighF': {
    code: '248HighF',
    title: '248 Kodu/Yüksek F Kodu',
    description: 'Temel şizofrenik konfigürasyon.',
    characteristics: [
      'Şizofrenik konfigürasyon özellikleri gösterir'
    ],
    additionalNotes: [
      'Yüksek F ile birlikte görülür'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  }
};
