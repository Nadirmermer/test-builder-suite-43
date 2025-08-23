// Şizofreni (Sc) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface ScInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
  ageConsiderations?: string;
}

export const sizofreniInterpretations: Record<string, ScInterpretation> = {
  veryHigh: {
    tScoreRange: "T ≥ 100",
    characteristics: [
      "Akut bozukluğun eşlik ettiği uzun süreli ciddi bir stresin sonucunda ortaya çıkar",
      "Tipik olarak şizofren değildir, daha çok akut psikotik reaksiyon içine girer",
      "Açık psikotik davranış gösterebilir",
      "Konfüzyondadır, dezorganize ve dezoryantedir",
      "Garip düşünce ve tutumları, delüzyonları vardır",
      "Hallüsinasyonları vardır",
      "Yargılaması kötüdür"
    ],
    clinicalImplications: "Akut psikotik reaksiyon. Kimlik krizinde olan ergenlerde de görülebilir.",
    therapeuticConsiderations: "Tıbbi yardım ve ilaç tedavisinden yararlanabilir.",
    ageConsiderations: "T>95 değerleri ergenlerde kimlik krizi gösterebilir."
  },

  high: {
    tScoreRange: "T ≥ 75",
    characteristics: [
      "Yabancılaşma yaşayan ve doğru düşünemeyen bireylerdir",
      "Düşüncede ve hareketlerde sıradan değildirler",
      "Sosyal açıdan çekiniktirler ve derin kişilerarası ilişki kuramazlar",
      "Bu dünyadaki yerlerinin ne olduğu konusunda bozuk düşünceleri vardır",
      "Bu dünyaya ait olmadıklarını düşünürler",
      "İletişim kurmada sorunlar temeldir, dezorganize düşünceleri vardır",
      "Gerçek ile bağlantıları yüzeyseldir",
      "Kişilerarası ilişkiler yerine hayalleri ve fantezileri yeğlerler",
      "Aşağılık duyguları, kendinden hoşnutsuzluk ve yalnızlık duyguları içindedirler"
    ],
    clinicalImplications: "Gerçek psikotik düşünce bozukluğu. Şizofrenik süreç, şizoid uyum veya uzun süreli ciddi stres.",
    therapeuticConsiderations: "Prognozu kötüdür. Terapistle anlamlı ilişki kurmakta gönülsüzdür."
  },

  moderate: {
    tScoreRange: "T: 60-74",
    characteristics: [
      "Soyut konularla ilgilenir",
      "Diğerleri tarafından uzak ve anlaşılmaz olarak tanımlanır",
      "Genel yabancılaşma yaşayabilir",
      "Şizoid sosyal uyum gösterir",
      "Dünyaya kendine özgü bakışı vardır",
      "Kendini sosyal çevrenin dışında görür",
      "Utangaç ve çekingendir, katılımcı değildir"
    ],
    clinicalImplications: "Değerlendirmede profilin tümü ele alınmalı. Örtük psikoz araştırılmalı.",
    therapeuticConsiderations: "F ve Pa alt testlerindeki yükselme psikoza eşlik eder."
  },

  normal: {
    tScoreRange: "T: 45-59",
    characteristics: [
      "Kuramsal ve pratik görüşlerini normal bir biçimde bir araya getirirler",
      "Dengeli yaklaşım sergiler",
      "Gerçekçi düşünce yapısı vardır"
    ],
    clinicalImplications: "Normal düzeyde soyut düşünce ve sosyal uyum."
  },

  low: {
    tScoreRange: "T: 21-44",
    characteristics: [
      "Pratik ve gelenekseldirler",
      "Davranışları ve yaşama bakış açıları konservatiftir",
      "Uyumlu, sorumlu, bağımlı ve temkinlidir",
      "Hayal güçleri yoktur ve oldukça katıdırlar",
      "İlişkilerinde çekingen, derin duygusal ilişkilerden kaçınan",
      "Temkinli, tutucu, rekabet etmek istemeyen kişilerdir",
      "Arkadaşça, neşeli, duyarlı, güvenilirdir",
      "Dengelidir, uyumludur"
    ],
    clinicalImplications: "Aşırı konservatif ve katı yaklaşım. Hayal gücü eksikliği."
  },

  isolated: {
    tScoreRange: "Tek yükselme",
    characteristics: [
      "Şizoid yaşam biçimi sergiler",
      "Kendini izole, yabancılaşmış, yanlış anlaşılmış hisseder",
      "Arkadaşları tarafından kabul görmediğini düşünür",
      "Yalnız ve ulaşılmazdır",
      "Strese, hayal ve fantezi dünyasına çekilerek tepki verir",
      "Gerçekle hayaliyi ayırmada sorunu vardır",
      "Cinsellikle ilgili düşünsel uğraşları vardır"
    ],
    clinicalImplications: "İzole şizoid özellikler. Sosyal yabancılaşma belirgin.",
    therapeuticConsiderations: "Pek çok hastadan daha uzun süre psikoterapide kalır."
  }
};

export function getSizofreniInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false
): ScInterpretation {
  if (isIsolatedElevation) {
    return sizofreniInterpretations.isolated;
  } else if (tScore >= 100) {
    return sizofreniInterpretations.veryHigh;
  } else if (tScore >= 75) {
    return sizofreniInterpretations.high;
  } else if (tScore >= 60) {
    return sizofreniInterpretations.moderate;
  } else if (tScore >= 45) {
    return sizofreniInterpretations.normal;
  } else {
    return sizofreniInterpretations.low;
  }
}

// Sc madde numaraları (K eklemeli)
export const sizofreniItems = {
  true: [15, 16, 21, 22, 24, 32, 33, 35, 38, 40, 41, 47, 52, 76, 97, 104, 121, 156, 157, 159, 168, 179, 182, 194, 202, 210, 212, 238, 241, 251, 259, 266, 273, 282, 291, 297, 301, 303, 305, 307, 312, 320, 324, 325, 332, 334, 335, 339, 341, 345, 349, 350, 352, 354, 355, 356, 360, 363, 364],
  false: [8, 17, 20, 37, 65, 103, 119, 177, 178, 187, 192, 196, 220, 276, 281, 306, 309, 322, 330],
  totalItems: 78,
  kCorrected: true
};

// Erkek ve kadın normları (K düzeltmesi ile)
export const sizofreniNorms = {
  male: { mean: 26.64, sd: 8.82 },    // Sc + 1.0*K
  female: { mean: 28.76, sd: 9.18 }   // Sc + 1.0*K
};