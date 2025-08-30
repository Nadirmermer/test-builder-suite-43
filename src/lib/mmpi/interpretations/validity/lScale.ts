// src/lib/mmpi/interpretations/validity/lScale.ts

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export const lScaleInterpretation = {
  scale: "L (Yalan)",
  generalInfo: `L alt testi, bireyin dürüstlüğünü ve samimiyetini gösterir. Bu testi oluşturan 15 madde; saldırganlığın, kötü düşüncelerin ve karakterdeki zayıflıkların inkârıyla ilgilidir. Tüm bu özellikler, bir kültürde en dürüst kişilerde bile görülen özelliklerdir. Bu alt teste ait 15 madde değerlendirildiğinde, hepsine doğru yanıtını veren bir kişinin, saf ya da oldukça açık, genel olarak erdemli, kültürel olarak tutucu ya da kendini tümüyle haklı gören biri olduğu ortaya çıkar. Genel olarak, kendisinin farkında olan kişiler 4 ya da daha yüksek ham puan alırlar. Bunun dışında kalan kişiler, din adamları gibi vicdanî değerleri ve kültürel kabul edilebilirliği olan ya da iş görüşmelerine katılan ve kendini iyi göstermeye çalışan kişilerdir.`,
  
  highScorerTraits: {
    title: "L alt testinde yüksek puan alan bir birey:",
    traits: [
      "Maddelere dürüst yanıt vermeyerek kendini olduğundan daha iyi göstermeye çalışır.",
      "Geleneksel, boyun eğicidir.",
      "Basma kalıp düşünür, sorun çözmede de esnekliği yoktur.",
      "Stres ve baskıya toleransı azdır.",
      "Katı moral değerleri vardır.",
      "Kendine aşırı önem verir.",
      "Bastırma ve yadsımayı sık kullanır.",
      "Kendi motivasyonlarına ilişkin içgörüsü ya çok azdır, ya da hiç yoktur.",
      "Kendi davranışının diğer insanlar üzerindeki etkisi hakkında bilgi sahibi değildir.",
      "Konfüzyonda olabilir."
    ]
  },

  lowScorerTraits: {
    title: "L alt testinde düşük puan alan bir birey:",
    traits: [
      "Maddelere içten yanıt vermiştir.",
      "Kendisinde olan küçük kusurlarla ve eksikliklerle yüzleşmede samimidir.",
      "Anlayışlıdır, sosyal açıdan kendine güvenir.",
      "Güvenlidir, bağımsızdır.",
      "Lider rolünde başarılıdır.",
      "Güçlü, doğal ve rahattır.",
      "Fikirlerini etkili bir biçimde dile getirir.",
      "Diğerleri tarafından müstehzi ve alaycı olarak tanımlanır."
    ]
  },

  contextualFactors: {
    title: "Değerlendirmede Dikkat Edilmesi Gerekenler:",
    factors: [
      "L alt testi değerlendirilirken eğitim ve yaş da dikkate alınmalıdır.",
      "Zekâ düzeyi düşük ya da lise ve altı eğitimi olan bireylerde L alt testi 5 T puanı daha yüksektir.",
      "50 yaşın üstündekilerde de L maddelerine daha fazla yanıt verme eğilimi olmaktadır. Bu, yaş ile tutuculuk arasında bir ilişki olduğunu göstermektedir.",
      "Psikolojik olarak sofistik düşünceye sahip bireyler, özellikle de lise eğitimli bireyler kendilerini testin diğer bölümlerinde de erdemli gösterme eğilimi içindedir.",
      "Eğitimi yüksek olan bireylerdeki yüksek L değerleri, yargılama eksikliğinin ve başarısızlığın bir göstergesidir.",
      "Yüksek sosyo-ekonomik sınıftan olanlar çoğunlukla 4'ten fazla L puanı almaz. Bu nedenle L puanı değerlendirilirken eğitim seviyesi, sosyo-ekonomik düzey göz önünde tutulmalıdır."
    ]
  },

  scoreInterpretations: [
    {
      tScoreRange: "69 ve üstü",
      description: "Puanlamada hata yapılmış olabilir. \"Yanlış\" yerine doğru cevaplar sayılmıştır. İki farklı değerlendirme vardır:",
      points: [
        "Bu kişiler sosyal açıdan kabul gören yanıtlar vererek kendini kontrol eden, etkili biri olduğu izlenimi bırakmaya çalışan kişilerdir.",
        "Güvenilmez, pasif, uzak duran, kaygılı, içe kapanık kişilerdir. Diğerleriyle ilişki kurmaları zordur. Duruma özgü tepkileri yavaştır. L alt testindeki bu yükselmeye sıklıkla MMPI'ın nevrotik testlerindeki yükselme eşlik eder.",
        "Az sayıda kişide \"patolojik yalan söylemeyi\" gösterir. Bu klinik görünüm psikopat ya da manik hastalara özgüdür. (4 ve 9 alt testlerindeki yükselmeye bakınız.)"
      ]
    },
    {
      tScoreRange: "64-69",
      description: "Maddeleri gelişigüzel doldurma sonucu ortaya çıkabilir. Diğer geçerlik testleri incelenmelidir. Kişinin kendindeki zayıflıkları inkâr ettiğini gösterir. Böyle kişiler patolojik olarak kendilerini iyi göstermeye çalışırlar; katı, represif ve savunucudurlar. Bu puanlar dinî ve ahlaki inanç ve eğilimleri nedeniyle kendine aşırı kontrol koyan bireylerde görülebilir. Ufak hatalarını bile inkâr etmeye eğilimli olanlar, eğitimsiz olup kendini çok iyi göstermeye çalışanlar, inkâr mekanizmasını sıklıkla kullanan histerik ve hipokondriyaklar, azınlık grupları bu kategoriye girebilir."
    },
    {
      tScoreRange: "59-63",
      description: "Bireyin iyi görünme çabası içinde olduğu düşünülmelidir. Bunlarda sosyal açıdan kabul gören yanıtlar verme eğilimi vardır. Bu bireyler aşırı geleneksel ve sosyal açıdan uyumludurlar."
    },
    {
      tScoreRange: "36-55",
      description: "Bu aralığa ilişkin özgün bir durum tanımlanmamıştır."
    },
    {
      tScoreRange: "35 ve altı",
      description: "Tüm maddeler doğrudur denebilir. Bağımsız, kendine güvenen, ufak sosyal hatalarını kabul etmeye hazır kimselerdir. Diğer geçerlik alt testlerinin incelenmesi gerekir. İki farklı değerlendirme olabilir:",
      points: [
        "Birey ya kendini oldukça patolojik göstermeğe çalışıyordur ya da bağımsız, kendine güvenen, eksikliklerden açıkça bahseden, sosyal kurallara önem vermeyen normal bir insan olabilir."
      ]
    }
  ],

  clinicalRelationships: {
    title: "L Alt Testi ile Klinik Alt Testlerin İlişkisi",
    relationships: [
      "L alt testi yüksek ve Pa en yüksek alt test ise, bu bireylerin bazı şeyleri inkâr ettiği düşünülmelidir.",
      "Yüksek L ile 4 ve 9'da yükselme gözlenmektedir.",
      "L puanı yükseldikçe psikotik profil elde etme şansı azalmaktadır.",
      "Düşük SED'de L yüksek, yüksek SED'de K yüksek olmaktadır.",
      "L alt testi yükseldikçe klinik testler düşmektedir. Bireyin sorunlarını inkâr etmesi L'yi yükseltmektedir. İnkar, psikopatolojiyi ortaya koymayı engeller. Böylece klinik alt testler düşer.",
      "L yükselince, Hipokondriazis (Hs) ve Histeri (Hy) alt testleri de birlikte yükselir. Bazen de Hipomani (Ma)'nin yükseldiği görülür.",
      "Manik birey, büyüklük ve üstünlük duyguları içinde psikopatolojisini inkâr eder.",
      "Sonuç olarak L geçerlik alt testi \"inkâr\" savunma mekanizmasıyla anlamlı ve yüksek bir ilişki göstermektedir.",
      "Genellikle L ile Hs, D, Hy, Pd yükselir. Pa, Pt, Sc, Ma ise düşer.",
      "Mf alt testi L'den etkilenmez."
    ]
  },

  getPersonalizedInterpretation(
    tScore: number,
    options?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadin';
    }
  ) {
    // Temel yorumu al
    let baseInterpretation: any;
    if (tScore >= 69) baseInterpretation = this.scoreInterpretations[0];
    else if (tScore >= 64 && tScore < 69) baseInterpretation = this.scoreInterpretations[1];
    else if (tScore >= 59 && tScore < 64) baseInterpretation = this.scoreInterpretations[2];
    else if (tScore >= 36 && tScore < 59) baseInterpretation = this.scoreInterpretations[3];
    else if (tScore <= 35) baseInterpretation = this.scoreInterpretations[4];
    
    if (!baseInterpretation || !options) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notlar oluştur
    const personalizedNotes: string[] = [];
    
    // Yaş faktörü
    if (options.dogumTarihi) {
      const yas = hesaplaYas(options.dogumTarihi);
      if (yas !== null && yas > 50) {
        personalizedNotes.push("50 yaşın üstündeki bireyler L maddelerine daha fazla yanıt verme eğilimi gösterir. Bu, yaş ile tutuculuk arasındaki ilişkiden kaynaklanır.");
      }
    }

    // Eğitim faktörü
    if (options.egitimDurumu) {
      const dusukEgitim = ['İlkokul', 'Ortaokul', 'Lise', 'Okur-yazar değil'];
      if (dusukEgitim.includes(options.egitimDurumu)) {
        personalizedNotes.push("Düşük eğitim seviyesi (lise ve altı) olan bireylerde L alt testi yaklaşık 5 T puanı daha yüksek çıkar. Bu normal bir durumdur.");
        
        if (tScore >= 64) {
          personalizedNotes.push("Eğitim seviyeniz dikkate alındığında, bu yükselme eğitim seviyesi ile açıklanabilir ve patolojik olmayabilir.");
        }
      } else if (['Üniversite', 'Lisansüstü'].includes(options.egitimDurumu)) {
        if (tScore >= 64) {
          personalizedNotes.push("Yüksek eğitim seviyeniz dikkate alındığında, bu L değeri yargılama eksikliği veya başarısızlık göstergesi olabilir.");
        }
        
        personalizedNotes.push("Yüksek sosyo-ekonomik sınıftan bireyler genellikle 4'ten fazla L puanı almaz. Bu nedenle mevcut puanınız dikkatle değerlendirilmelidir.");
      }
    }

    // Cinsiyet faktörü (mevcut Türk normlarına göre)
    if (options.cinsiyet) {
      if (options.cinsiyet === 'Erkek' && tScore >= 65) {
        personalizedNotes.push("Erkek normlarına göre bu değer ortalamanın üstündedir. (Erkek ortalaması: 6.45 ham puan)");
      } else if (options.cinsiyet === 'Kadin' && tScore >= 62) {
        personalizedNotes.push("Kadın normlarına göre bu değer ortalamanın üstündedir. (Kadın ortalaması: 6.00 ham puan)");
      }
    }

    // Sonucu döndür
    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  },

  // Geriye uyumluluk için eski metodu koru
  getInterpretation(tScore: number) {
    return this.getPersonalizedInterpretation(tScore);
  }
};
