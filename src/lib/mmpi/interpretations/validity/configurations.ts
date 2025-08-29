// src/lib/mmpi/interpretations/validity/configurations.ts

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

// ============================================================================
// INTERFACE'LER
// ============================================================================

/**
 * Geçerlik konfigürasyonu veri yapısı
 */
export interface ValidityConfiguration {
  name: string;
  description: string;
  interpretation: string;
  additionalNotes?: string[];
  clinicalImplications?: string[];
  personalizedNotes?: string[];
}

/**
 * F-K Endeksi analiz sonucu
 */
export interface FKIndex {
  value: number;
  interpretation: string;
  validity: 'geçerli' | 'sahte-iyilik' | 'sahte-kötülük' | 'dikkatli-değerlendirme' | 'geçersiz';
  description?: string;
  clinicalImplications?: string[];
}

/**
 * K+ Profil analiz sonucu
 */
export interface KPlusProfile {
  isKPlusProfile: boolean;
  interpretation?: string;
  characteristics?: string[];
  clinicalImplications?: string[];
}

// ============================================================================
// GEÇERLİK KONFİGÜRASYON VERİLERİ
// ============================================================================

export const validityConfigurations = {
  reverseV: {
    name: "Konfigürasyon 1 (Tersine V)",
    description: "L ve K alt testlerinin T değerinin 50-60 ve F alt testinin T değerinin 70'in üzerinde olduğu durumlar.",
    interpretation: "Birey kişisel ve duygusal zorluklarını kabullenmekte ve yardım istemektedir. Sorunlarıyla kendisinin başa çıkabileceğinden emin değildir. F alt testi yükseldikçe, bireyin sorunlarını abartarak kısa süre içinde yardım almak istediği ya da simulasyon yaptığı söylenebilir. Testi veren kişi bu durumlardan hangisinin bireye uygun olduğuna karar vermelidir. Birey, kronik bir uyumsuzluk örüntüsü gösterse bile psikiyatrik açıdan yardım edilmesi güçtür ve zaman içinde de konfigürasyonda belirgin bir değişiklik olmaz."
  },
  
  openV: {
    name: "Konfigürasyon 2 (Açık V)",
    description: "L ve K alt testlerinin en az 60 T düzeyinde (70 T puanına bile yaklaşabilir) F alt testinin 50 T puanına yakın olduğu durumlar.",
    interpretation: "Bu birey kabul edilmez duygularından, impulslarından, dürtülerinden ve sorunlarından kaçmakta ya da bunları inkâr etmektedir. Birey kendini en iyi biçimde sunar. Dünyayı uçlarda, iyi ve kötü olarak görür. Eğer değerlendirilen bireyden elde edilen veriler yeterli ise savunuculuk ve psikopatolojinin inkârından şüphelenilmelidir.",
    additionalNotes: [
      "Bireyin yeterli sosyal uyumu olabilir, en kötüsü davranış bozukluğu tanısı konulur.",
      "Eğer psikotik profiller de yükselmişse, bu konfigürasyon psikotik bir bireyi gösterir.",
      "Yukarıda tanımlanan durum yoksa bu konfigürasyon savunucu normallerden, histeriklerden ve hipokondriyak bireylerden elde edilir.",
      "Bu duruma Hs ve Hy yükselmesi eşlik eder. Profildeki diğer testler ortalama puandadır."
    ]
  },
  
  veryClosedV: {
    name: "Konfigürasyon 3 (Çok Kapalı Geçerlik Konfigürasyonu)",
    description: "F alt testi 50 T puanının altında, L ve K alt testi 60 T puanının üzerindedir.",
    interpretation: "Bu \"Çok Kapalı Geçerlik Konfigürasyonu\"dur. L ve K alt testleri ne kadar çok yükselirse, bu kişi kendisini olduğundan daha iyi gösterme çabası içindedir. Kişi böyle yaparak sorunlarını, kabul edilmeyen dürtülerini ya da duyguları azaltma ya da inkâr etme yoluna gitmiştir. Bu geçerlik konfigürasyonu özellikle kendini iyi göstermek isteyen, iş arayan ve diğer durumlardaki (gözaltındakiler gibi) kişilerin çok sık verdiği bir konfigürasyon biçimidir. Psikiyatri kliniklerinde yatanlarda bu geçerlik örüntüsü, inkârı kullanan ya da savunma mekanizmaları ile kontrolü sağlamaya çalışan psikotik hastalarda görülmektedir. Bu tür örüntünün ortaya çıktığı diğer tanı grupları histerikler, hipokondriyaklar, alkolikler ya da madde bağımlılarıdır. İnkâr mekanizmasını kullanan ve içgörüsü az bireylerde görülür.",
    additionalNotes: [
      "Bu inkâr tutumu klinik testler üzerinde azaltıcı etkiye sahiptir ve böyle bir faktör ancak bu testlerin araştırılması ile ortaya çıkartılabilir.",
      "Klinikte \"V geçerlik\" konfigürasyonunun etkisini karşılamak için klinik testleri pratik olarak 5-10 puan yükseltmek yardımcı olmaktadır. Yani 50 T puanının üstündeki her klinik alt teste 5-10 T puanı eklenebilir (Greene 1980).",
      "Bazı profillerde, K alt testi F alt testinden 20 ya da daha çok T puanındadır. Böyle bireyler sıklıkla kendi psikolojik yaşantılarını açığa vurmada isteksiz ve savunucudurlar.",
      "Onların bu güçlü savunmaları, testte uygun bir görünüm sunma eğilimini ve terapötik bir birlikteliğin gelişmesine engel olmayı gösterir."
    ],
    clinicalImplications: [
      "Bilinçli aldatma eğilimi",
      "Negativistik bir tutum ve iletişimi reddetme", 
      "Aşırı katılık ve saflık",
      "Herhangi bir kişilik yetersizliğine yönelik açıklamayı tolere etmede güçsüzlük"
    ]
  },

  risingSlope: {
    name: "Konfigürasyon 4 (Yükselen Eğilim)",
    description: "L alt testi F'den, F alt testi de K'dan düşüktür. L alt testi 40 T puanında, F alt testi 45-55 T, K alt testi 60 T puanındadır.",
    interpretation: "Bu konfigürasyon sorunlarıyla baş edebilecek uygun kaynaklara sahip ve testi aldığı dönemde stres ya da gerilim yaşamayan normal kişilerin tipik konfigürasyonudur. Bu bireylerin K alt testindeki yükseltisi öğrenim durumlarına ve sosyo-ekonomik düzeylerine göre iniş çıkış gösterecektir. Bu yükselmenin kendiliğinden psikiyatriye başvuran kişilerde görülme olasılığı düşüktür. İşe girmek için başvuran ya da hapishanedeki bir kişi, kendini iyi göstermek için bu tür bir geçerlik konfigürasyonu verecektir.",
    additionalNotes: [
      "Genellikle bu durum, evlilik çatışması yaşayan \"normal\" bireylerde görülebilir.",
      "Sofistike savunmaları olan üst sosyo-ekonomik ya da lise düzeyinde eğitim görmüşlerde görülebilir."
    ]
  },

  fallingSlope: {
    name: "Konfigürasyon 5 (Azalan Eğilim)",
    description: "L alt testi F'den, F alt testi de K'dan büyüktür. L 60 T puanına, F yaklaşık 50 T puanına yükselmiş, K alt testi 40-45 T puanı arasındadır.",
    interpretation: "Bu kişiler, kendilerini iyi göstermeye çalışırlar, sorunlarını kabul etmekten ya da kendileri ile uğraşılmasını istemekten hoşlanmazlar. Ancak bu kişilerin iyi görünme çabaları etkisizdir ve nevrotik üçlü genellikle yükselir. Erkeklerde Mf düşük olabilir. Eğitimi ve sosyo-ekonomik düzeyleri düşük bireylerde daha çok görülür."
  },

  randomResponse: {
    name: "Konfigürasyon 6 (Rastgele Cevaplama)",
    description: "L ve K alt testleri 55 T, F alt testi 105 T puanının üstündedir.",
    interpretation: "Profil, hastanın maddeleri rastgele cevaplamasından dolayı geçersizdir. Bu durum hastanın konfüzyonundan, öfkesinden, test durumuna karşı direncinden ya da zekâ faktöründen kaynaklanıyor olabilir. Klinisyen cevap verme örüntüsünün nedenlerini araştırdıktan sonra, testi hastaya tekrar vermelidir.",
    additionalNotes: [
      "Ek olarak son 6 klinik test, 70 T üstünde olmakta ya da toplu yükselme göstermektedir.",
      "Klinik testlerdeki yükselme ve F'deki yükselme \"V\" şeklinde örüntüye benzese de, burada önemli olan rastgele doldurmada L ve K'nin yüksekliğidir."
    ]
  },

  allTrue: {
    name: "Konfigürasyon 7 (Tümüne \"doğru\" yanıt verme)",
    description: "L ve K alt testinin 35 T puanını aşmasını, F alt testinin 120'nin üzerinde yer almasını gerektirir. Ek olarak, klinik testlerden Pd, Pa, Pt, Sc ve Ma 90 T puanının üzerinde yer alır.",
    interpretation: "Eğer profil geçerli ise, böyle bir kişi, düşünce ve davranışındaki majör bozukluklar ve günlük yaşantısında yetersizliklerin var olduğu ajite psikotik bir tabloyu göstermektedir.",
    clinicalImplications: [
      "Her soruyu 'doğru' olarak işaretleme",
      "\"Yardım çağrısı\" profili",
      "Ergenlerde akut bir rahatsızlık yaşanması (Özellikle erkek ergenler)",
      "Yetişkinlerde çok dirençli olma",
      "Sahte-kötülük profili. (F-K indeksi 11 puanı aşmaktadır.)"
    ]
  },

  allFalse: {
    name: "Konfigürasyon 8 (Tümüne \"yanlış\" yanıt verme)",
    description: "Bireyin bütün soruları \"Yanlış\" olarak işaretlemesidir. L, F ve K testlerinin tümü 80 T puanının üzerindedir. Ek olarak Hy, D, Hs ve Pd alt testleri 80 T ve üstüne yükselmiştir.",
    interpretation: "Profil geçersizdir. Hasta tüm maddelere yanlış olarak cevap verme eğilimindedir. Kişi konfüzyondadır, öfkelidir ya da test almak istememektedir. Klinisyen hastanın bu tutumunun nedenlerini araştırdıktan sonra, hastaya testi tekrar verebilir.",
    additionalNotes: [
      "Bu örüntü çok ajite ya da yıkımı olan psikotik hastalardan elde edilir."
    ]
  },

  risingPeak: {
    name: "Konfigürasyon 9 (Yükselen Tepe)",
    description: "L ve K alt testleri 66 T puanının altında, F alt testi ise 100 T puanına yakın ya da altındadır.",
    interpretation: "Bu profil geçerlidir. Geçerlik konfigürasyonu hastanın dile getirmek istediği psikolojik sorunları olduğunu göstermektedir. Bu tür konfigürasyon veren hastalar karamsar, dik kafalı, huzursuz ve asi kişilerdir. Kendilerini aşırı eleştirirler, psikolojik sorunlarını kabul etmeye hazırdırlar. Kullandıkları savunma mekanizmaları, içinde bulundukları durumla başa çıkmada yetersiz kalmaktadır. Bu hastalar kolay incinebilirler.",
    additionalNotes: [
      "F alt testi 80 T puanının üstüne çıktıkça ya da 40 T puanının altına düştükçe kişi, çok akut ve yaygın bir stres yaşar ve bu nedenle yeteneklerini kullanamaz.",
      "Bu durumda bir kişi krize müdahale ile sıkıntısı hafifleyinceye kadar, psikoterapötik yardıma cevap veremez.",
      "Böyle yüksek bir F, kişinin çok kısa sürede yardım almak için \"yardım için ağlamayı\" test aracılığı ile göstererek, stres ve kişilik sorunlarını abartabileceğini ya da simulasyon yapabileceğini gösterir."
    ]
  },

  unconventionalResponse: {
    name: "Konfigürasyon 10",
    description: "L alt testi 66 T puanının altında. F alt testi 69 T puanının ve K alt testi 65 T puanının üstündedir.",
    interpretation: "Profil geçerli gibi görünse de geçerlik konfigürasyonu geleneksel olmayan bir cevap örüntüsünün varlığını göstermektedir. Birey psikolojik sorunlarını kabul etmektedir. Bireyin akut bir bozukluğu vardır, ancak başa çıkmada kullandığı savunma mekanizmaları henüz bozulmamıştır. Ancak birey bunları kullanmada güçlük çekmektedir. Patolojinin açık gösterimi ve savunucu kontrol arasındaki denge bu kişilerde durağan değildir ve yordanamaz."
  },

  openCommunication: {
    name: "Konfigürasyon 11",
    description: "L alt testi 55 T puanının altında, F alt testi 64 T puanına yakın, K alt testi 45 T puanının altında.",
    interpretation: "Bu profil geçerlidir. Benzer profil veren bireyler konuşma ve tavırlarında açıktırlar ve laflarını sakınmazlar. Ergen grubu dışında kalan bireylerde ego gücünde düşüklük ve yetersiz savunma mekanizmaları vardır. Bu bireyler bir biçimde farklıdırlar. Eğer açık bir psikolojik bozukluk yoksa hastada nevrotik bir uyum olduğu görülmektedir."
  },

  validProfile: {
    name: "Konfigürasyon 12",
    description: "L alt testi 50 T puanına yakın, F alt testi 70 T puanının altında, K alt testi 50 T puanının üstündedir.",
    interpretation: "Bu geçerli bir profildir. Birey yönergeleri dikkatli bir biçimde okuyarak, anlamış ve yapmıştır. Yanıtlar olduğu gibi doğrudur ve hastanın durumunu yansıtmaktadır."
  },

  acuteDefensive: {
    name: "Konfigürasyon 13",
    description: "L alt testi 50 T puanının üstünde F ve K alt testleri hemen hemen eşittir ve 55 T puanının üstündedir.",
    interpretation: "Bu örüntüdeki kişilerin başa çıkma yetenekleri iyidir. Sorunlarının uzun zamandır devam etmesine karşın, bununla yaşamlarını sürdürebilirler. F alt testi 70 T puanının üzerinde olsa bile bu bireyler, sadece şimdiki semptom ya da problemleri için yardım almak isterler ve tipik olarak durumsal stres azaldığında rahatlarlar.",
    clinicalImplications: [
      "Akut bozukluk",
      "Ciddi bozukluğu olmasına karşın oldukça savunucu olan ancak yine de hasta görünen kişiler"
    ],
    additionalNotes: [
      "Eğer F ve K alt testleri 70 T puanının üstündeyse, bireyde hastalığına ilişkin içgörü yoktur ve prognoz kötüdür.",
      "Açık patoloji ile savunuculuk arasındaki denge yordanamaz ve kalıcı değildir."
    ]
  },

  virtuous: {
    name: "Konfigürasyon 14",
    description: "L alt testi 55 T puanının üstünde, F alt testi 60 T puanının altında. K alt testi 59-64 T puanı arasındadır.",
    interpretation: "Bu profil geçerlidir. Geçerlik konfigürasyonu bireyin kendisini çok erdemli biri olarak gösterme isteğini ve kendisini de böyle görmek istediğini göstermektedir. Bu bireyler kendilerini olduğundan çok daha iyi olarak gösterme eğilimdedirler."
  },

  complexTraditional: {
    name: "Konfigürasyon 15",
    description: "L alt testi 60 T puanında. F alt testi 70 T puanının üstünde ve K alt testi 40 T puanının altındadır.",
    interpretation: "F'nin yüksekliği, bu kişinin karmaşıklık yaşadığını gösterir. L'deki ortalama yüksek puan, bireyin dünyayı basit, siyah ve beyaz olarak gördüğünün göstergesidir. Düşük K, bireyin benlik değerinin düşüklüğüne, başa çıkma kaynaklarının azlığına ve duygusal alanda katı olduğuna işaret etmektedir. Ancak L'nin yüksekliği, bireyin katı bir şekilde geleneksel değerlere tutunduğunu gösterir."
  }
};

// ============================================================================
// ANA KONFİGÜRASYON ANALİZ FONKSİYONLARI
// ============================================================================

/**
 * Temel geçerlik konfigürasyonu analizi
 * L, F, K puanlarına göre hangi konfigürasyona uyduğunu belirler
 */
export function analyzeValidityConfiguration(
  lTScore: number, 
  fTScore: number, 
  kTScore: number, 
  clinicalScales?: Record<string, { rawScore: number; tScore: number }>
): ValidityConfiguration | null {
  // Konfigürasyon 8 (Tümüne "yanlış" yanıt verme): L, F, K tümü 80+
  if (lTScore >= 80 && fTScore >= 80 && kTScore >= 80) {
    return validityConfigurations.allFalse;
  }

  // Konfigürasyon 7 (Tümüne "doğru" yanıt verme): L ve K 35+, F 120+
  if (lTScore >= 35 && kTScore >= 35 && fTScore >= 120) {
    if (clinicalScales) {
      const criticalScales = ['Pd', 'Pa', 'Pt', 'Sc', 'Ma'];
      const elevatedCount = criticalScales.filter(scale => 
        clinicalScales[scale] && clinicalScales[scale].tScore >= 90
      ).length;
      
      if (elevatedCount >= 3) {
        return validityConfigurations.allTrue;
      }
    } else {
      return validityConfigurations.allTrue;
    }
  }

  // Konfigürasyon 15: L ~60, F 70+, K <40
  if (Math.abs(lTScore - 60) <= 5 && fTScore >= 70 && kTScore < 40) {
    return validityConfigurations.complexTraditional;
  }

  // Konfigürasyon 14: L 55+, F <60, K 59-64
  if (lTScore >= 55 && fTScore < 60 && (kTScore >= 59 && kTScore <= 64)) {
    return validityConfigurations.virtuous;
  }

  // Konfigürasyon 13: L 50+, F ve K eşit ve 55+
  if (lTScore >= 50 && Math.abs(fTScore - kTScore) <= 5 && fTScore >= 55 && kTScore >= 55) {
    return validityConfigurations.acuteDefensive;
  }

  // Konfigürasyon 12: L ~50, F <70, K 50+
  if (Math.abs(lTScore - 50) <= 5 && fTScore < 70 && kTScore >= 50) {
    return validityConfigurations.validProfile;
  }

  // Konfigürasyon 11: L <55, F ~64, K <45
  if (lTScore < 55 && Math.abs(fTScore - 64) <= 5 && kTScore < 45) {
    return validityConfigurations.openCommunication;
  }

  // Konfigürasyon 10: L <66, F 69+, K 65+
  if (lTScore < 66 && fTScore >= 69 && kTScore >= 65) {
    return validityConfigurations.unconventionalResponse;
  }

  // Konfigürasyon 9 (Yükselen Tepe): L <66, K <66, F ~100 veya altı
  if (lTScore < 66 && kTScore < 66 && fTScore <= 100) {
    return validityConfigurations.risingPeak;
  }
  
  // Konfigürasyon 6 (Rastgele Cevaplama): L ve K ~55, F 105+
  if (Math.abs(lTScore - 55) <= 10 && Math.abs(kTScore - 55) <= 10 && fTScore >= 105) {
    return validityConfigurations.randomResponse;
  }
  
  // Konfigürasyon 1 (Tersine V): L ve K: 50-60, F: 70+
  if ((lTScore >= 50 && lTScore <= 60) && (kTScore >= 50 && kTScore <= 60) && fTScore >= 70) {
    return validityConfigurations.reverseV;
  }
  
  // Konfigürasyon 2 (Açık V): L ve K: 60+, F: 50 civarı (45-55 arası)
  if (lTScore >= 60 && kTScore >= 60 && (fTScore >= 45 && fTScore <= 55)) {
    return validityConfigurations.openV;
  }
  
  // Konfigürasyon 3 (Çok Kapalı V): F: <50, L ve K: 60+
  if (fTScore < 50 && lTScore >= 60 && kTScore >= 60) {
    return validityConfigurations.veryClosedV;
  }

  // Konfigürasyon 4 (Yükselen Eğilim): L<F<K, L~40, F 45-55, K~60
  if (lTScore < fTScore && fTScore < kTScore && 
      Math.abs(lTScore - 40) <= 5 && 
      (fTScore >= 45 && fTScore <= 55) && 
      Math.abs(kTScore - 60) <= 5) {
    return validityConfigurations.risingSlope;
  }

  // Konfigürasyon 5 (Azalan Eğilim): L>F>K, L~60, F~50, K 40-45
  if (lTScore > fTScore && fTScore > kTScore && 
      Math.abs(lTScore - 60) <= 5 && 
      Math.abs(fTScore - 50) <= 5 && 
      (kTScore >= 40 && kTScore <= 45)) {
    return validityConfigurations.fallingSlope;
  }
  
  return null;
}

/**
 * Kişisel bilgileri dahil eden gelişmiş geçerlik konfigürasyonu analizi
 * Yaş, eğitim, cinsiyet, medeni durum bilgilerini dikkate alarak kişiselleştirilmiş yorumlar ekler
 */
export function analyzeValidityConfigurationWithPersonalInfo(
  lTScore: number, 
  fTScore: number, 
  kTScore: number, 
  personalInfo?: {
    dogumTarihi?: string;
    medeniDurum?: MedeniDurum;
    egitimDurumu?: EgitimDurumu;
    cinsiyet?: 'Erkek' | 'Kadın';
  },
  clinicalScales?: Record<string, { rawScore: number; tScore: number }>
): ValidityConfiguration | null {
  // Temel konfigürasyon analizini al
  const baseConfig = analyzeValidityConfiguration(lTScore, fTScore, kTScore, clinicalScales);
  
  if (!baseConfig || !personalInfo) {
    return baseConfig;
  }

  // Kişiselleştirilmiş notları oluştur
  const personalizedNotes: string[] = [];

  // Yaş faktörü kontrolü
  if (personalInfo.dogumTarihi) {
    const yas = hesaplaYas(personalInfo.dogumTarihi);
    if (yas !== null) {
      // Genel yaş faktörleri
      if (yas > 50 && lTScore >= 60) {
        personalizedNotes.push("50 yaş üstü bireylerde L alt testinin yüksek olması yaş ile tutuculuk ilişkisinden kaynaklanabilir.");
      }
      if (yas < 18 && fTScore >= 70) {
        personalizedNotes.push("Ergenlik döneminde F alt testinin yükselmesi, kimlik arayışı ve gelişimsel faktörlerle ilişkili olabilir.");
      }

      // Konfigürasyona özel yaş faktörleri (kitapta açık belirtilen)
      if (baseConfig.name.includes("Konfigürasyon 7")) {
        if (yas < 18) {
          personalizedNotes.push("Bu konfigürasyon ergenlerde akut bir rahatsızlık yaşanmasını gösterir.");
          if (personalInfo.cinsiyet === 'Erkek') {
            personalizedNotes.push("Özellikle erkek ergenlerde bu durum daha belirgindir.");
          }
        }
      }

      if (baseConfig.name.includes("Konfigürasyon 11")) {
        if (yas >= 18) {
          personalizedNotes.push("Ergen grubu dışında kalan bireylerde bu konfigürasyon ego gücünde düşüklük ve yetersiz savunma mekanizmalarını gösterir.");
        }
      }
    }
  }

  // Eğitim düzeyi faktörü kontrolü
  if (personalInfo.egitimDurumu) {
    const lowEducation = ['İlkokul', 'Ortaokul', 'Okur-yazar değil'];
    const highEducation = ['Üniversite', 'Lisansüstü'];
    const liseEducation = ['Lise'];
    
    // Genel eğitim faktörleri
    if (lowEducation.includes(personalInfo.egitimDurumu)) {
      if (lTScore >= 60) {
        personalizedNotes.push("Düşük eğitim düzeyinde L alt testi yüksek olma eğilimi normaldir.");
      }
      if (kTScore < 50) {
        personalizedNotes.push("Düşük eğitim düzeyinde K alt testinin düşük olma eğilimi normal bir durumdur.");
      }
    } else if (highEducation.includes(personalInfo.egitimDurumu)) {
      if (lTScore >= 60) {
        personalizedNotes.push("Yüksek eğitim düzeyinde yüksek L değerleri dikkat çekicidir ve yargılama eksikliği gösterebilir.");
      }
      if (kTScore >= 60) {
        personalizedNotes.push("Yüksek eğitim düzeyinde K alt testinin yüksek olması beklenen bir durumdur.");
      }
    }

    // Konfigürasyona özel eğitim faktörleri (kitapta açık belirtilen)
    if (baseConfig.name.includes("Konfigürasyon 4")) {
      if (liseEducation.includes(personalInfo.egitimDurumu) || highEducation.includes(personalInfo.egitimDurumu)) {
        personalizedNotes.push("Lise düzeyinde eğitim görmüş bireylerde bu konfigürasyon sofistike savunmaları olan kişilerde görülebilir.");
      }
    }

    if (baseConfig.name.includes("Konfigürasyon 5")) {
      if (lowEducation.includes(personalInfo.egitimDurumu)) {
        personalizedNotes.push("Bu konfigürasyon eğitimi düşük bireylerde daha çok görülür.");
      }
    }
  }

  // Cinsiyet faktörü kontrolü
  if (personalInfo.cinsiyet) {
    // Genel cinsiyet faktörleri (Türk normları)
    if (personalInfo.cinsiyet === 'Erkek') {
      if (lTScore > 65 || lTScore < 45) {
        personalizedNotes.push("Erkek normlarına göre değerlendirildiğinde dikkat çekici bir L değeri. (Erkek ortalaması: 6.45 ham puan)");
      }
      if (fTScore > 70 || fTScore < 40) {
        personalizedNotes.push("Erkek normlarına göre değerlendirildiğinde dikkat çekici bir F değeri. (Erkek ortalaması: 8.3 ham puan)");
      }
    } else if (personalInfo.cinsiyet === 'Kadın') {
      if (lTScore > 65 || lTScore < 45) {
        personalizedNotes.push("Kadın normlarına göre değerlendirildiğinde dikkat çekici bir L değeri. (Kadın ortalaması: 6.0 ham puan)");
      }
      if (fTScore > 75 || fTScore < 45) {
        personalizedNotes.push("Kadın normlarına göre değerlendirildiğinde dikkat çekici bir F değeri. (Kadın ortalaması: 10.11 ham puan)");
      }
    }

    // Konfigürasyona özel cinsiyet faktörleri (kitapta açık belirtilen)
    if (baseConfig.name.includes("Konfigürasyon 5")) {
      if (personalInfo.cinsiyet === 'Erkek') {
        personalizedNotes.push("Bu konfigürasyonda erkeklerde Mf (Erillik-Dişilik) alt testi düşük olabilir.");
      }
    }
  }

  // Medeni durum faktörü kontrolü
  if (personalInfo.medeniDurum) {
    // Konfigürasyona özel medeni durum faktörleri (kitapta açık belirtilen)
    if (baseConfig.name.includes("Konfigürasyon 4")) {
      if (personalInfo.medeniDurum === 'Evli') {
        personalizedNotes.push("Bu konfigürasyon evlilik çatışması yaşayan normal bireylerde görülebilir.");
      }
    }
  }

  // Genel ölçekler arası ilişkiler
  if (lTScore >= 60) {
    personalizedNotes.push("L alt testi yüksek olması, klinik alt testlerde düşme ve psikopatolojinin inkârını gösterebilir.");
  }
  
  if (kTScore >= 60) {
    personalizedNotes.push("K alt testi yüksek olması, nevrotik üçlüde (1, 2, 3) yükselme ya da normal sınırlar içinde profil olasılığını artırır.");
  }

  if (fTScore >= 70 && lTScore < 50 && kTScore < 50) {
    personalizedNotes.push("F yüksek, L ve K düşük kombinasyonu açık iletişim ve yardım arayışını gösterir.");
  }

  return {
    ...baseConfig,
    personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
  };
}

// ============================================================================
// YARDIMCI ANALİZ FONKSİYONLARI
// ============================================================================

/**
 * K düzeltme önerisini kontrol eder
 * K ve F arasındaki fark 20+ T puanı ise uyarı verir
 */
export function getKCorrectionSuggestion(kTScore: number, fTScore: number): string | null {
  if (kTScore - fTScore >= 20) {
    return "K alt testi F alt testinden 20 veya daha fazla T puanı yüksektir. Bu, bireyin psikolojik yaşantılarını açığa vurmada çok isteksiz ve savunucu olduğunu gösterir. Klinik testlerin yorumlanmasında bu durumun dikkate alınması önerilir.";
  }
  
  return null;
}

/**
 * F-K Endeksi hesaplama ve yorumlama
 * Sahte iyilik/kötülük profillerini tespit eder
 */
export function calculateFKIndex(fTScore: number, kTScore: number): FKIndex {
  const fkValue = fTScore - kTScore;
  
  if (fkValue <= 0) {
    return {
      value: fkValue,
      validity: 'sahte-iyilik',
      interpretation: 'K ham puan yüksek (yani sorunlarımla başa çıkabilirim ve iyi uyumum var) mesajıyla düşük F puanı (yani stres ve çatışmalarım şu anda yok) mesajının bileşimi genellikle F-K endeksi tarafından sahte-iyilik olarak değerlendirilir. Böylece MMPI\'i alan normal bireyler yanlış bir biçimde sahte-iyilik grubuna girebilirler.',
      description: 'Psikopatolojinin inkârı - Sahte iyilik profili'
    };
  }
  
  if (fkValue >= 1 && fkValue <= 9) {
    return {
      value: fkValue,
      validity: 'geçerli',
      interpretation: 'Profil geçerlidir. F-K endeksi normal aralıktadır.',
      description: 'Normal geçerlik aralığı'
    };
  }
  
  if (fkValue >= 8 && fkValue <= 11) {
    return {
      value: fkValue,
      validity: 'sahte-kötülük',
      interpretation: 'Konfigürasyon, bireyin sorunları olduğunu gösterse de bu kişiler sorunlarını abartmaktadırlar. Bu durum hastanın psikolojik müdahaleye ve yardım almaya açık olduğunu göstermektedir.',
      description: 'Sorunları abartma eğilimi - Tedaviye açık'
    };
  }
  
  if (fkValue >= 10 && fkValue <= 15) {
    return {
      value: fkValue,
      validity: 'sahte-kötülük',
      interpretation: 'Klinik olgularda F-K endeksinin 9\'dan büyük olduğu durumlarda birey psikopatolojisini abartmaktadır. Psikiyatrik grupta sahte-kötülük profilleri, sahte-iyilikten daha iyi ayırt edicidir.',
      description: 'Belirgin psikopatoloji abartması'
    };
  }
  
  if (fkValue >= 16) {
    return {
      value: fkValue,
      validity: 'geçersiz',
      interpretation: 'Geçerlik konfigürasyonu bu hastanın test bulgularının değerlendirilmesinde dikkatli olmanın gerekliliğini göstermektedir. Yapılan standart değerlendirme hastanın durumunu yansıtmayabilir.',
      description: 'Kritik düzey - Dikkatli değerlendirme gerekli',
      clinicalImplications: [
        'Hasta akut bir psikotik bozukluk göstermektedir ve testi içinde bulunduğu duruma bağlı olarak tamamlayamaz. Klinik düzelme olduktan sonra test yinelenmelidir.',
        'Birey bilinçli olarak durumunu abartmakta ya da bir yarar sağlamak için simulasyon yapmaktadır.'
      ]
    };
  }
  
  // Fallback case
  return {
    value: fkValue,
    validity: 'geçerli',
    interpretation: 'F-K endeksi değerlendirilmiştir.',
    description: 'Standart değerlendirme'
  };
}

/**
 * K+ Profil analizi
 * Özel profil türünü tespit eder (Mark ve Seeman, 1963)
 */
export function analyzeKPlusProfile(
  lTScore: number, 
  fTScore: number, 
  kTScore: number, 
  clinicalScales?: Record<string, { rawScore: number; tScore: number }>
): KPlusProfile {
  // K+ profili kriterleri:
  // 1. K ve L alt testleri F'den yüksek
  // 2. K alt testi F alt testinden en az 5 T puanı üstünde
  // 3. Hiçbir klinik test 70 T puanının üstünde değil
  // 4. 6 ya da daha çok klinik test 60 T puanı ya da altında
  
  const isKHigher = kTScore > fTScore && lTScore > fTScore;
  const isKSignificantlyHigher = kTScore - fTScore >= 5;
  
  let noClinicalElevation = true;
  let lowClinicalCount = 0;
  
  if (clinicalScales) {
    const clinicalScaleNames = ['Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si'];
    
    for (const scaleName of clinicalScaleNames) {
      const scale = clinicalScales[scaleName];
      if (scale && scale.tScore >= 70) {
        noClinicalElevation = false;
        break;
      }
      if (scale && scale.tScore <= 60) {
        lowClinicalCount++;
      }
    }
  }
  
  const isKPlusProfile = isKHigher && isKSignificantlyHigher && noClinicalElevation && lowClinicalCount >= 6;
  
  if (isKPlusProfile) {
    return {
      isKPlusProfile: true,
      interpretation: "Bu kişiler utangaç, kaygılı ve ketlenmişlerdir. Ayrıca sorunlarının psikolojik olabileceği konusunda dirençlidirler. Yakın kişilerarası ilişkilerden kaçınırlar ve pasif direniş gösterirler. Kişilik özellikleri şizoid yapıdadır. Paranoid özellikler de gösterirler: şüpheci, korkak ve kendileriyle ilgili herhangi bir duruma duyarlıdırlar.",
      characteristics: [
        "Utangaç, kaygılı ve ketlenmiş",
        "Sorunlarının psikolojik olabileceği konusunda dirençli",
        "Yakın kişilerarası ilişkilerden kaçınma",
        "Pasif direniş gösterme",
        "Şizoid kişilik özellikleri",
        "Paranoid özellikler (şüpheci, korkak)",
        "Kendileriyle ilgili durumlara aşırı duyarlılık"
      ],
      clinicalImplications: [
        "Bu hastaların yarısı psikotik olarak tanı alır",
        "Hastaların %25'ine organik beyin sendromu tanısı konulur",
        "Grup olarak zekâ düzeyleri normalin alt sınırındadır"
      ]
    };
  }
  
  return {
    isKPlusProfile: false
  };
}