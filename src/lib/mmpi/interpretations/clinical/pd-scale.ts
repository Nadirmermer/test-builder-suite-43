// Psikopatik Sapma (Pd) Alt Testi - Ölçek 4
// MMPI Klinik Ölçek - Psikopatik eğilimleri tanımlamak için geliştirilmiştir

export interface PdScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  therapeuticImplications?: string[];
  behavioralIndicators?: string[];
  additionalNotes?: string[];
  ageConsiderations?: string[];
}

// Psikopatik Sapma Ölçeği Yorumlama Sınıfı
export class PdScale {
  getInterpretation(tScore: number): PdScaleInterpretation {
    if (tScore >= 80) {
      return {
        tScore,
        level: 'Çok Yüksek (T ≥ 80)',
        description: '70-79 T puanında verilen özelliklere ek olarak bu yükselme klinik tanı olarak psikopatik bir bireyi göstermektedir.',
        characteristics: [
          'Antisosyal davranışlar belirgin',
          'Otorite figürleri ile çatışma vardır',
          'Diğerleriyle kendi gereksinimlerini nasıl karşılayabileceklerine bakarak ilişki kurarlar'
        ],
        clinicalSignificance: 'Psikopatik kişilik bozukluğu tanısı için güçlü kanıt'
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: 'Yüksek (T: 70-79)',
        description: 'Bu kişiler çocukluklarından itibaren kurallara uymayan ve karşı gelen kişilerdir.',
        characteristics: [
          'Toplumsal normlara karşı gelir',
          'Risk alır, maceracıdır',
          'İmpulsif davranır',
          'Otorite ile sorunları vardır',
          'Antisosyal davranışlar gösterebilir'
        ],
        behavioralIndicators: [
          'Sürekli yalan söyler',
          'Çalar, dolandırır',
          'Alkol/madde kullanım öyküsü',
          'Cinsel davranışlarda aşırılık',
          'Saldırgan patlamalar'
        ],
        therapeuticImplications: [
          'Terapiye direnç gösterebilir',
          'Motivasyon eksikliği',
          'Davranışsal kontrole odaklanma'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: 'Orta Derecede Yüksek (T: 60-69)',
        description: 'Konformiteden uzak, bireysel yaklaşımları olan kişilerdir.',
        characteristics: [
          'Bağımsız düşünür',
          'Geleneksel değerleri sorgular',
          'Yaratıcı ve yenilikçi',
          'Girişimci ruha sahip',
          'Sosyal kurallarda esnek'
        ],
        additionalNotes: [
          'Bu düzeyde pozitif özellikler de vardır',
          'Liderlik potansiyeli mevcut',
          'İnovatif yaklaşımlar geliştirebilir'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: 'Normal Aralık (T: 45-59)',
        description: 'Sosyal kurallara uyumlu, dengeli davranış sergiler.',
        characteristics: [
          'Toplumsal normlara saygılı',
          'Dengeli risk alma',
          'Uygun impulse kontrolü',
          'Sosyal sorumluluk sahibi'
        ]
      };
    } else {
      return {
        tScore,
        level: 'Düşük (T < 45)',
        description: 'Aşırı konformist, kurallara katı şekilde bağlı yaklaşım.',
        characteristics: [
          'Aşırı kurallara bağlı',
          'Risk almaktan kaçınır',
          'Geleneksel değerlere sıkı bağlılık',
          'Sosyal onay arayışı yüksek',
          'Yaratıcılık sınırlı'
        ],
        therapeuticImplications: [
          'Değişime direnç gösterebilir',
          'Esneklik becerilerinin geliştirilmesi',
          'Esnek düşünce becerilerinin kazandırılması',
          'Kişilerarası ilişkilerde denge kurma'
        ]
      };
    }
  }
}

export function getPdHighScoreCharacteristics(): string[] {
  return [
    'Toplumun kurallarına ve değerlerine uymada güçlük çeker',
    'Asosyal ya da anti sosyal davranış içine girer: a. Yalan söyleme, çalma, dolandırıcılık b. Cinsel eyleme vuruk davranış c. Alkol ve/ya da madde kullanım öyküsü',
    'Otorite figürlerine karşı isyankârdır',
    'Aile ilişkileri fırtınalıdır',
    'Sorunları için ebeveynlerini suçlar',
    'Yaşam öyküsünde kötü bir iş yaşamı vardır',
    'Evlilik sorunları vardır',
    'İmpulsiftir, impulsları için hemen doyum ister',
    'İyi planlama yapamaz',
    'Davranışının sonuçlarını düşünmeden hareket eder',
    'Sabırsızdır, engellenme eşiği düşüktür',
    'Yargılaması yetersizdir, düşünmeden tehlikeye atılır',
    'Deneyimlerinden yararlanamaz',
    'İmmatür ve çocuksudur',
    'Narsisistik, benmerkezcil ve bencildir',
    'Dikkati çekmek ister, gösterişçidir',
    'Diğer kişilere karşı duyarsızdır',
    'Diğerlerini nasıl kullanabileceğiyle ilgilidir',
    'Beğenilir, ilk imajı iyidir',
    'Kişilerarası ilişkileri yüzeyseldir',
    'Sıcak ve yakın ilişkiler kuramaz',
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
    'Genellikle kişilik bozukluğu tanısı konulur (anti sosyal kişilik ya da pasif agresif kişilik)',
    'Endişeye eğilimli ve tatminsizdir',
    'İçten duygusal tepkileri yoktur',
    'Can sıkıntısı ve boşluk duyguları vardır'
  ];
}

export function getPdLowScoreCharacteristics(): string[] {
  return [
    'Geleneksel ahlaki değerlere sahiptir',
    'Toplumsal beklentilere uygundur',
    'Uyumludur, pasiftir, uysaldır',
    'İtaatkârdır',
    'Güvenilirdir, sorumlu ve kararlıdır',
    'Başkalarının haklarına saygılıdır',
    'Toleranslıdır, sabırlıdır',
    'Güvenilir, samimi, dürüst, doğrudur',
    'İyi iş alışkanlıkları vardır',
    'Önemli hedefleri vardır',
    'İlişkilerinde sadık ve bağlıdır',
    'İnsanlara güvenir, açıktır',
    'Kendine güveni yoktur',
    'İnatçı ve katıdır',
    'Aşırı kontrollüdür',
    'Spontan olamaz',
    'Konuşkan değildir'
  ];
}

export function getPdGeneralDescription(): string {
  return 'Psikopatik Sapma (Pd) alt testi, bireyin toplumsal kurallara ve değerlere uyum sağlama kapasitesini değerlendirir. Bu ölçek, antisosyal eğilimleri, impulse kontrol problemlerini ve otorite ile yaşanan çatışmaları ölçer. Yüksek puanlar genellikle kurallara karşı gelme, risk alma davranışları ve kişilerarası ilişkilerde sorunları işaret eder.';
}

export function getPdAgeConsiderations(): string {
  return 'Patolojinin var olup olmadığının belirlenmesi için, bireyin hem yaşam durumu, hem de yaşı dikkate alınmalıdır. Yüksek 4 profilleri (yetişkin normları kullanılarak) ergenler için normaldir, bunlar karakteristik olarak evden uzaklaşmak ve kendi kimlik duygularını oluşturmak için isyan ederler. Ancak 25 yaşın üzerinde yüksek 4 profili doğal değildir. 40 yaşın üstünde yüksek 4 profili uzun süren kişilerarası ilişki kuramama ve antisosyal davranışları yansıtırken, 60 yaşın üzerinde, bu tür puanlar apatik bir biçimde katılmama düzeyine varan bir yabancılaşmayı düşündürür.';
}