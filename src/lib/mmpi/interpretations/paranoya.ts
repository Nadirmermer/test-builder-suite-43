// Paranoya (Pa) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface PaInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
}

export const paranoyaInterpretations: Record<string, PaInterpretation> = {
  veryHigh: {
    tScoreRange: "T ≥ 80",
    characteristics: [
      "Kuşkulu, kızgın, küskün ve durumların doğrudan kendilerine yöneldiği biçiminde yorum yapan kişilerdir",
      "Çoğu paranoiddir, referans fikirleri vardır",
      "Temel savunma mekanizması yansıtmadır",
      "Gerçeği değerlendirme bozuktur",
      "Delüzyonlar, perseküsyon ve/ya da grandiöz biçimindedir",
      "Açık psikotik bir davranış gösterir",
      "Düşünce bozukluğu vardır",
      "Kendine kötü davranıldığını ya da kendisiyle alay edildiğini düşünür"
    ],
    clinicalImplications: "Açık paranoid bozukluk. Tanı sıklıkla şizofrenik ya da paranoid bozukluktur.",
    therapeuticConsiderations: "Psikoterapiye yanıtı kötüdür. Duygusal sorunları hakkında konuşmak istemez."
  },

  high: {
    tScoreRange: "T: 70-79",
    characteristics: [
      "Diğerlerini suçlama ve hostilite temel özelliklerdir",
      "Katı, inatçı ve aşırı duyarlıdırlar",
      "Kişilerarası ilişkilerde aşırı savunucu tutumları nedeniyle yanlış anlaşılabilirler",
      "Açık paranoid özellikler vardır",
      "Öfkeli ve güceniktir, kıskançlık içindedir",
      "Savunma mekanizması olarak yansıtmayı kullanır",
      "Paranoid uğraşları vardır"
    ],
    clinicalImplications: "Belirgin paranoid eğilimler. Kişilerarası ilişkilerde önemli güçlükler.",
    therapeuticConsiderations: "Terapistle ilişki kurmakta ve ona sorunlarını anlatmakta güçlüğü vardır."
  },

  moderate: {
    tScoreRange: "T: 60-69",
    characteristics: [
      "Duyarlı bireylerdir, kendilerinin ve diğerlerinin duygularının kolaylıkla incinebileceği türünde düşünceleri vardır",
      "Diğerlerinden gelen eleştiri ve önerileri çok ciddiye alırlar",
      "Kişilerarası ilişkilerinde savunucu ve diğer insanlara güvensizdir",
      "Diğerlerinin kendilerinden yararlanacağını düşünürler",
      "Kırgın, küskün olmaya hazırdırlar",
      "En ufak bir olumsuzluğu üstlerine alırlar",
      "Diğerlerinin tepkilerine aşırı duyarlıdır",
      "Şüpheci, savunucudur"
    ],
    clinicalImplications: "Orta düzeyde paranoid eğilimler. Sıklıkla depresyonla ilgilidir.",
    therapeuticConsiderations: "Aile üyelerine karşı hostilite ve gücenme gösterir."
  },

  normal: {
    tScoreRange: "T: 45-59",
    characteristics: [
      "Diğerlerini değerlendirmede esnektirler",
      "Onlara karşı duyarlıdırlar",
      "Diğerlerinin kendilerinden beklentilerini doğru anlayarak olumlu yanıt verirler",
      "Anlayışlı, duyarlı kişilerdir"
    ],
    clinicalImplications: "Normal düzeyde güven ve şüphe dengesi."
  },

  low: {
    tScoreRange: "T: 27-44",
    characteristics: [
      "Geleneksel, güvenilir kişilerdir",
      "Kişilerarası ilişkilerde duyarsız, ilkel ve saftırlar",
      "Zekâları sınırlıdır ve ilgi alanları daralmıştır",
      "Neşelidir, dengeli ve düzenlidir",
      "Ciddi, olgun ve mantıklıdır",
      "Sorunlarla kolay bir biçimde başeder"
    ],
    clinicalImplications: "Düşük paranoid eğilim. İki tip: duyarsız kişiler veya çok fazla şüphesi olan kişiler."
  },

  veryLow: {
    tScoreRange: "T < 35",
    characteristics: [
      "Açık paranoid bozukluğu olabilir",
      "Delüzyonları olabilir, şüpheler, etkilenme düşünceleri gösterebilir",
      "Semptomları belirsizdir",
      "Baştan savıcı ve savunucudur",
      "Utangaçtır, sırlarla doludur ve içe çekilmiştir"
    ],
    clinicalImplications: "Paradoksal olarak paranoid bozukluk gösterebilir. Semptomlar daha belirsizdir."
  },

  isolated: {
    tScoreRange: "Tek yükselme",
    characteristics: [
      "Aşırı duyarlı, katı, gergin ve kaygılıdırlar",
      "Yaşamlarında iş ve sosyal baskı olduğunu hissederler",
      "Şüphecilik, güvensizlik, düşüncelere dalma vardır",
      "Diğerlerini suçlamaya yönelik bir projeksiyon mekanizmaları vardır",
      "Sorunlara aşırı tepki verirler"
    ],
    clinicalImplications: "İzole paranoid eğilimler. Stres faktörü önemli."
  }
};

export function getParanoyaInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false
): PaInterpretation {
  if (isIsolatedElevation) {
    return paranoyaInterpretations.isolated;
  } else if (tScore >= 80) {
    return paranoyaInterpretations.veryHigh;
  } else if (tScore >= 70) {
    return paranoyaInterpretations.high;
  } else if (tScore >= 60) {
    return paranoyaInterpretations.moderate;
  } else if (tScore >= 45) {
    return paranoyaInterpretations.normal;
  } else if (tScore >= 35) {
    return paranoyaInterpretations.low;
  } else {
    return paranoyaInterpretations.veryLow;
  }
}

// Pa madde numaraları (Doğrulama için)
export const paranoyaItems = {
  true: [15, 16, 22, 24, 27, 35, 110, 121, 123, 127, 151, 157, 158, 202, 275, 284, 291, 293, 299, 305, 317, 338, 341, 364, 365],
  false: [73, 80, 93, 107, 109, 111, 117, 124, 268, 281, 294, 313, 316, 319, 327, 347, 348],
  totalItems: 40
};

// Erkek ve kadın normları
export const paranoyaNorms = {
  male: { mean: 12.04, sd: 3.69 },
  female: { mean: 12.85, sd: 3.94 }
};