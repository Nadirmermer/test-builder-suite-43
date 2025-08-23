// Hipomani (Ma) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface MaInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
  ageConsiderations?: string;
  genderConsiderations?: string;
}

export const hipomaniInterpretations: Record<string, MaInterpretation> = {
  veryHigh: {
    tScoreRange: "T ≥ 85",
    characteristics: [
      "Ajitasyon ya da manik dönem olabilir",
      "Hiperaktiftir, davranışları yordanamaz",
      "Fikir uçuşmaları vardır",
      "Kendilik değerlerini abartır",
      "Manik dönemde olabilir",
      "Aşırı, amaçsız aktiviteler gösterebilir",
      "Konuşması hızlanmıştır",
      "Hallüsinasyonları, büyüklük delüzyonları olabilir",
      "Duygusal açıdan labildir"
    ],
    clinicalImplications: "Akut manik dönem. Ciddi işlevsellik bozukluğu.",
    therapeuticConsiderations: "Psikoterapiye düzensiz aralıklarla gelir. Sorunları stereotipik bir biçimde tekrarlar."
  },

  high: {
    tScoreRange: "T: 70-84",
    characteristics: [
      "Enerjik, konuşkan, eylemi düşünceye tercih eden kişilerdir",
      "İlgileri çok geniş bir alana yayılmıştır",
      "Hemen gerçekleştirmek istedikleri çok sayıda projeleri vardır",
      "Aktivite ve güç, abartılı düzeyde yüksektir, ancak projelerini tamamlayamazlar",
      "Davranışlarını, düşmanlık duygularını ve öfkelerini kontrol edemezler",
      "Gerçek manik özellikler gösterebilirler",
      "Fikir uçuşması, duygudurumda kaymalar ve değişmeler vardır",
      "Büyüklük sanrıları ve hiperaktivite gösterir"
    ],
    clinicalImplications: "Belirgin hipomanik özellikler. Manik özellikler gelişebilir.",
    therapeuticConsiderations: "Terapide prognozu kötüdür. Psikoterapide yoruma direnç gösterir.",
    ageConsiderations: "Ergenlerde artmış hareketliliği gösterir. İmpulsif ve kontrolsüzdürler."
  },

  moderateHigh: {
    tScoreRange: "T: 75 (Özel)",
    characteristics: [
      "Enerjik, dışadönük ve aktif bireylerdir",
      "Diğerleri tarafından hoş ve yeterli olarak görülürler",
      "Onay ve statü kazanmak için çaba harcarlar",
      "Düşünce ve davranışlarında özgür olma eğilimleri vardır"
    ],
    clinicalImplications: "Normal enerji düzeyi yüksekliği.",
    ageConsiderations: "Lise ya da lise mezunu öğrencilerde çok sık görülür - beklenen durum."
  },

  moderate: {
    tScoreRange: "T: 60-69",
    characteristics: [
      "Hoş, enerjik, meraklı, sosyal, kolay ilişki kuran kişilerdir",
      "İlgi alanları geniştir",
      "Bu hallerinden kendileri de memnundur",
      "İyimserlik, bağımsızlık ve kendine güven vardır",
      "Yaratıcı, girişken ve beceriklidir",
      "Açık yürekli ve sosyaldir"
    ],
    clinicalImplications: "Sağlıklı enerji düzeyi ve sosyal işlevsellik."
  },

  normal: {
    tScoreRange: "T: 45-59",
    characteristics: [
      "Normal aralığıdır",
      "Puan normal aralıktan yükseldikçe mani düzeyinin arttığı düşünülür",
      "Dengeli enerji düzeyi vardır"
    ],
    clinicalImplications: "Normal enerji ve aktivite düzeyi."
  },

  low: {
    tScoreRange: "T: 21-44",
    characteristics: [
      "Düşük enerji düzeyi, güdü azlığı ve hatta apatiyi gösterir",
      "Kronik açıdan düşük enerji düzeyinin belirtisidir",
      "Kendilerine güvenleri azdır ve amaçları genellikle yoktur",
      "Sabahları kalkmak istemezler",
      "Herhangi bir projeye başlamakta kendilerini aşırı çaba göstermek zorunda hissederler",
      "Uyuşuk, apatik, kayıtsızdır",
      "Motive olması güçtür"
    ],
    clinicalImplications: "Düşük enerji, olası depresyon. Geçici yorgunluk veya hastalık olasılığı.",
    ageConsiderations: "Yaşlı insanlarda beklenen durum, 45 yaş altında dikkat edilmesi gerekir.",
    therapeuticConsiderations: "Hastanede yatan psikiyatrik hastaysa prognozu iyidir."
  },

  isolated: {
    tScoreRange: "Tek yükselme",
    characteristics: [
      "Enerjisini uygun kullanmaz, projeleri tamamlayamaz",
      "Çabuk sıkılır, huzursuzdur, engellenme eşiği düşüktür",
      "İmpulslarını engellemede güçlüğü vardır",
      "Sinirlilik, hostilite dönemleri, agresif patlamaları olur",
      "Gerçekci olmayan bir iyimserlik içindedir",
      "Manipulatif, aldatıcı ve güvenilmezdir"
    ],
    clinicalImplications: "İzole hipomanik eğilimler. Diğer klinik alt testlerle birlikte değerlendirilmeli.",
    therapeuticConsiderations: "Psikoterapiyi erken sonlandırır. Terapiste bağımlı olmayı sevmez."
  }
};

export function getHipomaniInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false,
  age?: number
): MaInterpretation {
  if (isIsolatedElevation) {
    return hipomaniInterpretations.isolated;
  } else if (tScore >= 85) {
    return hipomaniInterpretations.veryHigh;
  } else if (tScore >= 75 && age && age <= 25) {
    // Genç yaşlarda normal olabilir
    return hipomaniInterpretations.moderateHigh;
  } else if (tScore >= 70) {
    return hipomaniInterpretations.high;
  } else if (tScore >= 60) {
    return hipomaniInterpretations.moderate;
  } else if (tScore >= 45) {
    return hipomaniInterpretations.normal;
  } else {
    return hipomaniInterpretations.low;
  }
}

// Ma madde numaraları (K eklemeli)
export const hipomaniItems = {
  true: [11, 13, 21, 22, 59, 64, 73, 97, 100, 109, 127, 134, 143, 156, 157, 167, 181, 194, 212, 222, 226, 228, 232, 233, 238, 240, 250, 251, 263, 266, 268, 271, 277, 279, 298],
  false: [101, 105, 111, 119, 120, 148, 166, 171, 180, 267, 289],
  totalItems: 46,
  kCorrected: true
};

// Erkek ve kadın normları (K düzeltmesi ile)
export const hipomaniNorms = {
  male: { mean: 18.92, sd: 4.44 },    // Ma + 0.2*K
  female: { mean: 18.71, sd: 4.30 }   // Ma + 0.2*K
};