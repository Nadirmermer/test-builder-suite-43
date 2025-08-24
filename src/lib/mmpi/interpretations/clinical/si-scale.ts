interface SiScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  relationshipImplications?: string[];
  ageConsiderations?: string[];
  additionalNotes?: string[];
}

// Sosyal İçedönüklük Ölçeği Yorumlama Sınıfı
export class SiScale {
  getInterpretation(tScore: number): SiScaleInterpretation {
    let interpretation: SiScaleInterpretation;
    
    if (tScore >= 70) {
      interpretation = getSiHighInterpretation();
    } else if (tScore >= 60) {
      interpretation = getSiModeratelyHighInterpretation();
    } else if (tScore >= 45) {
      interpretation = getSiNormalInterpretation();
    } else if (tScore >= 30) {
      interpretation = getSiLowInterpretation();
    } else {
      interpretation = getSiVeryLowInterpretation();
    }
    
    // tScore'u set et
    interpretation.tScore = tScore;
    return interpretation;
  }
}

function getSiHighInterpretation(): SiScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Yüksek (T ≥ 70)",
    description: "Belirgin sosyal içedönüklük ve kişilerarası ilişkilerde çekingenlik.",
    characteristics: [
      "Sosyal durumlardan kaçınır",
      "Kişilerarası ilişkilerde rahatsızlık",
      "Utangaç ve çekingen",
      "Kendini ifade etmekte zorlanır",
      "Sosyal beceriler sınırlı",
      "Yalnız olmayı tercih eder",
      "Güven kurmakta zorlanır",
      "Eleştiriye aşırı duyarlı",
      "Sosyal onay arayışı",
      "Reddedilme korkusu"
    ],
    relationshipImplications: [
      "Yakın ilişki kurmakta zorlanır",
      "Romantik ilişkilerde çekingenlik",
      "Arkadaşlık kurma güçlüğü",
      "Aile ilişkilerinde mesafeli",
      "İş yerinde sosyal izolasyon"
    ]
  };
}

function getSiModeratelyHighInterpretation(): SiScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Orta Düzeyde Yüksek (T: 60-69)",
    description: "Hafif sosyal çekingenlik ve içedönük eğilimler.",
    characteristics: [
      "Sosyal durumlardan hafif rahatsızlık",
      "Seçici sosyal etkileşim",
      "Derin ve anlamlı ilişkileri tercih eder",
      "Kalabalık ortamlardan kaçınır",
      "Dikkatlice düşünüp hareket eder",
      "Gözlemci kişilik",
      "Kendine yeterli",
      "Bağımsız",
      "Sakin ve huzurlu",
      "İçsel zenginlik"
    ],
    additionalNotes: [
      "Bu düzeyde pozitif özellikler de vardır",
      "Derin düşünce kapasitesi",
      "Kaliteli ilişkiler kurabilir",
      "Yaratıcılık potansiyeli"
    ]
  };
}

function getSiNormalInterpretation(): SiScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Normal Aralık (T: 45-59)",
    description: "Dengeli sosyal etkileşim ve uygun sosyal beceriler.",
    characteristics: [
      "Sosyal durumlarla rahat başa çıkar",
      "Uygun sosyal beceriler",
      "Hem yalnız hem grup halinde rahat",
      "Esnek sosyal davranış",
      "Çeşitli sosyal rollerde başarılı",
      "İletişim becerileri yeterli"
    ]
  };
}

function getSiLowInterpretation(): SiScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Düşük (T: 30-44)",
    description: "Belirgin sosyal dışadönüklük ve sosyal aktivite arayışı.",
    characteristics: [
      "Sosyal durumları arar",
      "Çok sosyal ve dışa dönük",
      "Kolay arkadaşlık kurar",
      "Konuşkan ve sosyal",
      "Grup aktivitelerini sever",
      "Liderlik özellikleri",
      "Kendini ifade etmede rahat",
      "Çevresindeki insanlarla ilgili",
      "Energik sosyal etkileşim",
      "Popüler olma eğilimi"
    ],
    relationshipImplications: [
      "Kolay yakın ilişki kurar",
      "Geniş sosyal çevre",
      "Romantik ilişkilerde aktif",
      "Takım çalışmasında başarılı",
      "Sosyal liderlik"
    ]
  };
}

function getSiVeryLowInterpretation(): SiScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Çok Düşük (T < 30)",
    description: "Aşırı sosyal dışadönüklük, sosyal aktivite bağımlılığı.",
    characteristics: [
      "Sürekli sosyal uyarım arar",
      "Yalnız kalamaz",
      "Aşırı sosyal",
      "Dikkat çekme ihtiyacı",
      "Yüzeysel ilişkiler kurma eğilimi",
      "Sosyal onay bağımlılığı",
      "Impulzif sosyal davranış",
      "Sınır tanımakta zorlanma"
    ],
    additionalNotes: [
      "Aşırı dışadönüklük problematik olabilir",
      "Yalnızlıkla başa çıkma zorluğu",
      "Derinlemesine ilişki kurma zorluğu",
      "Sosyal bağımlılık riski"
    ]
  };
}

export function getSiHighScoreCharacteristics(): string[] {
  return [
    "Sosyal durumlardan rahatsızlık duyar",
    "Utangaç, çekingen",
    "Kendini ifade etmekte zorlanır",
    "Sosyal beceriler sınırlı",
    "Yalnız olmayı tercih eder",
    "Sessiz, sakin",
    "İçe dönük",
    "Az konuşan",
    "Gözlemci",
    "Dinleyici",
    "Dikkatlice düşünen",
    "Temkinli",
    "Güven kurmakta zorlanır",
    "Eleştiriye duyarlı",
    "Reddedilme korkusu",
    "Sosyal kaygı",
    "Kalabalıktan kaçınır",
    "Grup aktivitelerinde pasif",
    "Arkadaş sayısı az",
    "Derin, anlamlı ilişkileri tercih eder",
    "Sadık, güvenilir",
    "Mütevazı",
    "Alçakgönüllü",
    "Kendine yeterli",
    "Bağımsız",
    "Çalışkan",
    "Sorumlu",
    "Güvenilir",
    "Pratik",
    "Gerçekçi"
  ];
}

export function getSiLowScoreCharacteristics(): string[] {
  return [
    "Sosyal durumları arar",
    "Dışa dönük",
    "Sosyal",
    "Konuşkan",
    "Girişken",
    "Kendini ifade etmede rahat",
    "Sosyal beceriler gelişmiş",
    "Kolay arkadaşlık kurar",
    "Grup aktivitelerini sever",
    "Liderlik özellikleri",
    "Çevresindeki insanlarla ilgili",
    "Empatik",
    "Yardımsever",
    "İşbirlikçi",
    "Takım oyuncusu",
    "Uyumlu",
    "Esnek",
    "Uyum sağlayan",
    "Popüler",
    "Sevilen",
    "Çekici",
    "Etkileyici",
    "İkna edici",
    "Etkili iletişim",
    "Sosyal zeka yüksek",
    "Duygusal zeka gelişmiş",
    "İnsanları anlayan",
    "Sosyal ipuçlarını fark eden",
    "Uygun sosyal davranış",
    "Sosyal normları bilen"
  ];
}

export function getSiAgeConsiderations(): string[] {
  return [
    "Yaş faktörü önemlidir:",
    "- Genç erişkinlerde Si puanları genellikle daha düşüktür",
    "- Yaşla birlikte Si puanları artma eğilimi gösterir",
    "- Ergenlik döneminde sosyal kaygı normal olabilir",
    "- Orta yaşta sosyal çekingenlik artabilir",
    "- Yaşlılıkta sosyal çekilme doğal olabilir",
    "Yaşa göre norm değerleri kullanılmalıdır",
    "Yaşamsal geçişler Si puanlarını etkileyebilir",
    "Sosyal rollerdeki değişimler önemlidir"
  ];
}

export function getSiRelationshipImplications(): string[] {
  return [
    "Yüksek Si puanları:",
    "- Yakın ilişki kurmakta zorlanma",
    "- Romantik ilişkilerde çekingenlik",
    "- Evlilik öncesi uzun tanışma süreci",
    "- Az sayıda yakın arkadaş",
    "- İş yerinde sosyal izolasyon",
    "Düşük Si puanları:",
    "- Kolay yakın ilişki kurma",
    "- Geniş sosyal çevre",
    "- Romantik ilişkilerde aktif",
    "- Çok sayıda arkadaş",
    "- İş yerinde sosyal liderlik",
    "Normal Si puanları:",
    "- Dengeli sosyal ilişkiler",
    "- Uygun sosyal sınırlar",
    "- Esnek sosyal davranış"
  ];
}

export function getSiSpikeInterpretation(tScore: number): string {
  if (tScore >= 70) {
    return "Yüksek Si puanı belirgin sosyal içedönüklük ve kişilerarası zorlanmalar gösterir. Sosyal beceri geliştirme programları faydalı olabilir.";
  } else if (tScore >= 60) {
    return "Orta düzeyde yüksek Si puanı hafif sosyal çekingenlik gösterir. Bu durum bazı alanlarda avantaj sağlayabilir.";
  } else if (tScore < 30) {
    return "Çok düşük Si puanı aşırı sosyal dışadönüklük gösterir. Yalnızlıkla başa çıkma becerileri geliştirilmelidir.";
  } else if (tScore < 45) {
    return "Düşük Si puanı sosyal dışadönüklük ve aktif sosyal yaşamı gösterir.";
  } else {
    return "Si puanı normal aralıkta, dengeli sosyal etkileşim gösterir.";
  }
}

export function getSiScaleCombinations(): string[] {
  return [
    "Si-D yüksek: Depresif sosyal çekilme, yalnızlık hissi",
    "Si düşük-Ma yüksek: Sosyal aşırılık, dikkat çekme ihtiyacı",
    "Si-Pt yüksek: Sosyal kaygı, obsesif endişeler",
    "Si düşük-Pd yüksek: Antisosyal davranış, kuralsızlık",
    "Si-Sc yüksek: Şizoid özellikler, sosyal izolasyon",
    "Si normal-Pa orta: Dengeli sosyal mesafe, sağlıklı şüphecilik",
    "Si çok düşük-Hy yüksek: Aşırı dramatik sosyal davranış",
    "Si yüksek-Mf (cinsiyet uyumsuz): Toplumsal rol karmaşası"
  ];
}