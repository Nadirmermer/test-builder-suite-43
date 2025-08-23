// Kadınlık-Erkeklik (Mf) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface MfInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
  genderSpecific?: {
    male?: string[];
    female?: string[];
  };
}

export const kadinlikErkeklikInterpretations: Record<string, MfInterpretation> = {
  // Erkek yorumlamaları
  maleVeryHigh: {
    tScoreRange: "T ≥ 80 (Erkek)",
    characteristics: [
      "Lise eğitimi olan erkeklerde ya da kültürel baskı altındakilerde kültürün verdiği erkeksi rolle özdeşim olmadığını gösterir",
      "Göreceli olarak pasif erkekleri gösterir (eğer Pd alt testi de düşükse)",
      "Bazı durumlarda kadınsı özelliklere sahip olanlara işaret eder"
    ],
    clinicalImplications: "Geleneksel erkeksi yaşam biçimi yoktur. Cinsel kimlik çatışması olasılığı yüksek."
  },

  maleHigh: {
    tScoreRange: "T: 70-79 (Erkek)",
    characteristics: [
      "Hayal kurmayı seven, içedönük, eğitim yönelimli",
      "Sporlara özel ilgi duyan kişilerdir",
      "Genellikle idealist ve hayalperest bireylerdir",
      "Sosyal açıdan duyarlıdırlar ve kolay ilişki kurarlar"
    ],
    clinicalImplications: "Eğitimi iyi olan ve kültürel açıdan zengin olan kişilerde bunlar beklenen özelliklerdir."
  },

  maleElevated: {
    tScoreRange: "T: 60-69 (Erkek)",
    characteristics: [
      "65 T puanının üstündeki yükselmeler demografik ve klinik veri dikkate alınarak değerlendirilmeli",
      "Üniversite öğrencilerinin bu aralıkta puan almaları beklenen bir durum",
      "Sanatla ilgileri olanlar da (ressamlar, artistler) bu alanda puan alırlar"
    ],
    clinicalImplications: "Eğitim ve sanatsal ilgiler bağlamında normal olabilir."
  },

  maleNormal: {
    tScoreRange: "T: 41-59 (Erkek)",
    characteristics: [
      "Erkeksi ilgiler ve davranışlar olduğunu gösterir",
      "Bütün ilgileri bu alanda daralmıştır",
      "Maceracı kişilerdir",
      "Dışarıda yapılan aktiviteleri, sporları ya da mekanik aktiviteleri severler",
      "Bu örüntüye düşük iş ilgileri eşlik eder"
    ],
    clinicalImplications: "Ergen erkeklerde Mf düşüklüğüne, suç ve okul ile ilgili sorunlar eşlik etmektedir."
  },

  maleLow: {
    tScoreRange: "T: 26-40 (Erkek)",
    characteristics: [
      "Maskülen görünmek için kompulsif bir uğraş vardır ve bu abartılmış bir boyuttadır",
      "Narsisistik bir biçimde kendi güçlerini abartırlar",
      "Bireyin kendi erkekliğini yoğun bir biçimde ortaya koyması, altta yatan kendine güvensizlik ile ilgilidir"
    ],
    clinicalImplications: "Aşırı maskülen davranış, altta yatan cinsel kimlik güvensizliğini gösterebilir."
  },

  // Kadın yorumlamaları
  femaleHigh: {
    tScoreRange: "T ≥ 65 (Kadın)",
    characteristics: [
      "Güçlü, kuvvetli, saldırgan, yönlendirici ve yarışmacıdır",
      "Geleneksel erkek rolüne özgü aktivite ve işlere girerler",
      "Güvenli ve spontandırlar",
      "Heteroseksüel ilişkilerin olduğu alanlarda ketlenmeleri vardır",
      "Kadın cinsel kimliğine uyum sağlamalarının beklendiği durumlarda anksiyöz olabilirler",
      "İddiacı, yarışmacı, inatçıdırlar",
      "Diğer kadınlar gibi görünmek ve davranmaktan hoşlanmayan kişilerdir",
      "Davranış ve düşüncelerinde bağımsız, kendine güvenli, spontan, dominant ve saldırgan olabilirler",
      "Kariyer ve iş ile aşırı uğraşma, erkeksi spor ve ilgi alanları",
      "Kendilerini kontrol edemeyecekleri durumlarda, özellikle karşı cinsle ilişkilerinde kontrolsüz bir durum varsa çok rahatsız hissederler"
    ],
    clinicalImplications: "Geleneksel kadın rolünü reddeden. Ergen kızlarda 5'in yükselmesi ev, okul ve yasalarla ilgili sorunlar olduğunu gösterir. 14-19 yaşları arasındaki kızlarda normal olabilir."
  },

  femaleElevated: {
    tScoreRange: "T: 60-65 (Kadın)",
    characteristics: [
      "Aktif, atılgan ve yarışmacı olduklarını gösterir"
    ],
    clinicalImplications: "Kadınlarda normal aktivite düzeyi."
  },

  femaleNormal: {
    tScoreRange: "T: 41-55 (Kadın)",
    characteristics: [
      "İlgi alanları orta sınıf kadınların ilgilendikleri konular ile sınırlıdır",
      "Duyarlı kişilerdir, bu duyarlılık erkeklerle ilişkilerinde daha da belirginleşir",
      "Giyimleri ile kadın olduklarını açıkça gösterirler"
    ],
    clinicalImplications: "Geleneksel kadın rolüne uyum."
  },

  femaleLowEducated: {
    tScoreRange: "T: 26-40 (Eğitim düzeyi düşük kadın)",
    characteristics: [
      "Kendini geleneksel kadın rolünde gibi sergiler",
      "Kendi kadınlığı konusunda şüpheleri vardır",
      "Pasif, uysal, itaatkardır",
      "Kendinden memnun değildir, yakınan biridir",
      "Diğerleri tarafından katı, duyarlı, idealistik olarak tanımlanır",
      "Karar verirken erkeklerin düşüncelerine başvurur",
      "Sıkıcıdır",
      "Duyguludur",
      "Alçakgönüllüdür",
      "İdealisttir",
      "Herhangi bir şeyden mutlu olmamak için ellerinden gelen gayreti gösterirler"
    ],
    clinicalImplications: "Eğer hastanede yatan psikiyatrik hastaysa büyük olasılıkla psikotik değildir. Diğer kadın hastalara kıyasla daha sosyaldir. Nevrotik üçlüde yükselme ile ilişkilidir."
  },

  femaleHighEducated: {
    tScoreRange: "T: 26-40 (Eğitim düzeyi yüksek kadın)",
    characteristics: [
      "Geleneksel kadın rolünü reddeden",
      "Stereotipik bir biçimde kadın olmadığı halde pek çok geleneksel kadınsı ilgileri vardır",
      "Kendini yetenekli, mücadeleci olarak görür",
      "Kendini alaycı, hayalperest olmayan, ilgisiz biri olarak tanımlar",
      "Diğerleri tarafından zeki, yetenekli, zorlayıcı, içgörüsü olan biri olarak tanımlanır"
    ],
    clinicalImplications: "Eğitimli kadınlarda düşük Mf farklı anlamlar taşır."
  },

  // Genel yorumlamalar
  general: {
    tScoreRange: "Genel özellikler",
    genderSpecific: {
      male: [
        "Cinsel kimliğine ilişkin çatışması vardır",
        "Erkek rolünde güvensizdir",
        "Estetik ve artistik ilgileri vardır",
        "Kadınsıdır",
        "Zeki ve yeteneklidir",
        "Hırslı yarışmacı ve sabırlıdır",
        "Zeki, mantıksal ve düzenlidir",
        "İyi yargılama yeteneği vardır, sağduyuludur",
        "Meraklıdır",
        "Yaratıcıdır, hayal gücü zengindir ve sorunlara yaklaşımı bireyseldir",
        "Sosyaldir, insanlara duyarlıdır",
        "Hoşgörülüdür",
        "Diğerlerine olumlu duygular göstermede yeteneklidir",
        "Kişilerarası ilişkilerde pasif, bağımlı ve itaatkârdır",
        "Barışı sever, çatışmadan kaçınmak için boyun eğmeyi tercih eder",
        "Kendini iyi kontrol eder, nadiren eyleme vuruk davranış gösterir",
        "Homoerotik eğilimler ya da bastırılmış homoseksüel davranışlar gösterebilir"
      ],
      female: [
        "Geleneksel kadınlık rolünü reddetme eğilimindedir",
        "İş, spor ve hobilerde erkeksi ilgileri vardır",
        "Aktif ve atılgandır",
        "Yarışmacı, saldırgan ve yönlendiricidir",
        "Kaba, terbiyesiz ve serttir",
        "Açık yüreklidir, serbest, kendine güvenlidir",
        "Kolay yönlendirilir, rahat ve dengelidir",
        "Mantıksal ve hesaplıdır",
        "Duygusuzdur",
        "Arkadaş canlısı değildir",
        "Eğer psikiyatrik hastaysa hallüsinasyonlar, delüzyonlar ve kuşkuculuk gösterir",
        "Eğer psikiyatrik hastaysa psikoz tanısı alma olasılığı vardır"
      ]
    },
    characteristics: [],
    clinicalImplications: "Cinsel kimlik ve rol tercihleri ile ilgili değerlendirme gerekir."
  },

  isolated: {
    tScoreRange: "Sadece Mf yüksek (Erkek)",
    characteristics: [
      "Sadece test 5'in yükselmesi açık ya da örtük homoseksüaliteyi gösterme açısından yeterli değildir",
      "Kendi homoseksüalitesini göstermek isteyen bireyler bu testte yavaş bir yükselme yaparlar",
      "75 T puanı ve üstü, eğitim düzeyleri orta ya da lise ise ve oldukça katı kültürel baskı varsa",
      "Bu erkeklerde geleneksel erkeksi yaşam biçimi yoktur",
      "Yüksek puanlar pasif erkekleri gösterir (eğer alt test Pd, düşük ise)",
      "Çoğunluğunda kadınsı özellikler vardır"
    ],
    clinicalImplications: "İzole Mf yükselmesi tek başına cinsel yönelimi belirlemez, kültürel ve eğitim faktörleri dikkate alınmalı."
  }
};

// Düşük puan özellikleri (Erkek)
export const mfErkekDusukPuanOzellikleri = [
  "Kendini aşırı düzeyde erkeksi olarak sergiler",
  "Fiziksel güç ve cesarete önem verir",
  "Saldırgan, maceracı ve pervasizdır",
  "Kaba ve serttir",
  "Kendi erkek kimliğine ilişkin şüpheleri vardır",
  "Entellektüel yeterliliği sınırlıdır",
  "İlgi alanları daralmıştır",
  "Katıdır ve sorunlara yaklaşımı yaratıcı değildir",
  "Hareketi düşünceye tercih eder",
  "Pratiktir",
  "Kolay uyum sağlayan sakin ve rahattır",
  "Neşeli, esprilidir",
  "Halinden memnundur",
  "Çevresini nasıl etkilediğini fark etmez",
  "Kendi güdülerine ilişkin içgörüsü azdır"
];

export function getKadinlikErkeklikInterpretation(
  tScore: number,
  gender: 'Erkek' | 'Kadin',
  isIsolatedElevation: boolean = false,
  age?: number,
  educationLevel?: 'low' | 'high'
): MfInterpretation {
  
  if (isIsolatedElevation && gender === 'Erkek') {
    return kadinlikErkeklikInterpretations.isolated;
  }
  
  if (gender === 'Erkek') {
    if (tScore >= 80) {
      return kadinlikErkeklikInterpretations.maleVeryHigh;
    } else if (tScore >= 70) {
      return kadinlikErkeklikInterpretations.maleHigh;
    } else if (tScore >= 60) {
      return kadinlikErkeklikInterpretations.maleElevated;
    } else if (tScore >= 41) {
      return kadinlikErkeklikInterpretations.maleNormal;
    } else {
      return kadinlikErkeklikInterpretations.maleLow;
    }
  } else { // Kadın
    if (tScore >= 65) {
      const interpretation = kadinlikErkeklikInterpretations.femaleHigh;
      
      // Yaş bazlı değerlendirme
      if (age !== undefined && age >= 14 && age <= 19) {
        return {
          ...interpretation,
          clinicalImplications: interpretation.clinicalImplications + " 14-19 yaşları arasında normal olabilir."
        };
      }
      
      return interpretation;
    } else if (tScore >= 60) {
      return kadinlikErkeklikInterpretations.femaleElevated;
    } else if (tScore >= 41) {
      return kadinlikErkeklikInterpretations.femaleNormal;
    } else if (tScore >= 26) {
      // Eğitim düzeyine göre yorumlama
      if (educationLevel === 'high') {
        return kadinlikErkeklikInterpretations.femaleHighEducated;
      } else {
        return kadinlikErkeklikInterpretations.femaleLowEducated;
      }
    } else {
      return kadinlikErkeklikInterpretations.femaleLowEducated;
    }
  }
}

// Mf madde numaraları ve puanlama yönü (Doğrulama için)
export const kadinlikErkeklikItems = {
  true: [4, 25, 69, 70, 74, 77, 78, 87, 92, 126, 132, 134, 140, 149, 179, 187, 203, 204, 217, 226, 231, 239, 261, 278, 282, 295, 297, 299],
  false: [1, 19, 26, 28, 79, 80, 81, 89, 99, 112, 115, 116, 117, 120, 133, 144, 176, 198, 213, 214, 219, 221, 223, 229, 249, 254, 260, 262, 264, 280, 283, 300],
  totalItems: 60,
  note: "* işaretli sorular kadınlarda ters yönde puan almaktadır (179, 231, 297 erkek için true, 133 kadın için true)"
};

// Erkek ve kadın normları
export const kadinlikErkeklikNorms = {
  male: { mean: 29.21, sd: 3.82 },
  female: { mean: 32.98, sd: 3.67 }
};