// Psikopatik Sapma (Pd) Alt Testi - Ölçek 4
// MMPI Klinik Ölçek - Psikopatik eğilimleri yansıtmak ve psikopatik kişiliği teşhis etmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface PdScaleInterpretation {
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

export class PdScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş psikopatik sapma ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): PdScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    if (!personalInfo) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notları oluştur
    const personalizedNotes: string[] = [];

    // Yaş faktörü (kitapta açık belirtilen)
    if (personalInfo.dogumTarihi && tScore >= 70) {
      const yas = hesaplaYas(personalInfo.dogumTarihi);
      
      if (yas !== null) {
        if (yas <= 25) {
          personalizedNotes.push("Yüksek 4 profilleri (yetişkin normları kullanılarak) ergenler için normaldir, bunlar karakteristik olarak evden uzaklaşmak ve kendi kimlik duygularını oluşturmak için isyan ederler.");
        } else if (yas > 25) {
          personalizedNotes.push("25 yaşın üzerinde yüksek 4 profil normal değildir.");
        }
        
        if (yas > 40) {
          personalizedNotes.push("40 yaşın üstünde yüksek 4 profili uzun süren kişilerarası ilişki kuramama ve antisosyal davranışları yansıtırken.");
        }
        
        if (yas > 60) {
          personalizedNotes.push("60 yaş üzerinde bu tür puanlar apatik bir biçimde katılmama düzeyine varan bir yabancılaşmayı düşündürür.");
        }
      }
    }

    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  }

  getInterpretation(tScore: number): PdScaleInterpretation {
    if (tScore >= 80) {
      return {
        tScore,
        level: '80 T Puanı Ve Üstü',
        description: '70-79 T puanında verilen özelliklere ek olarak bu yükselme klinik tanı olarak psikopatik bir bireyi göstermektedir.',
        characteristics: [
          'Antisosyal davranışlar, otorite figürleri ile çatışma vardır',
          'Diğerleriyle kendi gereksinimlerini nasıl karşılayabileceklerine bakarak ilişki kurarlar'
        ],
        clinicalSignificance: 'Klinik tanı olarak psikopatik birey - Kritik düzey'
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-79 T Puanı',
        description: 'Bu alt teste yüksek puan alan bireyler, öfkeli, impulsif, emosyonel açıdan yüzeysel, yordanamaz davranışları olan kişiler olarak tanımlanmaktadır.',
        characteristics: [
          'Bu tür kişiler sosyal uyumsuzluk, otoriteye ve diğerlerine karşı olma davranışları gösterirler',
          'Alt test 4\'teki yükselme antisosyal, tutum ve davranış eğilimlerine işaret eder, ancak bu her zaman açık davranış biçiminde ifade edileceği anlamına gelmez',
          'Antisosyal davranışlar, açıkça gösteriliyorsa özellikle alt test 9\'la birlikte yükselme görülür',
          'Yüksek puan verenlerin kendilerine ilişkin mükemmeliyetçi ve narsisistik kavramları vardır',
          'Bu kişisel standartları, sosyal kuralları reddetmeyi rasyonalizasyon olarak kullanmaktadırlar',
          'Bunların kızgınlığı ailelerine veya genelde otorite ve topluma karşı ya da her ikisine karşı olabilir',
          'Bazen bunların kızgınlığı durumsal bir tepki (boşanma vb) ya da ergenlik isyanı olabilir',
          'Ya da kültürel bir azınlık grubunda olmayla bağlantılı kızgınlığı yansıtabilir',
          'Böyle olmadığında örüntü uzun sürelidir ve değişme olasılığı düşüktür',
          'Bireylerin küskünlük ve sosyal olmayan impulsları ele alma biçimleri büyük ölçüde farklılık gösterebilir',
          'Bu profil diğer yönlerindeki yükselmelere bağlıdır',
          'Genelde kızgınlığın davranışsal olarak dışa vurup vurmayacağı test 9 ve/ya da 0\'ın yükselmesi ve K\'nın düşük olup olmamasına dayanır',
          'İmpulsif olma, kötü kişilerarası yargılama, davranışların önceden kestirilememesi',
          'Sosyal yabancılaşma ve azalmış sorumluluk ve ahlak duygusu',
          'Buna eşlik eden kötü iş yaşamı ve evlilik uyumsuzluğu vardır',
          'Uzun vadeli hedeflerini kısa süreli arzuları uğruna feda ederler',
          'Sonuçları tahmin etme kapasiteleri sınırlıdır'
        ],
        additionalNotes: [
          'Patolojinin var olup olmadığının belirlenmesi için bireyin hem yaşam durumu, hem de yaşı dikkate alınmalıdır',
          'Bu tür bir kızgınlığı başlatan açık bir yaşam olayı olmadığında test 4 özelikleri kalıcı ve değişime dirençlidir'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-69 T Puanı',
        description: 'Risk alabilen, enerjik, sosyal, maceraperest ve atılgan olan bu bireyle bağlantılıdır.',
        characteristics: [
          'Ancak, bu bireyler engellendiklerinde bu özellikler huzursuzluk, saldırganlık ve sosyal olarak uyumlu olmayan davranış biçimine dönüşebilir'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Aşırı kontrol koyma ve kısıtlanma genellikle azdır.',
        characteristics: [
          'Sosyal kurallara kısmen uyum vardır'
        ]
      };
    } else {
      return {
        tScore,
        level: '20-44 T Puanı',
        description: 'Durağan, pasif ve atılgan olmayan bireylerdir.',
        characteristics: [
          'Maceraperest değillerdir ve sıklıkla sosyal geleneklere uyma konusunda bağımlı ve hatta katıdırlar',
          'Danışma durumunda başkalarının onlara karşı olan düşünceleri konusunda güvence ararlar',
          'Çok sevgi dolu olsalar da, sıklıkla cinsel ilişkiye girme konusunda girişken değildirler'
        ]
      };
    }
  }
}

/**
 * Pd Alt Testinde Yüksek Puan Alan Bir Birey
 */
export function getPdHighScoreCharacteristics(): string[] {
  return [
    'Toplumun kurallarına ve değerlerine uymada güçlük çeker',
    'Asosyal ya da anti sosyal davranış içine girer',
    'Yalan söyleme, çalma, dolandırıcılık',
    'Cinsel eyleme vuruk davranış',
    'Alkol ve/ya da madde kullanım öyküsü',
    'Otorite figürlerine karşı isyankar',
    'Aile ilişkileri fırtınalıdır',
    'Sorunları için ebeveynlerini suçlar',
    'Yaşam öyküsünde kötü bir iş yaşamı vardır',
    'Evlilik sorunları vardır',
    'İmpulsiftir, impulsları için hemen doyum ister',
    'İyi planlama yapamaz',
    'Davranışın sonuçlarını düşünmeden hareket eder',
    'Sabırsızdır, engellenme eşiği düşüktür',
    'Yargılaması yetersizdir, düşünmeden tehlikeye atılır',
    'Deneyimlerinden yararlanamaz',
    'İmmatür ve çocuksudur',
    'Narsisistik, benmerkezcil ve bencildir',
    'Dikkat çekmek ister, gösterişçidir',
    'Diğer kişilere karşı duyarsızdır',
    'Diğerlerini nasıl kullanabileceğiyle ilgilidir',
    'Beğenilir, ilk imajı iyidir',
    'Kişilerarası ilişkileri yüzeyseldir',
    'Sıcak ve yakın ilişkiler kuramazlar',
    'Dışadönük ve sempatiktir',
    'Konuşkan, aktif, enerjik, maceracı, spontandır',
    'Zeki ve kendine güvenlidir',
    'Geniş ilgi alanları vardır',
    'Belirli amaçları yoktur',
    'Hostil ve saldırgandır',
    'Küçümseyici ve alaycıdır',
    'Gücenik ve asidir',
    'Eyleme vuruk davranışları vardır',
    'Saldırgan patlamaları ve davranışları vardır',
    'Muhalif ve inatçıdır',
    'Davranışlarından dolayı çok az suçluluk yaşar',
    'Başı belada olduğu zaman suçluluk ve vicdan azabı hisseder',
    'Anksiyete, depresyon ve psikotik semptomlar göstermez',
    'Genellikle kişilik bozukluğu tanısı konulur',
    'Endişeye eğilimli ve tatminsizdir',
    'İçten duygusal tepkileri yoktur',
    'Can sıkıntısı ve boşluk duyguları vardır',
    'Psikoterapi ya da danışmanlıkla değişme prognozu kötüdür',
    'Sorunları için diğerlerini suçlama eğilimindedirler',
    'Entellektüalizasyonu kullanır. Duygulardan uzaklaşabilmek amacıyla entellektüel süreçlerin aşırı kullanımı',
    'Hapsedilmekten ya da diğer hoş olmayan yaşantılardan kurtulmak için tedaviyi kabul eder, ancak kısa sürede sonlandırır'
  ];
}

/**
 * Pd Alt Testinde Düşük Puan Alan Bir Birey
 */
export function getPdLowScoreCharacteristics(): string[] {
  return [
    'Geleneksel ve itaatkardır',
    'Otoriteye boyun eğer',
    'Pasif, itaatkar ve çekingendir',
    'Diğerlerinin nasıl tepki vereceğini düşünür',
    'Samimi ve güvenilirdir',
    'Enerji düzeyi düşüktür, yarışmacı değildir',
    'Mevki ve güvencede olmaya dikkat eder',
    'İlgi alanları daralmıştır',
    'Yaratıcı ve spontan değildir',
    'İnatçıdır',
    'Kuralcı ve katıdır',
    'Erkekse cinsellikle çok ilgili değildir, kadınlardan korkar',
    'Kendini eleştirir, kendinden memnun değildir',
    'Önerileri ve fikirleri kabul eder',
    'Tedaviye çok bağımlı olmaya eğilimlidir',
    'Kendi davranışının sorumluluğunu kabul etmekten korkar'
  ];
}

/**
 * Sadece Pd Alt Testinin Yükselmesi (Spike) Yorumu
 */
export function getPdSpikeInterpretation(): string {
  return 'Pd alt testinin diğer testlerden en az 10 ya da daha fazla T puanı yukarı da olmasıdır. Bunlar impulsif, küskün, isyankar ve genelde kurallar, düzenlemeler ve otoriteyi kabullenmekte güçlükleri olan bireylerdir. Sıklıkla yaşam sorunları olabilir. Bunlar sokulgan (insan canlısı) olabilirler (eğer test 0 düşükse) ancak diğerleriyle ilişkileri yüzeysel, yapay ve kısadır. Uzun süren yakın ilişkiler kuramazlar, çünkü bunlar birliktelikle ilgili empati, sorumluluklar ve talepler konusunda güçlükleri olan bireylerdir. Uzun süreli hedeflere doğru organize davranışları sürdüremezler ve bunun yerine doyum veren kısa süreli istekler üzerinde odaklaşma eğiliminde olurlar. Alt test Si 30 T puanına yaklaşırsa bu sorunlar daha kalıcı ve şiddetlidir, ancak birey hoş ve rahat görüntüsü verebilir.';
}

/**
 * Pd Alt Testi Genel Özellikleri
 */
export function getPdGeneralCharacteristics(): string[] {
  return [
    'Psikopatik bir birey toplum kurallarını hiçe sayar, saldırgandır, engelleme eşiği düşüktür',
    'İç çatışmaları, suçluluk duygusu azdır, deneyimden pek fazla ders almaz',
    'Bu gibi özelikleri tanımlamak için bu alt test geliştirilmiştir',
    'Alt test 4, psikopatik eğilimleri de yansıttığı ve psikopatik kişiliği kesin olarak teşhis edemediği için McKinley ve Hathaway alt ölçeğe "Psikopatik sapma" adını vermişlerdir'
  ];
}

// Geriye uyumluluk için export objesi
export const pdScaleInterpretation = {
  getInterpretation: (tScore: number) => new PdScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new PdScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getPdHighScoreCharacteristics,
  getLowScoreCharacteristics: getPdLowScoreCharacteristics,
  getSpikeInterpretation: getPdSpikeInterpretation,
  getGeneralCharacteristics: getPdGeneralCharacteristics,
  name: 'Psikopatik Sapma (Pd)',
  number: 4,
  description: 'Psikopatik bir birey toplum kurallarını hiçe sayar, saldırgandır, engelleme eşiği düşüktür, iç çatışmaları, suçluluk duygusu azdır, deneyimden pek fazla ders almaz. Bu gibi özelikleri tanımlamak için bu alt test geliştirilmiştir. Alt test 4, psikopatik eğilimleri de yansıttığı ve psikopatik kişiliği kesin olarak teşhis edemediği için McKinley ve Hathaway alt ölçeğe "Psikopatik sapma" adını vermişlerdir.',
  itemCount: 50
};