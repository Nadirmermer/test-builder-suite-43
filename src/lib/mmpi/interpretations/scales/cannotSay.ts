// src/lib/mmpi/interpretations/scales/cannotSay.ts

export const cannotSayInterpretation = {
  general: `Cevaplanmayan ya da hem doğru, hem yanlış olarak işaretlenen maddeler bu alt testi oluşturur. Bu yüzden bu alt test diğer geçerlik ve klinik alt testlerinde olduğu gibi belirli test yüksekliğini düşürür. 30 ya da daha fazla maddenin çıkması profili bozar. Çıkarılan madde sayısını en aza indirmek tercih edilen yoldur. Bireye maddelere yanıt vermesinin öneminin açıklanması faydalı olur. Eğer birey 11 ya da daha fazla soruyu boş bırakmışsa yeniden soruları gözden geçirerek bunları cevaplaması istenir. Yine cevapsız bıraktıkları olursa nedeni sorulur. Bireyin cevaplayamadığı için mi boş bıraktığını yoksa cevaplamak istemediği için mi boş bıraktığını anlamak faydalı olur. (?) Alt testinde güvenirlik verisi yoktur. Genellikle birçok hasta ancak birkaç maddeyi boş bırakır ve bu sorun yaratmaz. Bu nedenle MMPI'da bu konu, bugüne kadar fazla işlenmemiştir. Bu alt testteki yükselmeler şöyle yorumlanabilir:`,
  scoreTable: [
    {
      range: "0",
      level: "Düşük",
      interpretation: "Birey tüm soruları cevaplamıştır. Bu puan, çoğunlukla araştırma yapılan gruplarda gözlenir."
    },
    {
      range: "1-5",
      level: "Normal",
      interpretation: "Birkaç madde cevaplanmamıştır. Dikkat edilecek nokta bu maddelerin tümünün bir alt ölçeğe ait olup olmadığını incelemektir. Eğer durum böyleyse profil saptırılmıştır."
    },
    {
      range: "6-30",
      level: "Orta",
      interpretation: "Birey pek çok kişiden daha çok maddeyi cevaplamamıştır. Profil bozulabilir. 30 maddeye yakın bir sayıya ulaşınca geçerlik tehlikeye girer."
    },
    {
      range: "31 ve üstü",
      level: "Geçersiz",
      interpretation: "Kendisi hakkında bilgi vermek istemeyebilir. Karar verememiştir ya da iletişim kuramaz. Hastadan yeniden cevap kağıdına dönmesi ve ölçeği doldurması istenebilir. MMPI'yı tamamlamayan herkes otomatik olarak bu kategoriye girmez."
    }
  ],
  additionalInfo: `Bireye MMPI verilirken isim yazması istenmezse, daha çok anlaşılması güç olanların boş bırakıldığı görülmektedir. Birey seçkisiz olarak 50 cümleyi boş bırakırsa bu, geçerliği, bozmayabilir. Ancak çeşitli insanlar sadece belli alt testlere ilişkin soruları boş bırakabilir. Ör. Boş bırakılan maddeler şizofreni alt testine denk geliyorsa, değişik bir profil elde edilebilir.`,
  reasonsForLeavingBlank: {
      title: "Boş bırakma nedenleri:",
      reasons: [
        "Bireyin o maddeyi anlayamaması. Örneğin, ergenler evlilik ve cinsellik ile ilgili soruları anlayamadıkları için boş bırakırlar.",
        "Testi uygulamadan önce, testi alanla tam bir işbirliği sağlayamama.",
        "Testi alan bireyin savunucu davranması.",
        "Bireyin alıngan ve şüpheci olması.",
        "Bireyin depresyonu varsa test çok uzun ve zor geldiği için boş bırakabilir.",
        "Konfüzyonda olan ya da ajitasyonu olan hastalar boş bırakabilirler.",
        "Psikopat hastalar isyan halinde boş bırakırlar.",
        "Boş bırakmanın yorumu çok zordur, çünkü farklı hasta gruplarında boş bırakma nedenleri farklıdır."
      ]
  },
  whatToDo: {
      title: "Ne yapılabilir?",
      steps: [
        "Testi alan birey ile konuşmak. Soruları genellikle doğru-yanlış diye yanıtlaması gerektiği tekrarlanabilir.",
        "Bireye, onu suçlamadan boş bırakma nedenlerini sormak.",
        "Tekrar o maddelerin üzerinden geçmek. Bunu savunuculuğu artırmadan yapmak gereklidir."
      ]
  },
  getInterpretation(rawScore: number) {
    let result: { 
      level: string; 
      interpretation: string;
      reasonsForLeavingBlank?: typeof this.reasonsForLeavingBlank;
      whatToDo?: typeof this.whatToDo;
    } | undefined = undefined;

    if (rawScore === 0) {
      const { level, interpretation } = this.scoreTable[0];
      result = { level, interpretation };
    } else if (rawScore >= 1 && rawScore <= 5) {
      const { level, interpretation } = this.scoreTable[1];
      result = { level, interpretation };
    } else if (rawScore >= 6 && rawScore <= 30) {
      const { level, interpretation } = this.scoreTable[2];
      result = { level, interpretation, reasonsForLeavingBlank: this.reasonsForLeavingBlank, whatToDo: this.whatToDo };
    } else if (rawScore >= 31) {
      const { level, interpretation } = this.scoreTable[3];
      result = { level, interpretation, reasonsForLeavingBlank: this.reasonsForLeavingBlank, whatToDo: this.whatToDo };
    }
    
    return result;
  }
};
