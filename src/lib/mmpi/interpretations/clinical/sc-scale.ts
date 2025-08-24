interface ScScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  psychoticFeatures?: string[];
  therapyResponse?: string[];
  additionalNotes?: string[];
  profileConsiderations?: string[];
}

// Şizofreni Ölçeği Yorumlama Sınıfı
export class ScScale {
  getInterpretation(tScore: number): ScScaleInterpretation {
    let interpretation: ScScaleInterpretation;
    
    if (tScore >= 100) {
      interpretation = getScExtremelyHighInterpretation();
    } else if (tScore >= 75) {
      interpretation = getScVeryHighInterpretation();
    } else if (tScore >= 65) {
      interpretation = getScHighInterpretation();
    } else if (tScore >= 45) {
      interpretation = getScNormalInterpretation();
    } else {
      interpretation = getScLowInterpretation();
    }
    
    // tScore'u set et
    interpretation.tScore = tScore;
    return interpretation;
  }
}

function getScExtremelyHighInterpretation(): ScScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Aşırı Yüksek (T ≥ 100)",
    description: "Açık psikotik süreçler gösterir, şizofrenik düşünce bozukluğu belirgindir.",
    characteristics: [
      "Açık düşünce bozukluğu",
      "Bizarrlik",
      "Şüpheci paranoidlik",
      "Sosyal izolasyon"
    ],
    psychoticFeatures: [
      "Delüzyonlar",
      "Halüsinasyonlar",
      "Düşünce uçması",
      "Derealizasyon",
      "Depersonalizasyon"
    ],
    profileConsiderations: [
      "Diğer klinik ölçeklerle birlikte değerlendirilmeli",
      "Pa ve Ma ölçekleri yüksekse organik beyin hasarı düşünülebilir",
      "F ölçeği de yüksekse psikotik bozukluk daha olasıdır"
    ]
  };
}

function getScVeryHighInterpretation(): ScScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Çok Yüksek (T: 75-99)",
    description: "Şizofreniye benzer davranışlar ve düşünce kalıpları gösterir.",
    characteristics: [
      "Sosyal izolasyon",
      "Paranoid eğilimler",
      "Bizarrlik",
      "Düşük sosyal statü",
      "Kişilerarası sorunlar"
    ],
    psychoticFeatures: [
      "Olağandışı düşünce içerikleri",
      "Sıradışı algılar",
      "Tuhaf davranışlar",
      "Sosyal konvansiyonlara uyumsuzluk"
    ],
    therapyResponse: [
      "Psikoterapiye sınırlı yanıt",
      "Güven kurma zorluğu",
      "İçgörü eksikliği",
      "İlaç tedavisi gerekebilir"
    ]
  };
}

function getScHighInterpretation(): ScScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Yüksek (T: 65-74)",
    description: "Konformiteden uzak, alışılmadık düşünce ve davranışlar sergiler.",
    characteristics: [
      "Yaratıcı ve orijinal",
      "Sosyal kuralları sorgular",
      "Bağımsız düşünce",
      "Sanatsal ilgileri olabilir",
      "Geleneksel değerlere karşı çıkar"
    ],
    additionalNotes: [
      "Bu düzeyde yaratıcılık ve orijinallik pozitif özellikler olabilir",
      "Sosyal uyumsuzluk hafif düzeydedir",
      "Entelektüel merak yüksektir"
    ]
  };
}

function getScNormalInterpretation(): ScScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Normal Aralık (T: 45-64)",
    description: "Sosyal konvansiyonlara uygun, dengeli düşünce yapısı.",
    characteristics: [
      "Sosyal kurallara uyum",
      "Geleneksel değerlere saygı",
      "Uyumlu kişilerarası ilişkiler",
      "Gerçekçi düşünce"
    ]
  };
}

function getScLowInterpretation(): ScScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Düşük (T < 45)",
    description: "Aşırı konformist, geleneksel ve muhafazakar yaklaşım.",
    characteristics: [
      "Aşırı konformist",
      "Geleneksel değerlere bağlı",
      "Risk almaktan kaçınır",
      "Sosyal onay arayışı",
      "Yaratıcılık sınırlı"
    ],
    additionalNotes: [
      "Bazen aşırı uyum problematik olabilir",
      "Kendini ifade etmede zorlanabilir",
      "Otoriteye aşırı bağımlılık gösterebilir"
    ]
  };
}

export function getScHighScoreCharacteristics(): string[] {
  return [
    "Şüpheci, alıngan",
    "Ağırbaşlı, ciddi, sakin, sessiz",
    "İçe dönük",
    "Fantezi dünyasında yaşar",
    "Gündüz düşleri kurar",
    "Yaratıcı, atak, orijinal",
    "Sıradışı düşünceleri vardır",
    "Çok önemli sorunlarla ilgilenir",
    "Korku ve kayıplarla ilgili düşünceleri vardır",
    "Adaletsizlik duygularına sahiptir",
    "Güvensizdir",
    "Öfkeli ve hinclidir",
    "Sosyal uyum problemi yaşar",
    "Kişilerarası ilişkilerde başarısız",
    "Sosyal beceriler yetersiz",
    "Dışlanmış hisseder",
    "Kırılgan, hassas",
    "Boyun eğmez, direngen",
    "Aşağılık duygularına sahip",
    "Kendine güveni yoktur",
    "Cinsel problemleri olabilir",
    "Kimlik karmaşası yaşayabilir"
  ];
}

export function getScPsychoticFeatures(): string[] {
  return [
    "Düşünce bozukluğu:",
    "- Dereizm",
    "- Tangensiyalite", 
    "- Sirkümsansiyalite",
    "- Neolojizm",
    "Algı bozuklukları:",
    "- Halüsinasyonlar",
    "- İllüzyonlar",
    "- Derealizasyon",
    "- Depersonalizasyon",
    "Paranoid belirtiler:",
    "- Delüzyonlar",
    "- Referans düşünceleri",
    "- Şüphecilik",
    "Davranış bozuklukları:",
    "- Bizarrlik",
    "- Uygunsuz etki",
    "- Sosyal çekilme"
  ];
}

export function getScTherapyResponse(): string[] {
  return [
    "Psikoterapiye yanıt değişken",
    "Güven kurma sorunu yaşar",
    "İçgörü geliştirmekte zorlanır",
    "Terapötik ilişkide mesafeli",
    "Çelişkili tutum sergileyebilir",
    "İlaç tedavisine gereksinim olabilir",
    "Uzun süreli tedavi gerekebilir",
    "Destekleyici yaklaşım tercih edilir",
    "Aile terapisi faydalı olabilir",
    "Sosyal beceri antrenmanı önerilir"
  ];
}

export function getScProfileInterpretation(scores: { [key: string]: number }): string {
  const scScore = scores.Sc;
  const paScore = scores.Pa || 0;
  const maScore = scores.Ma || 0;
  const fScore = scores.F || 0;

  if (scScore >= 75) {
    if (paScore >= 70 && maScore >= 70) {
      return "Sc-Pa-Ma üçlüsü yüksek: Organik beyin hasarı veya şiddetli psikotik bozukluk olasılığı yüksek.";
    } else if (paScore >= 70) {
      return "Sc-Pa yüksekliği: Paranoid şizofreni veya paranoid kişilik bozukluğu düşünülebilir.";
    } else if (fScore >= 70) {
      return "Sc-F yüksekliği: Psikotik süreç aktif, belirtiler belirgin.";
    } else {
      return "İzole Sc yüksekliği: Şizotipal özellikler, sosyal çekilme, yaratıcılık.";
    }
  } else if (scScore >= 65) {
    return "Orta düzeyde Sc yüksekliği: Konformiteden uzaklaşma, orijinallik, yaratıcı düşünce.";
  } else if (scScore < 45) {
    return "Düşük Sc: Aşırı konformizm, geleneksellik, yaratıcılık eksikliği.";
  } else {
    return "Normal Sc düzeyi: Dengeli sosyal uyum ve bireysellik.";
  }
}

export function getScSpikeInterpretation(tScore: number): string {
  if (tScore >= 100) {
    return "Aşırı yüksek Sc puanı açık psikotik süreçleri gösterir. Acil psikiyatrik değerlendirme gereklidir.";
  } else if (tScore >= 75) {
    return "Çok yüksek Sc puanı şizofrenik spektrum bozukluğu riskini gösterir. Ayrıntılı psikiyatrik değerlendirme önerilir.";
  } else if (tScore >= 65) {
    return "Yüksek Sc puanı yaratıcılık, orijinallik ve sosyal konvansiyonlardan uzaklaşma gösterir.";
  } else if (tScore < 45) {
    return "Düşük Sc puanı aşırı konformizm ve geleneksel düşünce yapısını gösterir.";
  } else {
    return "Sc puanı normal aralıkta, dengeli sosyal uyum gösterir.";
  }
}