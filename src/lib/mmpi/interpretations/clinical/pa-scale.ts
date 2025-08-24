export interface PaScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  psychoticFeatures?: string[];
  therapyResponse?: string[];
  additionalNotes?: string[];
}

// Paranoya Ölçeği Yorumlama Sınıfı
export class PaScale {
  getInterpretation(tScore: number): PaScaleInterpretation {
    let interpretation: PaScaleInterpretation;
    
    if (tScore >= 80) {
      interpretation = getPaVeryHighInterpretation();
    } else if (tScore >= 70) {
      interpretation = getPaHighInterpretation();
    } else if (tScore >= 60) {
      interpretation = getPaModeratelyHighInterpretation();
    } else if (tScore >= 45) {
      interpretation = getPaNormalInterpretation();
    } else if (tScore >= 27) {
      interpretation = getPaLowInterpretation();
    } else {
      interpretation = getPaVeryLowInterpretation();
    }
    
    // tScore'u set et
    interpretation.tScore = tScore;
    return interpretation;
  }
}

function getPaVeryHighInterpretation(): PaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Aşırı Yüksek (T ≥ 80)",
    description: "Kuşkulu, kızgın, küskün ve durumların doğrudan kendilerine yöneldiği biçiminde yorum yapan kişilerdir.",
    characteristics: [
      "Bu bireylerin çoğu paranoiddir",
      "Referans fikirleri vardır",
      "Temel savunma mekanizması yansıtmadır",
      "Gerçeği değerlendirme bozuktur"
    ],
    psychoticFeatures: [
      "Delüzyonlar (perseküsyon ve/ya da grandiöz biçiminde)",
      "Açık psikotik davranış",
      "Düşünce bozukluğu",
      "Perseküsyon ve/ya da grandioz türünde delüzyonları"
    ]
  };
}

function getPaHighInterpretation(): PaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Yüksek (T: 70-79)",
    description: "Diğerlerini suçlama ve hostilite temel özelliklerdir.",
    characteristics: [
      "Katı, inatçı ve aşırı duyarlıdırlar",
      "Kişilerarası ilişkilerde aşırı savunucu tutumları nedeniyle yanlış anlaşılabilirler",
      "Açık paranoid özellikler vardır",
      "Paranoid uğraşları vardır",
      "Diğerlerinin tepkilerine aşırı duyarlıdır",
      "Kendini yaşamda haksızlığa uğramış gibi hisseder",
      "Rasyonalize eder, kendi sorunları için diğerlerini suçlar",
      "Şüpheci, savunucudur",
      "Hostil, gücenik, tartışmacıdır",
      "Tutucu ve katıdır",
      "Aşırı mantıklıdır"
    ],
    therapyResponse: [
      "Psikoterapiye yanıtı kötüdür",
      "Duygusal sorunları hakkında konuşmak istemez",
      "Terapistle ilişki kurmakta ve ona sorunlarını anlatmakta güçlüğü vardır",
      "Aile üyelerine karşı hostilite ve gücenme gösterir"
    ]
  };
}

function getPaModeratelyHighInterpretation(): PaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Orta Düzeyde Yüksek (T: 60-69)",
    description: "Duyarlı bireylerdir, kendilerinin ve diğerlerinin duygularının kolaylıkla incinebileceği türünde düşünceleri vardır.",
    characteristics: [
      "Bu sıklıkla depresyonla ilgilidir",
      "Diğerlerinden gelen eleştiri ve önerileri çok ciddiye alırlar",
      "Kendilerinin söyledikleri her şeyin eleştiri gibi alındığı fikri vardır",
      "Kişilerarası ilişkilerinde savunucu ve diğer insanlara güvensizdir",
      "Diğerlerinin kendilerinden yararlanacağını düşünürler",
      "Kırgın, küskün olmaya hazırdırlar",
      "En ufak bir olumsuzluğu üstlerine alırlar",
      "İşte ve evde kendilerinden beklentiler konusunda kontrollüdürler"
    ],
    additionalNotes: [
      "Psikiyatrik hasta değilse ve başka sorunu yoksa: kibar, duygusal, nazik, huzurlu, yumuşak kalpli, duyarlı, güvenilir, işbirlikçi, samimi",
      "Çok ilgi alanı, enerjik, inisiyatif gösteren",
      "Zeki, mantıklı, açık düşünceli, içgörüsü var",
      "Kendine güveni azalmış, beklenti düzeyi yüksek, endişeye eğilimli"
    ]
  };
}

function getPaNormalInterpretation(): PaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Normal Aralık (T: 45-59)",
    description: "Bu kişiler diğerlerini değerlendirmede esnektirler.",
    characteristics: [
      "Onlara karşı duyarlıdırlar",
      "Diğerlerinin kendilerinden beklentilerini doğru anlayarak olumlu yanıt verirler",
      "55-59 T puanı arasında olan bireyler anlayışlı, duyarlı kişilerdir"
    ]
  };
}

function getPaLowInterpretation(): PaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Düşük (T: 27-44)",
    description: "İki tip insan bu puanı verebilir: Diğerlerine duyarlılığı olmayan kişiler ve çok fazla şüphesi ve endişesi olan kişiler.",
    characteristics: [
      "Geleneksel, güvenilir kişiler",
      "Kişilerarası ilişkilerde duyarsız, ilkel ve saftırlar",
      "Zekâları sınırlıdır ve ilgi alanları daralmıştır"
    ],
    additionalNotes: [
      "Paranoya maddelerini atlayan şüpheci ve endişeli kişiler de bu puanı alabilir",
      "Psikiyatrik hasta değilse: neşeli, dengeli, düzenli, ciddi, olgun ve mantıklı",
      "Akıllı ve kararlı, sosyal açıdan ilgili",
      "Sorunlarla kolay başeder, güvenilir ve sadık",
      "Kendini kontrol eder, temkinli"
    ]
  };
}

function getPaVeryLowInterpretation(): PaScaleInterpretation {
  return {
    tScore: 0, // Will be set by caller
    level: "Aşırı Düşük (T < 27)",
    description: "Paradoksal olarak açık paranoid bozukluk gösterebilir.",
    characteristics: [
      "Açık paranoid bozukluğu olabilir",
      "Delüzyonları olabilir, şüpheler, etkilenme düşünceleri gösterebilir",
      "Semptomları Pa alt testinde yüksek puan alan bireylerden daha belirsizdir",
      "Baştan savıcı ve savunucudur",
      "Utangaçtır, sırlarla doludur ve içe çekilmiştir"
    ],
    additionalNotes: [
      "Bu durum 'paranoid defensiveness' olarak bilinir",
      "Gerçek paranoid semptomlar gizlenmektedir"
    ]
  };
}

export function getPaCharacteristics(tScore: number): string[] {
  if (tScore >= 80) {
    return [
      "Açık psikotik davranış gösterir",
      "Düşünce bozukluğu vardır",
      "Perseküsyon ve/ya da grandioz türünde delüzyonları vardır",
      "Referans fikirleri vardır",
      "Kendine kötü davranıldığına da kendisiyle alay edildiğini düşünür",
      "Öfkeli ve güceniktir, kıskançlık içindedir",
      "Savunma mekanizması olarak yansıtmayı kullanır",
      "Tanı sıklıkla şizofrenik ya da paranoid bozukluktur"
    ];
  } else if (tScore >= 70) {
    return [
      "Paranoid uğraşları vardır",
      "Diğerlerinin tepkilerine aşırı duyarlıdır",
      "Kendini yaşamda haksızlığa uğramış gibi hisseder",
      "Rasyonalize eder, kendi sorunları için diğerlerini suçlar",
      "Şüpheci, savunucudur",
      "Hostil, gücenik, tartışmacıdır",
      "Tutucu ve katıdır",
      "Aşırı mantıklıdır"
    ];
  } else if (tScore >= 60) {
    return [
      "Duyarlı bireylerdir",
      "Kendilerinin ve diğerlerinin duygularının kolaylıkla incinebileceği düşüncesi",
      "Diğerlerinden gelen eleştiri ve önerileri çok ciddiye alır",
      "Kişilerarası ilişkilerinde savunucu ve güvensiz",
      "Kırgın, küskün olmaya hazır",
      "En ufak olumsuzluğu üstüne alır"
    ];
  } else if (tScore >= 45) {
    return [
      "Diğerlerini değerlendirmede esnek",
      "Duyarlı ve anlayışlı",
      "Beklentileri doğru anlayarak olumlu yanıt verir"
    ];
  } else if (tScore >= 27) {
    return [
      "Geleneksel ve güvenilir",
      "Kişilerarası ilişkilerde duyarsız",
      "İlkel ve saf",
      "Sınırlı zeka ve dar ilgi alanları"
    ];
  } else {
    return [
      "Paradoksal paranoid özellikler",
      "Gizli delüzyonlar ve şüpheler",
      "Savıcı ve savunucu",
      "Utangaç ve içe çekilmiş"
    ];
  }
}

export function getPaSpikeInterpretation(tScore: number): string {
  if (tScore >= 80) {
    return "Aşırı yüksek Pa puanı ciddi paranoid bozukluk ve psikotik özellikler gösterir. Delüzyonlar, referans fikirleri ve gerçeği değerlendirme bozukluğu mevcuttur.";
  } else if (tScore >= 70) {
    return "Yüksek Pa puanı paranoid uğraşlar, hostilite ve aşırı savunucu tutum gösterir. Psikoterapiye yanıt vermekte güçlük çeker.";
  } else if (tScore >= 60) {
    return "Orta düzeyde yüksek Pa puanı duyarlılık, savunuculuk ve kişilerarası güvensizlik gösterir. Depresyonla ilişkili olabilir.";
  } else if (tScore < 35) {
    return "Aşırı düşük Pa puanı paradoksal olarak gizli paranoid özellikler gösterebilir. 'Paranoid defensiveness' durumu söz konusudur.";
  } else {
    return "Pa puanı normal aralıkta, paranoid özellikler belirgin değil.";
  }
}