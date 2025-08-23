// Sosyal İçedönüklük (Si) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface SiInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
  ageConsiderations?: string;
  relationshipConsiderations?: string;
}

export const sosyalIcedönüklükInterpretations: Record<string, SiInterpretation> = {
  veryHigh: {
    tScoreRange: "T ≥ 70",
    characteristics: [
      "Sosyal açıdan beceriksiz olan kişilerdir",
      "Sosyal ilişkilerde anksiyete yaşar ve ilişki kurmaktan kaçınırlar",
      "Sosyal açıdan içe çekilmiştir",
      "Yalnızdır ya da çok az arkadaşla rahattır",
      "Ürkek, çekingen, temkinli, utangaçtır",
      "Karşı cinsten kişilerin olduğu ortamlarda rahat değildir",
      "Kendini küçük görür",
      "Anlaşılmaz zor biridir"
    ],
    clinicalImplications: "Ciddi sosyal anksiyete ve beceriksizlik. Nevrotik üçlüde yükselme görülebilir.",
    therapeuticConsiderations: "Sosyal beceri eğitimi gerekebilir."
  },

  high: {
    tScoreRange: "T: 60-69",
    characteristics: [
      "Kendini ortaya koymak istemeyen kişilerdir",
      "Yakın aile çevresinde rahat olan bireylerdir",
      "Çekingen, utangaç kişilerdir",
      "Diğerlerinin düşüncelerine duyarlıdır",
      "Diğer insanlarla ilişkiye giremediği için üzülür",
      "Aşırı kontrollüdür, duygularını açıkça dile getirmekten hoşlanmaz",
      "İtaatkâr, uysal ve boyun eğicidir"
    ],
    clinicalImplications: "Orta düzeyde sosyal çekingenlik. Aile ortamında rahat.",
    relationshipConsiderations: "Evlilik ilişkilerinde 20 puanlık fark çatışma yaratabilir."
  },

  normal: {
    tScoreRange: "T: 45-59",
    characteristics: [
      "Sosyal ilişki kurmada başarılı olan bireylere işaret etmektedir",
      "Dengeli sosyal yaklaşım sergiler",
      "Uygun sosyal etkileşim kurabilir"
    ],
    clinicalImplications: "Normal sosyal işlevsellik ve etkileşim.",
    ageConsiderations: "Ergenler ve yüksekokullu öğrenciler genellikle 40-50 T puanında."
  },

  low: {
    tScoreRange: "T: 25-44",
    characteristics: [
      "İyimser, manipulatif, yüzeysel ve hatta biraz uçuk bireylerdir",
      "Dürtü kontrol sorunları vardır",
      "Diğerleri ile olmak isteyen, yalnız kalamayan bireyleri gösterir",
      "Kolay ilişki kurar, arkadaş canlısı ve meraklıdırlar",
      "Sosyal açıdan kabul görme, onaylanma konusunda gereksinimleri çok fazladır",
      "Sosyaldir, dışadönüktür",
      "Açık yürekli, arkadaşça, konuşkandır"
    ],
    clinicalImplications: "Aşırı sosyal ihtiyaç. Dürtü kontrolü problemleri olabilir.",
    therapeuticConsiderations: "İmpuls kontrolü konusunda çalışma gerekebilir."
  },

  isolated: {
    tScoreRange: "Yüksek + diğer alt testler",
    characteristics: [
      "Otoriteyi kabul etmede aşırıdır",
      "Ciddidir, kişisel temposu yavaştır",
      "Güvenli, bağımlıdır",
      "Temkinlidir, sorunlara yaklaşımı sıradandır",
      "Tutumlarında ve düşüncelerinde katı ve tutucudur",
      "Küçük fikirler üretmede bile güçlüğü vardır",
      "Çalışmayı sever"
    ],
    clinicalImplications: "Alt test 4 ve 9 ile birlikte yükselirse eyleme vurukluğun bastırıldığı düşünülür.",
    therapeuticConsiderations: "Alt test 2 ya da 7, özellikle alt test 8 ile birlikte ruminatik davranışları kuvvetlendirir."
  }
};

export function getSosyalIcedönüklükInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false,
  age?: number
): SiInterpretation {
  if (isIsolatedElevation) {
    return sosyalIcedönüklükInterpretations.isolated;
  } else if (tScore >= 70) {
    return sosyalIcedönüklükInterpretations.veryHigh;
  } else if (tScore >= 60) {
    return sosyalIcedönüklükInterpretations.high;
  } else if (tScore >= 45) {
    return sosyalIcedönüklükInterpretations.normal;
  } else {
    return sosyalIcedönüklükInterpretations.low;
  }
}

// Si madde numaraları
export const sosyalIcedönüklükItems = {
  true: [32, 67, 82, 111, 117, 124, 138, 147, 171, 172, 180, 201, 236, 267, 278, 292, 304, 316, 321, 332, 336, 342, 357, 377, 383, 398, 411, 427, 436, 455, 473, 487, 549, 564],
  false: [25, 33, 57, 91, 99, 119, 126, 143, 193, 208, 229, 231, 254, 262, 281, 296, 309, 353, 359, 371, 391, 400, 415, 440, 446, 449, 450, 451, 462, 469, 479, 481, 482, 505, 521, 547],
  totalItems: 70
};

// Erkek ve kadın normları
export const sosyalIcedönüklükNorms = {
  male: { mean: 26.86, sd: 8.65 },
  female: { mean: 29.88, sd: 8.79 }
};