// src/lib/mmpi/interpretations/validity/kScale.ts

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export const kScaleInterpretation = {
  scale: "K Alt Testi (Düzeltme)",
  generalInfo: `Bu alt test diğer geçerlik alt testlerine oranla daha az belirgin olan, test almadaki savunucu tutumu ölçmeyi amaçlayan 30 maddeden oluşmuştur. K alt testinin yorumu bireylerin eğitim ve sosyo-ekonomik düzeyine ve MMPI'yı doldurduğu ortama göre değişir.`,

  highScorerTraits: {
    title: "K alt testinde yüksek puan alan bir birey:",
    traits: [
      "İyi bir profil vermek için gayret sarf etmiştir.",
      "MMPI maddelerinin çoğuna yanlış diye yanıt vermiştir.",
      "Yeterli, kontrollü ve etkili bir kişi görünümü vermek istemektedir.",
      "Utangaç ve çekingendir.",
      "Diğer insanlarla duygusal ilişki kurmaktan çekinir.",
      "Diğer insanlarda kabul etmediği tutum ve davranışları benimsemez.",
      "Kendini anlamaya yönelik içgörüsü azdır.",
      "Açık suça yönelik davranışı yoktur.",
      "Klinik testlerde yükselmişse psikolojik açıdan ciddi sorunu vardır, kendisi bunun farkında değildir.",
      "Eğer psikolojik açıdan ciddi bir sorunu yoksa ego gücü ortalamanın üstündedir ve başka olumlu özellikleri vardır."
    ]
  },

  averageScorerTraits: {
    title: "K alt testinde ortalama puan alan bir birey:",
    traits: [
      "MMPI maddelerine yanıt verirken kendi olumlu ve olumsuz yönleri arasında sağlıklı bir denge kurmuştur.",
      "Psikolojik uyumu iyidir.",
      "Duygusal bozukluğu olduğuna ilişkin çok az belirti gösterir.",
      "Bağımsızdır, kendinden emindir.",
      "Günlük yaşamdaki sorunlarla başa çıkabilir.",
      "Entellektüel yeterliliği iyidir.",
      "İlgi alanları genişlemiştir.",
      "İçten, girişimci, çok yönlü ve beceriklidir.",
      "Açık fikirlidir, sorunlara mantıklı ve sistematik bir biçimde yaklaşır.",
      "Sokulgandır, insanlarla kolay kaynaşır.",
      "Çoşkuludur, güzel konuşur.",
      "Grup içinde üstün roller alabilir."
    ]
  },

  lowScorerTraits: {
    title: "K alt testinde düşük puan alan bir birey:",
    traits: [
      "MMPI maddelerinin çoğuna \"doğru\" diye yanıt vermiştir.",
      "Kötü bir profil vermek ister.",
      "Sorunlarını yardım almak için abartıyor olabilir.",
      "Ya açık psikotiktir, ya da organik konfüzyon halindedir.",
      "Diğerlerini ve kendini eleştirir, kendinden memnun değildir.",
      "Günlük yaşamındaki sorunlarla başa çıkmada yetersizdir.",
      "Kendi motifleri ve davranışlarına ilişkin içgörüsü çok azdır.",
      "Sosyal açıdan uyumludur.",
      "Otoriteye aşırı derecede boyun eğmektedir.",
      "Çekingen, içe çekilmiş, yüzeyeldir.",
      "Kişisel temposu yavaştır.",
      "Sosyal ortamlarda beceriksizdir.",
      "Patavatsız ve terstir.",
      "Alaycıdır, inandırıcı değildir, kuşkucudur."
    ]
  },

  clinicalContext: {
    title: "Klinik Bağlam ve Yorumlama Notları",
    points: [
      "K alt testinde düşüklük ya da yükseklik, deneklerin sorunlarının farkına varmaları ve sorunların şiddetinin boyutlarıyla ilgilidir.",
      "Klinik profillerde K düşük değeri özellikle psikotik alt testlerde (6, 7, 8 ve 9) yükseklikle sonuçlanır.",
      "K alt testi yüksekse, klinik alt testlerde düşme görülür ve nevrotik üçlüde yükselme (1, 2, 3) ya da normal sınırlar içinde profil olasılığı artar. Bu hem yetişkinler, hem de ergenler için geçerlidir.",
      "K alt testi, profili geçersiz yapacak belirgin değerlerin olmadığı tek alt testtir. Klinisyenler K değeri için duyarlı olmalıdır.",
      "Örneğin, işe alınma sırasındaki kişilik değerlendirmesinde K değerinin çok düşük olması, psikiyatrik grupta ise çok yüksek olması atipiktir.",
      "Deneğin birinde bilinen ve belirgin psikopataloji varsa ve K değeri çok yüksek bulunmuşsa, deneğin psikolojik stres yaratan bir durum karşısında aşırı savunucu olduğu söylenebilir. Psikolojik stresin ne olduğu profilden anlaşılamaz.",
      "Bu örneklerde klinik alt testler normal sınırlar içinde ise, denekte altta yatan psikotik bir süreç olup olmadığı araştırılmalıdır."
    ]
  },

  tScoreInterpretations: [
    {
      range: "72 ve üstü",
      title: "72 T puanı ve üstü",
      description: "Savunucu bireylerdir. Kendilerinde psikolojik sorunlar olduğunu kabul etmezler. Katıdırlar, esnek değillerdir. Kendilerindeki sorunları kabul etmek istemezler. Tedaviye yanıt kötüdür."
    },
    {
      range: "61-72",
      title: "61-72 T puanı",
      description: "Bu kişiler kendilerinde ve çevrelerinde olan bozuklukları en aza indirgeme ve görmezden gelme eğilimindedir. Savunmalar artmıştır, içgörü azdır. Histerik savunmaları olan nevrotikler için bu uygundur. Genelde hipokondriyaklar ve histerikler dışında kalan nevrotikler değerlendirmede savunmalarını göstermezler. Savunmalar abartıldığında bu düzeyde bir yükselme elde edilir."
    },
    {
      range: "46-60",
      title: "46-60 T puanı",
      description: "Bu düzeydeki puanlar dengeli bireyleri göstermektedir. Bu yükselme bireyin ego gücünün iyi olduğuna, olumlu kendilik değerine ve uyuma işaret etmektedir. Bunların psikolojik müdahaleyi istemek için yeterli kişisel kaynakları vardır. Yüksek sosyo-ekonomik düzeyden gelen hastalara psikolojik tedavi yarar sağlayabilir. Klinik testler yüksek olsa bile, böyle bir K alt testi puanı, bireyde uygun bir başa çıkma becerisi olduğunu gösterir."
    },
    {
      range: "27-45",
      title: "27-45 T puanı",
      description: "Düşük sosyo-ekonomik düzeyden gelen bireylerde gözlenebilir. Bu hastalar sınırlı kişisel kaynakları ile açıkça ortaya koydukları ciddî sıkıntıları yaşamaktadırlar. Hastaların zayıf kendilik değerleri vardır ve kendilerinden hiç memnun değillerdir. Ancak durumlarını değiştirecek gerekli kişilerarası beceri ve niteliklerden yoksundurlar. Alt sosyo-ekonomik düzeyden hastalarda bu yükselme orta düzeyde bir hastalığı yansıtırken, yüksek sosyo-ekonomik düzeyden sahip hastalarda düşük ego gücü ve daha ciddî sıkıntıyı yansıtır.",
      points: [
        "Ergenlerdeki düşük K puanı sıklıkla onların kimliklerini araştırmasından dolayı olabilir. Benzer bir durum içgörü yönelimi psikoterapiye devam eden bireylerde kendilik değerlerini sorgulamalarında da görülür.",
        "Orta ve üst düzeydeki hastalarda rahatsızlık akuttur. Ego gücü düşmüştür. Savunmalar uygunsuzdur.",
        "Genellikle kendine teşhir etme eğilimi içinde olan bireyler.",
        "Yardım almak isteğiyle sorunlarını abartan kişilerdir.",
        "Hastaneye yatmayı gerektiren akut psikotik sıkıntı yaşayan bireyler olabilirler."
      ]
    }
  ],

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
    if (tScore >= 72) baseInterpretation = this.tScoreInterpretations[0];
    else if (tScore >= 61) baseInterpretation = this.tScoreInterpretations[1];
    else if (tScore >= 46) baseInterpretation = this.tScoreInterpretations[2];
    else if (tScore >= 27) baseInterpretation = this.tScoreInterpretations[3];
    
    if (!baseInterpretation || !options) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notlar oluştur
    const personalizedNotes: string[] = [];
    
    // Eğitim düzeyi göre yorumlama (sosyo-ekonomik düzey tahmini)
    if (options.egitimDurumu) {
      const dusukEgitim = ['İlkokul', 'Ortaokul', 'Okur-yazar değil'];
      const yuksekEgitim = ['Üniversite', 'Lisansüstü'];
      
      if (dusukEgitim.includes(options.egitimDurumu)) {
        if (tScore >= 27 && tScore <= 45) {
          personalizedNotes.push("Düşük eğitim düzeyiniz dikkate alındığında, bu K puanı normal kabul edilebilir.");
        }
      } else if (yuksekEgitim.includes(options.egitimDurumu)) {
        if (tScore >= 27 && tScore <= 45) {
          personalizedNotes.push("Yüksek eğitim düzeyiniz dikkate alındığında, bu düşük K puanı daha dikkatli değerlendirilmelidir.");
        }
        if (tScore >= 46 && tScore <= 60) {
          personalizedNotes.push("Yüksek eğitim düzeyli bireyler için bu optimal aralıktadır.");
        }
      }
    }

    // Yaş faktörü (ergenler için özel not)
    if (options.dogumTarihi) {
      const yas = hesaplaYas(options.dogumTarihi);
      if (yas !== null && yas < 18 && tScore < 45) {
        personalizedNotes.push("Ergenlik döneminde düşük K puanı, kimlik arayışından kaynaklanabilir ve normaldir.");
      }
    }

    // Cinsiyet faktörü (Türk normlarına göre)
    if (options.cinsiyet) {
      if (options.cinsiyet === 'Erkek' && (tScore > 65 || tScore < 45)) {
        personalizedNotes.push("Erkek normlarına göre değerlendirildiğinde dikkat çekici bir değer. (Erkek ortalaması: 13.98 ham puan)");
      } else if (options.cinsiyet === 'Kadin' && (tScore > 62 || tScore < 42)) {
        personalizedNotes.push("Kadın normlarına göre değerlendirildiğinde dikkat çekici bir değer. (Kadın ortalaması: 11.82 ham puan)");
      }
    }

    // Eğitim ile L/K ilişkisi
    if (options.egitimDurumu) {
      const dusukEgitim = ['İlkokul', 'Ortaokul', 'Okur-yazar değil'];
      const yuksekEgitim = ['Üniversite', 'Lisansüstü'];
      
      if (dusukEgitim.includes(options.egitimDurumu) && tScore < 50) {
        personalizedNotes.push("Düşük eğitim düzeyinde K alt testinin düşük olma eğilimi normal bir durumdur.");
      } else if (yuksekEgitim.includes(options.egitimDurumu) && tScore > 60) {
        personalizedNotes.push("Yüksek eğitim düzeyinde K alt testinin yüksek olması beklenen bir durumdur.");
      }
    }

    // Sonucu döndür
    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  },

  // Geriye uyumluluk için eski metodu koru
  getInterpretationByTScore(tScore: number) {
    return this.getPersonalizedInterpretation(tScore);
  }
};
