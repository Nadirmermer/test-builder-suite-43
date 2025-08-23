// Hipokondriazis (Hs) Alt Testi Yorumlamaları - Resmi Türk Uygulama Kitabından

export interface HsInterpretation {
  tScoreRange: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
}

export const hipokondriazisInterpretations: Record<string, HsInterpretation> = {
  high: {
    tScoreRange: "T ≥ 70",
    characteristics: [
      "Aşırı bedensel uğraşları vardır",
      "Somatik semptomlar genellikle belirsizdir, eğer belirginse temelde mide ve karın bölgesine ilişkindir",
      "Kronik yorgunluk, ağrı ve güçsüzlükten yakınır",
      "Açık anksiyete belirtisi göstermez",
      "Kendine odaklaşmış, bencil, narsisistiktir",
      "Karamsar, yıkıcı, alaycı bir yapısı vardır",
      "Doyumsuz ve mutsuzdur",
      "Diğerlerini bıktırır",
      "Yakınır ve sızlanır",
      "Diğerlerine bağımlı ve eleştiricidir",
      "Düşmanlığını dolaylı yollardan ifade eder",
      "Psikopatik davranışları azdır",
      "Donuk ve ilgisizdir",
      "Sözelleştirmede başarısızdır",
      "Uzun süreden beri devam eden sorunları vardır",
      "Uyumunda herhangi bir bozukluk olmamasına karşın, etkinliği azalmış gibi davranır",
      "Semptomları için tıbbi açıklamalar ve tedaviler ister"
    ],
    clinicalImplications: "Somatoform, depresyon ya da anksiyete bozukluğu tanısı konulabilir. Hipokondriyak tanısı konulan hastaların semptomları uzun sürelidir, değişmeye dirençlidirler.",
    therapeuticConsiderations: "Psikoterapi ya da danışmanlığa içgörü eksikliği ve alaycı tavrıyla çok iyi yanıt vermez. Terapisti eleştirir. Terapistin kendine yeterli ilgi ve desteği vermediğini düşündüğünde terapiyi sonlandırma eğilimindedir."
  },
  
  veryHigh: {
    tScoreRange: "T ≥ 84",
    characteristics: [
      "Yakınmaları bütün organ sistemlerine yayılmış",
      "Ağrı, yorgunluk ve güçsüzlük sıklıkla vardır",
      "Somatik ilgiler somatik delüzyonlara dönmüş"
    ],
    clinicalImplications: "Somatik delüzyonlar görülebilir. Bu belki de şizofrenik bir epizodun başlangıcıdır."
  },
  
  elevated: {
    tScoreRange: "T: 75-84",
    characteristics: [
      "Bedensel yakınmalar ile çok fazla uğraşan bireyler",
      "Genel olarak iş yapma istekleri azalmıştır",
      "Yakınmalarının bedensel kaynağını sürekli bir biçimde araştırırlar",
      "Sıklıkla benmerkezci ve narsisistiklerdir",
      "Sürekli şikayet eder ve sızlanırlar",
      "Yakınmalarını diğerlerine kabul ettirme eğilimleri çok fazladır",
      "Aşırı talep edici bir tutum içindedirler",
      "Çevrelerindekiler rahatsız ederek öfkelerini ortaya çıkarırlar",
      "İnatçı, kötümser, genel olarak yaşamda mutsuz, tutkusuzdurlar",
      "Güdülenmemişlerdir"
    ],
    clinicalImplications: "Tipik hipokondriyak özelliklerin belirgin şekilde ortaya çıktığı düzey."
  },
  
  moderate: {
    tScoreRange: "T: 60-74",
    characteristics: [
      "Hem şimdiki, hem de geçmiş yaşantıda fiziksel bozukluk gösterme işareti",
      "Sağlık konularına ilgi (yapıcı bir ilgi ya da aşırı duyarlılık olabilir)",
      "Kötümser olmaya ve yaşamlarını sıkıcı hale getirmeye eğilimlidirler"
    ],
    clinicalImplications: "Bu yükselmeye sıklıkla D alt testindeki yükselme eşlik eder. Bedensel hastalığı olan bireylerde 65 T puanının üstünde bir yükselme bu bireylerin yaşadıkları güçlüklere aşırı tepki verdiklerini ve kabul edilmez dürtülerini somatizasyon ile ifade ettiklerini göstermektedir."
  },
  
  normal: {
    tScoreRange: "T: 50-59",
    characteristics: [
      "Beden konuları ile aşırı ilgilenmez",
      "Günlük yaşam aktivitelerini yerine getirir",
      "Sıklıkla yetenekli, sorumluluk sahibi, vicdanlı, dikkatli kişilerdir",
      "Yargılamaları iyi olan kişilerdir"
    ],
    clinicalImplications: "2,6,7,8 ya da 0 alt testi 70'in üzerine yükselmediği zaman normal işlevsellik gösterirler. Spesifik tıbbi hastalığı olan bireyler bu alanda yer almaktadır."
  },
  
  low: {
    tScoreRange: "T: 21-49",
    characteristics: [
      "Somatik uğraşları yoktur",
      "İyimserdir",
      "Duyarlıdır",
      "İçgörüsü vardır",
      "Günlük yaşamda oldukça etkindir",
      "Bedensel yakınmaları ve genel sağlık durumları ile çok az ilgilenen kişilerdir",
      "Genellikle uyanık, iyimser, yeterli ve yaşamda etkin olan kişilerdir"
    ],
    clinicalImplications: "Hastalığın hiç konu olmadığı ailelerde yetişen bireyler ya da şimdiye kadar hiç ağrı, acı ya da hastalık geçirmediği ile övünen kişilerde görülür. Normal acı ve ağrılar da inkâr edilebilir."
  },
  
  isolated: {
    tScoreRange: "Sadece Hs yüksek",
    characteristics: [
      "Belirsiz fiziksel yakınmalar getirirler",
      "Bunları diğer kişileri kontrol ve manipüle etmek için kullanırlar",
      "Her şeyi kötü gören, sızlanan, ilgi çekmek isteyen kişilerdir",
      "Genellikle olumsuz ve kararsızdırlar"
    ],
    clinicalImplications: "Bu hastalara müdahaleler genellikle fazla güven vermez."
  }
};

export function getHipokondriazisInterpretation(
  tScore: number,
  isIsolatedElevation: boolean = false
): HsInterpretation {
  if (isIsolatedElevation) {
    return hipokondriazisInterpretations.isolated;
  }
  
  if (tScore >= 84) {
    return hipokondriazisInterpretations.veryHigh;
  } else if (tScore >= 75) {
    return hipokondriazisInterpretations.elevated;
  } else if (tScore >= 70) {
    return hipokondriazisInterpretations.high;
  } else if (tScore >= 60) {
    return hipokondriazisInterpretations.moderate;
  } else if (tScore >= 50) {
    return hipokondriazisInterpretations.normal;
  } else {
    return hipokondriazisInterpretations.low;
  }
}