// Mesculinite/Femininite (Mf) Alt Testi - Ölçek 5
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
   * Kişisel bilgileri dahil eden gelişmiş mesculinite/femininite ölçeği yorumlaması
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

    // Cinsiyet ve eğitim faktörleri (kitapta açık belirtilen)
    if (personalInfo.cinsiyet === 'Kadın') {
      if (personalInfo.egitimDurumu) {
        if (tScore < 50) {
          if (['İlkokul', 'Ortaokul', 'Lise'].includes(personalInfo.egitimDurumu)) {
            personalizedNotes.push("Eğitim Düzeyi Düşük Kadınlarda Mf Alt Testinde Düşüklük: Kendini geleneksel kadın rolünde gibi sergiler.");
            personalizedNotes.push("Kendi kadınlığı konusunda şüpheleri olan, pasif, uysal, itaatkardır.");
            personalizedNotes.push("Kendinden memnun değildir, yakınan biridir.");
            personalizedNotes.push("Diğerleri tarafından katı, duyarlı, idealistik olarak tanımlanır.");
            personalizedNotes.push("Karar verirken erkeklerin düşüncelerine başvurur.");
            personalizedNotes.push("Sıkıcıdır, duyguludur, alçakgönüllüdür, idealisttir.");
            personalizedNotes.push("Eğer hastanede yatan psikiyatrik hastaysa büyük olasılıkla psikotik değildir.");
            personalizedNotes.push("Eğer hastanede yatan psikiyatrik hastaysa diğer kadın hastalara kıyasla daha sosyaldir.");
          } else if (['Önlisans', 'Lisans', 'Yüksek lisans', 'Doktora'].includes(personalInfo.egitimDurumu)) {
            personalizedNotes.push("Eğitim Düzeyi Yüksek Olan Kadınlarda Mf Alt Testinde Düşüklük: Geleneksel kadın rolünü reddeden.");
            personalizedNotes.push("Stereotipil bir biçimde kadın olmadığı halde pek çok geleneksel kadınsı ilgileri vardır.");
            personalizedNotes.push("Kendini yetenekli, mücadeleci olarak görür.");
            personalizedNotes.push("Kendini alaycı, hayalperest olmayan, ilgisiz biri olarak tanımlar.");
            personalizedNotes.push("Diğerleri tarafından zeki, yetenekli, zorlayıcı, iç görüsü olan biri olarak tanımlar.");
          }
        }
      }

      // Yaş faktörü (kitapta açık belirtilen)
      if (personalInfo.dogumTarihi && tScore >= 65) {
        const yas = hesaplaYas(personalInfo.dogumTarihi);
        
        if (yas !== null && yas >= 14 && yas <= 19) {
          personalizedNotes.push("Ergen kızlarda 5'in yükselmesi ev, okul ve yasalarla ilgili sorunlar olduğunu gösterir.");
          personalizedNotes.push("14-19 yaşları arasındaki kızlarda 5 yüksekliği normal olabilir, ancak bu yaşlardan sonra oldukça nadirdir.");
        }
      }
    }

    // Erkekler için özel durumlar (kitapta açık belirtilen)
    if (personalInfo.cinsiyet === 'Erkek' && personalInfo.egitimDurumu === 'Lise' && tScore >= 80) {
      personalizedNotes.push("Lise eğitimi olan erkeklerde ya da kültürel baskı altındakilerde kültürün verdiği erkeksi rolle özdeşim olmadığını göstermektedir.");
      personalizedNotes.push("Yüksek puanlar göreceli olarak pasif erkeklere (eğer 4 alt testi de düşükse) hatta bazı durumlarda kadınsı özelliklere sahip olanlara işaret etmektedir.");
    }

    if (personalInfo.cinsiyet === 'Erkek' && personalInfo.egitimDurumu === 'Lise' && tScore >= 75) {
      personalizedNotes.push("Erkeklerde 5 testinde 75 T puanı ve üstü, eğitim düzeyleri orta ya da lise 1 ise ve oldukça katı kültürel baskı varsa bu erkeklerde geleneksel erkeksi yaşam biçimi yoktur.");
      personalizedNotes.push("Yüksek puanlar pasif erkekleri gösterir (eğer alt test 4, düşük ise) ve çoğunluğunda kadınsı özellikler vardır.");
    }

    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  }

  getInterpretation(tScore: number, cinsiyet?: 'Erkek' | 'Kadın'): MfScaleInterpretation {
    if (cinsiyet === 'Erkek') {
      return this.getMaleInterpretation(tScore);
    } else if (cinsiyet === 'Kadın') {
      return this.getFemaleInterpretation(tScore);
    } else {
      return this.getGeneralInterpretation(tScore);
    }
  }

  private getMaleInterpretation(tScore: number): MfScaleInterpretation {
    if (tScore >= 80) {
      return {
        tScore,
        level: '80 Ve Üstü T Puanı',
        description: 'Lise eğitimi olan erkeklerde ya da kültürel baskı altındakilerde kültürün verdiği erkeksi rolle özdeşim olmadığını göstermektedir.',
        characteristics: [
          'Yüksek puanlar göreceli olarak pasif erkeklere (eğer 4 alt testi de düşükse) hatta bazı durumlarda kadınsı özelliklere sahip olanlara işaret etmektedir'
        ]
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-79 T Puanı',
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
        level: '60-69 T Puanı',
        description: '65 puanının üstündeki yükselmeler demografik ve klinik veri dikkate alınarak değerlendirilmelidir.',
        characteristics: [
          'Üniversite öğrencilerinin bu aralıkta puan almaları beklenen bir durumdur',
          'Ayrıca sanatla ilgili olanlarda (ressamlar, artistler) bu alanda puan alırlar'
        ]
      };
    } else if (tScore >= 41) {
      return {
        tScore,
        level: '41-69 T Puanı',
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
        level: '26-40 T Puanı',
        description: 'Bu erkelerde maskülen görünmek için kompulsif bir uğraş vardır ve bu abartılmış bir boyuttadır.',
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
        level: '65 T Puanının Üstü',
        description: 'Bu kadınlar güçlü, kuvvetli, saldırgan, yönlendirici ve yarışmacıdır.',
        characteristics: [
          'Geleneksel erkek rolüne özgü aktivite ve işlere girerler',
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
        level: '56-65 T Puanı',
        description: 'Kadınlarda 60 ve üstündeki T puanı onların aktif, atılgan ve yarışmacı olduklarını göstermektedir.',
        characteristics: [
          'Bu aralıkta aktif, atılgan ve yarışmacı özellikler görülür'
        ]
      };
    } else if (tScore >= 41) {
      return {
        tScore,
        level: '41-55 T Puanı',
        description: 'Bu kadınların ilgi alanları orta sınıf kadınların ilgilendikleri konular ile sınırlıdır.',
        characteristics: [
          'Duyarlı kişilerdir, bu duyarlılık erkeklerle ilişkilerinde daha da belirginleşmektedir',
          'Giyimleriyle kadın olduklarını açıkça gösterirler'
        ]
      };
    } else {
      return {
        tScore,
        level: '26-40 T Puanı',
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
      description: 'Cinsiyet belirtilmediği için genel değerlendirme yapılamamaktadır.',
      characteristics: [
        'Mf alt testi cinsiyet bazlı yorumlanması gereken bir ölçektir',
        'Lütfen cinsiyet bilgisi ile birlikte değerlendirin'
      ]
    };
  }
}

/**
 * Mf Alt Testinde Yüksek Puan Alan Bir Erkek (Graham 1987)
 */
export function getMfHighScoreMaleCharacteristics(): string[] {
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
 * Mf Alt Testinde Yüksek Puan Alan Bir Kadın
 */
export function getMfHighScoreFemaleCharacteristics(): string[] {
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
 * Mf Alt Testinde Düşük Bir Puan Alan Erkek
 */
export function getMfLowScoreMaleCharacteristics(): string[] {
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
 * Sadece Mf Alt Testinin Yükselmesi (Spike) Yorumu
 */
export function getMfSpikeInterpretation(): string {
  return 'Sadece test 5\'in yükselmesi açık ya da örtük homoseksüaliteyi gösterme açısından yeterli değildir. Kendi homoseksüalitesini göstermek isteyen bireyler bu testte yavaş bir yükselme yaparlar. Erkeklerde 5 testinde 75 T puanı ve üstü, eğitim düzeyleri orta ya da lise 1 ise ve oldukça katı kültürel baskı varsa bu erkeklerde geleneksel erkeksi yaşam biçimi yoktur, yüksek puanlar pasif erkekleri gösterir (eğer alt test 4, düşük ise) ve çoğunluğunda kadınsı özellikler vardır.';
}

/**
 * Mf Alt Testi Genel Özellikleri
 */
export function getMfGeneralCharacteristics(): string[] {
  return [
    'Bu alt testteki maddeler oldukça heterojendir',
    'Çeşitli mesleklere karşı ilgi, boş zaman faaliyetleri, uğraşlar, sosyal aktivitelerle ilgili maddelerden başka korkular, endişeler ve bireysel duyarlılıklarla ilgili maddeler bulunmaktadır',
    'Doğrudan doğruya cinsel içerikli maddelerde vardır'
  ];
}

// Geriye uyumluluk için export objesi
export const mfScaleInterpretation = {
  getInterpretation: (tScore: number, cinsiyet?: 'Erkek' | 'Kadın') => new MfScale().getInterpretation(tScore, cinsiyet),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new MfScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreMaleCharacteristics: getMfHighScoreMaleCharacteristics,
  getHighScoreFemaleCharacteristics: getMfHighScoreFemaleCharacteristics,
  getLowScoreMaleCharacteristics: getMfLowScoreMaleCharacteristics,
  getSpikeInterpretation: getMfSpikeInterpretation,
  getGeneralCharacteristics: getMfGeneralCharacteristics,
  name: 'Mesculinite/Femininite (Mf)',
  number: 5,
  description: 'Bu alt test, cinsel kimlikleri saptamaları değerlendirmek amacıyla geliştirilmiştir. Bu alt testteki maddeler oldukça heterojendir. Çeşitli mesleklere karşı ilgi, boş zaman faaliyetleri, uğraşlar, sosyal aktivitelerle ilgili maddelerden başka korkular, endişeler ve bireysel duyarlılıklarla ilgili maddeler bulunmaktadır. Doğrudan doğruya cinsel içerikli maddelerde vardır.',
  itemCount: 60
};