interface MaScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  therapyResponse?: string[];
  additionalNotes?: string[];
  interpretationWarnings?: string[];
}

// Hipomani Ölçeği Yorumlama Sınıfı
export class MaScale {
  getInterpretation(tScore: number): MaScaleInterpretation {
    let interpretation: MaScaleInterpretation;
    
    if (tScore >= 85) {
      interpretation = getMaExtremelyHighInterpretation();
    } else if (tScore >= 70) {
      interpretation = getMaHighInterpretation();
    } else if (tScore >= 60) {
      interpretation = getMaModeratelyHighInterpretation();
    } else if (tScore >= 45) {
      interpretation = getMaNormalInterpretation();
    } else {
      interpretation = getMaLowInterpretation();
    }
    
    // tScore'u set et
    interpretation.tScore = tScore;
    return interpretation;
  }
}

function getMaExtremelyHighInterpretation(): MaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Aşırı Yüksek (T ≥ 85)",
    description: "Manik davranış olasılığı yüksektir. Açık mani belirtileri görülebilir.",
    characteristics: [
      "Aşırı aktivite",
      "Dinmeyen konuşma",
      "Düşünce uçması",
      "Grandiozite",
      "Uyku ihtiyacında azalma",
      "Dikkat dağınıklığı",
      "Aşırı risk alma",
      "Sosyal ve mesleki işlevsellikte bozulma"
    ],
    interpretationWarnings: [
      "Acil psikiyatrik değerlendirme gerekebilir",
      "İntihar riski değerlendirilmeli",
      "Hastane yatışı gerekebilir",
      "İlaç tedavisi düşünülmeli"
    ]
  };
}

function getMaHighInterpretation(): MaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Yüksek (T: 70-84)",
    description: "Hipomanik özellikler belirgindir. Aşırı enerji ve aktivite vardır.",
    characteristics: [
      "Aşırı enerjik ve aktif",
      "Hızlı konuşma",
      "Düşünce süratinde artış",
      "Azalmış uyku ihtiyacı",
      "Kendine aşırı güven",
      "Sosyal olmada aşırılık",
      "Sabırsızlık",
      "Impulzivite",
      "Risk alma eğilimi",
      "Kararlarında acelecilik"
    ],
    therapyResponse: [
      "Psikoterapiye başlangıçta iyi yanıt verebilir",
      "Ancak sürdürmekte zorlanır",
      "Tedaviye uyum problemi yaşayabilir",
      "Mood stabilizer ilaçlar gerekebilir"
    ]
  };
}

function getMaModeratelyHighInterpretation(): MaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Orta Düzeyde Yüksek (T: 60-69)",
    description: "Hafif hipomanik özellikler. Yüksek enerji ve motivasyon.",
    characteristics: [
      "Enerjik ve girişken",
      "Sosyal ve dışa dönük",
      "Hızlı düşünce",
      "Yaratıcı ve yenilikçi",
      "Liderlik özellikleri",
      "Kendine güvenli",
      "Maceracı",
      "Heyecan arayan",
      "Çok çalışkan",
      "Başarı odaklı"
    ],
    additionalNotes: [
      "Bu düzeyde pozitif özellikler olabilir",
      "Yaratıcılık ve verimlilik yüksek",
      "Sosyal beceriler gelişmiş",
      "Liderlik kapasitesi mevcut"
    ]
  };
}

function getMaNormalInterpretation(): MaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Normal Aralık (T: 45-59)",
    description: "Dengeli enerji düzeyi ve aktivite.",
    characteristics: [
      "Uygun enerji düzeyi",
      "Dengeli sosyal etkileşim",
      "Gerçekçi kendine güven",
      "Uygun risk alma",
      "Istikrarlı ruh hali",
      "Planlı davranış"
    ]
  };
}

function getMaLowInterpretation(): MaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Düşük (T < 45)",
    description: "Düşük enerji ve aktivite düzeyi. Depresif özellikler olabilir.",
    characteristics: [
      "Düşük enerji",
      "Hareketsizlik",
      "Sosyal çekilme",
      "Girişim eksikliği",
      "Kendine güven eksikliği",
      "Karamsarlık",
      "Yavaş düşünce",
      "Karar vermede zorlanma",
      "Motivasyon eksikliği"
    ],
    additionalNotes: [
      "Depresyon belirtileri değerlendirilmeli",
      "D ölçeği ile birlikte yorumlanmalı",
      "Sosyal işlevsellik etkilenmiş olabilir"
    ]
  };
}

export function getMaHighScoreCharacteristics(): string[] {
  return [
    "Enerjik, aktif, hareketli",
    "Hızlı konuşan, çok konuşan",
    "Tercihlerinde çabuk değişen",
    "Çok plan yapan ama hiçbirini bitirmeyen",
    "Sabırsız, tahammülsüz",
    "Kolayca sıkılan",
    "Heyecan arayan, macera seven",
    "Risk alan",
    "İmpulsif",
    "Agresif",
    "Kendine aşırı güvenen",
    "Grandiöz",
    "Megalomanik",
    "Kendini beğenmiş",
    "Egoist",
    "Başkalarını küçük gören",
    "Sosyal olmada aşırı",
    "Dışa dönük",
    "Dramatik",
    "Şov yapan",
    "Dikkat çeken",
    "Duygusal olarak sığ",
    "İlişkilerde samimiyetsiz",
    "Manipülatif",
    "Cynical",
    "Güvenilmez",
    "Sorumsuz",
    "Kuralları çiğneyen",
    "Otoriteye karşı gelen",
    "Antisosyal davranışlar"
  ];
}

export function getMaTherapyResponse(): string[] {
  return [
    "Başlangıçta terapiye hevesli yaklaşabilir",
    "Ancak çabuk sıkılır ve bırakır",
    "Terapistle yarışmacı tavır sergileyebilir",
    "Önerileri dinlemez, kendi bildiğini okur",
    "Insight gelişimi sınırlıdır",
    "Mood stabilizer ilaçlar gerekebilir",
    "Yapılandırılmış terapi yaklaşımları tercih edilir",
    "Aile terapisi faydalı olabilir",
    "Tedavi uyumu problematikdir",
    "Uzun süreli takip gerekir"
  ];
}

export function getMaLowScoreCharacteristics(): string[] {
  return [
    "Düşük enerji, letarjik",
    "Hareketsiz, pasif",
    "Başkalarına bağımlı",
    "Girişim eksikliği",
    "Zor karar veren",
    "Güvenilir ve sorumlu",
    "Kuralcı",
    "Geleneksel değerlere bağlı",
    "Muhafazakâr",
    "Çekingen",
    "Utangaç",
    "Kendine güveni düşük",
    "Mütevazı",
    "Sessiz, sakin",
    "İçe dönük",
    "Yavaş tempolu",
    "Sabırlı",
    "Istikrarlı",
    "Öngörülebilir",
    "Pratik, ayakları yere basan"
  ];
}

export function getMaInterpretationWarnings(): string[] {
  return [
    "Ma puanı tek başına yeterli değildir",
    "D ölçeği ile birlikte değerlendirilmelidir",
    "Yüksek Ma + Düşük D = Hipomani",
    "Yüksek Ma + Yüksek D = Karışık ruh hali",
    "Düşük Ma + Yüksek D = Depresyon",
    "Yaş faktörü önemlidir (gençlerde daha yüksek olabilir)",
    "Cinsiyete göre farklılık gösterebilir",
    "Eğitim düzeyi etkili olabilir",
    "Madde kullanımı puanları etkileyebilir",
    "Organik nedenler dışlanmalıdır"
  ];
}

export function getMaSpikeInterpretation(tScore: number): string {
  if (tScore >= 85) {
    return "Aşırı yüksek Ma puanı manik episode işaret eder. Acil psikiyatrik değerlendirme gereklidir.";
  } else if (tScore >= 70) {
    return "Yüksek Ma puanı hipomani belirtilerini gösterir. Mood bozukluğu riski yüksektir.";
  } else if (tScore >= 60) {
    return "Orta düzeyde yüksek Ma puanı yüksek enerji ve aktiviteyi gösterir. Pozitif özellikler olabilir.";
  } else if (tScore < 45) {
    return "Düşük Ma puanı düşük enerji ve olası depresif belirtileri gösterir.";
  } else {
    return "Ma puanı normal aralıkta, dengeli enerji düzeyi gösterir.";
  }
}