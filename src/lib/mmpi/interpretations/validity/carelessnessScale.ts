// Dikkatsizlik Alt Testi (Carelessness Scale) - Greene, 1978
// MMPI geçerlik göstergesi - Zıt içerikli madde çiftleri ile dikkatsizlik tespiti

export interface CarelessnessInterpretation {
  score: number;
  level: string;
  description: string;
  interpretation: string;
  validity: 'geçerli' | 'şüpheli' | 'geçersiz';
  clinicalImplications?: string[];
  recommendations?: string[];
}

// Dikkatsizlik Alt Testi Madde Çiftleri ve Puanlama
export const carelessnessItems = [
  { pair: [10, 405], scoringType: 'aynı' },      // 1. çift
  { pair: [17, 65], scoringType: 'farklı' },     // 2. çift
  { pair: [18, 63], scoringType: 'farklı' },     // 3. çift
  { pair: [49, 113], scoringType: 'aynı' },      // 4. çift
  { pair: [76, 107], scoringType: 'aynı' },      // 5. çift
  { pair: [88, 526], scoringType: 'aynı' },      // 6. çift
  { pair: [137, 216], scoringType: 'aynı' },     // 7. çift
  { pair: [177, 220], scoringType: 'farklı' },   // 8. çift
  { pair: [178, 342], scoringType: 'aynı' },     // 9. çift
  { pair: [286, 312], scoringType: 'farklı' },   // 10. çift
  { pair: [329, 425], scoringType: 'aynı' },     // 11. çift
  { pair: [388, 480], scoringType: 'farklı' }    // 12. çift
];

/**
 * Dikkatsizlik Alt Testi puanını hesaplar
 * @param responses - MMPI yanıtları (madde numarası: yanıt değeri)
 * @returns Dikkatsizlik puanı (0-12 arası)
 */
export function calculateCarelessnessScore(responses: Record<number, boolean>): number {
  let carelessnessScore = 0;

  for (const item of carelessnessItems) {
    const [item1, item2] = item.pair;
    const response1 = responses[item1];
    const response2 = responses[item2];

    // Her iki madde de yanıtlanmışsa değerlendir
    if (response1 !== undefined && response2 !== undefined) {
      if (item.scoringType === 'aynı') {
        // Aynı yanıt verilmesi beklenen çiftler - farklı yanıt dikkatsizlik göstergesi
        if (response1 !== response2) {
          carelessnessScore++;
        }
      } else {
        // Farklı yanıt verilmesi beklenen çiftler - aynı yanıt dikkatsizlik göstergesi
        if (response1 === response2) {
          carelessnessScore++;
        }
      }
    }
  }

  return carelessnessScore;
}

/**
 * Dikkatsizlik Alt Testi yorumlaması
 * @param score - Dikkatsizlik puanı (0-12)
 * @returns Yorumlama bilgisi
 */
export function getCarelessnessInterpretation(score: number): CarelessnessInterpretation {
  if (score >= 0 && score <= 3) {
    return {
      score,
      level: 'Normal Dikkatsizlik',
      description: 'Geçerli test performansı - Normal dikkat düzeyi',
      interpretation: 'Bu puan düzeyi, test alan kişinin MMPI\'yı dikkatli ve tutarlı bir şekilde yanıtladığını göstermektedir. Psikolojik olarak zıt içerikli madde çiftlerine verilen yanıtlar tutarlıdır ve test geçerliği açısından herhangi bir sorun bulunmamaktadır.',
      validity: 'geçerli',
      clinicalImplications: [
        'Test sonuçları güvenilir olarak değerlendirilebilir',
        'Kişi teste karşı işbirlikçi bir tutum sergilemiştir',
        'Zihinsel karışıklık veya dikkat eksikliği bulgusu yoktur',
        'Test talimatlarını anlayabilmiş ve uygun şekilde yanıtlamıştır'
      ]
    };
  } else if (score === 4 || score === 5) {
    return {
      score,
      level: 'Sınırda Dikkatsizlik',
      description: 'Şüpheli test performansı - Greene (1980) kesim puanı civarı',
      interpretation: 'Bu puan düzeyi, Greene (1980) tarafından önerilen 4 kesim puanının civarındadır ve dikkatli değerlendirme gerektirir. Kişinin teste karşı isteksizliği, beceri eksikliği veya hafif zihinsel karışıklık durumu söz konusu olabilir. Test geçerliği şüpheli olarak değerlendirilmelidir.',
      validity: 'şüpheli',
      clinicalImplications: [
        'Test geçerliği şüpheli, dikkatli yorumlama gereklidir',
        'Kişinin teste karşı motivasyonu sorgulanmalıdır',
        'Hafif konfüzyon veya dikkat dağınıklığı olabilir',
        'Diğer geçerlik ölçekleri ile birlikte değerlendirilmelidir'
      ],
      recommendations: [
        'Kişiyle test süreci hakkında görüşme yapılmalıdır',
        'Test tekrarı düşünülebilir',
        'Diğer geçerlik göstergeleri kontrol edilmelidir',
        'Test alma koşulları gözden geçirilmelidir'
      ]
    };
  } else if (score >= 6 && score <= 12) {
    return {
      score,
      level: 'Yüksek Dikkatsizlik',
      description: 'Geçersiz test performansı - Kritik düzey dikkatsizlik',
      interpretation: 'Bu yüksek puan düzeyi, kişinin MMPI\'yı düzgün bir şekilde cevaplandırmak istemediğini veya beceri eksikliği yaşadığını göstermektedir. Saptırılmış test davranışı veya zihinsel karışıklık (konfüzyon) durumu söz konusudur. Test sonuçları geçersiz olarak değerlendirilmelidir ve kişiyle detaylı bir görüşme yapılması gerekmektedir.',
      validity: 'geçersiz',
      clinicalImplications: [
        'Test sonuçları geçersiz, yorumlanmamalıdır',
        'Saptırılmış test davranışı veya konfüzyon durumu',
        'Teste karşı belirgin isteksizlik veya beceri eksikliği',
        'Zihinsel karışıklık durumu değerlendirilmelidir'
      ],
      recommendations: [
        'Kişiyle kapsamlı bir görüşme yapılmalıdır',
        'Zihinsel durum değerlendirmesi gereklidir',
        'Test tekrarı uygun koşullarda düşünülmelidir',
        'Alternatif değerlendirme yöntemleri kullanılmalıdır',
        'Test alma motivasyonu araştırılmalıdır'
      ]
    };
  } else {
    return {
      score,
      level: 'Geçersiz Puan',
      description: 'Puan aralığı dışında değer',
      interpretation: 'Dikkatsizlik alt testinden alınabilecek puan 0-12 arasında olmalıdır. Bu puan hesaplama hatası olabileceğini göstermektedir.',
      validity: 'geçersiz'
    };
  }
}

// Ana export objesi
export const carelessnessScaleInterpretation = {
  getInterpretation: getCarelessnessInterpretation,
  calculateScore: calculateCarelessnessScore,
  items: carelessnessItems,
  maxScore: 12,
  cutoffScore: 4,
  name: 'Dikkatsizlik Alt Testi',
  shortName: 'DIKKAT',
  author: 'Greene (1978)',
  description: 'Psikolojik olarak zıt içerikli madde çiftleri ile dikkatsizlik ve tutarsızlık tespiti'
};