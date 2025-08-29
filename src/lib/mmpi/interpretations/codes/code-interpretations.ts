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
  },

  // 13/31 KODLARI
  '13': {
    code: '13',
    title: 'HİPOKONDRİAZİS-HİSTERİ KODU',
    description: 'Bu alt test hem normal hem de psikiyatrik hastalarda görülür. Bu hastalar genellikle immatur, benmerkezcil ve bağımlıdırlar. Histerik özellikler ve bastırma savunma mekanizmasını gösterirler.',
    characteristics: [
      'Immatur, benmerkezcil ve bağımlıdırlar',
      'Histerik özellikler ve bastırma savunma mekanizması',
      'Dikkat ve ilgi çekmeyi isterler ve bunu oldukça manipulatif bir biçimde yaparlar',
      'Psikolojik sorunlarını somatik yakınmalar haline dönüştürürler',
      'Psikolojik etkenlerin olabileceğini kabul etmezler',
      'Stres altında fiziksel semptomlar gösterirler',
      'Yakınmalarında genellikle ikincil kazanç vardır',
      'Bedensel yakınmaları spesifik ve net olmamakla beraber genellikle baş ağrısı, göğüs ağrısı, sırt ağrısı, uyuşma, el ve ayaklarda aşırı titreme'
    ],
    additionalNotes: [
      'Sıklıkla yorgunluk, baş dönmesi, uyuşukluk ve titreme görülür',
      'Yemek yemekten rahatsızlık ve bulantı gibi yakınmalar olabilir',
      'Bazen anoreksiya ve bulimia görülür',
      'Terapi sırasında sorunlarına hemen çözüm isterler',
      'Semptomların temelinde yatan psikolojik nedenleri kabul etmedikleri için psikolojik nedenleri kabul etmedikleri için bu kişiler geleneksel psikoterapiye dirençlidir',
      'İç görüleri yoktur'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '31': {
    code: '31',
    title: 'HİSTERİ-HİPOKONDRİAZİS KODU',
    description: '13 koduna benzer özellikler gösterir ancak histerik özellikler daha baskındır.',
    characteristics: [
      '13 kodunun özelliklerini taşır',
      'Histerik özellikler daha baskın',
      'Stres durumları ile karşılaşıldığında bedensel yakınmalar ortaya çıkar',
      'İmmatür ve bağımlı özellikler gösterirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '132': {
    code: '132',
    title: 'HİPOKONDRİAZİS-HİSTERİ-DEPRESYON KODU',
    description: '13/31 kod tipindeki özelliklere ek olarak bu kişiler, özellikle zayıflık ve yorgunluktan yakınırlar ve stres yaşarlar.',
    characteristics: [
      '13/31 kodunun tüm özellikleri',
      'Özellikle zayıflık ve yorgunluktan yakınırlar',
      'Stres yaşarlar (eğer 9 alt testi daha düşük ise)',
      'Kendilerinde depresif duygu durum olduğunu inkar etseler de davranışlarında sıklıkla depresif özellikler vardır',
      'Uyumlu ve pasiftirler (Özellikle 4 alt testi düşükse)',
      'Diğerlerinin ilgisi karşısında endişe yaşarlar (Si alt testinde düşüklük varsa)'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '312': {
    code: '312',
    title: 'HİSTERİ-HİPOKONDRİAZİS-DEPRESYON KODU',
    description: '132 koduna benzer özellikler gösterir.',
    characteristics: [
      '132 kodunun özelliklerini taşır',
      'Histerik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '134': {
    code: '134',
    title: 'HİPOKONDRİAZİS-HİSTERİ-PSİKOPATİK SAPMA KODU',
    description: 'Bu bireylerde belirgin olan özellik inatçılık, züppelik, hatta kendini beğenmişliktir. Somatizasyon yakınmaları bu özellikleri nedeniyle ikinci planda kalmaktadır.',
    characteristics: [
      'İnatçılık, züppelik, hatta kendini beğenmişlik',
      'Somatizasyon yakınmaları ikinci planda',
      '13/31 kodlarındaki diğer özellikler de uygun'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '314': {
    code: '314',
    title: 'HİSTERİ-HİPOKONDRİAZİS-PSİKOPATİK SAPMA KODU',
    description: '134 koduna benzer özellikler gösterir.',
    characteristics: [
      '134 kodunun özelliklerini taşır',
      'Histerik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '1342': {
    code: '1342',
    title: 'HİPOKONDRİAZİS-HİSTERİ-PSİKOPATİK SAPMA-DEPRESYON KODU',
    description: 'Bu tür profil veren bireyler bağımlı, immatür kişilerdir. Otistik dönemleri olabilir.',
    characteristics: [
      'Bağımlı, immatür kişilerdir',
      'Otistik dönemleri olabilir',
      'Psikiyatrik olarak depresyon, Anksiyete, sinirlilik dönemleri görülebilir',
      'Anksiyeteyi azaltmak için başağrısı, uykusuzluk gibi somatik yakınmalarda bulunabilirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '136': {
    code: '136',
    title: 'HİPOKONDRİAZİS-HİSTERİ-PARANOYA KODU',
    description: 'Bedensel semptomların (özellikle mide ve baş ağrısı) stres durumlarında ortaya çıkmasına karşın bu kişiler, diğerlerinden gelen istekler karşısında gergin ve aşırı duyarlıdırlar.',
    characteristics: [
      'Bedensel semptomlar stres durumlarında ortaya çıkar (özellikle mide ve baş ağrısı)',
      'Diğerlerinden gelen istekler karşısında gergin ve aşırı duyarlıdırlar',
      'Aşırı benmerkezcil ve narsisistiktirler',
      'Katı ve inatçı olma eğilimi içindedirler',
      'Erkek hastalar rekabetçi, şüpheci, çabuk kızan ve diğerlerini kontrol etmek isteyen bireylerdir',
      'Davranışlarını benmerkezcil olarak rasyonelize etme eğilimindedirler',
      'Diğer insanlarla ilişkilerinde iç görüleri azdır ve onlardan beklentileri çok fazladır'
    ],
    additionalNotes: [
      'Pa alt testi, Hy alt testinden 10 T puanından daha yüksekse şüphecilik ve kızgınlık oldukça belirgindir',
      'Hy alt testi, Pa alt testinden 10 ya da daha fazla T puanı yüksekse paranoid özellikler daha az belirgin olmak üzere fiziksel yakınmalar ön plana çıkabilir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '316': {
    code: '316',
    title: 'HİSTERİ-HİPOKONDRİAZİS-PARANOYA KODU',
    description: '136 koduna benzer özellikler gösterir.',
    characteristics: [
      '136 kodunun özelliklerini taşır',
      'Histerik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '137': {
    code: '137',
    title: 'HİPOKONDRİAZİS-HİSTERİ-PSİKASTENİ KODU',
    description: 'Bu profil veren kişiler esnek değillerdir ve değişiklikler onları rahatsız eder. Genellikle iş ve para konularında değerlendirmeleri gerçekçi değildir.',
    characteristics: [
      'Esnek değillerdir ve değişiklikler onları rahatsız eder',
      'İş ve para konularında değerlendirmeleri gerçekçi değildir',
      'Yaşamlarını eğer evliyseler eşleri yönetir',
      'İş uyumları da bozuktur',
      'Psikoterapiye istekli ve bağlı olabilirler, ancak kendilerindeki saldırganlığı ve diğerlerine yönelik düşmancıl duyguları kabul etmek istemezler',
      'Anksiyete atakları çok sık olmamasına karşın özellikle sağlık ile ilgili konularda fobiler çok görülür'
    ],
    additionalNotes: [
      'Eğer Ma alt testi de yükselmiş ise ve/ya da K alt testi 50 T puanından düşükse bunlar daha da belirgindir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '138': {
    code: '138',
    title: 'HİPOKONDRİAZİS-HİSTERİ-ŞİZOFRENİ KODU',
    diagnosis: 'Borderline kişilik bozukluğu',
    description: 'Bu kişilerde duygudurum ve inançlar çok hızlı değişmektedir, din ve dinle ilgili delüzyonlar ortaya çıkabilir.',
    characteristics: [
      'Duygudurum ve inançlar çok hızlı değişir',
      'Din ve dinle ilgili delüzyonlar ortaya çıkabilir',
      'Belirsiz somatik yakınmaları ve oldukça garip fikir ve inançları vardır',
      'Zaman zaman majör konversiyon reaksiyonları ve hipokonriyak uğraşlar',
      'Şizofrenik reaksiyonları önleyebilir',
      'Erkeklerde homoseksüellikle ilgili korkular yaygındır',
      'Yapılandırılmış durumlarda daha iyi işlev gösterirler'
    ],
    additionalNotes: [
      'Bu gruptaki kişilerin çoğunluğuna borderline kişilik bozukluğu tanısı konabilir',
      'Çocukluk yaşantılarında ruhsal hastalık öyküsü olan bir aile ve/ya da duygusal yoksunlukların olduğu bir dönem vardır',
      'Hatta buna karşı çıkmak için maskülen işler seçerler',
      'Yapılanmamış durumlarda ise garip semptomlar ortaya çıkmaktadır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '318': {
    code: '318',
    title: 'HİSTERİ-HİPOKONDRİAZİS-ŞİZOFRENİ KODU',
    diagnosis: 'Borderline kişilik bozukluğu',
    description: '138 koduna benzer özellikler gösterir.',
    characteristics: [
      '138 kodunun özelliklerini taşır',
      'Histerik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '1382': {
    code: '1382',
    title: 'HİPOKONDRİAZİS-HİSTERİ-ŞİZOFRENİ-DEPRESYON KODU',
    description: '138\'deki yoruma ek olarak dikkate değer depresyon, konfüzyonel düşünce, alkol alımı ve intihar etme düşünceleri vardır.',
    characteristics: [
      '138 kodunun tüm özellikleri',
      'Dikkate değer depresyon',
      'Konfüzyonel düşünce',
      'Alkol alımı',
      'İntihar etme düşünceleri',
      'Sıklıkla yalnızdır ya da evli iseler evlilik uyumları bozuktur',
      'Sürekli olarak bir işten başka bir işe geçerler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '139': {
    code: '139',
    title: 'HİPOKONDRİAZİS-HİSTERİ-HİPOMANİ KODU',
    diagnosis: 'Somatoform bozukluk - Organik beyin sendromu',
    description: 'Baş ağrısı, görme ve işitme yakınmaları, titreme ve koordinasyon bozuklukları ve çok sayıda somatik yakınmalar kişiyi rahatsız etmektedir.',
    characteristics: [
      'Baş ağrısı, görme ve işitme yakınmaları',
      'Titreme ve koordinasyon bozuklukları',
      'Çok sayıda somatik yakınmalar',
      'Engellenme eşiği oldukça düşüktür',
      'Sinirlidirler ve öfke patlamaları vardır',
      'Kişilerarası ilişkilerinde öfke ön plandadır ve boşanmalar oldukça sık görülür',
      'Genellikle mükemmelliği isteyen öyküleri vardır ve ailelerine ilgileri azdır',
      'Alkol alımından sonra düşmanlık duyguları ön plana çıkar'
    ],
    additionalNotes: [
      'Eğer 4 alt testinde yükselme varsa ve K alt testi düşmüşse mücadeleci ve yıkıcı kişi olurlar',
      'Bu kod, çok sık olarak kişilik bozuklukları ya da travmaya eşlik eden kronik beyin sendromu olan olgularda görülür',
      'Seyrek olarak anksiyete bozuklukları ile birliktedir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  // 14/41 KODLARI
  '14': {
    code: '14',
    title: 'HİPOKONDRİAZİS-PSİKOPATİK SAPMA KODU',
    diagnosis: 'Alkolizm - Daha seyrek olarak kadınlarda maskeli depresyon',
    description: 'Erkeklerde kadınlardan daha sık görülür. Benmerkezcil, alıcı, karamsar ve sızlanan kişilerdir. Bu hastaların hipokondriyak uyumları kroniktir.',
    characteristics: [
      'Benmerkezcil, alıcı, karamsar ve sızlanan kişilerdir',
      'Hipokondriyak uyumları kroniktir',
      'Hipokondriyak yakınmaları, özgün olmayan baş ağrıları biçimindedir',
      'Sosyal açıdan dışadönük olarak görülmelerine karşın karşı cinsle ilişkilerinde oldukça rahatsızlık yaşarlar',
      'Aile içi ilişkilerinde isyankardırlar, ancak bu duygularını ifade edemezler',
      'Genel olarak aşırı alkol alımı tabloda görülür',
      'Karşı cinsle ilişki sorunları tanımlarlar',
      'Okul ve iş başarıları düşüktür'
    ],
    additionalNotes: [
      'Kısa süreli septomatik tedaviye iyi yanıt vermekle birlikte uzun süreli tedavide kalamazlar',
      'Alt test 3 de birlikte yükselmiş ise, aile ve evlilik sorunları kızgınlık ve sosyal yetersizlik duyguları ile birlikte bağımlılık ve bağımsızlık çatışmaları ön plana çıkar',
      'Sorunlarının psikolojik olabileceğini inkâr ettiklerinden tedaviye dirençlidirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek'
  },

  '41': {
    code: '41',
    title: 'PSİKOPATİK SAPMA-HİPOKONDRİAZİS KODU',
    diagnosis: 'Alkolizm - Daha seyrek olarak kadınlarda maskeli depresyon',
    description: '14 koduna benzer özellikler gösterir.',
    characteristics: [
      '14 kodunun özelliklerini taşır',
      'Psikopatik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek'
  },

  '143': {
    code: '143',
    title: 'HİPOKONDRİAZİS-PSİKOPATİK SAPMA-HİSTERİ KODU',
    description: 'Çok genel olarak görülen üçlü kodlardan biridir.',
    characteristics: [
      '14/41 kodunun tüm özellikleri',
      'Histeri özellikleri eklenir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '413': {
    code: '413',
    title: 'PSİKOPATİK SAPMA-HİPOKONDRİAZİS-HİSTERİ KODU',
    description: '143 koduna benzer özellikler gösterir.',
    characteristics: [
      '143 kodunun özelliklerini taşır',
      'Psikopatik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '142': {
    code: '142',
    title: 'HİPOKONDRİAZİS-PSİKOPATİK SAPMA-DEPRESYON KODU',
    description: 'Çok genel olarak görülen üçlü kodlardan biridir.',
    characteristics: [
      '14/41 kodunun tüm özellikleri',
      'Depresif özellikler eklenir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '146': {
    code: '146',
    title: 'HİPOKONDRİAZİS-PSİKOPATİK SAPMA-PARANOYA KODU',
    description: 'Antisosyal ya da impuls kontrolünde güçlüğü olan kişilerdir. Kötümser, katı, kolay ilişki kuramayan, başkalarından gelen ilişkilere aşırı duyarlık gösteren bireylerdir.',
    characteristics: [
      'Antisosyal ya da impuls kontrolünde güçlüğü olan kişilerdir',
      'Kötümser, katı, kolay ilişki kuramayan',
      'Başkalarından gelen ilişkilere aşırı duyarlık gösteren bireylerdir',
      'Çevrelerini şaşırtacak derecede düşmanlık gösterirler'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '1463': {
    code: '1463',
    title: 'HİPOKONDRİAZİS-PSİKOPATİK SAPMA-PARANOYA-HİSTERİ KODU',
    description: 'Kızgın, tepkisel insanlardır. Aşırı biçimde karşılarındaki kişiyi suçlarlar.',
    characteristics: [
      'Kızgın, tepkisel insanlardır',
      'Aşırı biçimde karşılarındaki kişiyi suçlarlar',
      'Huzursuz, alıcı, şüpheci, narsisistik, benmerkezcil kişilerdir',
      'Duygusal labilite, anksiyete, gerginlik, manipulatif, impulsif özellikler',
      'Eyleme vuruk davranışlar görülmektedir',
      'İş başarısızlığı ve aile içi ilişki güçlükleri belirgindir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  // 15/51 KODLARI
  '15': {
    code: '15',
    title: 'HİPOKONDRİAZİS-KADINLIK-ERKEKLİK KODU',
    description: 'Yetişkin erkekler yakınan, telaşlı ve eleştiren ve temel olarak pasif bir yaşam biçimine sahiptir. Somatik alanda sorunlar getirirler.',
    characteristics: [
      'Yakınan, telaşlı ve eleştiren',
      'Temel olarak pasif bir yaşam biçimi',
      'Somatik alanda sorunlar getirirler',
      'Genel olarak açık eyleme vuruk davranış yoktur',
      'Nadiren açık çatışma ve kararsızlık gösterirler'
    ],
    additionalNotes: [
      'Bu kodda kadın hasta daha az görülmektedir',
      'Orta ve üst sosyo-ekonomik düzeyden gelen ve eğitimli kadınlarda karamsarlık yakınmaları oldukça fazladır',
      'Bağımlı gibi görünseler de kişilerarası ilişkilerinde yarışmacı ve saldırgan olma eğilimleri vardır',
      'Bunları kontrol edebilmek için somatizasyon yakınmaları getirirler',
      'Eğitim düzeyi düşük kadınlarda saldırganlık daha azdır',
      'Aslında hem kadınlarda hem erkeklerde nadir olarak rastlanan koddur',
      'Çok genel olarak erkeklerde 2,3,4 alt testlerinin de birlikte yükseldiği görülür'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek'
  },

  '51': {
    code: '51',
    title: 'KADINLIK-ERKEKLİK-HİPOKONDRİAZİS KODU',
    description: '15 koduna benzer özellikler gösterir.',
    characteristics: [
      '15 kodunun özelliklerini taşır',
      'Cinsiyet rol karmaşası daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek'
  },

  // 16/61 KODLARI
  '16': {
    code: '16',
    title: 'HİPOKONDRİAZİS-PARANOYA KODU',
    description: 'Bu bireyler katı, inatçı, eleştiriye aşırı duyarlı ve diğerlerini suçlama eğilimde olan kişilerdir.',
    characteristics: [
      'Katı, inatçı, eleştiriye aşırı duyarlı',
      'Diğerlerini suçlama eğilimde olan kişilerdir',
      'Her şeyi baştan savarlar, savunucudurlar',
      'Duygusal ilişkiden endişe duyarlar',
      'Genel olarak öfkelerini, rasyonalizyonu ve yansıtmayı kullanarak gösterirler',
      'Bu gruptaki bireylerde (özellikle ergenlerde) şiddetli öfke patlamaları görülmektedir'
    ],
    additionalNotes: [
      'Alt test 8 de yükselmiş ise alışılmamış somatik uğraşların varlığı dikkate alınmalı, belki de somatik delüzyonların olabileceği düşünülmelidir',
      'Bazı bireylerin bedensel uğraşlarıyla "psikotik bir dönemden" kurtulmaya gayret ederler',
      '16/61 her iki cins için de oldukça nadirdir',
      'Eğer bu tip profil elde edilmiş ise erkeklerde 2 ve 4\'ün, kadınlarda ise 3 ve 8\'in olduğu üçlü bir yükselme vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '61': {
    code: '61',
    title: 'PARANOYA-HİPOKONDRİAZİS KODU',
    description: '16 koduna benzer özellikler gösterir.',
    characteristics: [
      '16 kodunun özelliklerini taşır',
      'Paranoid özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  // 17/71 KODLARI
  '17': {
    code: '17',
    title: 'HİPOKONDRİAZİS-PSİKASTENİ KODU',
    description: 'Bu hastaların bedensel yakınmaları onların yaşadığı gerilim ve kaygıyı yansıtmaktadır. Yüksek enerji düzeyi ve ajitasyonla birlikte çoklu somatik semptomlar görülebilir.',
    characteristics: [
      'Bedensel yakınmaları yaşadığı gerilim ve kaygıyı yansıtır',
      'Yüksek enerji düzeyi ve ajitasyonla birlikte çoklu somatik semptomlar',
      'Kronik olarak gergin ve kaygılıdırlar',
      'Genel olarak entellektüalizasyonun yanı sıra bedensel işlevlerdeki bozuklukları ile obsesif biçimde uğraşırlar',
      'Bu kişiler sağlıklarına dikkat etme konusunda dirençlidir'
    ],
    additionalNotes: [
      'Bu kod erkeklerde kadınlardan daha fazladır',
      'Her iki cins içinde 172/712 ve 173/713 kodları sık görülür'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek'
  },

  '71': {
    code: '71',
    title: 'PSİKASTENİ-HİPOKONDRİAZİS KODU',
    description: '17 koduna benzer özellikler gösterir.',
    characteristics: [
      '17 kodunun özelliklerini taşır',
      'Obsesif özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Erkek'
  },

  '172': {
    code: '172',
    title: 'HİPOKONDRİAZİS-PSİKASTENİ-DEPRESYON KODU',
    description: '17/71 kodlarının sık görülen üçlü kombinasyonlarından biridir.',
    characteristics: [
      '17/71 kodunun tüm özellikleri',
      'Depresif özellikler eklenir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '712': {
    code: '712',
    title: 'PSİKASTENİ-HİPOKONDRİAZİS-DEPRESYON KODU',
    description: '172 koduna benzer özellikler gösterir.',
    characteristics: [
      '172 kodunun özelliklerini taşır',
      'Obsesif özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '173': {
    code: '173',
    title: 'HİPOKONDRİAZİS-PSİKASTENİ-HİSTERİ KODU',
    description: '17/71 kodlarının sık görülen üçlü kombinasyonlarından biridir.',
    characteristics: [
      '17/71 kodunun tüm özellikleri',
      'Histerik özellikler eklenir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '713': {
    code: '713',
    title: 'PSİKASTENİ-HİPOKONDRİAZİS-HİSTERİ KODU',
    description: '173 koduna benzer özellikler gösterir.',
    characteristics: [
      '173 kodunun özelliklerini taşır',
      'Obsesif özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  // 18/81 KODLARI
  '18': {
    code: '18',
    title: 'HİPOKONDRİAZİS-ŞİZOFRENİ KODU',
    diagnosis: 'Eğer F alt testi de yükselmişse şizofreni / Pre-psikotik tanısı da düşünülmelidir',
    description: 'Bu hastalarda düşmanlık ve saldırganlık duyguları vardır, ancak bu duygularını uygun biçimde ifade edemezler. Beden işlevleri ve bedensel hastalıklara ilişkin delüzyon düşüncelerini açıkça gösterirler.',
    characteristics: [
      'Düşmanlık ve saldırganlık duyguları vardır, ancak bu duygularını uygun biçimde ifade edemezler',
      'Beden işlevleri ve bedensel hastalıklara ilişkin delüzyon düşünceleri',
      'Genellikle bizar tabiatlı somatik yakınmaları bulunan kişilerdir',
      'Somatik hezeyanları olabilir',
      'Somatik yakınmaları, gerçek psikotik yaşantının ortaya çıkmasına karşı savunmaları yansıtıyor olabilir',
      'Karşı cinsin üyelerine ilişkin hostilite vardır',
      'Diğerlerine karşı uzaklaşma ve izolasyon ortaya çıkabilir',
      'Özellikle stres altında şaşkınlık ve düşüncede konfüzyon olabilir',
      'Somatik uğraşları gerçek ile bağlantılarını koparabilir'
    ],
    additionalNotes: [
      'Tedavi sürecinde basit müdahaleler bu hastalara yetmez',
      'Kişilerarası ilişkilerde de iç görü sağlamaya yönelik yaklaşımlarda da yarar sağlanamaz',
      'Genel olarak üçlü kodlar 182/812, 183/ 813 ve 187/817\'dir',
      'Bu kod tipini veren ergenlerin okul başarısı düşüktür, unutkanlık oldukça fazladır',
      'Baş ağrısı ve mide ağrısı gibi somatik yakınmaları vardır',
      'Arkadaşları azdır. Hem okulda hem de sosyal yaşamda uyumları bozuktur',
      'Madde bağımlılığı ya da intihar girişimleri olabilir',
      'Bu örüntüyü gösteren ergenlerin 2/3\'ü boşanmış ailelerden gelmiştir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '81': {
    code: '81',
    title: 'ŞİZOFRENİ-HİPOKONDRİAZİS KODU',
    diagnosis: 'Eğer F alt testi de yükselmişse şizofreni / Pre-psikotik tanısı da düşünülmelidir',
    description: '18 koduna benzer özellikler gösterir.',
    characteristics: [
      '18 kodunun özelliklerini taşır',
      'Şizofrenik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '182': {
    code: '182',
    title: 'HİPOKONDRİAZİS-ŞİZOFRENİ-DEPRESYON KODU',
    description: '18/81 kodlarının sık görülen üçlü kombinasyonlarından biridir.',
    characteristics: [
      '18/81 kodunun tüm özellikleri',
      'Depresif özellikler eklenir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '812': {
    code: '812',
    title: 'ŞİZOFRENİ-HİPOKONDRİAZİS-DEPRESYON KODU',
    description: '182 koduna benzer özellikler gösterir.',
    characteristics: [
      '182 kodunun özelliklerini taşır',
      'Şizofrenik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '183': {
    code: '183',
    title: 'HİPOKONDRİAZİS-ŞİZOFRENİ-HİSTERİ KODU',
    description: '18/81 kodlarının sık görülen üçlü kombinasyonlarından biridir.',
    characteristics: [
      '18/81 kodunun tüm özellikleri',
      'Histerik özellikler eklenir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '813': {
    code: '813',
    title: 'ŞİZOFRENİ-HİPOKONDRİAZİS-HİSTERİ KODU',
    description: '183 koduna benzer özellikler gösterir.',
    characteristics: [
      '183 kodunun özelliklerini taşır',
      'Şizofrenik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '187': {
    code: '187',
    title: 'HİPOKONDRİAZİS-ŞİZOFRENİ-PSİKASTENİ KODU',
    description: '18/81 kodlarının sık görülen üçlü kombinasyonlarından biridir.',
    characteristics: [
      '18/81 kodunun tüm özellikleri',
      'Obsesif özellikler eklenir'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '817': {
    code: '817',
    title: 'ŞİZOFRENİ-HİPOKONDRİAZİS-PSİKASTENİ KODU',
    description: '187 koduna benzer özellikler gösterir.',
    characteristics: [
      '187 kodunun özelliklerini taşır',
      'Şizofrenik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  // 19/91 KODLARI
  '19': {
    code: '19',
    title: 'HİPOKONDRİAZİS-HİPOMANİ KODU',
    diagnosis: 'Organik beyin bozukluğuna bağlı güçlükler - Pasif-bağımlı kişilik bozukluğu',
    description: 'Bu hastalar gergin ve kaygılı olarak tanımlanır. Çok yoğun duygusal karmaşa yaşarlar. Sindirim sorunları, baş ağrıları ve bitkinlik gibi bedensel yakınmalar yaygındır.',
    characteristics: [
      'Gergin ve kaygılı olarak tanımlanırlar',
      'Çok yoğun duygusal karmaşa yaşarlar',
      'Sindirim sorunları, baş ağrıları ve bitkinlik gibi bedensel yakınmalar yaygındır',
      'Semptomlarına yönelik psikolojik açıklamayı kabul etmezler',
      'Kendilerinden beklentileri çok yüksektir, ancak açık ve belirgin amaçları yoktur',
      'Engellenme duyguları, kendileri için belirledikleri bu yüksek amaçları yerine getirememekten kaynaklanır',
      'Pasif-bağımlı bireylerdir, yetersizliklerini kompanse etmek isterler'
    ],
    additionalNotes: [
      'Bu kod tipi aynı zamanda beyin hasarı olan bireylerde görülmektedir, kendi sınırlılıkları ve yıkımları ile başa çıkmada güçlükleri vardır',
      'Eğer bu profilde 2 ve 3 alt testlerinin değerleri 5 T puanından aşağıda ise 129 ve 139 koduna bakınız',
      'Nadir olarak ortaya çıkan bu kod, akut psikiyatrik bozukluğu olan kişilerde gerilim ve huzursuzluk ile birliktedir',
      'Bedensel işlevler ve olası yetersizlikler ile aşırı ilgilidirler',
      'Burada endokrin işlevlerde ya da merkezi sinir sisteminde bir bozukluk olup olmadığı araştırılmalıdır',
      'Bu kişiler saldırgan ve dışa dönük gibi görünseler de altta pasif ve bağımlı bir yapı vardır',
      'Çoğunlukla 3 ya da 4 alt testlerinde yükselme vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '91': {
    code: '91',
    title: 'HİPOMANİ-HİPOKONDRİAZİS KODU',
    diagnosis: 'Organik beyin bozukluğuna bağlı güçlükler - Pasif-bağımlı kişilik bozukluğu',
    description: '19 koduna benzer özellikler gösterir.',
    characteristics: [
      '19 kodunun özelliklerini taşır',
      'Hipomanik özellikler daha baskın'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  // 10/01 KODLARI
  '10': {
    code: '10',
    title: 'HİPOKONDRİAZİS-SOSYAL İÇE DÖNÜKLÜK KODU',
    description: 'Bu kod oldukça nadirdir, sosyal açıdan rahatsız, içe çekilmiş, soğuk, pasif kişilerde ortaya çıkar.',
    characteristics: [
      'Sosyal açıdan rahatsız, içe çekilmiş, soğuk, pasif kişilerde ortaya çıkar',
      'Genel olarak bunlara bedensel yakınmalar eşlik eder',
      'Üçüncü yükselen alt test 8 olduğu zaman genellikle çok sayıda somatik yakınmalarla birlikte şizoid çekilme ve sosyal yetersizlik',
      'Sıklıkla 2 ve 3 yükselen testlerdir',
      'Eğer T değeri 70\'in üstünde ise destek sistemleri zayıflamıştır ve maskeli depresyon vardır'
    ],
    ageGroup: 'Tüm',
    gender: 'Tüm'
  },

  '01': {
    code: '01',
    title: 'SOSYAL İÇE DÖNÜKLÜK-HİPOKONDRİAZİS KODU',
    description: '10 koduna benzer özellikler gösterir.',
    characteristics: [
      '10 kodunun özelliklerini taşır',
      'Sosyal içe dönüklük daha baskın'
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