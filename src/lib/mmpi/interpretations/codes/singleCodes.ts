// MMPI Tekli Kod Interpretasyonları

import { CodeTypeInterpretation, ScaleValues, Gender } from './types';

/**
 * Tekli Kod Yorumlamaları (Sadece bir ölçek yüksek)
 */
export function getSingleCodeInterpretation(
  code: string, 
  scales: ScaleValues, 
  gender?: Gender
): CodeTypeInterpretation | null {
  switch (code) {
    case '1': {
      // Yüksek 1/Düşük 4 Kodu - Özel durum kontrolü
      if (scales.Pd && scales.Pd.tScore < 65) {
        return {
          code: '1',
          description: 'Yüksek 1/Düşük 4 Kodu',
          characteristics: [
            'Bu örüntü karşılaşılan sorunlarla başa çıkamama ve ev yaşantısındaki güçlüklerle bağlantılıdır',
            'Öfkelerini kolaylıkla dile getirmelerine karşın yine de psikofizyolojik tepkiler verirler',
            'Genel özellikleri sürekli yakınma ve karamsarlıktır'
          ],
          clinicalSignificance: 'Başa çıkma güçlüğü ve ev yaşantısı problemleri'
        };
      }
      // Normal 1 kodu için başka interpretasyon eklenebilir
      return null;
    }

    // Diğer tekli kodlar buraya eklenecek
    case '2': {
      // 2 kodu interpretasyonu
      return null;
    }

    case '3': {
      // 3 kodu interpretasyonu  
      return null;
    }

    case '4': {
      // 4 kodu interpretasyonu
      return null;
    }

    case '5': {
      // 5 kodu interpretasyonu
      return null;
    }

    case '6': {
      // 6 kodu interpretasyonu
      return null;
    }

    case '7': {
      // 7 kodu interpretasyonu
      return null;
    }

    case '8': {
      // 8 kodu interpretasyonu
      return null;
    }

    case '9': {
      // 9 kodu interpretasyonu
      return null;
    }

    case '0': {
      // 0 kodu interpretasyonu
      return null;
    }

    default:
      return null;
  }
}