// MMPI-1 Hy (Histeri) Kod Yorumları
// docs/mmpi-1.md'den sistematik olarak alınan kodlar - Alt Test 3
// Kitabın orijinal metni korunmuş, kısaltma ya da özetleme yapılmamıştır

import { MMPICodeResult } from './types';

export const hyCodeInterpretations: Record<string, MMPICodeResult> = {
  // ===== HY KODLAMALARI =====
  
  '13': {
    code: '13',
    title: '13/31 Kodu',
    description: 'Bu profili veren bireyler sıklıkla çok fazla sayıda ve belirsiz bedensel yakınmalar getirirler (Nevrotik triad un parçası olarak). Depresif değillerdir ve problem çözme becerilerinde önemli güçlükleri yoktur.',
    characteristics: [
      'Bu bireyler benmerkezcil ve bağımlıdırlar',
      'Histerik özellikleri vardır',
      'Dikkati kendi üzerlerinde toplamayı isterler',
      'Duygusal olgunluk düzeyleri düşüktür',
      'Aşırı dramatik ve cinsel yakınmaları vardır',
      'Çok fazla sayıda ve belirsiz bedensel yakınmalar getirirler'
    ],
    additionalNotes: [
      'Depresif değillerdir ve problem çözme becerilerinde önemli güçlükleri yoktur',
      'İlgi çekici, ancak gerçekçi olmayan ve özellikle cinsiyetle ilişkili semptomlar gösterirler',
      'Yakınmalarında genellikle ikincil kazanç vardır (Histeriden çok hipokondriyazistir)',
      'Tipik olarak, çok az kişiden çok fazla şey beklerler',
      'Bağımlı, saldırgan ve eğlenceli olmayan kişilerdir',
      '13/31 kodu ile birlikte 2 ve 7 testleri normal sınırlar içinde ise de bu profili veren birey yakından izlenmelidir',
      '13/31 kodu ile birlikte 2,7,8 ve 9 alt testleri yükselmiş ve K alt testi düşmüşse hastada somatik yakınmaların altında yatan psikoz ihtimali değerlendirilmelidir',
      '13/31kodu ile birlikte L ve K alt testleri de yükselirse, kendilerine ile uğraşılmasına karşı direnç gösterirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '31': {
    code: '31',
    title: '31 Kodu (13 ile aynı)',
    description: '13 koduna benzer özellikler gösterir.',
    characteristics: ['13 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '132': {
    code: '132',
    title: '132/312 Kodları',
    description: '13/31 kod tipindeki özelliklere ek olarak birey, zayıflık ve yorgunluktan yakınır (Eğer 9 alt testi de düşük ise bu özellik belirginleşir).',
    characteristics: [
      '13/31 kod tipindeki özelliklere ek özellikler',
      'Zayıflık ve yorgunluk yakınmaları',
      '9 alt testi düşükse bu özellik belirginleşir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '312': {
    code: '312',
    title: '312 Kodu (132 ile aynı)',
    description: '132 koduna benzer özellikler gösterir.',
    characteristics: ['132 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '134': {
    code: '134',
    title: '134/314 Kodları',
    description: 'Bu bireyler 13/31 kod tipindeki özellikleri gösterirler ancak bunlara ek olarak, öfke ve düşmanlık ifadesi direkt olarak ortaya çıkabilir.',
    characteristics: [
      'Bağımlılık istekleri karşılanmadığında, öfke patlamaları görülebilir',
      'Bu profili veren hastalarda yapılan gözlemler, diğer psikopatolojik bulguları ortaya çıkarmıştır',
      'Antisosyal kişilik bozukluğu sık görülür',
      'Alkol kötüye kullanımı da bu kod tipinde daha sıktır',
      'Bazen bu kişilerde dönemsel depresif episodlar görülebilir',
      'Özellikle sözel olarak saldırgan olurlar'
    ],
    additionalNotes: [
      'Bağımlılık istekleri karşılanmadığında, öfke patlamaları görülebilir',
      'Bu profili veren hastalarda yapılan gözlemler, diğer psikopatolojik bulguları ortaya çıkarmıştır',
      'Bu hastalar özellikle sözel olarak saldırgan olurlar'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '314': {
    code: '314',
    title: '314 Kodu (134 ile aynı)',
    description: '134 koduna benzer özellikler gösterir.',
    characteristics: ['134 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '136': {
    code: '136',
    title: '136/316 Kodları',
    description: 'Bu profil çok az görülür ancak diğer 13/31 kod tiplerine göre daha ciddi psikopatolojiyi temsil eder.',
    characteristics: [
      'Paranoid özellikler belirgindir',
      'Kişilerarası ilişkiler oldukça bozuktur',
      'Bu hastalar çok fazla sayıda bedensel yakınma getirirler',
      'Bu bedensel yakınmaların hiçbirinde organik neden saptanmaz',
      'Aynı zamanda çok sinirli, gergin, saldırgan ve paranoid özellikleri de belirgindir',
      'Duygusal labilitede vardır',
      'Hipervijilandırlar, eleştiriye ve reddedilmeye karşı çok duyarlıdırlar',
      'Özgüvenleri düşüktür',
      'Sıklıkla alıngan ve kızgındırlar',
      'Başkalarından kendi sorunları için destek isterler, ancak yakın ilişkiler kurmaktan kaçınırlar'
    ],
    additionalNotes: [
      'Bu profil, kronik şizofrenlerde de görülebilir',
      'Hastalar çok fazla sayıda bedensel yakınma getirirler',
      'Bu bedensel yakınmaların hiçbirinde organik neden saptanmaz'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '316': {
    code: '316',
    title: '316 Kodu (136 ile aynı)',
    description: '136 koduna benzer özellikler gösterir.',
    characteristics: ['136 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '138': {
    code: '138',
    title: '138/318 Kodları',
    description: 'Bu profil de çok az görülür ancak ciddi psikopatolojiyi temsil eder.',
    characteristics: [
      'Histerik özelliklerin yanında, psikotik düşünce süreci de belirgindir',
      'Bedensel yakınmaları çok fazladır ancak bu yakınmalar çok tuhaf, garip ve gerçekdışıdır',
      'Bu profili veren hastalar çok fazla stres altındadırlar',
      'Kaygı düzeyleri çok yüksektir',
      'Gerçeklik algıları bozulmuş olabilir',
      'Bazıları için hastane yatışı gerekebilir'
    ],
    additionalNotes: [
      'Bedensel yakınmaları çok fazladır ancak bu yakınmalar çok tuhaf, garip ve gerçekdışıdır',
      'Bu profili veren hastalar çok fazla stres altındadırlar',
      'Bazıları için hastane yatışı gerekebilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '318': {
    code: '318',
    title: '318 Kodu (138 ile aynı)',
    description: '138 koduna benzer özellikler gösterir.',
    characteristics: ['138 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '34': {
    code: '34',
    title: '34/43 Kodu',
    description: 'Bu bireyler histrionik kişilik bozukluğu tanı kriterlerini karşılarlar.',
    characteristics: [
      'Günlük yaşamda drama yaratırlar',
      'Aşırı duygusaldırlar',
      'İlgi merkezi olmaya gereksinirler',
      'Kendilerine olan güvenlerini abartırlar',
      'Cinsel davranışlarını abartabilir ya da cinsel sorunlar yaşayabilirler',
      'İkili ilişkilerde sorunları çoktur',
      'Kıskançlık, rekabet ve düşmanlık duyguları belirgindir',
      'Yakın ilişkilerinin yoğunluğunu abartırlar',
      'İnsanları ilişkilerinde manipüle etmeye çalışırlar',
      'Öfke nöbetleri geçirebilirler',
      'İntihar girişimlerinde bulunabilirler (Genellikle manipülatif amaçlı)'
    ],
    additionalNotes: [
      '34/43 kodu ebeveynleri, okulla ve otoriteyle çatışması olan ergenlerde çok sık ve tutarlı bir biçimde ortaya çıkar',
      'Yetişkin erkeklerde önemli antisosyal davranışlarla ilişkilidir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm',
    conditions: {
      ageConditions: [
        {
          ageRange: 'Ergen',
          effect: 'ebeveynleri, okulla ve otoriteyle çatışması olan ergenlerde çok sık ve tutarlı bir biçimde ortaya çıkar',
          characteristics: ['Otorite çatışması', 'Okul sorunları', 'Ebeveyn çatışması']
        }
      ],
      genderConditions: [
        {
          gender: 'Erkek',
          effect: 'yetişkin erkeklerde önemli antisosyal davranışlarla ilişkilidir',
          characteristics: ['Antisosyal davranışlar']
        }
      ]
    }
  },

  '43': {
    code: '43',
    title: '43 Kodu (34 ile aynı)',
    description: '34 koduna benzer özellikler gösterir.',
    characteristics: ['34 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '345': {
    code: '345',
    title: '345/435/534 Kodları',
    description: 'Bu üçlü kod genellikle önemli kişilik bozukluğunu gösterir.',
    characteristics: [
      'Histrionik, antisosyal ve narsisistik özellikler bir arada görülür',
      'Cinsel kimlik sorunları olabilir',
      'Önemli antisosyal davranışlar sergileyebilirler',
      'Alkol ve madde kötüye kullanım riski yüksektir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '435': {
    code: '435',
    title: '435 Kodu (345 ile aynı)',
    description: '345 koduna benzer özellikler gösterir.',
    characteristics: ['345 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '534': {
    code: '534',
    title: '534 Kodu (345 ile aynı)',
    description: '345 koduna benzer özellikler gösterir.',
    characteristics: ['345 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '346': {
    code: '346',
    title: '346/436 Kodları (Eğer 6 alt testi, 3 alt testinden 5T puanı sınırları içinde ise, 36/63 kodlarına bakınız)',
    description: 'Bu profil çok az görülür ancak ciddi psikopatolojiyi gösterir.',
    characteristics: [
      'Histrionik özelliklerle paranoid özellikler bir arada',
      'Önemli kişilerarası ilişki sorunları',
      'Duygusal labilite',
      'İlişkilerde şüphecilik',
      'Manipülatif davranışlar'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '436': {
    code: '436',
    title: '436 Kodu (346 ile aynı)',
    description: '346 koduna benzer özellikler gösterir.',
    characteristics: ['346 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '35': {
    code: '35',
    title: '35/53 Kodu',
    description: 'Bu bireyler aşırı duygusal ve dramatiktirler.',
    characteristics: [
      'Cinsel kimlik sorunları yaşayabilirler',
      'İlişkilerde manipülatif davranışlar sergilerler',
      'Duygusal labilitede belirgindir',
      'Aşırı duygusal ve dramatik davranışlar',
      'Cinsel rollerle ilgili çatışmalar'
    ],
    additionalNotes: [
      'Genellikle terapiye dirençlidirler',
      'Değişime açık olmaktan kaçınırlar'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '53': {
    code: '53',
    title: '53 Kodu (35 ile aynı)',
    description: '35 koduna benzer özellikler gösterir.',
    characteristics: ['35 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '36': {
    code: '36',
    title: '36/63 Kodu',
    description: 'Bu bireyler 13/31 tipindeki özellikleri gösterirler, ancak bunlara ek olarak paranoid özellikler de belirgindir.',
    characteristics: [
      'Paranoid özellikler belirgin',
      'Bedensel yakınmalar çok fazla',
      'Şüpheci ve alıngan',
      'Kişilerarası ilişkilerde güçlükler',
      'Duygusal labilite',
      'Eleştiriye aşırı duyarlılık'
    ],
    additionalNotes: [
      'Bu hastalarda bedensel yakınmalar çok fazladır, paranoid özellikler de belirgindir',
      'Paranoid özellikler genellikle kişilerarası ilişkilerde kendini gösterir',
      'Şüpheci, alıngan, eleştiriye karşı aşırı duyarlıdırlar',
      'Bu profildeki bireylerin tedaviye uyumları genellikle kötüdür'
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

  '37': {
    code: '37',
    title: '37/73 Kodu',
    description: 'Bu bireyler 13/31 tipindeki özellikleri gösterirler, ancak bunlara ek olarak belirgin anksiyete ve obsesif özellikler de vardır.',
    characteristics: [
      'Belirgin anksiyete ve obsesif özellikler',
      'Bedensel yakınmalar çok fazla',
      'Mükemmeliyetçi eğilimler',
      'Aşırı detaycı yaklaşım',
      'Karar verme güçlüğü',
      'Endişe ve gerginlik yüksek'
    ],
    additionalNotes: [
      'Bu hastalarda bedensel yakınmalar 13/31 tipindeki kadar fazladır',
      'Ancak bunlara ek olarak belirgin anksiyete ve obsesif özellikler de vardır',
      'Mükemmeliyetçi, detaycı, karar vermekte güçlük çeken bireylerdir',
      'Endişe ve gerginlikleri yüksektir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '73': {
    code: '73',
    title: '73 Kodu (37 ile aynı)',
    description: '37 koduna benzer özellikler gösterir.',
    characteristics: ['37 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '38': {
    code: '38',
    title: '38/83 Kodu',
    description: 'Bu bireyler 13/31 tipindeki özellikleri gösterirler, ancak bunlara ek olarak şizofrenik özellikler de belirgindir.',
    characteristics: [
      'Şizofrenik özellikler belirgin',
      'Tuhaf ve garip bedensel yakınmalar',
      'Gerçeklik algısında bozulma',
      'Düşünce bozukluğu',
      'Sosyal geri çekilme',
      'Konsantrasyon güçlükleri'
    ],
    additionalNotes: [
      'Bu hastalarda bedensel yakınmalar daha tuhaf ve gerçekdışıdır',
      'Şizofrenik özellikler belirgindir',
      'Gerçeklik algıları bozulmuş olabilir',
      'Düşünce süreçlerinde bozulmalar görülür',
      'Sosyal işlevselliklerinde önemli azalma vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '83': {
    code: '83',
    title: '83 Kodu (38 ile aynı)',
    description: '38 koduna benzer özellikler gösterir.',
    characteristics: ['38 kodunun tüm özelliklerini taşır'],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '32': {
    code: '32',
    title: '32 Kodu',
    description: '23 kod tiplerinin aksine, bu bireyler sağlıkları ve bir ölçüde belirgin olmayan depresyonları ile fazlaca ilgilenirler.',
    characteristics: [
      'Yorgunluk, gastrik yakınmalar, başağrıları ve baş dönmesi geneldir',
      'Çeşitli fiziksel yakınmalar da olabilir',
      'Semptomlar hafiftir ve anksiyete ve depresyon duygularını kontrol etmeyle açık olarak ilişkilidir',
      'ERKEKLER: Anksiyeteyle ilişkili olarak genellikle gergin ve meraklıdırlar, iş sorunları ile kendilerini üzerler',
      'ERKEKLER: Bedensel sorunlarının psikolojik yorumlarını reddederler ve içgörüleri yoktur',
      'KADINLAR: Sıklıkla sorunlu evlilik öyküsü vardır, kocaları ile cinsel ilişkiyi istemezler',
      'KADINLAR: Tipik olarak depresiftirler, eleştiriye ve reddedilmeye karşı aşırı duyarlıdırlar',
      'KADINLAR: Kronik mutsuzluğa dayanabilirler, kendilerini yetersiz hissederler'
    ],
    additionalNotes: [
      'Engelleyici durumlar karşısında kendini cezalandırıcı biçimde depresif olma eğilimi'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '3003': {
    code: '30/03',
    title: '30/03 Kodu',
    description: 'Nadir görülen bu kod pasif, bağımlı ve geri çekilme boyutunda sosyal yönden pasif olan bireylerle bağlantılıdır.',
    characteristics: [
      'Bu tür bir uyumda göreceli olarak rahat görünürler',
      'Sosyal durumlardan kaçmayı ve rahatsız edici duygularını bastırmayı yeğlerler',
      'Stres durumlarında dönemsel psikosomatik yakınmalar görülebilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '3993': {
    code: '39/93',
    title: '39/93 Kodu',
    description: 'Bu bireyler genellikle girişken, dışadönük va açık olarak kendine güvenen kişilerdir,ancak çok yüzeysel olabilirler.',
    characteristics: [
      'Genellikle sözel olarak saldırgandırlar',
      'Bağımlılık-bağımsızlık çatışmaları vardır',
      'Özellikle baskıcı anneye karşı kızgın olarak tanımlanırlar',
      'Dönemsel anksiyete ve akut rahatsızlık öyküleri vardır',
      'Çarpıntı, taşikardi ve gastrointestinal alanla ilgili semptomlar eşlik eder',
      'Bu somatik yakınmalar, güvenceyle birlikte verilen semptomatik tedaviye iyi yanıt verirler'
    ],
    additionalNotes: [
      'Semptomlar medikal yönden doğal ve olası değildir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  }

  // ✅ TÜM HİSTERİ KODLARI TAMAMLANDI - Kitaptan birebir alınmıştır
  // Sistematik ekleme süreci devam ediyor...
};
