// Depresyon (D) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface DInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
  specialConsiderations?: string;
}

export const depresyonInterpretations: Record<string, DInterpretation> = {
  high: {
    tScoreRange: "T ≥ 70",
    characteristics: [
      "Depresif, mutsuz, kederli ve sıkıntılıdır",
      "Gelecekten umutsuzdur",
      "Kendini aşağılamaktadır",
      "Suçluluk duyguları vardır",
      "Konuşmak istemez",
      "Ağlar",
      "Yavaş hareket eder",
      "Somatik yakınmaları vardır",
      "Güçsüzlük, yorgunluk, enerji kaybından yakınır",
      "Ajite ve gergindir",
      "Kolay kızar",
      "Üzüntüye eğilimlidir",
      "Kendine güveni azalmıştır",
      "Okulda ya da işte başarısız olduğunu düşünür",
      "Kendini işe yaramaz ve iş görmez gibi görür",
      "İçe çekilmiş, utangaç, ürkek, yalnız kalmaya eğilimli ve ketumdur",
      "Soğuktur",
      "Kişilerarası ilişkilerden kaçınır, insanlarla fazla konuşmaz",
      "Temkinli ve gelenekseldir",
      "Karar vermede güçlük çeker",
      "Saldırgan değildir",
      "Aşırı kontrollüdür, dürtülerini inkâr eder",
      "Hoş olmayan durumlardan kaçınır",
      "Yüzleştirmeden kaçınmak için ödün verir"
    ],
    clinicalImplications: "Depresif tanısı konulabilir. Alt test 2 tek başına T-70 değeri üzerinde bir yükselme gösteriyorsa ve depresyona ilişkin açık davranışsal belirtiler yoksa, intihar riskine karşı dikkatli olmak gerekir.",
    therapeuticConsiderations: "Huzursuzluğu nedeniyle psikoterapiye güdülüdür. Var olan stresi yatıştığında terapiyi sonlandırma eğilimindedir."
  },
  
  veryHigh: {
    tScoreRange: "T ≥ 85",
    characteristics: [
      "Bir şeye odaklaşamayacak ya da açık bir biçimde düşünemeyecek kadar kederli"
    ],
    clinicalImplications: "Çok yüksek düzeyde depresif semptomlar."
  },
  
  elevated: {
    tScoreRange: "T: 79+",
    characteristics: [
      "Birey depresif ve kaygılıdır",
      "Benlik saygısı düşüktür",
      "Genel olarak yaşama bakışı karamsardır",
      "İlgi alanları daralmış, morali bozuktur",
      "Kendisini işe yaramaz olarak görür",
      "Duyarlıkları kendi depresyonlarına ve fonksiyon düzeylerine yönelmiştir",
      "Kendilerini soyutlama ile içe çekilme görülür"
    ],
    clinicalImplications: "Bu negatif yüklemeler kendilerinden hoşnut olmama sonucunu doğurur, bu da değişme isteğiyle birlikte iyi bir prognoz sağlar. Yüksek puanlar sıklıkla somatik belirtiler ve yakınmalarla bir arada bulunur. Bu sübjektif gerginlik anksiyete belirtisi olabileceği gibi gerçek bir depresif durum da olabilir."
  },
  
  moderate: {
    tScoreRange: "T: 70-79",
    characteristics: [
      "Ciddi ve kendine güveni olmayan bireyler",
      "En küçük bir şey karşısında bile endişe duyma eğilimi içindedirler",
      "Tipik olarak iyi ve kötü ya da doğru ve yanlış biçiminde düşünürler"
    ],
    clinicalImplications: "Klinik olarak belirgin depresyonu olan bireyi gösterir. Psikiyatrik hastalar bu ranjda yer alırlar. Bu alandaki bireyin yaşadığı huzursuzluk onun iyileşme için motive olduğunun göstergesidir. Hastada depresyonun göstergeleri yoksa ve diğer alt testler yükselmemişse hastanın intihar eğilimi açısından değerlendirilmesi gerekmektedir.",
    specialConsiderations: "Eğer o an durumsal baskılar yoksa ve özellikle L de yükselmiş ise bu bireyler, tipik olarak iyi ve kötü ya da doğru ve yanlış biçiminde düşünürler."
  },
  
  midRange: {
    tScoreRange: "T: 60-69",
    characteristics: [
      "Orta düzeyde depresyon, endişe ve karamsarlık göstergesi vardır"
    ],
    clinicalImplications: "Bu duygudurum hali, durumsal bir krize bağlı olabileceği gibi kalıcı ve geri dönüşü olmayan bir durum da olabilir."
  },
  
  normal: {
    tScoreRange: "T: 45-59",
    characteristics: [
      "Yaşamında iyimserlik ve karamsarlık dengesini kurduğunun göstergesidir"
    ],
    clinicalImplications: "Normal duygudurum dengesi."
  },
  
  low: {
    tScoreRange: "T: 28-44",
    characteristics: [
      "Gerginlik, anksiyete, suçluluk ve depresyondan arınmıştır",
      "Rahat ve huzurludur",
      "Kendine güvenlidir",
      "Duygusal açıdan dengeli ve tutarlıdır",
      "Pek çok durumda etkili davranır",
      "Neşeli ve iyimserdir",
      "Sözelleştirmede güçlüğü çok azdır",
      "Aktif, enerjik, uyanıktır",
      "Yarışmacıdır",
      "Sorumluluk alabilir",
      "Sosyal ortamlarda rahattır",
      "Liderlik rolünü üstlenir",
      "Zeki, esprili ve renklidir",
      "İlk bakışta olumlu bir izlenim yaratır",
      "İmpulsif değildir, kontrollüdür",
      "Ketlenmemiştir, kendini kolaylıkla ortaya koyabilir"
    ],
    clinicalImplications: "Olasılıkla neşeli, meraklı, iyimser, aktif ve dışa dönüktürler. Bu durum bazen bu bireylerin kayıtsız gibi algılanmalarına neden olur, bu da diğerlerinde hostilite ortaya çıkarır.",
    specialConsiderations: "Diğer insanlarda kızgınlık ve düşmanlık uyandırır. Otorite rolünde olan kişilerle çatışması vardır."
  },
  
  isolated: {
    tScoreRange: "Sadece D yüksek (T ≥ 70)",
    characteristics: [
      "Reaktif bir depresyon yaşamaktadır",
      "Yetersiz, güvensizdir",
      "Kendini cezalandırarak suçluluk duygularından kurtulma çabası içindedir",
      "Çok fazla kaygılıdır",
      "Kendini eleştirir",
      "Sanki yaşadığı durum ya da bunu kontrol edememe için bir kefaret (ceza) ödeyecekmiş gibi",
      "Birey depresif olduğunu inkâr edecektir"
    ],
    clinicalImplications: "Psikoterapi prognozu genellikle kısa bir süre içinde iyidir ve bu tür hastalar yöneltici, yüzleştirici bir yaklaşıma iyi yanıt verirler.",
    specialConsiderations: "Lise öğrencilerinde 2'nin tek başına 70 T puanının üstünde olması genellikle klinik olarak daha az anlamlıdır ve sıklıkla durumsal sorunları (karşı cinsle ilişkiler, ders çalışmada ya da mesleki seçenekler üzerindeki kaygı) yansıtır. Depresyonun tek başına yüksek olduğu yüksekokul öğrencileri tipik olarak sorunlarının kökenine inme çabalarını reddederler ve bunun yerine ebeveyn yerine geçen birinden öğüt almaya çalışırlar."
  }
};

export function getDepresyonInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false,
  isAdolescent: boolean = false
): DInterpretation {
  if (isIsolatedElevation) {
    const interpretation = { ...depresyonInterpretations.isolated };
    if (isAdolescent) {
      interpretation.specialConsiderations = "Lise öğrencilerinde 2'nin tek başına 70 T puanının üstünde olması genellikle klinik olarak daha az anlamlıdır ve sıklıkla durumsal sorunları (karşı cinsle ilişkiler, ders çalışmada ya da mesleki seçenekler üzerindeki kaygı) yansıtır.";
    }
    return interpretation;
  }
  
  if (tScore >= 85) {
    return depresyonInterpretations.veryHigh;
  } else if (tScore >= 79) {
    return depresyonInterpretations.elevated;
  } else if (tScore >= 70) {
    return depresyonInterpretations.moderate;
  } else if (tScore >= 60) {
    return depresyonInterpretations.midRange;
  } else if (tScore >= 45) {
    return depresyonInterpretations.normal;
  } else {
    return depresyonInterpretations.low;
  }
}