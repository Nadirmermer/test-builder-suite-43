// MMPI Kod Tipi Yorumlamaları - İkili, Üçlü ve Dörtlü Kodlar
// Bu dosya MMPI'nin klinik kod tiplerinin yorumlamalarını içerir

export interface CodeTypeInterpretation {
  codeType: string;
  title: string;
  characteristics: string[];
  clinicalImplications: string;
  therapeuticConsiderations?: string;
  prognosis?: string;
  subtypes?: Record<string, CodeTypeInterpretation>;
}

// İKİLİ KOD TİPLERİ
export const codeTypeInterpretations: Record<string, CodeTypeInterpretation> = {
  "12/21": {
    codeType: "12/21",
    title: "Hipokondriyazis-Depresyon Kodu",
    characteristics: [
      "Bu kodun en belirgin özelliği bedensel rahatsızlık ve ağrıdır",
      "Bu kod tipini alan bireyler bedensel işlevleri ile çok fazla ilgilidirler",
      "Genel olarak hipokondriyak yakınmaları, somatizasyon bozukluğu ya da psikofizyolojik reaksiyon şeklinde kendini gösterir",
      "Stres dönemlerinde daha da belirginleşir",
      "Semptomlarının duygusal çatışmalarla ilgili olduğunu ve bunları kullanarak psikolojik sorunlarından kaçmaya çalıştıklarını anlamak istemezler",
      "Yakınmaları belirsizdir ve medikal olarak ayrıştırılması zordur"
    ],
    clinicalImplications: "Hipokondriyak özelliklerinden dolayı herhangi bir tıbbî müdahale olabildiğince kısıtlı olmalıdır.",
    therapeuticConsiderations: "Bu örüntüyü veren hastalar, yakınmalarını kullanma ve yaşam biçimi haline getirmeyi öğrendikleri için bunları tedavi etmek zordur, kısa süreli tedaviye cevap verebilirler, ancak semptomları geri dönebilir. Bu kişiler sadece çok rahatsız olduklarını kabul ettikleri gibi aynı zamanda davranışlarının sorumluluğunu alma zorluğu çektikleri için geleneksel psikoterapiye yeterince cevap veremezler. Bedensel semptomlarının psikolojik sorunlardan kaynaklandığını reddederler. İçgörüleri oldukça sınırlıdır.",
    subtypes: {
      "lise_ogrencileri": {
        codeType: "12/21",
        title: "Lise Öğrencilerinde 12/21 Kodu",
        characteristics: [
          "Genel olarak utangaç, gergin, içedönük, mutsuz, endişeli, güvensiz",
          "Özellikle karşı cins ile ilişkilerinde oldukça çekingendirler",
          "Sıklıkla utangaçlıklarını obsesyonlar ya da sosyal izolasyon biçiminde gösterirler",
          "Bağımlılık ve karamsarlık belirgindir ve arkadaşları azdır",
          "Aile öykülerinde sıklıkla ayrılıklar ya da boşanma vardır"
        ],
        clinicalImplications: "Ergenlik döneminde sosyal anksiyete ve izolasyon"
      },
      "21_variant": {
        codeType: "21",
        title: "21 Kod Varyantı",
        characteristics: [
          "Fiziksel semptom ve yakınmalarını özellikle gösterir ve bedensel işlevlerine aşırı ilgi gösterirler",
          "Genel olarak onlarda belirgin organik bir patoloji yoktur, ancak az da olsa var olan fiziksel sorunlarını abartma eğilimi gösterirler",
          "Sundukları çok sayıda somatik yakınma arasında baş ağrısı, mide ağrısı ve sırt ağrısı gibi ağrılar",
          "Kardiyak yakınmalar ya da anoreksiya, bulantı, kusma ya da ülser gibi, gastrointestinal zorluklar odak noktasını oluşturur",
          "Bunlarda sinirlilik, huzursuzluk ve depresyonun eşlik ettiği yorgunluk, zayıflık ve baş dönmesi vardır"
        ],
        clinicalImplications: "Duygularını ifade etmeleri güçtür ve bu nedenle özellikle öfke gibi olumsuz duyguların gösterileceği durumlarda kendilerini huzursuz hisseder ve öfkeyi somatizasyonla gösterirler.",
        prognosis: "Olası Tanı: Pasif-bağımlı kişilik bozukluğu, Somatizasyon bozukluğu"
      }
    }
  },

  "123/213": {
    codeType: "123/213",
    title: "Nevrotik Üçlü",
    characteristics: [
      "Bu kişiler özellikle yorgunluk, güçsüzlük ve karın bölgesindeki organlarla ilgili bedensel yakınmalar gösterirler",
      "Öykülerinde uzun süreli kronik hipokondriazis öyküsü vardır",
      "Onların yakınmaları sıklıkla pasif bir bağımlılığın kanıtı olsa bile konfüzyon ve psikotik düşünce, intihar düşünceleri, obsesyonlar ve kompulsiyonlar yoktur",
      "Genel olarak ilgisiz, depresif, atılgan olmayan, risk alma konusunda tereddütlü kişilerdir"
    ],
    clinicalImplications: "Alt test 4 düşük olduğu zaman bu örüntü heteroseksüel ilişki azlığı ve seksüel zorlukların olduğu bir pasifliği gösterir. Düşük 9 ile birlikte olursa kişide enerji düzeyinde azalma, iş yapmama ve sürekli yatma isteği vardır.",
    prognosis: "Olası tanı: Belirgin somatizasyon bozukluğu ve hipokondriyak uğraşlar."
  },

  "1234": {
    codeType: "1234",
    title: "Hipokondriyazis-Depresyon-Histeri-Psikopatik Sapma",
    characteristics: [
      "Zayıf, korkak, stres ve sorumluluklar ile başa çıkmada yetersiz kişilerdir",
      "Bağımlılık, bağımsızlık çatışması yaşarlar",
      "Atılgan davranışlarla zayıflıklarını kapatma çabasına girerler",
      "Rahatlamak için alkole sığınırlar, ancak içtikleri zaman kavga ederler",
      "Bu profili veren erkekler kadınlara karşı düşmanlık duyguları gösterirler (Sıklıkla fiziksel şiddet yani dayak vardır)",
      "Özellikle güçlü bağımlılık gereksinimleri engellenmiştir"
    ],
    clinicalImplications: "Erkeklerde anneye bağımlılık özlemleri, anneleri tarafından reddedilme korkusu ile çatışma gösterirler. Kadınlarda karakter bozukluğu, pasif-agresif kişilik, kimseye güven duymama, duygularını ifade etme güçlüğü ya da nasıl ifade edeceğini bilememe görülür. Psikoterapide savunucudurlar, motivasyonları düşüktür.",
    prognosis: "Olası Tanı: Pasif-agresif kişilik, Anksiyete ya da psikofizyolojik reaksiyon"
  },

  "1236": {
    codeType: "1236",
    title: "Hipokondriyazis-Depresyon-Histeri-Paranoya",
    characteristics: [
      "Uzun süreli gerginlik, yetersizlik ve stres altında semptom geliştirme eğilimini gösterir",
      "Semptomlar konversif niteliktedir",
      "Bastırma ve inkârı kullanırlar",
      "Olumsuz duygularını psikosomatik semptomlarla gösterirler"
    ],
    clinicalImplications: "Konversif bozukluk eğilimi"
  },

  "1237": {
    codeType: "1237",
    title: "Hipokondriyazis-Depresyon-Histeri-Psikasteni",
    characteristics: [
      "123'teki kod tipinin özelliklerine ek olarak bu grupta yer alanlarda anksiyete, gerilim, korku, atılgan olamama, yetersizlik duyguları ve kişilerarası ilişkilerde bağımlılıkta artma vardır",
      "Genel olarak buna psikofizyolojik hastalıklar eklenir",
      "Sırt ve göğüs ağrıları ve epigastrik yakınmalar vardır",
      "Özellikle K 50 T puanından düşükse bu kişiler, günlük stres ve sorumluluklarla başa çıkamazlar",
      "Bu profili veren erkekler kendilerinden daha güçlü kadınlarla evlenirler ve bu ilişki ile bağımlılık rolünü sürdürmeye çalışırlar",
      "Bu kişilerde kronik işsizlik ve alkol bağımlılığı ortaya çıkabilir"
    ],
    clinicalImplications: "Kronik uyumsuzluk ve bağımlılık örüntüsü"
  },

  "1270": {
    codeType: "1270",
    title: "Hipokondriyazis-Depresyon-Psikasteni-Sosyal İçedönüklük",
    characteristics: [
      "Sinirlilik, anksiyete, depresyon, zayıflık, yorgunluk, ilgi kaybı gibi semptomlar gösterirler",
      "Kendilik değerlerinde düşme vardır",
      "Sosyal ilişkilerinde geri çekilme ve içe dönük tutum sergilerler",
      "Uykusuzluk, kardiyak semptomlar ve anoreksiya görülebilir"
    ],
    clinicalImplications: "Nevrotik bozuklukların daha şiddetli şeklidir"
  },

  "12378": {
    codeType: "12378",
    title: "Nevrotik Kompleks",
    characteristics: [
      "Nevrotik bozuklukların daha şiddetli şeklidir",
      "7 ve 8'deki yükselmeler, nevrotik bozukluğun daha abartılı olduğunun göstergesidir"
    ],
    clinicalImplications: "Şiddetli nevrotik bozukluk"
  },

  "128/218": {
    codeType: "128/218",
    title: "Hipokondriyazis-Depresyon-Şizofreni",
    characteristics: [
      "Sıklıkla bu profiller bedeninin üst kısmına ilişkin bizar yakınmalar getiren kişilerde görülür",
      "Genel olarak buna yorgunluk, zayıflık, gerilim ve düşüncelerde bozulmalar eşlik eder",
      "Ruhsal bozukluk ve diğerlerinden yabancılaşma gösterirler",
      "Genel olarak bu kişiler, akut prepsikotik ya da psikotik ve somatik delüzyonlar ortaya çıkarırlar"
    ],
    clinicalImplications: "Psikotik belirtiler ile somatik yakınmaların birleşimi"
  },

  "129/219": {
    codeType: "129/219",
    title: "Hipokondriyazis-Depresyon-Hipomani",
    characteristics: [
      "Bu kişiler beden işlevleri ile aşırı ilgilenir ve hastalıklarının gerçekten acil olduğunu düşünürler",
      "Akut klinik rahatsızlık, gerginlik, ajitasyon, huzursuzluk belirgindir",
      "Baş ağrısı, uykusuzluk ve spastik bağırsak ağrıları yakınmaları sıktır",
      "Onlarda nörolojik etyoloji de dikkate alınmalıdır, çünkü organik beyin sendromlarında da benzer yakınmalar görülebilir",
      "Çok az düzeyde de olsa bu kişiler depresyonu, çatışmayı ve/ya da hipomanik tarzdaki pasif-bağımlı tavrı maskelemeyi ya da inkâr etmeyi isterler"
    ],
    clinicalImplications: "Organik-fonksiyonel ayrım yapılması gerekir"
  },

  "120/210": {
    codeType: "120/210",
    title: "Hipokondriyazis-Depresyon-Sosyal İçedönüklük",
    characteristics: [
      "Bireyde depresyon, içe çekilme, kararsızlık, kişilerarası ilişkilerden kaçınma, yetersizlik ve suçluluk duygularına değişik somatik yakınmalar eşlik eder",
      "8 ve 6 birlikte yükselmişse uzak duruş, pasif ve insanlardan kaçan şizoid bir biçim gösterirler"
    ],
    clinicalImplications: "Sosyal izolasyon ile somatik yakınmaların birleşimi"
  },

  "13/31": {
    codeType: "13/31",
    title: "Hipokondriyazis-Histeri Kodu",
    characteristics: [
      "Bu alt test hem normal, hem de psikiyatrik hastalarda görülür",
      "Bu hastalar genellikle immatur, benmerkezcil ve bağımlıdırlar",
      "Histerik özellikler ve bastırma savunma mekanizmasına gösterirler",
      "Dikkat ve ilgi çekmeyi isterler ve bunu oldukça manipulatif bir biçimde yaparlar",
      "Hastalar, psikolojik sorunlarını somatik yakınmalar haline dönüştürürler",
      "Bu somatik yakınmalarında psikolojik etkenlerin de olabileceğini kabul etmezler, stres altında fiziksel semptomlar gösterirler",
      "Yakınmalarında genellikle ikincil kazanç vardır (Histeriden çok hipokondriyak özellikler gösterirler)",
      "Bu bireylerin bedensel yakınmaları, spesifik ve net olmamakla beraber genellikle baş ağrısı, göğüs ağrısı, sırt ağrısı, uyuşma, el ve ayaklarda aşırı titreme şeklindedir",
      "Sıklıkla yorgunluk, baş dönmesi, uyuşukluk ve titreme görülür",
      "Ayrıca bu kişilerde yemek yemekten rahatsızlık ve bulantı gibi yakınmalar olabilir, bazen anoreksiya ve bulimiya görülür"
    ],
    clinicalImplications: "13/31 kodu ile birlikte 2 ve 7 alt testleri normal sınırlar içinde ise bu profili veren bireylerin bastırma, inkâr, rasyonalizasyon ve projeksiyon mekanizmalarını aşırı bir biçimde kullanılır. Nadiren olumsuz kızgınlık duyguları gösterirler ve bu duyguları ile yüzleşmekten kaçınırlar ya da pasif agresif bir biçimde davranırlar. Karşı cinsten kişilerle ilişki kurma, bu bireyler için bir gereksinim olsa da genellikle zordur ve bu konuda genelde başarısız olurlar.",
    therapeuticConsiderations: "Terapi sırasında sorunlarına hemen çözüm isterler. Semptomların temelinde yatan psikolojik nedenleri kabul etmedikleri için bu kişiler geleneksel psikoterapiye dirençlidir. Terapide kesin cevaplar ve çözümler isterler, bu gerçekleşmezse terapiyi başlangıç aşamasında sonlandırırlar. Ayrıca terapistin kendilerinin aşırı ilgi beklentilerini hemen doyuramadığını düşünürlerse de terapiyi sonlandırırlar. İçgörüleri yoktur. Davranışlarının ve fiziksel yakınmalarının psikolojik kaynaklı olduğuna ilişkin yorumlara çok dirençlidirler.",
    subtypes: {
      "normal_2_7": {
        codeType: "13/31_normal",
        title: "Normal 2,7 ile 13/31",
        characteristics: [
          "Bastırma, inkâr, rasyonalizasyon ve projeksiyon mekanizmalarını aşırı bir biçimde kullanılır",
          "Nadiren olumsuz kızgınlık duyguları gösterirler",
          "Bu duyguları ile yüzleşmekten kaçınırlar ya da pasif agresif bir biçimde davranırlar",
          "Karşı cinsten kişilerle ilişki kurma zordur ve bu konuda genelde başarısız olurlar"
        ],
        clinicalImplications: "Somatizasyon ile çatışmalardan kaçınma"
      },
      "yuksek_2_7_8_9": {
        codeType: "13/31_yuksek",
        title: "Yüksek 2,7,8,9 ile 13/31",
        characteristics: [
          "Gerginlik, anksiyete, karar vermede güçlük ve depresyon olabilir",
          "Sorunların varlığına rağmen bu kişiler semptomlarından rahatsızlık duymazlar",
          "Semptomlarda kısmî azalma bile günlük yaşamlarını devam ettirme imkânı verir",
          "Kendilerini normal ve sorumluluk sahibi olarak sunabilirler",
          "Psikolojik değerlendirmede kendilerini normal olarak tanımlama eğilimleri vardır"
        ],
        clinicalImplications: "Semptomlara uyum ve inkâr"
      },
      "yuksek_L_K": {
        codeType: "13/31_savunucu",
        title: "Yüksek L,K ile 13/31",
        characteristics: [
          "Kendileri ile uğraşılmasından kızgınlık duydukları anlaşılmalıdır"
        ],
        clinicalImplications: "Savunucu tutum ve dirençlilik"
      },
      "yuksek_K": {
        codeType: "13/31_K",
        title: "Yüksek K ile 13/31",
        characteristics: [
          "Özellikle 2, 7 ve 8 testlerinin T puanı 70'in ve F alt testi T puanı 50'nin altında ise",
          "Bu bireyler kendilerini normal, sorumluluk sahibi, yardımsever ve sempatik olarak sunmaya çalışan kişilerdir",
          "Var olan herhangi bir bedensel semptom yetersizlik, değersizlik şeklinde kendini gösterir",
          "Geleneksel psikoterapötik müdahalelerden yarar sağlayamazlar",
          "Profesyonellere güven duydukları zaman tedaviyle iyileşebilirler"
        ],
        clinicalImplications: "Pozitif imaj sunma çabası"
      },
      "dusuk_2": {
        codeType: "13/31_dusuk2",
        title: "Düşük 2 ile 13/31",
        characteristics: [
          "Bu tür profil veren bireyler, histerik kişilik özellikleri taşır ve klasik psikosomatik semptomlar gösterirler"
        ],
        clinicalImplications: "Histerik kişilik bozukluğu"
      }
    }
  }
};

// Bu dosya devamında daha fazla kod tipi eklenecek...
// Şu anda kullanıcının verdiği ilk örnekleri eklendi