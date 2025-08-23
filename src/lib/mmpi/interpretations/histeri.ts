// Histeri (Hy) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface HyInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
}

export const histeriInterpretations: Record<string, HyInterpretation> = {
  veryHigh: {
    tScoreRange: "T ≥ 85",
    characteristics: [
      "Aşırı immatür, benmerkezcil ve bağımlı kişilerdir",
      "Bastırma savunma mekanizmasını kullanmaları şaşırtıcıdır",
      "İçgörü eksikliği vardır",
      "Semptomlar gerçek organik patolojiye uymamaktadır",
      "Genellikle kroniktir ve ciddi rijidite vardır"
    ],
    clinicalImplications: "Aşırı immatürite ve benmerkezcilik ile karakterize. Bastırma mekanizması ve içgörü eksikliği belirgin. Kronik seyir ve rijidite beklenir."
  },

  high: {
    tScoreRange: "T: 76-85",
    characteristics: [
      "Uzun süredir devam eden gerginliğe bağlı konversif semptomlar geliştirmişlerdir",
      "Semptomlar baş ağrısı, sırt ağrısı, göğüs ağrısı, zayıflık, baş dönmesi ve baygınlıktır",
      "Uzun süredir devam eden güven duymama vardır",
      "İmmatürite belirgindir",
      "Organize olmuş bedensel yakınmaları vardır"
    ],
    clinicalImplications: "Konversiyon semptomları belirgin. Uzun süreli güvensizlik ve immatürite ile birlikte organize bedensel yakınmalar.",
    therapeuticConsiderations: "Konversif semptomların uzun süreli olması tedavi sürecini zorlaştırabilir."
  },

  clinical: {
    tScoreRange: "T: 70-75",
    characteristics: [
      "Bastırma ve inkârı çok fazla kullanan",
      "Çok fazla itaat eden (uysal), saf ve çocuksu biçimde benmerkezcil",
      "Anksiyete ile bağlantılı somatik yakınmaları olan",
      "Histeroid mekanizmaları kullanır ve bunlarla ikincil kazanç elde eder",
      "Çok fazla sevgi, kabul ve destek isteyebilirler",
      "Çok aktif (yüzeysel olsa da) sosyal yaşamları vardır",
      "Davranışları konusunda içgörüleri oldukça azdır",
      "Açık bir biçimde teşhirci ve seksüel ya da saldırganlık düzeyinde dışa vuran davranışları olabilir",
      "İnkâr ve bastırmayı aşırı bir biçimde kullanırlar",
      "Sevilmeye olan güçlü gereksinime bağlı olarak, bağlanma gerektiren durumlarda verdikleri ilk tepki genellikle coşkulu olacaktır",
      "Kendilerinden istenenler konusunda kızgın ve kinci olurlar",
      "Genellikle pasif biçimde dirençlidirler, sızlanıp yakınırlar"
    ],
    clinicalImplications: "Tipik histerik özellikler belirgin. Bastırma ve inkâr mekanizmalarının aşırı kullanımı. İkincil kazanç belirgin.",
    therapeuticConsiderations: "Başlangıçta tedaviye istekli görünse de psikolojik yorumlara ve tedaviye dirençli. İçgörü kazanması yavaş."
  },

  elevated: {
    tScoreRange: "T: 60-69",
    characteristics: [
      "İki farklı örüntü vardır:",
      "1. Eğer Hs'nin yükselmesi Hy ile aynı düzeyde ise ve D alt testi, 1 ve 3 alt testinden 10 T puanı düşükse histerik kişiye işaret etmektedir",
      "2. Eğer Hy alt testi Hs alt testinde 10 T puanı yüksekse histerik özellikler belirgindir",
      "Kendine odaklaşmıştır",
      "Kendilerini olduğundan farklı ve mükemmel kişiler olarak görmek isterler",
      "Kişilerarası ilişkilerde içgörü azlığı vardır"
    ],
    clinicalImplications: "Stres sırasında somatizasyona sığınma görülebilir. Histerik özellikler ve benmerkezcilik."
  },

  normal: {
    tScoreRange: "T: 45-59",
    characteristics: [
      "Bu alana özgü bir tanımlama yoktur"
    ],
    clinicalImplications: "Normal aralık - özel yorumlama gerekmiyor."
  },

  low: {
    tScoreRange: "T: 24-44",
    characteristics: [
      "Kendilerini sürekli eleştirirler",
      "Olumlu kişilerarası ilişkileri inkâr etme eğilimi vardır",
      "Si alt testinde yükselme, bireyin diğer insanlardan kaçma eğiliminde olduğunu göstermektedir"
    ],
    clinicalImplications: "Aşırı öz-eleştiri ve sosyal ilişkileri inkâr etme eğilimi."
  },

  isolated: {
    tScoreRange: "Sadece Hy yüksek",
    characteristics: [
      "Kabul edilme ve sevilmeye gereksinimi fazladır",
      "Ait olduğu grup tarafından reddedilme olasılığına yönelik endişe yaşar",
      "Kızgınlık ve kendini ortaya koymayı içeren yüzleşme durumlarıyla uğraşırken çok rahatsız olur",
      "Tartışmalarda iyimserliklerini ve diğer insanlarla olan iyi ilişkilerini vurgularlar",
      "Kendilerinde doğal olmayan ya da sapkın davranışları en aza indirgerler"
    ],
    clinicalImplications: "İzole Hy yükselmesi, kabul edilme ihtiyacı ve reddedilme korkusu ile karakterize."
  },

  general: {
    tScoreRange: "Genel özellikler",
    characteristics: [
      "Strese fiziksel semptomlar geliştirerek tepki verir ve sorumluluktan kaçar",
      "Baş ağrısı, göğüs ağrıları, güçsüzlük, taşikardi, anksiyete atakları vardır",
      "Semptomlar bir görünür, bir kaybolur",
      "Semptomlarının nedenlerine ilişkin içgörü azdır",
      "Kendi güdü ve duygularını anlamaz",
      "Üzüntüye eğilimlidir",
      "Psikolojik açıdan gelişmemiş, çocuksu ve immatürdür",
      "Kendine odaklıdır, narsisistik, ben-merkezcildir",
      "Diğerlerinden ilgi ve sevgi bekler",
      "İlgi ve sevgiyi alabilmek için dolaylı ve baştan çıkarıcı yollar kullanır",
      "Hostilite ve kızgınlığını açık olarak ifade etmez",
      "Sosyal açıdan katılımcıdır",
      "Dost canlısı, konuşkan, gayretli ve ataktır",
      "Kişilerarası ilişkilerinde yüzeysel ve çocuksudur",
      "İnsanlarla kendi çıkarları için ilgilenir",
      "Evlilikle ilgili mutsuz yaşantıları vardır",
      "Sosyal grup tarafından kabul görmediği hissini duyar",
      "Otorite figürleriyle sorunu vardır",
      "Aile öyküsünde reddedici baba figürü bulunur"
    ],
    clinicalImplications: "Eğer psikiyatrik hastaysa sıklıkla konversiyon bozukluğu tanısı konulur. Gerginlik, anksiyete, depresyon belirtileri göstermez. Nadiren delüzyonlar, hallüsinasyonlar, hezeyanlardan yakınır. Psikotik tanısı konulamaz."
  }
};

// Düşük puan özellikleri
export const histeriLowScoreCharacteristics = [
  "Temkinli, geleneksel ve uysaldır",
  "Maceracı ve çalışkan değildir",
  "İlgi alanları daralmıştır",
  "Sosyal katılımı sınırlıdır",
  "Lider olma rolünden kaçar",
  "Arkadaş canlısı değildir, anlaşılması zor biridir",
  "Kuşkucudur, diğer insanlara güvenmez",
  "Gerçekçidir, mantıklıdır, sorunları aşama aşama çözer",
  "Yaşama bakışı donuktur"
];

export function getHisteriInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false
): HyInterpretation {
  if (isIsolatedElevation) {
    return histeriInterpretations.isolated;
  }
  
  if (tScore >= 85) {
    return histeriInterpretations.veryHigh;
  } else if (tScore >= 76) {
    return histeriInterpretations.high;
  } else if (tScore >= 70) {
    return histeriInterpretations.clinical;
  } else if (tScore >= 60) {
    return histeriInterpretations.elevated;
  } else if (tScore >= 45) {
    return histeriInterpretations.normal;
  } else {
    return histeriInterpretations.low;
  }
}

// Histeri madde numaraları ve puanlama yönü (Doğrulama için)
export const histeriItems = {
  true: [10, 23, 32, 43, 44, 47, 76, 114, 179, 186, 189, 238, 253],
  false: [
    2, 3, 6, 7, 8, 9, 12, 26, 30, 51, 55, 71, 89, 93, 103, 107, 109, 124, 
    128, 129, 136, 137, 141, 147, 153, 160, 162, 163, 170, 172, 174, 175, 
    180, 188, 190, 192, 201, 213, 230, 234, 243, 265, 267, 274, 279, 289, 292
  ],
  totalItems: 60
};

// Türk normları (Savaşır, 1981)
export const histeriNorms = {
  male: { mean: 19.31, sd: 4.71 },    // Kitaptan alınan değerler
  female: { mean: 22.33, sd: 5.31 }   // Kadın ortalaması kitaptan farklı (22.33 vs 18.12)
};