interface PtScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  physicalComplaints?: string[];
  therapyResponse?: string[];
  additionalNotes?: string[];
}

// Psikasteni Ölçeği Yorumlama Sınıfı  
export class PtScale {
  getInterpretation(tScore: number): PtScaleInterpretation {
    let interpretation: PtScaleInterpretation;
    
    if (tScore >= 84) {
      interpretation = getPtVeryHighInterpretation();
    } else if (tScore >= 75) {
      interpretation = getPtHighInterpretation();
    } else if (tScore >= 60) {
      interpretation = getPtModeratelyHighInterpretation();
    } else if (tScore >= 45) {
      interpretation = getPtNormalInterpretation();
    } else {
      interpretation = getPtLowInterpretation();
    }
    
    // tScore'u set et
    interpretation.tScore = tScore;
    return interpretation;
  }
}

function getPtVeryHighInterpretation(): PtScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Aşırı Yüksek (T ≥ 84)",
    description: "Bireyin ajite ruminasyonları, korku hali, obsesyonları ve kompulsiyonları ya da fobileri olduğunu göstermektedir. Anksiyete ve gerginlik o kadar fazladır ki günlük yaşamlarını bile devam ettiremezler.",
    characteristics: [
      "Entellektüalizasyon, izolasyon ve rasyonalizasyon sıklıkla kullanılmaktadır"
    ]
  };
}

function getPtHighInterpretation(): PtScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Yüksek (T: 75-84)",
    description: "Temiz, titiz, düzenli kişilerdir. Önemsiz sorunlar karşısında bile gerginlik ve endişe yaşarlar.",
    characteristics: [
      "Kendilerini yetersiz, aşağılık duyguları ve suçluluğu olan kişiler olarak gösterirler",
      "Bu kendilerine güvenmemelerine bağlıdır, herhangi bir konuda fikir üretemezler",
      "Obsesyonlar, kompulsiyonlar ve fobileri dışlayınız"
    ]
  };
}

function getPtModeratelyHighInterpretation(): PtScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Orta Düzeyde Yüksek (T: 60-74)",
    description: "Bu yükseltiler dürüst, mükemmeliyetçi, titiz ve kendini eleştiren bireyler olduklarına işaret etmektedir.",
    characteristics: [
      "Küçük sorunları bile kendilerine dert edinme eğilimdedirler"
    ]
  };
}

function getPtNormalInterpretation(): PtScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Normal Aralık (T: 45-59)",
    description: "Bu bireyler yaşamlarını ve işlerini endişe ve güvensizlik duymadan yürütebilirler.",
    characteristics: []
  };
}

function getPtLowInterpretation(): PtScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Düşük (T: 20-44)",
    description: "Rahat, duygusal, gerginliği olmayan bireylerdir.",
    characteristics: [
      "Çoğu kendine güvenir ve uyumludur",
      "Üretici ve yeterlidirler",
      "Kaygı düzeyleri çok düşük olduğu için sanki tembel gibi görünürler",
      "Başarıya, statüye, kabul görmeye önem veren kişilerdir"
    ]
  };
}

export function getPtHighScoreCharacteristics(): string[] {
  return [
    "Telâş ve huzursuzluk yaşar",
    "Kaygılı, gergindir",
    "Endişeli ve vesveselidir",
    "Sinirli ve tedirgindir",
    "Dikkatini yoğunlaştırmada güçlüğü vardır",
    "Sıklıkla anksiyete bozukluğu tanısı konulur",
    "İçe dönük, derin düşünceleri olan biridir",
    "Düşüncelerinde obsesiftir",
    "Kompulsif davranışları vardır",
    "Güvensizdir ve aşağılık duyguları yaşar",
    "Kendinden emin değildir",
    "Kendine yönelik şüpheleri vardır, kendini eleştirir",
    "Katıdır",
    "Kendisi ve diğerleri için yüksek standartlara sahiptir",
    "Mükemmeliyetçi ve vicdan sahibidir",
    "Suçluluk duyar ve depresiftir",
    "Temiz, düzenli, tertipli ve titizdir",
    "Tutucudur",
    "Güvenilirdir",
    "Sıkıcıdır",
    "Donuktur",
    "Tereddüt eder",
    "Sorunların önemini çarptırır, aşırı tepkiseldir",
    "Çekingendir",
    "Sosyal etkileşimde başarısızdır",
    "Anlaşılması zordur",
    "Sevilme ve kabul görme konusunda endişeleri vardır",
    "Huzurlu, yumuşak kalpli, güvenilir, duyarlıdır",
    "Bağımlıdır",
    "Bireyseldir",
    "Heyecanlıdır",
    "İmmatürdür"
  ];
}

export function getPtPhysicalComplaints(): string[] {
  return [
    "Bedensel yakınmaları vardır:",
    "kalp",
    "üriner sistem",
    "gastrointestinal sistem",
    "yorgunluk, bitkinlik, uykusuzluk"
  ];
}

export function getPtTherapyResponse(): string[] {
  return [
    "Kısa psikoterapiye iyi yanıt vermez",
    "Sorunlarına ilişkin kısmi içgörüsü vardır",
    "Entellektüalize ve rasyonalize eder",
    "Psikoterapide yapılan yorumlara direnç gösterir",
    "Terapiste karşı düşmanca duygular içindedir",
    "Pek çok hastadan daha uzun süre psikoterapide kalır",
    "Psikoterapide yavaş, ancak kalıcı bir gelişme gösterir",
    "Psikoterapide otorite konumunda olan kişilerle yaşadığı güçlüklerden, işteki başarısızlığından ve çalışma alışkanlıklarından, homoseksüel dürtülerle ilişkili kuşkularından söz eder"
  ];
}

export function getPtLowScoreCharacteristics(): string[] {
  return [
    "Korkular ve kaygılardan arınmıştır",
    "Kendine güven duymaktadır",
    "Geniş ilgi alanları vardır",
    "Sorumlu, gerçekçi, etkili, uyumludur",
    "Başarı, mevki ve tanınıp bilinmeye ilişkin değerleri vardır"
  ];
}

export function getPtSpikeInterpretation(tScore: number): string {
  if (tScore >= 84) {
    return "Aşırı yüksek Pt puanı şiddetli obsesif-kompulsif özellikler ve ajite ruminasyonlar gösterir. Günlük yaşam fonksiyonları ciddi şekilde etkilenmiştir.";
  } else if (tScore >= 75) {
    return "Yüksek Pt puanı obsesif-kompulsif eğilimler, mükemmeliyetçilik ve yoğun anksiyete gösterir. Önemsiz sorunlar bile büyük endişe yaratır.";
  } else if (tScore >= 60) {
    return "Orta düzeyde yüksek Pt puanı mükemmeliyetçi, titiz ve kendini eleştiren özellikler gösterir.";
  } else if (tScore < 45) {
    return "Düşük Pt puanı anksiyete ve gerginlikten arınmış, rahat ve kendine güvenli kişilik gösterir.";
  } else {
    return "Pt puanı normal aralıkta, anksiyete düzeyi dengeli.";
  }
}