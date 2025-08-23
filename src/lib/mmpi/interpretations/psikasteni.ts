// Psikasteni (Pt) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface PtInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
  somaticSymptoms?: string[];
}

export const psikasteniInterpretations: Record<string, PtInterpretation> = {
  veryHigh: {
    tScoreRange: "T ≥ 84",
    characteristics: [
      "Ajite ruminasyonları, korku hali, obsesyonları ve kompulsiyonları ya da fobileri vardır",
      "Anksiyete ve gerginlik o kadar fazladır ki günlük yaşamlarını bile devam ettiremezler",
      "Entellektüalizasyon, izolasyon ve rasyonalizasyon sıklıkla kullanılmaktadır",
      "Telâş ve huzursuzluk yaşar",
      "Kaygılı, gergindir",
      "Dikkatini yoğunlaştırmada güçlüğü vardır"
    ],
    clinicalImplications: "Ağır obsesif-kompulsif bozukluk veya anksiyete bozukluğu. Günlük işlevsellik ciddi şekilde bozulmuş.",
    therapeuticConsiderations: "Anksiyetelerinin semptomatik tedavisi öncelikli olmalı."
  },

  high: {
    tScoreRange: "T: 75-84",
    characteristics: [
      "Temiz, titiz, düzenli kişilerdir",
      "Önemsiz sorunlar karşısında bile gerginlik ve endişe yaşarlar",
      "Kendilerini yetersiz, aşağılık duyguları ve suçluluğu olan kişiler olarak gösterirler",
      "Kendilerine güvenmemelerine bağlı olarak herhangi bir konuda fikir üretemezler",
      "Mükemmeliyetçi ve vicdan sahibidir",
      "Suçluluk duyar ve depresiftir",
      "Kendini eleştirir"
    ],
    clinicalImplications: "Belirgin anksiyete ve obsesif özellikler. Sıklıkla anksiyete bozukluğu tanısı konulur.",
    therapeuticConsiderations: "Kısa psikoterapiye iyi yanıt vermez. Entellektüalize ve rasyonalize eder."
  },

  moderate: {
    tScoreRange: "T: 60-74",
    characteristics: [
      "Dürüst, mükemmeliyetçi, titiz ve kendini eleştiren bireylerdir",
      "Küçük sorunları bile kendilerine dert edinme eğilimdedirler",
      "Endişeli ve vesveselidir",
      "Sinirli ve tedirgindir",
      "Güvensizdir ve aşağılık duyguları yaşar",
      "Katıdır",
      "Temiz, düzenli, tertipli ve titizdir"
    ],
    clinicalImplications: "Orta düzeyde anksiyete ve mükemmeliyetçi eğilimler.",
    therapeuticConsiderations: "Sorunlarına ilişkin kısmi içgörüsü vardır."
  },

  normal: {
    tScoreRange: "T: 45-59",
    characteristics: [
      "Yaşamlarını ve işlerini endişe ve güvensizlik duymadan yürütebilirler",
      "Sorumlu, gerçekçi, etkili, uyumludur",
      "Geniş ilgi alanları vardır",
      "Kendine güven duymaktadır"
    ],
    clinicalImplications: "Normal anksiyete düzeyi ve iyi uyum."
  },

  low: {
    tScoreRange: "T: 20-44",
    characteristics: [
      "Rahat, duygusal, gerginliği olmayan bireylerdir",
      "Çoğu kendine güvenir ve uyumludur",
      "Üretici ve yeterlidirler",
      "Kaygı düzeyleri çok düşük olduğu için sanki tembel gibi görünürler",
      "Başarıya, statüye, kabul görmeye önem veren kişilerdir",
      "Korkular ve kaygılardan arınmıştır"
    ],
    clinicalImplications: "Çok düşük anksiyete düzeyi. Bazen motivasyon eksikliği görülebilir."
  },

  isolated: {
    tScoreRange: "Tek yükselme",
    characteristics: [
      "Kaygılı, gergin, kararsız ve dikkatini bir noktada yoğunlaştıramayan bireyler",
      "Obsesif düşünceler, ruminasyonlar, kendinden şüphe vardır",
      "Depresif özellikler eşlik eder",
      "Entellektüel savunmaları, anksiyetelerini ve güvensizlik duygularını kontrol edecek kadar güçlü değil",
      "Bedensel işlevlere karşı aşırı ilgi"
    ],
    clinicalImplications: "İzole anksiyete ve obsesif eğilimler. Genellikle kardiyovasküler ve gastrointestinal yakınmalar.",
    somaticSymptoms: [
      "Kalp ile ilgili yakınmalar",
      "Üriner sistem sorunları", 
      "Gastrointestinal sistem yakınmaları",
      "Yorgunluk, bitkinlik, uykusuzluk"
    ],
    therapeuticConsiderations: "Anksiyetelerinin semptomatik tedavisi gerçekleştirilmelidir."
  }
};

export function getPsikasteniInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false
): PtInterpretation {
  if (isIsolatedElevation) {
    return psikasteniInterpretations.isolated;
  } else if (tScore >= 84) {
    return psikasteniInterpretations.veryHigh;
  } else if (tScore >= 75) {
    return psikasteniInterpretations.high;
  } else if (tScore >= 60) {
    return psikasteniInterpretations.moderate;
  } else if (tScore >= 45) {
    return psikasteniInterpretations.normal;
  } else {
    return psikasteniInterpretations.low;
  }
}

// Pt madde numaraları (K eklemeli)
export const psikasteniItems = {
  true: [10, 15, 22, 32, 41, 67, 76, 86, 94, 102, 106, 142, 159, 182, 189, 217, 238, 266, 301, 304, 305, 317, 321, 336, 337, 340, 342, 343, 344, 346, 349, 351, 352, 356, 357, 358, 359, 360, 361],
  false: [3, 8, 36, 122, 152, 164, 178, 329, 353],
  totalItems: 48,
  kCorrected: true
};

// Erkek ve kadın normları (K düzeltmesi ile)
export const psikasteniNorms = {
  male: { mean: 23.19, sd: 7.86 },    // Pt + 1.0*K
  female: { mean: 25.77, sd: 8.06 }   // Pt + 1.0*K
};