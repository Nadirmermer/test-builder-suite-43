// MMPI Beşli Kod Interpretasyonları

import { CodeTypeInterpretation, ScaleValues, Gender } from './types';

/**
 * Beşli Kod Yorumlamaları
 */
export function getFivePointCodeInterpretation(
  code: string, 
  scales: ScaleValues, 
  gender?: Gender
): CodeTypeInterpretation | null {
  switch (code) {
    case '12370': {
      return {
        code: '1270',
        description: '1270 Kodu',
        characteristics: [
          'Sinirlilik, anksiyete, depresyon, zayıflık, yorgunluk, ilgi kaybı gibi semptomlar gösterirler',
          'Kendilik değerlerinde düşme vardır',
          'Sosyal ilişkilerinde geri çekilme ve içe dönük tutum sergilerler',
          'Uykusuzluk, kardiyak semptomlar ve anoreksiya görülebilir'
        ],
        clinicalSignificance: 'Depresyon, anksiyete ve sosyal geri çekilme kombinasyonu'
      };
    }

    case '12378': {
      return {
        code: '12378',
        description: '12378 Kodu',
        characteristics: [
          'Nevrotik bozuklukların daha şiddetli şeklidir',
          '7 ve 8\'deki yükselmeler, nevrotik bozukluğun daha abartılı olduğunun göstergesidir'
        ],
        clinicalSignificance: 'Şiddetli nevrotik bozukluk'
      };
    }

    default:
      return null;
  }
}