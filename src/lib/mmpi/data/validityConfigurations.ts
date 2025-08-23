// MMPI Geçerlik Konfigürasyonları - Resmi Türk Uygulama Kitabından
// 15 ana konfigürasyon + özel durumlar

export interface ValidityConfiguration {
  id: string;
  name: string;
  description: string;
  criteria: {
    L?: { min?: number; max?: number };
    F?: { min?: number; max?: number };
    K?: { min?: number; max?: number };
    unanswered?: { min?: number; max?: number };
    fkIndex?: { min?: number; max?: number };
  };
  interpretation: string;
  clinicalImplications: string;
  validity: 'valid' | 'limited' | 'invalid';
  recommendations: string[];
}

export const validityConfigurations: ValidityConfiguration[] = [
  {
    id: 'config_1',
    name: 'Tersine V (Konfigürasyon 1)',
    description: 'L ve K: 50-60T, F: 70T+',
    criteria: {
      L: { min: 50, max: 60 },
      K: { min: 50, max: 60 },
      F: { min: 70 }
    },
    interpretation: 'Birey kişisel ve duygusal zorluklarını kabullenmekte ve yardım istemektedir. Sorunlarıyla kendisinin başa çıkabileceğinden emin değildir.',
    clinicalImplications: 'F alt testi yükseldikçe, bireyin sorunlarını abartarak kısa süre içinde yardım almak istediği ya da simulasyon yaptığı söylenebilir. Kronik uyumsuzluk örüntüsü gösterebilir.',
    validity: 'limited',
    recommendations: [
      'Klinisyen F yüksekliğinin nedenini değerlendirmeli',
      'Simulasyon vs gerçek sorun ayrımı yapılmalı',
      'Psikiyatrik yardım zor olabilir'
    ]
  },
  {
    id: 'config_2',
    name: 'Açık V (Konfigürasyon 2)',
    description: 'L ve K: 60T+, F: 50T civarı',
    criteria: {
      L: { min: 60 },
      K: { min: 60 },
      F: { max: 55 }
    },
    interpretation: 'Birey kabul edilmez duygularından, impulslarından, dürtülerinden ve sorunlarından kaçmakta ya da bunları inkâr etmektedir. Kendini en iyi biçimde sunar.',
    clinicalImplications: 'Dünyayı uçlarda görür. Savunuculuk ve psikopatolojinin inkârından şüphelenilmelidir. Yeterli sosyal uyumu olabilir.',
    validity: 'limited',
    recommendations: [
      'Savunuculuk değerlendirilmeli',
      'Psikopatoloji inkârı araştırılmalı',
      'Hs ve Hy yükselmeleri kontrol edilmeli'
    ]
  },
  {
    id: 'config_3',
    name: 'Çok Kapalı V (Konfigürasyon 3)',
    description: 'F: 50T altı, L ve K: 60T+',
    criteria: {
      F: { max: 50 },
      L: { min: 60 },
      K: { min: 60 }
    },
    interpretation: 'Çok kapalı geçerlik konfigürasyonu. Kişi kendisini olduğundan daha iyi gösterme çabası içindedir. Sorunlarını, kabul edilmeyen dürtülerini inkâr ediyor.',
    clinicalImplications: 'İş arayan, gözaltındakiler, psikotik hastalar (inkâr kullanan), histerikler, hipokondriyaklar, alkolikler veya bağımlılarda görülür.',
    validity: 'limited',
    recommendations: [
      'Klinik testlere 5-10T puan eklenebilir (Greene 1980)',
      'Güçlü savunma mekanizmaları var',
      'Terapötik birliktelik zorluğu beklenir'
    ]
  },
  {
    id: 'config_4',
    name: 'Yükselen Eğilim (Konfigürasyon 4)',
    description: 'L: 40T, F: 45-55T, K: 60T',
    criteria: {
      L: { min: 35, max: 45 },
      F: { min: 45, max: 55 },
      K: { min: 55, max: 65 }
    },
    interpretation: 'Sorunlarıyla baş edebilecek uygun kaynaklara sahip ve testi aldığı dönemde stres yaşamayan normal kişilerin tipik konfigürasyonu.',
    clinicalImplications: 'K yüksekliği öğrenim durumu ve sosyo-ekonomik düzeye göre değişir. Kendiliğinden psikiyatriye başvurma olasılığı düşük.',
    validity: 'valid',
    recommendations: [
      'Normal profil olarak değerlendirilebilir',
      'Sosyo-ekonomik faktörler göz önünde bulundurulmalı',
      'İş başvurusu bağlamı kontrol edilmeli'
    ]
  },
  {
    id: 'config_5',
    name: 'Azalan Eğilim (Konfigürasyon 5)',
    description: 'L: 60T, F: 50T, K: 40-45T',
    criteria: {
      L: { min: 55, max: 65 },
      F: { min: 45, max: 55 },
      K: { min: 40, max: 45 }
    },
    interpretation: 'Kendilerini iyi göstermeye çalışırlar, sorunlarını kabul etmekten hoşlanmazlar. Ancak iyi görünme çabaları etkisizdir.',
    clinicalImplications: 'Nevrotik üçlü genellikle yükselir. Erkeklerde Mf düşük olabilir. Eğitimi ve sosyo-ekonomik düzeyleri düşük bireylerde daha çok görülür.',
    validity: 'limited',
    recommendations: [
      'Nevrotik üçlü kontrol edilmeli',
      'Sosyo-ekonomik faktörler değerlendirilmeli',
      'Cinsiyet farkları göz önünde bulundurulmalı'
    ]
  },
  {
    id: 'config_6',
    name: 'Rastgele Cevaplama (Konfigürasyon 6)',
    description: 'L ve K: 55T, F: 105T+',
    criteria: {
      L: { min: 50, max: 60 },
      K: { min: 50, max: 60 },
      F: { min: 105 }
    },
    interpretation: 'Profil geçersizdir. Hastanın maddeleri rastgele cevaplamasından kaynaklanır.',
    clinicalImplications: 'Konfüzyon, öfke, test direnci veya zekâ faktöründen kaynaklanabilir. Son 6 klinik test 70T üstünde.',
    validity: 'invalid',
    recommendations: [
      'Test tekrar verilmeli',
      'Cevap verme örüntüsünün nedenleri araştırılmalı',
      'Hasta durumu değerlendirildikten sonra yeniden test'
    ]
  },
  {
    id: 'config_7',
    name: 'Tümüne Doğru (Konfigürasyon 7)',
    description: 'L ve K: 35T altı, F: 120T+',
    criteria: {
      L: { max: 35 },
      K: { max: 35 },
      F: { min: 120 }
    },
    interpretation: 'Her soruyu "doğru" olarak işaretleme. Pd, Pa, Pt, Sc, Ma 90T üstünde.',
    clinicalImplications: 'Yardım çağrısı, ergenlerde akut rahatsızlık, yetişkinlerde direnç, sahte-kötülük profili veya ajite psikotik tablo.',
    validity: 'invalid',
    recommendations: [
      'F-K indeksi 11+ kontrol edilmeli',
      'Geçerliyse majör psikotik bozukluk şüphesi',
      'Acil klinik müdahale gerekebilir'
    ]
  },
  {
    id: 'config_8',
    name: 'Tümüne Yanlış (Konfigürasyon 8)',
    description: 'L, F, K: 80T+',
    criteria: {
      L: { min: 80 },
      F: { min: 80 },
      K: { min: 80 }
    },
    interpretation: 'Profil geçersizdir. Tüm maddelere "yanlış" cevap verme eğilimi.',
    clinicalImplications: 'Konfüzyon, öfke veya test almak istememe. Hy, D, Hs, Pd 80T+ yükselir. Çok ajite veya yıkımı olan psikotik hastalardan elde edilir.',
    validity: 'invalid',
    recommendations: [
      'Test tekrar verilmeli',
      'Hasta tutumunun nedenleri araştırılmalı',
      'Psikotik durum değerlendirmesi yapılmalı'
    ]
  },
  {
    id: 'config_9',
    name: 'Yükselen Tepe (Konfigürasyon 9)',
    description: 'L ve K: 66T altı, F: 100T civarı',
    criteria: {
      L: { max: 66 },
      K: { max: 66 },
      F: { min: 90, max: 105 }
    },
    interpretation: 'Profil geçerlidir. Psikolojik sorunları dile getirmek isteyen hastalar. Karamsar, dik kafalı, huzursuz ve asi kişiler.',
    clinicalImplications: 'Kendilerini aşırı eleştirirler, psikolojik sorunlarını kabul etmeye hazırdırlar. Savunma mekanizmaları yetersiz.',
    validity: 'valid',
    recommendations: [
      'F 80T+ ise akut stres değerlendirmesi',
      'Krize müdahale gerekebilir',
      'Simulasyon olasılığı değerlendirilmeli'
    ]
  },
  {
    id: 'config_10',
    name: 'Geleneksel Olmayan (Konfigürasyon 10)',
    description: 'L: 66T altı, F: 69T+, K: 65T+',
    criteria: {
      L: { max: 66 },
      F: { min: 69 },
      K: { min: 65 }
    },
    interpretation: 'Profil geçerli görünse de geleneksel olmayan cevap örüntüsü. Psikolojik sorunlarını kabul ediyor.',
    clinicalImplications: 'Akut bozukluk var ancak savunma mekanizmaları henüz bozulmamış. Patoloji ve savunma dengesi durağan değil.',
    validity: 'limited',
    recommendations: [
      'Dinamik değerlendirme gerekli',
      'Savunma mekanizmaları izlenmeli',
      'Düzenli takip önerilir'
    ]
  },
  {
    id: 'config_11',
    name: 'Açık Profil (Konfigürasyon 11)',
    description: 'L: 55T altı, F: 64T civarı, K: 45T altı',
    criteria: {
      L: { max: 55 },
      F: { min: 60, max: 68 },
      K: { max: 45 }
    },
    interpretation: 'Profil geçerlidir. Konuşma ve tavırlarında açık, laflarını sakınmayan bireyler.',
    clinicalImplications: 'Ergen grubu dışında ego gücünde düşüklük, yetersiz savunma mekanizmaları. Bir biçimde farklıdırlar.',
    validity: 'valid',
    recommendations: [
      'Ego gücü değerlendirmesi',
      'Yaş faktörü göz önünde bulundurulmalı',
      'Nevrotik uyum araştırılmalı'
    ]
  },
  {
    id: 'config_12',
    name: 'Normal Profil (Konfigürasyon 12)',
    description: 'L: 50T civarı, F: 70T altı, K: 50T+',
    criteria: {
      L: { min: 45, max: 55 },
      F: { max: 70 },
      K: { min: 50 }
    },
    interpretation: 'Geçerli profil. Yönergeleri dikkatli okuyan, anlayan ve yapan birey.',
    clinicalImplications: 'Yanıtlar doğru ve hastanın durumunu yansıtıyor. İdeal geçerlik profili.',
    validity: 'valid',
    recommendations: [
      'Normal değerlendirme yapılabilir',
      'Standart interpretasyon geçerli',
      'Güvenilir sonuçlar'
    ]
  },
  {
    id: 'config_13',
    name: 'Eşit Yükselme (Konfigürasyon 13)',
    description: 'L: 50T+, F ve K: eşit ve 55T+',
    criteria: {
      L: { min: 50 },
      F: { min: 55 },
      K: { min: 55 }
    },
    interpretation: 'Akut bozukluk veya ciddi bozukluğu olmasına karşın oldukça savunucu olan hastalar.',
    clinicalImplications: 'Başa çıkma yetenekleri iyi. Uzun süreli sorunlarla yaşayabilirler. Durumsal stres azaldığında rahatlarlar.',
    validity: 'valid',
    recommendations: [
      'F ve K 70T+ ise içgörü eksikliği',
      'Prognoz değerlendirilmeli',
      'Durumsal faktörler araştırılmalı'
    ]
  },
  {
    id: 'config_14',
    name: 'Erdemli Görünüm (Konfigürasyon 14)',
    description: 'L: 55T+, F: 60T altı, K: 59-64T',
    criteria: {
      L: { min: 55 },
      F: { max: 60 },
      K: { min: 59, max: 64 }
    },
    interpretation: 'Profil geçerlidir. Kendisini çok erdemli biri olarak gösterme isteği.',
    clinicalImplications: 'Kendilerini olduğundan çok daha iyi olarak gösterme eğilimindedirler.',
    validity: 'valid',
    recommendations: [
      'Kişilik özelliklerinde mükemmeliyetçilik',
      'Sosyal istenirllik etkisi değerlendirilmeli',
      'Gerçekçi değerlendirme yapılmalı'
    ]
  },
  {
    id: 'config_15',
    name: 'Karmaşık Profil (Konfigürasyon 15)',
    description: 'L: 60T, F: 70T+, K: 40T altı',
    criteria: {
      L: { min: 55, max: 65 },
      F: { min: 70 },
      K: { max: 40 }
    },
    interpretation: 'Karmaşıklık yaşayan birey. Dünyayı basit, siyah-beyaz olarak görür.',
    clinicalImplications: 'Düşük benlik değeri, başa çıkma kaynaklarının azlığı, duygusal katılık. Geleneksel değerlere katı tutunma.',
    validity: 'limited',
    recommendations: [
      'Benlik değeri çalışması',
      'Başa çıkma becerileri geliştirilmeli',
      'Değer sistemi esnekleştirilmeli'
    ]
  }
];

// K+ Profili özel durumu
export const kPlusProfile = {
  id: 'k_plus',
  name: 'K+ Profili',
  description: 'Tek anlamlı yükselme K\'da, hiçbir klinik test 70T+',
  criteria: {
    clinicalBelow70: true,
    clinicalBelow60: 6, // 6 ya da daha çok klinik test 60T altında
    kHigherThanF: 5 // K, F\'den en az 5T puan yüksek
  },
  interpretation: 'Utangaç, kaygılı ve ketlenmiş kişiler. Sorunlarının psikolojik olabileceği konusunda dirençli.',
  clinicalImplications: 'Yakın kişilerarası ilişkilerden kaçınma, pasif direnç, şizoid yapı, paranoid özellikler. %50 psikotik tanı, %25 organik beyin sendromu.',
  validity: 'limited',
  recommendations: [
    'Şizoid kişilik özellikleri değerlendirilmeli',
    'Paranoid eğilimler araştırılmalı',
    'Zekâ değerlendirmesi yapılmalı'
  ]
};

// F-K İndeksi değerlendirmesi
export const fkIndexInterpretation = {
  valid: { min: 0, max: 9, interpretation: 'Profil geçerli' },
  fakeGood: { value: 0, interpretation: 'Sahte-iyilik profili' },
  fakeBad: { min: 9, interpretation: 'Sahte-kötülük profili' },
  moderate: { min: 8, max: 11, interpretation: 'Sorunları abartma eğilimi, yardım almaya açık' },
  extreme: { min: 16, interpretation: 'Dikkatli değerlendirme gerekli, akut psikotik bozukluk veya simulasyon' }
};