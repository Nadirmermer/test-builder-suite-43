// Paranoya (Pa) Alt Testi - Ölçek 6
// MMPI Klinik Ölçek - Paranoid eğilimleri değerlendirmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface PaScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  therapeuticImplications?: string[];
  behavioralIndicators?: string[];
  additionalNotes?: string[];
  personalizedNotes?: string[];
}

export class PaScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş paranoya ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): PaScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    // Kitapta Pa-Scale için açık kişisel faktör belirtilmemiş
    // Bu nedenle kişiselleştirilmiş notlar eklenmeyecek
    
    return baseInterpretation;
  }

  getInterpretation(tScore: number): PaScaleInterpretation {
    if (tScore >= 80) {
      return {
        tScore,
        level: '80 Ve Üstü T Puanı',
        description: 'Kuşkulu, kızgın, küskün ve durumların doğrudan kendilerine yöneldiği biçimde yorum yapan kişilerdir.',
        characteristics: [
          'Bu bireylerin çoğu paranoiddir, referans fikirleri vardır',
          'Temel savunma mekanizması yansıtmadır',
          'Gerçeği değerlendirme bozuktur',
          'Delüzyonlar, perseküsyon ve/ya da grandiöz biçimindedir'
        ],
        clinicalSignificance: 'Paranoid bozukluk - Kritik düzey'
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-79 T Puanı',
        description: 'Diğerlerini suçlama ve hostilite temel özelliklerdir. Bu bireyler katı, inatçı ve aşırı duyarlıdırlar.',
        characteristics: [
          'Kişilerarası ilişkilerde aşırı savunucu tutumları nedeniyle yanlış anlaşılabilirler',
          'Açık paranoid özellikler vardır'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-69 T Puanı',
        description: 'Duyarlı bireylerdir, kendilerinin ve diğerlerinin duygularının kolaylıkla incinebileceği türünde düşünceleri vardır.',
        characteristics: [
          'Bu sıklıkla depresyonla ilgilidir',
          'Diğerlerinden gelen eleştiri ve önerileri çok ciddiye alırlar',
          'Kendilerinin söyledikleri her şeyin eleştiri gibi alındığı fikri vardır',
          'Kişilerarası ilişkilerinde savunucu ve diğer insanlara güvensizdirler',
          'Diğerlerinin kendilerinden yararlanacağını düşünürler',
          'Kırgın, küskün olmaya hazırdırlar, çünkü en ufak bir olumsuzluğu üstlerine alırlar',
          'İşte ve evde kendilerinden beklentiler konusunda kontrollüdürler'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Bu kişiler diğerlerini değerlendirmede esnektirler. Onlara karşı duyarlıdırlar ve diğerlerinin kendilerinden beklentilerini doğru anlayarak olumlu yanıt verirler.',
        characteristics: [
          '55-59 T puanı arasında olan bireyler anlayışlı, duyarlı kişilerdir'
        ]
      };
    } else {
      return {
        tScore,
        level: '27-44 T Puanı',
        description: 'İki tip insan bu puanı verebilir: Diğerlerine duyarlılığı olmayan kişiler ve çok fazla şüphesi ve endişesi olan kişiler.',
        characteristics: [
          'Bunlar paranoya maddelerini atlarlar. Diğerleri ise yüksek puan alan kişilerle aynıdır',
          'Düşük puan alan bireyler geleneksel, güvenilir, kişilerarası ilişkilerde duyarsız ve ilkeldirler',
          'Zekaları sınırlarıdır ve ilgi alanları daralmıştır'
        ]
      };
    }
  }
}

/**
 * Yüksek Pa Puanı Alan Bireyin Özellikleri
 */
export function getPaHighScoreCharacteristics(): string[] {
  return [
    'Açık psikotik bir davranış gösterir',
    'Düşünce bozukluğu vardır',
    'Perkelüsyon ve/ya da grandioz türünde delüzyonları vardır',
    'Referans fikirleri vardır',
    'Kendine kötü davranıldığını ya da kendisiyle alay edildiğini düşünür',
    'Öfkeli ve güceniktir, kıskançlık içindedir',
    'Savunma mekanizması olarak yansıtmayı kullanır',
    'Tanı sıklıkla şizofrenik ve paranoid bozukluktur'
  ];
}

/**
 * Orta Düzeyde Yüksek Pa Puanı Alan Bireyin Özellikleri (T 65-70)
 */
export function getPaModerateHighCharacteristics(): string[] {
  return [
    'Paranoid uğraşları vardır',
    'Diğerlerinin tepkilerine aşırı duyarlıdır',
    'Kendini yaşamda haksızlığa uğramış gibi hisseder',
    'Rasyonalize eder, kendi sorunları için diğerlerini suçlar',
    'Şüpheci, savunucudur',
    'Hostil, gücenik, tartışmacıdır',
    'Tutucu ve katıdır',
    'Aşırı mantıklıdır',
    'Psikoterapiye yanıtı kötüdür',
    'Duygusal sorunları hakkında konuşmak istemez',
    'Terapistle ilişki kurmakta ve ona sorunlarını anlatmakta güçlüğü vardır',
    'Aile üyelerine karşı hostilite ve gücenme gösterir'
  ];
}

/**
 * Hafif Düzeyde Yüksek Pa Puanı Alan Bireyin Özellikleri (T 55-64)
 */
export function getPaMildHighCharacteristics(): {
  nonPsychiatric: string[];
  psychiatric: string[];
} {
  return {
    nonPsychiatric: [
      'Kibar, duygusal ve naziktir',
      'Huzurlu ve yumuşak kalplidir',
      'Duyarlıdır',
      'Güvenilirdir',
      'İşbirlikçidir',
      'Samimidir',
      'İlgi alanları çoktur',
      'Enerjiktir',
      'İnisiyatif gösterir, iş ve diğer aktivitelerde ego katılımı vardır',
      'Zekidir, mantıklıdır, açık düşüncelidir, iç görüsü vardır',
      'İtaatkardır',
      'Kendine güveni azalmıştır',
      'Beklenti düzeyi yüksektir, endişeye eğilimlidir'
    ],
    psychiatric: [
      'Yaşama daha paranoid bir durumu vardır',
      'Çevresini kendisinden isteyen olarak görür, destekleyen olarak değil',
      'Diğerlerinin ne düşündüğü aşırı derecede önemlidir',
      'Diğerlerinin motiflerinden şüphelenir',
      'Öfkeli ve güceniktir'
    ]
  };
}

/**
 * Düşük Pa Puanı Alan Bireyin Özellikleri (T 35-45)
 */
export function getPaLowScoreCharacteristics(): {
  nonPsychiatric: string[];
  psychiatric: string[];
} {
  return {
    nonPsychiatric: [
      'Neşelidir',
      'Dengelidir',
      'Düzenlidir',
      'Ciddi, olgun ve mantıklıdır',
      'Akıllı ve kararlıdır',
      'Sosyal açıdan ilgilidir',
      'Sorunlarla kolay bir biçimde baş eder',
      'Güvenilir ve sadıktır',
      'Kendini kontrol eder, temkinlidir'
    ],
    psychiatric: [
      'İnatçı ve savunucudur',
      'Benmerkezcidir',
      'Kendisini doğrudan ilgilendirmeyen şeylere çok az ilgi gösterir',
      'Kendinden hoşnut değildir',
      'Diğerlerinin tepkilerine aşırı duyarlıdır',
      'Anlayışsızdır',
      'Sosyal ilgileri ve yetenekleri sınırlıdır',
      'Vicdanı gelişmemiştir, kuralları çok dikkate almaz',
      'Kabadır',
      'Huysuz ve karşıttır',
      'Yeteneksizdir',
      'Psikotik semptomlar pek görülmez, bu nedenle psikoz tanısı konulmaz'
    ]
  };
}

/**
 * Aşırı Derecede Düşük Pa Puanı Alan Bireyin Özellikleri (T<35)
 */
export function getPaVeryLowScoreCharacteristics(): string[] {
  return [
    'Açık paranoid bozukluğu olabilir',
    'Delüzyonları olabilir, şüpheler, etkilenme düşünceleri gösterebilir',
    'Semptomları Pa alt testinde yüksek puan alan bireylerden daha belirsizdir',
    'Baştan savıcı ve savunucudur',
    'Utangaçtır, sırlarla doludur ve içe çekilmiştir'
  ];
}

/**
 * Sadece Pa Alt Testinin Yükselmesi (Spike) Yorumu
 */
export function getPaSpikeInterpretation(): string {
  return 'Bu bireyler aşırı duyarlı, kaba, gergin ve kaygılıdırlar. Yaşamlarında iş ve sosyal baskı olduğunu hissederler. Şüphecilik, güvensizlik, düşüncelere dalma vardır. Diğerlerini suçlamaya yönelik bir projeksiyon mekanizmaları vardır. Sorunlara aşırı tepki verirler.';
}

/**
 * Genel Açıklama ve Madde Bilgisi
 */
export function getPaScaleDescription(): string {
  return 'Madde sayısı 40. Paranoya genç erişkinlik döneminde başlayan ve değişik koşullar altında ortaya çıkan başkalarının davranışını kötü niyetli olarak yorumlayan sürekli bir güvensizlik ve kuşkuculuk durumudur.';
}

/**
 * Ortalama Puanlar (Savaşır verileri)
 */
export function getPaScoreAverages(): { male: number; female: number } {
  return {
    male: 11.12,
    female: 11.93
  };
}

// Geriye uyumluluk için export objesi
export const paScaleInterpretation = {
  getInterpretation: (tScore: number) => new PaScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new PaScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getPaHighScoreCharacteristics,
  getModerateHighCharacteristics: getPaModerateHighCharacteristics,
  getMildHighCharacteristics: getPaMildHighCharacteristics,
  getLowScoreCharacteristics: getPaLowScoreCharacteristics,
  getVeryLowScoreCharacteristics: getPaVeryLowScoreCharacteristics,
  getSpikeInterpretation: getPaSpikeInterpretation,
  getDescription: getPaScaleDescription,
  getScoreAverages: getPaScoreAverages,
  name: 'Paranoya (Pa)',
  number: 6,
  description: getPaScaleDescription()
};