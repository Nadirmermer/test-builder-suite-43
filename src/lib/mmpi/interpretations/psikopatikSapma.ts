// Psikopatik Sapma (Pd) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface PdInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
  ageConsiderations?: string;
}

export const psikopatikSapmaInterpretations: Record<string, PdInterpretation> = {
  veryHigh: {
    tScoreRange: "T ≥ 80",
    characteristics: [
      "Klinik tanı olarak psikopatik bir bireyi göstermektedir",
      "Antisosyal davranışlar belirgindir",
      "Otorite figürleri ile çatışma vardır",
      "Diğerleriyle kendi gereksinimlerini nasıl karşılayabileceklerine bakarak ilişki kurarlar"
    ],
    clinicalImplications: "Açık psikopatik özellikler. Antisosyal kişilik bozukluğu tanısı için güçlü gösterge.",
    therapeuticConsiderations: "Prognoz kötü. Hapsedilmekten kurtulmak için tedaviyi kabul eder ancak kısa sürede sonlandırır."
  },

  high: {
    tScoreRange: "T: 70-79",
    characteristics: [
      "Öfkeli, impulsif, emosyonel açıdan yüzeysel",
      "Yordanamaz davranışları olan kişiler",
      "Sosyal uyumsuzluk, otoriteye ve diğerlerine karşı olma davranışları",
      "Antisosyal tutum ve davranış eğilimleri",
      "Kendilerine ilişkin mükemmeliyetçi ve narsisistik kavramları vardır",
      "Sosyal kuralları reddetmeyi rasyonalizasyon olarak kullanır",
      "Kızgınlığı ailelerine ya da genelde otorite ve topluma karşı",
      "İmpulsif olma, kötü kişilerarası yargılama",
      "Davranışların önceden kestirilememesi",
      "Sosyal yabancılaşma ve azalmış sorumluluk ve ahlak duygusu",
      "Kötü iş yaşamı ve evlilik uyumsuzluğu",
      "Uzun vadeli hedeflerini kısa süreli arzuları uğruna feda ederler",
      "Sonuçları tahmin etme kapasiteleri sınırlıdır"
    ],
    clinicalImplications: "Antisosyal eğilimler belirgin. Ma ve Si düzeyleri davranışsal dışa vurumun şiddetini belirler.",
    ageConsiderations: "Yaş faktörü kritik: Ergenlik için normal, 25+ yaş için patolojik, 40+ yaş kalıcı antisosyal davranış, 60+ yaş apatik yabancılaşma"
  },

  elevated: {
    tScoreRange: "T: 60-69",
    characteristics: [
      "Risk alabilen, enerjik, sosyal, maceraperest ve atılgan",
      "Engellendiğinde bu özellikler huzursuzluk, saldırganlık ve sosyal olarak uyumlu olmayan davranış biçimine dönüşebilir"
    ],
    clinicalImplications: "Risk alma ve enerji yüksek, ancak engellenme durumunda antisosyal davranış riski."
  },

  normal: {
    tScoreRange: "T: 45-59",
    characteristics: [
      "Aşırı kontrol koyma ve kısıtlanma genellikle azdır",
      "Sosyal kurallara kısmen uyum vardır"
    ],
    clinicalImplications: "Normal kontrol düzeyi ve sosyal uyum."
  },

  low: {
    tScoreRange: "T: 20-44",
    characteristics: [
      "Durağan, pasif ve atılgan olmayan bireylerdir",
      "Maceraperest değildirler",
      "Sıklıkla sosyal geleneklere uyma konusunda bağımlı ve hatta katıdırlar",
      "Danışma durumunda başkalarının onlara karşı olan düşünceleri konusunda güvence ararlar",
      "Çok sevgi dolu olsalar da, sıklıkla cinsel ilişkiye girme konusunda girişken değildirler"
    ],
    clinicalImplications: "Aşırı pasiflik ve sosyal geleneklere katı bağlılık."
  },

  isolated: {
    tScoreRange: "Sadece Pd yüksek",
    characteristics: [
      "İmpulsif, küskün, isyankâr ve genelde kurallar, düzenlemeler ve otoriteyi kabullenmekte güçlükleri olan bireyler",
      "Sıklıkla yasal sorunları olabilir",
      "Sokulgan (insan canlısı) olabilirler (eğer Si düşükse)",
      "Diğerleriyle ilişkileri, yüzeysel yapay ve kısadır",
      "Uzun süren, yakın ilişkiler kuramazlar",
      "Birliktelikle ilgili empati, sorumluluklar ve talepler konusunda güçlükleri olan bireyler",
      "Uzun süreli hedeflere doğru organize davranışları sürdüremezler",
      "Doyum veren kısa süreli istekler üzerinde odaklaşma eğiliminde olurlar"
    ],
    clinicalImplications: "İzole Pd yükselmesi antisosyal kişilik özelliklerini güçlü şekilde düşündürür. Si 30'a yaklaşırsa sorunlar daha kalıcı ve şiddetli."
  },

  general: {
    tScoreRange: "Genel özellikler",
    characteristics: [
      "Toplumun kurallarına ve değerlerine uymada güçlük çeker",
      "Asosyal ya da anti sosyal davranış: Yalan söyleme, çalma, dolandırıcılık",
      "Cinsel eyleme vuruk davranış",
      "Alkol ve/ya da madde kullanım öyküsü",
      "Otorite figürlerine karşı isyankârdır",
      "Aile ilişkileri fırtınalıdır",
      "Sorunları için ebeveynlerini suçlar",
      "Yaşam öyküsünde kötü bir iş yaşamı vardır",
      "Evlilik sorunları vardır",
      "İmpulsiftir, impulsları için hemen doyum ister",
      "İyi planlama yapamaz",
      "Davranışının sonuçlarını düşünmeden hareket eder",
      "Sabırsızdır, engellenme eşiği düşüktür",
      "Yargılaması yetersizdir, düşünmeden tehlikeye atılır",
      "Deneyimlerinden yararlanamaz",
      "İmmatür ve çocuksudur",
      "Narsisistik, benmerkezcil ve bencildir",
      "Dikkati çekmek ister, gösterişçidir",
      "Diğer kişilere karşı duyarsızdır",
      "Diğerlerini nasıl kullanabileceğiyle ilgilidir",
      "Beğenilir, ilk imajı iyidir",
      "Kişilerarası ilişkileri yüzeyseldir",
      "Sıcak ve yakın ilişkiler kuramaz",
      "Dışadönük ve sempatiktir",
      "Konuşkan, aktif, enerjik, maceracı, spontandır",
      "Zeki ve kendine güvenlidir",
      "Geniş ilgi alanları vardır",
      "Belirli amaçları yoktur",
      "Hostil ve saldırgandır",
      "Küçümseyici ve alaycıdır",
      "Gücenik ve asidir",
      "Eyleme vuruk davranışları vardır",
      "Saldırgan patlamaları ve davranışları vardır",
      "Muhalif ve inatçıdır",
      "Davranışlarından dolayı çok az suçluluk yaşar",
      "Başı belada olduğu zaman suçluluk ve vicdan azabı hisseder",
      "Anksiyete, depresyon ve psikotik semptomlar göstermez",
      "Endişeye eğilimli ve tatminsizdir",
      "İçten duygusal tepkileri yoktur",
      "Can sıkıntısı ve boşluk duyguları vardır",
      "Sorunları için diğerlerini suçlama eğilimindedir",
      "Entellektüalizasyonu kullanır"
    ],
    clinicalImplications: "Genellikle kişilik bozukluğu tanısı konulur (anti sosyal kişilik ya da pasif agresif kişilik). Psikoterapi ya da danışmanlıkla değişme prognozu kötüdür."
  }
};

// Düşük puan özellikleri
export const psikopatikSapmaLowScoreCharacteristics = [
  "Geleneksel ve itaatkardır",
  "Otoriteye boyun eğer",
  "Pasif, itaatkar ve çekingendir",
  "Diğerlerinin nasıl tepki vereceğini düşünür",
  "Samimi ve güvenilirdir",
  "Enerji düzeyi düşüktür, yarışmacı değildir",
  "Mevki ve güvencede olmaya dikkat eder",
  "İlgi alanları daralmıştır",
  "Yaratıcı ve spontan değildir",
  "İnatçıdır",
  "Kuralcı ve katıdır",
  "Erkekse cinsellikle çok ilgili değildir, kadınlardan korkar",
  "Kendini eleştirir, kendinden memnun değildir",
  "Önerileri ve fikirleri kabul eder",
  "Tedaviye çok bağımlı olmaya eğilimlidir",
  "Kendi davranışının sorumluluğunu kabul etmekten korkar"
];

export function getPsikopatikSapmaInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false,
  age?: number
): PdInterpretation {
  if (isIsolatedElevation) {
    return psikopatikSapmaInterpretations.isolated;
  }
  
  if (tScore >= 80) {
    return psikopatikSapmaInterpretations.veryHigh;
  } else if (tScore >= 70) {
    const interpretation = psikopatikSapmaInterpretations.high;
    
    // Yaş bazlı değerlendirme ekleme
    if (age !== undefined) {
      let ageNote = "";
      if (age < 25) {
        ageNote = "Ergenlik döneminde bu yükselme normal olabilir.";
      } else if (age >= 25 && age < 40) {
        ageNote = "25 yaşın üzerinde yüksek Pd profili patolojik sayılır.";
      } else if (age >= 40 && age < 60) {
        ageNote = "40 yaşın üstünde kalıcı kişilerarası ilişki kuramama ve antisosyal davranışları yansıtır.";
      } else if (age >= 60) {
        ageNote = "60 yaşın üzerinde apatik bir biçimde katılmama düzeyine varan yabancılaşmayı düşündürür.";
      }
      
      return {
        ...interpretation,
        ageConsiderations: ageNote
      };
    }
    
    return interpretation;
  } else if (tScore >= 60) {
    return psikopatikSapmaInterpretations.elevated;
  } else if (tScore >= 45) {
    return psikopatikSapmaInterpretations.normal;
  } else {
    return psikopatikSapmaInterpretations.low;
  }
}

// Pd madde numaraları ve puanlama yönü (Doğrulama için)
export const psikopatikSapmaItems = {
  true: [16, 21, 24, 32, 33, 35, 38, 42, 61, 67, 84, 94, 102, 106, 110, 118, 127, 215, 216, 224, 239, 244, 245, 284],
  false: [8, 20, 37, 82, 91, 96, 107, 134, 137, 141, 155, 170, 171, 173, 180, 183, 201, 231, 235, 237, 248, 267, 287, 289, 294, 296],
  totalItems: 50 // Kitaptan
};

// Erkek ve kadın normları (K düzeltmesi ile)
export const psikopatikSapmaNorms = {
  male: { mean: 22.22, sd: 4.45 },    // Pd + 0.4*K
  female: { mean: 22.84, sd: 4.51 }   // Pd + 0.4*K
};