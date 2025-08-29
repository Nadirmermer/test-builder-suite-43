// Maskülinite/Femininite (Mf) Alt Testi - Ölçek 5
// MMPI Klinik Ölçek - Cinsel kimlikleri saptamaları değerlendirmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface MfScaleInterpretation {
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

export class MfScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş maskülinite/femininite ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): MfScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore, personalInfo?.cinsiyet);
    
    if (!personalInfo) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notları oluştur
    const personalizedNotes: string[] = [];

    // Cinsiyet ve yaş faktörleri
    if (personalInfo.cinsiyet && personalInfo.dogumTarihi) {
      const yas = hesaplaYas(personalInfo.dogumTarihi);
      
      if (yas !== null) {
        // Ergen kızlarda özel durum
        if (personalInfo.cinsiyet === 'Kadın' && yas >= 14 && yas <= 19 && tScore >= 65) {
          personalizedNotes.push("Ergen kızlarda 5'in yükselmesi ev, okul ve yasalarla ilgili sorunlar olduğunu gösterir. 14-19 yaşları arasındaki kızlarda 5 yüksekliği normal olabilir, ancak bu yaşlardan sonra oldukça nadirdir.");
        }
      }
    }

    // Eğitim durumu faktörleri
    if (personalInfo.egitimDurumu && personalInfo.cinsiyet) {
      // Erkeklerde eğitim ve Mf ilişkisi
      if (personalInfo.cinsiyet === 'Erkek') {
        if (tScore >= 80 && ['İlkokul', 'Ortaokul', 'Lise'].includes(personalInfo.egitimDurumu)) {
          personalizedNotes.push("Lise eğitimi olan erkeklerde ya da kültürel baskı altındakilerde kültürün verdiği erkeksi rolle özdeşim olmadığını göstermektedir.");
        }
        
        if (tScore >= 60 && ['Önlisans', 'Lisans', 'Yüksek lisans', 'Doktora'].includes(personalInfo.egitimDurumu)) {
          personalizedNotes.push("Üniversite öğrencilerinin bu aralıkta puan almaları beklenen bir durumdur. Ayrıca sanatla ilgili olanlarda (ressamlar, artistler) bu alanda puan alırlar.");
          personalizedNotes.push("Eğitimi iyi olan ve kültürel açıdan zengin olan kişlerde bunlar beklenen özelliktir.");
        }
      }
      
      // Kadınlarda eğitim faktörü
      if (personalInfo.cinsiyet === 'Kadın') {
        if (tScore <= 40 && ['İlkokul', 'Ortaokul', 'Lise'].includes(personalInfo.egitimDurumu)) {
          personalizedNotes.push("Eğitim Düzeyi Düşük Kadınlarda Mf Alt Testinde Düşüklük: Kendini geleneksel kadın rolünde gibi sergiler, pasif, uysal, itaatkardır.");
        }
        
        if (tScore <= 40 && ['Önlisans', 'Lisans', 'Yüksek lisans', 'Doktora'].includes(personalInfo.egitimDurumu)) {
          personalizedNotes.push("Eğitim Düzeyi Yüksek Olan Kadınlarda Mf Alt Testinde Düşüklük: Geleneksel kadın rolünü reddeden, stereotipil bir biçimde kadın olmadığı halde pek çok geleneksel kadınsı ilgileri vardır.");
        }
        
        if (tScore >= 65) {
          personalizedNotes.push("6 yüksekliği sosyo-ekonomik düzeyi düşük olan ve farklı kültürlerden gelen kadınlarda da görülebilir.");
        }
      }
    }

    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  }

  getInterpretation(tScore: number, cinsiyet?: 'Erkek' | 'Kadın'): MfScaleInterpretation {
    if (!cinsiyet) {
      return this.getGeneralInterpretation(tScore);
    }

    if (cinsiyet === 'Erkek') {
      return this.getMaleInterpretation(tScore);
    } else {
      return this.getFemaleInterpretation(tScore);
    }
  }

  private getMaleInterpretation(tScore: number): MfScaleInterpretation {
    if (tScore >= 80) {
      return {
        tScore,
        level: '80 Ve Üstü T Puanı (Erkek)',
        description: 'Lise eğitimi olan erkeklerde ya da kültürel baskı altındakilerde kültürün verdiği erkeksi rolle özdeşim olmadığını göstermektedir.',
        characteristics: [
          'Yüksek puanlar göreceli olarak pasif erkeklere (eğer 4 alt testi de düşükse) hatta bazı durumlarda kadınsı özelliklere sahip olanlara işaret etmektedir'
        ]
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-79 T Puanı (Erkek)',
        description: 'Bu erkekler hayal kurmayı seven, içedönük, eğitim yönelimli, sporlara özel ilgi duyan kişilerdir.',
        characteristics: [
          'Genellikle bu gruptaki erkekler idealist ve hayalperest bireylerdir',
          'Sosyal açıdan duyarlıdırlar ve kolay ilişki kurarlar',
          'Eğitimi iyi olan ve kültürel açıdan zengin olan kişlerde bunlar beklenen özelliktir'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-69 T Puanı (Erkek)',
        description: '65 puanının üstündeki yükselmeler demografik ve klinik veri dikkate alınarak değerlendirilmelidir.',
        characteristics: [
          'Üniversite öğrencilerinin bu aralıkta puan almaları beklenen bir durumdur',
          'Ayrıca sanatla ilgili olanlarda (ressamlar, artistler) bu alanda puan alırlar'
        ]
      };
    } else if (tScore >= 41) {
      return {
        tScore,
        level: '41-59 T Puanı (Erkek)',
        description: 'Erkeklerde erkeksi ilgiler ve davranışlar olduğunu göstermektedir ve bütün ilgileri bu alanda daralmıştır.',
        characteristics: [
          'Maceracı kişilerdir, dışarda yapılan aktiviteleri, sporları ya da mekanik aktiviteleri severler',
          'Bu örüntüye düşük iş ilgileri eşlik eder',
          'Ergen erkeklerde Mf düşüklüğüne, suç ve okul ile ilgili sorular eşlik etmektedir'
        ]
      };
    } else {
      return {
        tScore,
        level: '26-40 T Puanı (Erkek)',
        description: 'Bu erkeklerde maskülen görünmek için kompulsif bir uğraş vardır ve bu abartılmış bir boyuttadır.',
        characteristics: [
          'Bunlar, narsisistik bir biçimde kendi güçlerini abartırlar',
          'Bireyin kendi erkekliğini yoğun bir biçimde ortaya koyması, altta yatan kendine güvensizlik ile ilgilidir'
        ]
      };
    }
  }

  private getFemaleInterpretation(tScore: number): MfScaleInterpretation {
    if (tScore >= 65) {
      return {
        tScore,
        level: '65 T Puanının Üstü (Kadın)',
        description: 'Bu kadınlar güçlü, kuvvetli, saldırgan, yönlendirici ve yarışmacıdır. Geleneksel erkek rolüne özgü aktivite ve işlere girerler.',
        characteristics: [
          'Güvenli ve spontandırlar, ancak heteroseksüel ilişkilerin olduğu alanlarda ketlenmeleri vardır',
          'Kadınsı cinsel kimliğe uyum sağlamalarının beklendiği durumlarda anksiyöz olabilirler',
          'Bu kadınlar iddiacı, yarışmacı, inatçıdırlar ve diğer kadınlar gibi görünmek ve davranmaktan hoşlanmazlar',
          'Buna karşın davranış ve düşüncelerinde bağımsız, kendine güvenli, spontan, dominant ve saldırgan olabilirler',
          'Bu, kariyer iş ile aşırı uğraşma, erkeksi spor ve ilgi alanları ya da dominant, lezbiyen cinsel oryantasyonlar görülür',
          'Bu kadınları çoğunluğu kendilerini kontrol edemeyecekleri durumlarda, özellikle karşı cinsle ilişkilerinde kontrolsüz bir durum varsa çok rahatsız hissederler'
        ]
      };
    } else if (tScore >= 56) {
      return {
        tScore,
        level: '56-65 T Puanı (Kadın)',
        description: 'Kadınlarda 60 ve üstündeki T puanı onların aktif, atılgan ve yarışmacı olduklarını göstermektedir.',
        characteristics: [
          'Aktif, atılgan ve yarışmacı',
          'Geleneksel kadın rolü dışında aktiviteler'
        ]
      };
    } else if (tScore >= 41) {
      return {
        tScore,
        level: '41-55 T Puanı (Kadın)',
        description: 'Bu kadınların ilgi alanları orta sınıf kadınların ilgilendikleri konular ile sınırlıdır.',
        characteristics: [
          'Duyarlı kişilerdir, bu duyarlılık erkeklerle ilişkilerinde daha da belirginleşmektedir',
          'Giyimleriyle kadın olduklarını açıkça gösterirler'
        ]
      };
    } else {
      return {
        tScore,
        level: '26-40 T Puanı (Kadın)',
        description: 'Bu yükselme kadınların pasif, çekingen olduğunu göstermektedir.',
        characteristics: [
          'Mf düşüklüğü nevrotik üçlüde yükselme ile ilişkilidir',
          'Eğer Pd yükselmesi, Mf düşüklüğüne eşlik ediyorsa seksüel impulsların olası eyleme vurukluğuna dikkat edilmelidir',
          'Bu kadınlar herhangi bir şeyden mutlu olmamak için ellerinden gelen gayreti gösterirler'
        ]
      };
    }
  }

  private getGeneralInterpretation(tScore: number): MfScaleInterpretation {
    return {
      tScore,
      level: 'Genel Değerlendirme',
      description: 'Cinsiyet bilgisi olmadan tam değerlendirme yapılamaz.',
      characteristics: [
        'Mf alt testi cinsiyet bazlı değerlendirme gerektirir',
        'Erkek ve kadın normları farklıdır'
      ]
    };
  }
}

/**
 * Erkeklerde Yüksek Mf Puanı Alan Bireyin Özellikleri (Graham 1987)
 */
export function getMfMaleHighScoreCharacteristics(): string[] {
  return [
    'Cinsel kimliğine ilişkin çatışması vardır, depresyon ve psikotik semptomlar göstermez, hoşnuttur, durağandır',
    'Erkek rolünde güvensizdir',
    'Estetik ve artistik ilgileri vardır',
    'Kadınsıdır',
    'Zeki ve yeteneklidir',
    'Hırslı, yarışmacı ve sabırlıdır',
    'Zeki, mantıksal ve düzenlidir',
    'İyi yargılama yeteneği vardır, sağduyuludur',
    'Meraklıdır',
    'Yaratıcıdır, hayal gücü zengindir ve sorulara yaklaşımı bireyseldir',
    'Sosyaldir, insanlara duyarlıdır',
    'Hoşgörülüdür',
    'Diğerlerine olumlu duygular göstermede yeteneklidir',
    'Kişilerarası ilişkilerde pasif, bağımlı ve itaatkardır',
    'Barışı sever, çatışmadan kaçınmak için boyun eğmeyi tercih eder',
    'Kendin kontrol eder, nadiren eyleme vuruk davranış gösterir',
    'Homoerotik eğilimler ya da bastırılmış homoseksüel davranışlar gösterebilir'
  ];
}

/**
 * Kadınlarda Yüksek Mf Puanı Alan Bireyin Özellikleri
 */
export function getMfFemaleHighScoreCharacteristics(): string[] {
  return [
    'Geleneksel kadınlık rolünü reddetme eğilimindedir',
    'İş, spor ve hobilerde erkeksi ilgileri vardır',
    'Aktif ve atılgandır',
    'Yarışmacı, saldırgan ve yönlendiricidir',
    'Kaba, terbiyesiz ve serttir',
    'Açık yüreklidir, serbest, kendine güvenlidir',
    'Kolay yönlendirilir',
    'Mantıksal ve hesaplıdır',
    'Duygusuzdur',
    'Arkadaş canlısı değildir',
    'Eğer psikiyatrik hastaysa halüsinasyonlar, delüzyonlar ve kuşkuculuk gösterir, ancak eyleme vuruk davranışlara rastlanmaz',
    'Eğer psikiyatrik hastaysa psikoz tanısı alma olasılığı vardır'
  ];
}

/**
 * Erkeklerde Düşük Mf Puanı Alan Bireyin Özellikleri
 */
export function getMfMaleLowScoreCharacteristics(): string[] {
  return [
    'Kendini aşırı düzeyde erkeksi olarak sergiler',
    'Fiziksel güç ve cesarete önem verir',
    'Saldırgan, maceracı ve pervasızdır',
    'Kaba ve serttir',
    'Kendi erkek kimliğine ilişkin şüpheleri vardır',
    'Entelektüel yeterliliği sınırlıdır',
    'İlgi alanları daralmıştır',
    'Katıdır ve sorunlara yaklaşımı yaratıcı değildir',
    'Hareketi düşünceye tercih eder',
    'Pratiktir',
    'Kolay uyum sağlayan sakin ve rahattır',
    'Neşeli ve esprilidir',
    'Halinden memnundur',
    'Çevresini nasıl etkilediğini fark etmez',
    'Kendi güdülerine ilişkin iç görü azdır'
  ];
}

/**
 * Eğitim Düzeyi Düşük Kadınlarda Mf Düşüklüğü
 */
export function getMfFemaleLowEducationCharacteristics(): string[] {
  return [
    'Kendini geleneksel kadın rolünde gibi sergiler',
    'Kendi kadınlığı konusunda şüpheleri olan',
    'Pasif, uysal, itaatkardır',
    'Kendinden memnun değildir, yakınan biridir',
    'Diğerleri tarafından katı, duyarlı, idealistik olarak tanımlanır',
    'Karar verirken erkeklerin düşüncelerine başvurur',
    'Sıkıcıdır',
    'Duyguludur',
    'Alçakgönüllüdür',
    'İdealisttir',
    'Eğer hastanede yatan psikiyatrik hastaysa büyük olasılıkla psikotik değildir',
    'Eğer hastanede yatan psikiyatrik hastaysa diğer kadın hastalara kıyasla daha sosyaldir'
  ];
}

/**
 * Eğitim Düzeyi Yüksek Kadınlarda Mf Düşüklüğü
 */
export function getMfFemaleHighEducationCharacteristics(): string[] {
  return [
    'Geleneksel kadın rolünü reddeden',
    'Stereotipil bir biçimde kadın olmadığı halde pek çok geleneksel kadınsı ilgileri vardır',
    'Kendini yetenekli, mücadeleci olarak görür',
    'Kendini alaycı, hayalperest olmayan, ilgisiz biri olarak tanımlar',
    'Diğerleri tarafından zeki, yetenekli, zorlayıcı, iç görüsü olan biri olarak tanımlar'
  ];
}

/**
 * Sadece Mf Alt Testinin Yükselmesi (Spike) Yorumu - Erkekler
 */
export function getMfMaleSpikeInterpretation(): string {
  return 'Sadece test 5\'in yükselmesi açık ya da örtük homoseksüaliteyi gösterme açısından yeterli değildir. Kendi homoseksüalitesini göstermek isteyen bireyler bu testte yavaş bir yükselme yaparlar. Erkeklerde 5 testinde 75 T puanı ve üstü, eğitim düzeyleri orta ya da lise ise ve oldukça katı kültürel baskı varsa bu erkeklerde geleneksel erkeksi yaşam biçimi yoktur, yüksek puanlar pasif erkekleri gösterir (eğer alt test 4, düşük ise) ve çoğunluğunda kadınsı özellikler vardır.';
}

/**
 * Genel Açıklama ve Madde Bilgisi
 */
export function getMfScaleDescription(): string {
  return 'Madde sayısı 60. Bu alt test, cinsel kimlikleri saptamaları değerlendirmek amacıyla geliştirilmiştir. Bu alt testteki maddeler oldukça heterojendir. Çeşitli mesleklere karşı ilgi, boş zaman faaliyetleri, uğraşlar, sosyal aktivitelerle ilgili maddelerden başka korkular, endişeler ve bireysel duyarlılıklarla ilgili maddeler bulunmaktadır. Doğrudan doğruya cinsel içerikli maddelerde vardır.';
}

/**
 * Ortalama Puanlar (Savaşır verileri)
 */
export function getMfScoreAverages(): { male: number; female: number } {
  return {
    male: 29.21,
    female: 32.98
  };
}

// Geriye uyumluluk için export objesi
export const mfScaleInterpretation = {
  getInterpretation: (tScore: number, cinsiyet?: 'Erkek' | 'Kadın') => new MfScale().getInterpretation(tScore, cinsiyet),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new MfScale().getPersonalizedInterpretation(tScore, personalInfo),
  getMaleHighScoreCharacteristics: getMfMaleHighScoreCharacteristics,
  getFemaleHighScoreCharacteristics: getMfFemaleHighScoreCharacteristics,
  getMaleLowScoreCharacteristics: getMfMaleLowScoreCharacteristics,
  getFemaleLowEducationCharacteristics: getMfFemaleLowEducationCharacteristics,
  getFemaleHighEducationCharacteristics: getMfFemaleHighEducationCharacteristics,
  getMaleSpikeInterpretation: getMfMaleSpikeInterpretation,
  getDescription: getMfScaleDescription,
  getScoreAverages: getMfScoreAverages,
  name: 'Maskülinite/Femininite (Mf)',
  number: 5,
  description: getMfScaleDescription()
};