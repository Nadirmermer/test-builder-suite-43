// Psikasteni (Pt) Alt Testi - Ölçek 7
// MMPI Klinik Ölçek - Psikasteni ya da obsesif kompulsif bozukluğu değerlendirmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface PtScaleInterpretation {
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

export class PtScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş psikasteni ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): PtScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    // Kitapta Pt-Scale için açık kişisel faktör belirtilmemiş
    // Bu nedenle kişiselleştirilmiş notlar eklenmeyecek
    
    return baseInterpretation;
  }

  getInterpretation(tScore: number): PtScaleInterpretation {
    if (tScore >= 84) {
      return {
        tScore,
        level: '84 T Puanı Ve Üstü',
        description: 'Bireyin ajite ruminasyonları, korku hali, obsesyonları ve kompulsiyonları ya da fobileri olduğunu göstermektedir.',
        characteristics: [
          'Anksiyete ve gerginlik o kadar fazladır ki günlük yaşamlarını bile devam ettiremezler',
          'Entellektüalizasyon, izolasyon ve rasyonalizasyon sıklıkla kullanılmaktadır'
        ],
        clinicalSignificance: 'Obsesif kompulsif bozukluk - Kritik düzey'
      };
    } else if (tScore >= 75) {
      return {
        tScore,
        level: '75-84 T Puanı Ve Üstü',
        description: 'Temiz, titiz, düzenli kişilerdir. Önemsiz sorunlar karşısında bile gerginlik ve endişe yaşarlar.',
        characteristics: [
          'Kendilerini yetersiz, aşağılık duyguları ve suçluluğu olan kişiler olarak gösterirler',
          'Bu kendilerine güvenmelerine bağlıdır',
          'Herhangi bir konuda fikir üretemezler',
          'Obsesyonlar, kompulsiyonlar ve fobileri dışlayınız'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-74 T Puanı',
        description: 'Bu yükseltiler dürüst, mükemmeliyetçi, titiz ve kendini eleştiren bireyler olduklarına işaret etmektedir.',
        characteristics: [
          'Küçük sorunları bile kendilerine dert edinme eğilimindedirler'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Bu bireyler yaşamlarını ve işlerini endişe ve güvensizlik duymadan yürütebilirler.',
        characteristics: [
          'Normal aralık içinde değerler',
          'Uyumlu kişilik yapısı'
        ]
      };
    } else {
      return {
        tScore,
        level: '20-44 T Puanı',
        description: 'Rahat, duygusal, gerginliği olmayan bireylerdir. Çoğu kendine güvenir ve uyumludur.',
        characteristics: [
          'Üretici ve yeterlidirler',
          'Kaygı düzeyleri çok düşük olduğu için sanki tembel gibi görünürler',
          'Başarıya, statüye, kabul görmeye önem veren kişilerdir'
        ]
      };
    }
  }
}

/**
 * Yüksek Pt Puanı Alan Bireyin Özellikleri (Graham 1987)
 */
export function getPtHighScoreCharacteristics(): string[] {
  return [
    'Telaş ve huzursuzluk yaşar',
    'Kaygılı, gergindir',
    'Endişeli ve vesveselidir',
    'Sinirli ve tedirgindir',
    'Dikkatini yoğunlaştırmada güçlüğü vardır',
    'Sıklıkla anksiyete bozukluğu tanısı konulur',
    'İçe dönük, derin düşünceleri olan biridir',
    'Düşüncelerinde obsesiftir',
    'Kompulsif davranışları vardır',
    'Güvensizdir ve aşağılık duyguları yaşar',
    'Kendinden emin değildir',
    'Kendine yönelik şüpheleri vardır',
    'Katıdır',
    'Kendisi ve diğerleri için yüksek standartlara sahiptir',
    'Mükemmeliyetçi ve vicdan sahibidir',
    'Suçluluk duyar ve depresiftir',
    'Temiz, düzenli, tertipli ve titizdir',
    'Tutucudur',
    'Güvenilirdir',
    'Sıkıcıdır',
    'Donuktur',
    'Tereddüt eder',
    'Sorunların önemini çarpıtır, aşırı tepkiseldir',
    'Çekingendir',
    'Sosyal etkileşimde başarısızdır',
    'Anlaşılması zordur',
    'Sevilme ve kabul görme konusunda endişeleri vardır',
    'Huzurlu, yumuşak kalpli, güvenilir, duyarlıdır',
    'Bağımlıdır',
    'Bireyseldir',
    'Heyecanlıdır',
    'İmmatürdür'
  ];
}

/**
 * Düşük Pt Puanı Alan Bireyin Özellikleri
 */
export function getPtLowScoreCharacteristics(): string[] {
  return [
    'Korkular ve kaygılardan arınmıştır',
    'Kendine güven duymaktadır',
    'Geniş ilgi alanları vardır',
    'Sorumlu, gerçekçi, etkili, uyumludur',
    'Başarı, mevki ve tanınıp bilinmeye ilişkin değerleri vardır'
  ];
}

/**
 * Bedensel Yakınmalar (Yüksek Pt Puanı)
 */
export function getPtSomaticComplaints(): string[] {
  return [
    'Kalp',
    'Üriner sistem',
    'Gastrointestinal sistem',
    'Yorgunluk, bitkinlik, uykusuzluk'
  ];
}

/**
 * Terapötik Özellikler (Yüksek Pt Puanı)
 */
export function getPtTherapeuticCharacteristics(): string[] {
  return [
    'Kısa psikoterapiye iyi yanıt vermez',
    'Sorunlarına ilişkin kısmi içgörüsü vardır',
    'Entellektüalize ve rasyonalize eder',
    'Psikoterapide yapılan yorumlara direnç gösterir',
    'Terapiste karşı düşmanca duygular içindedir',
    'Pek çok hastadan daha uzun süre psikoterapide kalır',
    'Psikoterapide yavaş, ancak kalıcı bir gelişme gösterir',
    'Psikoterapide otorite konumunda olan kişilerle yaşadığı güçlüklerden, işteki başarısızlığından ve çalışma alışkanlıklarından, homoseksüel dürtülerle ilişkili kuşkularından söz eder'
  ];
}

/**
 * Sadece Pt Alt Testinin Yükselmesi (Spike) Yorumu
 */
export function getPtSpikeInterpretation(): string {
  return 'Alt test 7\'de yüksek puanlar, psikiyatrik grupta, genellikle kaygılı, gergin, kararsız ve dikkatini bir noktada yoğunlaştıramayan bireyleri tanımlamaktadır. Bu kişilerde obsesif düşünceler, ruminasyonlar, kendinden şüphe ve bunlara eşlik eden depresif özellikler vardır. Fobi ve kompulsif davranış, bu alt testte yüksek puan alan kişilerde görülebilmesine karşın, bu yüksek puanın karakteristiği değildir. Gerçekte pek çok rijid kompulsif hasta alt test 7\'yi yükseltmez. Çünkü bu kişilerin entelektüel savunmaları, anksiyetelerini ve güvensiz duygularını kontrol edecek kadar güçlüdür. Daha çok entelektüel savunmaları, rasyonalizasyonları ve izolasyonlarıyla anksiyete ve gerilimlerini uzun süre kontrol edemeyen hastalar yüksek puan alırlar. Ayrıca alt test 7\'deki yüksek puan alanlar bedensel işlevlere karşı aşırı ilgiyi gösterir. Bu kişilerin yakınmaları daha çok kardiyovasküler sistemde yoğunlaşır. Ayrıca gastrointestinal işlevlerle ilişkili yakınmalara da rastlanır. Bu kişilerin fiziksel yakınmaları genellikle yüksek düzeydeki anksiyeteleri ve bu anksiyetenin fiziksel fonksiyonları üzerindeki etkisini yansıtır. Terapötik yardımlardan önce anksiyelerinin semptomatik tedavisi gerçekleştirilmelidir.';
}

/**
 * Genel Açıklama ve Madde Bilgisi
 */
export function getPtScaleDescription(): string {
  return 'Madde sayısı 48. Bu alt test, psikasteni ya da obsesif kompulsif bozukluğu değerlendirmek amacıyla geliştirilmiştir. Bu hastalarda obsesif ruminasyonlar, kompulsif ritüeller görülmektedir. Ayrıca anormal korkular, karar vermede ve dikkat toplamada güçlük, suçluluk duyguları ve bunaltı sıklıkla rastlanan özellikleridir. Kendi kendini eleştiride aşırı ahlaki standartlar bu kişilerde sıklıkla görülür.';
}

/**
 * Ortalama Puanlar (K eklemeli - Savaşır verileri)
 */
export function getPtScoreAverages(): { male: number; female: number } {
  return {
    male: 27.90,
    female: 29.90
  };
}

// Geriye uyumluluk için export objesi
export const ptScaleInterpretation = {
  getInterpretation: (tScore: number) => new PtScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new PtScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getPtHighScoreCharacteristics,
  getLowScoreCharacteristics: getPtLowScoreCharacteristics,
  getSomaticComplaints: getPtSomaticComplaints,
  getTherapeuticCharacteristics: getPtTherapeuticCharacteristics,
  getSpikeInterpretation: getPtSpikeInterpretation,
  getDescription: getPtScaleDescription,
  getScoreAverages: getPtScoreAverages,
  name: 'Psikasteni (Pt)',
  number: 7,
  description: getPtScaleDescription()
};