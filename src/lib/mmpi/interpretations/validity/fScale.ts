// src/lib/mmpi/interpretations/validity/fScale.ts

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export const fScaleInterpretation = {
  scale: "F Alt Testi",
  generalInfo: `F alt testinde 64 madde vardır. Hathaway ve McKinley'e (1967) göre F alt testi ham puanı 20'yi aşarsa profil geçersizdir. Ancak T değeri 70'i aşan tüm alt testlerin geçersiz olmadığı görülmüştür. Bu, ciddi kişilik bozukluğu ifadesi de olabilir. 25 ham puanı aşarsa testin geçersiz olması gerektiği belirtilmiştir. Önceki araştırmalar davranış bozukluğu olanların T puanlarının 80'i aştığını göstermiştir (Gynther 1961). Ayrıca ciddi psikopatolojinin bu sonuçla ilişkisi olabilir.`,

  rawScoreInterpretations: [
    {
      range: "26 ve üstü",
      title: "F alt testinde yüksek puan alan bir birey (Ham puan: 26 ve üstü)",
      points: [
        "MMPI maddelerine gelişigüzel bir biçimde yanıt vermiştir.",
        "Bütün MMPI maddelerini doğru olarak işaretlemiş olabilir.",
        {
          isSublist: true,
          title: "Eğer hastanede yatan psikiyatrik hastaysa:",
          subPoints: [
            "Referans delüzyonları vardır.",
            "Görsel ve/ya da işitsel hallüsinasyonları olabilir.",
            "Konuşması yavaşlamıştır.",
            "İçe çekilmiştir.",
            "Yargılaması bozuktur.",
            "Tek heceli konuşması vardır.",
            "Dikkatini toplama süresi kısadır.",
            "Hastaneye yatırılma nedenleri hakkında bilgi sahibi değildir.",
            "Klinik açıdan tanısı psikotiktir.",
            "Ek olarak organik etyoloji belirtileri vardır."
          ]
        }
      ]
    },
    {
      range: "16-25",
      title: "F alt testinde ham puanı 16-25 arasında olan bir birey:",
      points: [
        "Bütün MMPI maddelerine yanlış diye yanıt vermiştir.",
        "Simulasyon yapıyor olabilir.",
        "Yardım alabilmek için semptomlarını abartıyor olabilir.",
        "Test almaya oldukça dirençli olabilir.",
        "Kullanılan ölçütlere göre açık psikotik olabilir."
      ]
    },
    {
      range: "10-15",
      title: "F alt testinde ham puanı 10-15 arasında olan bir birey:",
      points: [
        "Sosyal, politik ya da dini konularda yaşadığı toplumdan oldukça farklı inançlara sahiptir.",
        "Klinik açıdan ciddi nevrotik ya da psikotik durumdadır.",
        {
          isSublist: true,
          title: "Ciddi psikopatolojisi yoksa:",
          subPoints: ["Karamsar", "Sabırsız", "Hassas", "Huzursuz", "Doyumsuz", "Tutarsız", "İnatçı", "Fırsatçı olabilir."]
        }
      ]
    },
    {
      range: "3-9",
      title: "F alt testinde ham puanı 3-9 arasında olan bir birey:",
      points: [
        "Belli sorun alanlarında yer alan maddelere yanıt vermiştir.",
        "Özel sorunlarına karşın yaşamın pek çok alanında etkili bir biçimde işlev görmektedir."
      ]
    },
    {
      range: "0-2",
      title: "F alt testinde ham puan 0-2 arasında olan bir birey:",
      points: [
        "Çoğu normal insan gibi yanıt vermiştir.",
        "Sosyal açıdan uyumludur.",
        "Yetersizliğine neden olan bir ruhsal bozukluğu yoktur.",
        "İyi bir profil vermek için çaba göstermiştir."
      ]
    }
  ],

  tScoreInterpretations: [
    {
      range: "80 ve üstü",
      title: "80 ve üstü T puanı",
      description: "F alt testi 90 T puanını aşarsa bu profil dikkatli değerlendirilmelidir. F alt testi yükselme nedenleri şunlar olabilir:",
      points: [
        "İlişki kurmak istememe. Hepsi doğru ya da hepsi yanlış yanıt biçimi.",
        "Görme ya da okuma güçlüğü nedeniyle anlamada sorun ya da psikotik konfüzyon.",
        "Sahte kötülük. Eğer hastanın kendisini kötü göstermede kazançları varsa bu durum ortaya çıkmaktadır. Mahkumiyet, 'malulen emeklilik'...gibi. Simülasyon yapma.",
        "Yardım çağrısı profili. 2 ve 7 testleri 6, 8 ve 9 testlerinden yüksektir.",
        "Eğer 1 ve 4 alt testleri dışlanırsa açık psikoz ya da ciddi psikopatoloji vardır. 6 ve 8 testleri yükselmiştir. Düşünce bozukluğuna ya da ilişkili klinik semptomlara bakın."
      ],
      additionalContext: "Gynther ve Shimkunas (1965), Blumberg (1967), Gavron, Severson ve Engelthart (1962) T değeri 80'i aşan bireyleri araştırmış ve bunlarda davranış bozukluğu olduğunu saptamışlardır. Ancak seçtikleri örneklem psikiyatriktir. Böylece F testindeki herhangi bir ham puanın, profili geçersiz yapamayacağı belirtilmektedir. F alt testinde T değerleri 80'i aşan bireylerde bu yükselme ile ciddi psikopataloji arasında anlamlı bir ilişki varmış gibi görülüyorsa da bu MMPI'ın verildiği ortama göre değişik yorumları da içerebilir (Örneğin, cezaevi örneklemleri). Gynther, Altman ve Warbin (1973) F alt testi 98 T puanini aşanları incelemişlerdir. Bunların maddeleri anlamadıkları, referans delüzyonları, işitsel hallüsinasyonları olduğu, dikkatlerini toplayamadıkları, hastanede yatış nedenini bilmedikleri ve psikotik olgular oldukları anlaşılmıştır. Diğer çalışmalar, hastanın tek olarak F alt testi maddelerini incelemiştir. Gynther ve Petzel 1967'de psikotik ve davranış bozukluğu olanların, F alt testindeki ham puanları arasında bir fark olmadığını belirlemişlerdir. Ancak daha sonra incelediklerinde sadece bir maddenin bu iki grubu ayırdığını bulmuşlardır. McKinley, 1965'te suçlu ergenlerde F alt testinin yükseldiğini saptamıştır. Bunun nedenini de bazı F alt test maddelerinin onlar için kesin tepkiler taşımasına bağlayarak açıklamıştır. McKinley, bu tip hastaların sadece belirli maddelere karşı tepki verdiğini söylemiştir. Çünkü bu maddelerin onlar için bir anlamı vardır. Üç profesyonel ve üç amatör kişi suçlu ergenlerde F alt testi maddelerinden 21'ini ayırdederek, bu sorulara doğru cevabın verildiğini gözlemişlerdir. McKinley, aynı zamanda bu 21 maddeyi suçlu ergenlerin normal ergenlere kıyasla daha fazla cevaplandırdıklarını görmüştür. Bu maddeler özellikle hırsızlık, okulda davranış bozukluğu ve başkalarına zarar vermeyle ilgili maddelerdir. Özetle F alt testinin, suçlu ergenlerin davranış özelliğini ölçtüğü belirtilebilir."
    },
    {
      range: "70-80",
      title: "70-80 T puanı",
      description: "Bireyin ego işlevselliğinde bozulma olduğunun, ilişki kurmak istemediğinin ya da yanlış anlaşıldığını düşünmesinin göstergesidir.",
      points: [
        "Bu aralık psikozdaki hastaları ya da ciddî nevrotik bozukluğu olan kişileri göstermektedir.",
        "Bireyin alışılmadık ve geleneksel olmayan düşünce biçimi vardır.",
        "Antisosyal ve asi kişilerdir.",
        "F alt testinin bu ranjdaki yükselmesine nevrotik ve psikotik testlerdeki yükselme de eşlik ediyorsa birey borderline bir durumdadır."
      ]
    },
    {
      range: "55-69",
      title: "55-69 T puanı",
      description: "Birey eğer bu ranjın üst sınırlarında ise negativist, değişken, huysuz ve huzursuzdur. Çeşitli tanı grupları bu ranja girebilir:",
      points: [
        "Akut nevrozlar ve kişilik bozuklukları",
        "Durumsal stresi olan bireyler",
        "Savunucu psikotikler (K alt testinin yükselmesine bakılmalıdır.)"
      ]
    },
    {
      range: "44-54",
      title: "44-54 T puanı",
      description: "Birey sadece belirgin maddelere yanıt vermiştir.",
      points: [
        "İlgi alanları daralmıştır.",
        "Bireyin psikopatolojiyi, duygusal gerginliği gizlemek istediğini ve direncini gösterir. (Sahte iyilik) Bu hipotezi L ve K alt testlerindeki yükselme desteklemektedir."
      ]
    },
    {
      range: "45'in altı",
      title: "Düşük puanlar (T<45)",
      description: "Bireyin savunucu olduğunun göstergesidir. Birey herhangi bir psikopatoloji, gerginlik ya da stresi olmadığı görünümünü vermek istemektedir. (\"Sahte iyilik\")"
    }
  ],

  getInterpretationByRawScore(rawScore: number) {
    if (rawScore >= 26) return this.rawScoreInterpretations[0];
    if (rawScore >= 16) return this.rawScoreInterpretations[1];
    if (rawScore >= 10) return this.rawScoreInterpretations[2];
    if (rawScore >= 3) return this.rawScoreInterpretations[3];
    if (rawScore >= 0) return this.rawScoreInterpretations[4];
    return undefined;
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
    if (tScore >= 80) baseInterpretation = this.tScoreInterpretations[0];
    else if (tScore >= 70) baseInterpretation = this.tScoreInterpretations[1];
    else if (tScore >= 55) baseInterpretation = this.tScoreInterpretations[2];
    else if (tScore >= 44) baseInterpretation = this.tScoreInterpretations[3];
    else if (tScore < 44) baseInterpretation = this.tScoreInterpretations[4];
    
    if (!baseInterpretation || !options) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notlar oluştur
    const personalizedNotes: string[] = [];
    
    // Yaş faktörü (ergenler için özel durum)
    if (options.dogumTarihi) {
      const yas = hesaplaYas(options.dogumTarihi);
      if (yas !== null && yas < 18 && tScore >= 70) {
        personalizedNotes.push("Ergenlik döneminde F alt testinin yükselmesi, kimlik arayışı ve gelişimsel faktörlerle ilişkili olabilir.");
      }
    }

    // Bu bölüm kaldırıldı - test ortamı bilgisi toplanmıyor

    // Cinsiyet faktörü (Türk normlarına göre)
    if (options.cinsiyet) {
      if (options.cinsiyet === 'Erkek' && tScore >= 70) {
        personalizedNotes.push("Erkek normlarına göre değerlendirildiğinde dikkat çekici bir yükselme. (Erkek ortalaması: 8.3 ham puan)");
      } else if (options.cinsiyet === 'Kadin' && tScore >= 70) {
        personalizedNotes.push("Kadın normlarına göre değerlendirildiğinde dikkat çekici bir yükselme. (Kadın ortalaması: 10.11 ham puan)");
      }
    }

    // Eğitim faktörü
    if (options.egitimDurumu && ['İlkokul', 'Ortaokul', 'Okur-yazar değil'].includes(options.egitimDurumu)) {
      if (tScore >= 70) {
        personalizedNotes.push("Düşük eğitim seviyesi nedeniyle bazı maddeleri yanlış anlama olasılığı F puanını etkilemiş olabilir.");
      }
    }

    // Yüksek F puanları için ek uyarılar
    if (tScore >= 80) {
      personalizedNotes.push("Bu düzeydeki F yükselmesi ciddi psikopatoloji gösterebilir. Ancak test geçersizliği de söz konusu olabilir. Diğer geçerlik ölçekleri (L, K) ve klinik görünüm dikkate alınmalıdır.");
    }

    // Sonucu döndür
    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  },

  // Geriye uyumluluk için eski metotları koru
  getInterpretationByTScore(tScore: number) {
    return this.getPersonalizedInterpretation(tScore);
  }
};
